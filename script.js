"use strict";
const languages = {
    russian: {
        name: "Russian",
        layoutName: "Russian layout",
        image: "src/KB_Russian.png",
        map: {
            Q: "Й", W: "Ц", E: "У", R: "К", T: "Е", Z: "Н", U: "Г", I: "Ш", O: "Щ", P: "З",
            A: "Ф", S: "Ы", D: "В", F: "А", G: "П", H: "Р", J: "О", K: "Л", L: "Д",
            Y: "Я", X: "Ч", C: "С", V: "М", B: "И", N: "Т", M: "Ь",
            "Ä": "Э", "Ö": "Ж", "Ü": "Ю"
        }
    },
    ukrainian: {
        name: "Ukrainian",
        layoutName: "Ukrainian layout",
        image: "src/KB_Ukrainian.PNG",
        map: {
            Q: "Й", W: "Ц", E: "У", R: "К", T: "Е", Z: "Н", U: "Г", I: "Ш", O: "Щ", P: "З",
            A: "Ф", S: "І", D: "В", F: "А", G: "П", H: "Р", J: "О", K: "Л", L: "Д",
            Y: "Я", X: "Ч", C: "С", V: "М", B: "И", N: "Т", M: "Ь",
            "Ä": "Є", "Ö": "Ж", "Ü": "Х"
        }
    },
    belarusian: {
        name: "Belarusian",
        layoutName: "Belarusian layout",
        image: "src/KB_Belarusian.png",
        map: {
            Q: "Й", W: "Ц", E: "У", R: "К", T: "Е", Z: "Н", U: "Г", I: "Ш", O: "Ў", P: "З",
            A: "Ф", S: "Ы", D: "В", F: "А", G: "П", H: "Р", J: "О", K: "Л", L: "Д",
            Y: "Я", X: "Ч", C: "С", V: "М", B: "І", N: "Т", M: "Ь",
            "Ä": "Э", "Ö": "Ж", "Ü": "Х"
        }
    }
};
const state = {
    language: "russian",
    direction: "latin-to-cyrillic",
    mode: "freeplay",
    target: "",
    expected: "",
    correct: 0,
    wrong: 0,
    streak: 0,
    timerId: undefined,
    remaining: 60,
    locked: false
};
function queryElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        throw new Error(`Missing required element: ${selector}`);
    }
    return element;
}
const targetCharacter = queryElement("#targetCharacter");
const answerInput = queryElement("#answerInput");
const feedback = queryElement("#feedback");
const correctCount = queryElement("#correctCount");
const wrongCount = queryElement("#wrongCount");
const accuracy = queryElement("#accuracy");
const streak = queryElement("#streak");
const timer = queryElement("#timer");
const timerBlock = queryElement(".timer-block");
const keyboardImage = queryElement("#keyboardImage");
const referenceTitle = queryElement("#referenceTitle");
const instructionText = queryElement("#instructionText");
const directionToggle = queryElement("#directionToggle");
const directionHint = queryElement("#directionHint");
const solutionPanel = queryElement("#solutionPanel");
const typedAnswer = queryElement("#typedAnswer");
const correctAnswer = queryElement("#correctAnswer");
const resultDialog = queryElement("#resultDialog");
const resultSummary = queryElement("#resultSummary");
const resultCorrect = queryElement("#resultCorrect");
const resultWrong = queryElement("#resultWrong");
const resultAccuracy = queryElement("#resultAccuracy");
function reverseMap(map) {
    return Object.fromEntries(Object.entries(map).map(([latin, cyrillic]) => [cyrillic, latin]));
}
function mappedCharacters(map) {
    return [...new Set(Object.values(map))];
}
function currentLanguage() {
    return languages[state.language];
}
function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const rest = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${rest}`;
}
function pickPrompt() {
    const language = currentLanguage();
    const reverse = reverseMap(language.map);
    const characters = mappedCharacters(language.map);
    const cyrillic = characters[Math.floor(Math.random() * characters.length)];
    if (state.direction === "latin-to-cyrillic") {
        state.target = cyrillic;
        state.expected = cyrillic;
        instructionText.textContent = "Type the matching Cyrillic key.";
    }
    else {
        state.target = cyrillic;
        state.expected = reverse[cyrillic] ?? "";
        instructionText.textContent = "Type the Latin key for this Cyrillic letter.";
    }
    if (!state.expected) {
        pickPrompt();
        return;
    }
    targetCharacter.textContent = state.target;
    solutionPanel.hidden = true;
}
function normalizeAnswer(value) {
    const character = value.trim().slice(-1).toUpperCase();
    if (!character)
        return "";
    if (state.direction === "latin-to-cyrillic") {
        return currentLanguage().map[character] ?? character;
    }
    return character;
}
function formatTypedAnswer(rawAnswer, normalizedAnswer) {
    if (!rawAnswer)
        return "-";
    if (rawAnswer !== normalizedAnswer) {
        return `${rawAnswer} -> ${normalizedAnswer}`;
    }
    return rawAnswer;
}
function updateStats() {
    const total = state.correct + state.wrong;
    const accuracyValue = total === 0 ? 100 : Math.round((state.correct / total) * 100);
    correctCount.textContent = String(state.correct);
    wrongCount.textContent = String(state.wrong);
    accuracy.textContent = `${accuracyValue}%`;
    streak.textContent = String(state.streak);
}
function setFeedback(type, text) {
    feedback.className = `feedback ${type}`;
    feedback.textContent = text;
    answerInput.classList.remove("correct", "wrong");
    targetCharacter.classList.remove("correct", "wrong");
    if (type === "correct" || type === "wrong") {
        answerInput.classList.add(type);
        targetCharacter.classList.add(type);
    }
}
function showSolution(answer, expected) {
    typedAnswer.textContent = answer || "-";
    correctAnswer.textContent = expected;
    solutionPanel.hidden = false;
}
function handleAnswer() {
    if (state.locked)
        return;
    const rawAnswer = answerInput.value.trim().slice(-1).toUpperCase();
    const answer = normalizeAnswer(answerInput.value);
    if (!answer)
        return;
    state.locked = true;
    const expected = state.expected.toUpperCase();
    if (answer === expected) {
        state.correct += 1;
        state.streak += 1;
        setFeedback("correct", `Correct: ${state.target} = ${state.expected}`);
    }
    else {
        state.wrong += 1;
        state.streak = 0;
        setFeedback("wrong", `Wrong. The solution was ${state.expected}.`);
        showSolution(formatTypedAnswer(rawAnswer, answer), state.expected);
    }
    updateStats();
    const nextPromptDelay = answer === expected ? 280 : 1100;
    window.setTimeout(() => {
        answerInput.value = "";
        answerInput.classList.remove("correct", "wrong");
        targetCharacter.classList.remove("correct", "wrong");
        pickPrompt();
        state.locked = false;
        answerInput.focus();
    }, nextPromptDelay);
}
function resetSession() {
    state.correct = 0;
    state.wrong = 0;
    state.streak = 0;
    state.remaining = 60;
    state.locked = false;
    answerInput.value = "";
    timer.textContent = formatTime(state.remaining);
    timerBlock.classList.remove("warning");
    updateStats();
    setFeedback("neutral", "Ready.");
    solutionPanel.hidden = true;
    pickPrompt();
    answerInput.focus();
}
function stopTimer(showResult = false) {
    window.clearInterval(state.timerId);
    state.timerId = undefined;
    state.mode = "freeplay";
    document.querySelectorAll(".mode-button[data-mode]").forEach((button) => {
        button.classList.toggle("active", button.dataset.mode === "freeplay");
    });
    if (showResult) {
        const total = state.correct + state.wrong;
        const percent = total === 0 ? 0 : Math.round((state.correct / total) * 100);
        resultSummary.textContent = "Your timed session is complete.";
        resultCorrect.textContent = `${state.correct} correct`;
        resultWrong.textContent = `${state.wrong} wrong`;
        resultAccuracy.textContent = `${percent}% accuracy`;
        resultDialog.showModal();
    }
}
function startTimedMode() {
    resetSession();
    state.mode = "timed";
    state.remaining = 60;
    timer.textContent = formatTime(state.remaining);
    state.timerId = window.setInterval(() => {
        state.remaining -= 1;
        timer.textContent = formatTime(state.remaining);
        timerBlock.classList.toggle("warning", state.remaining <= 10);
        if (state.remaining <= 0) {
            stopTimer(true);
        }
    }, 1000);
}
function setLanguage(languageKey) {
    state.language = languageKey;
    const language = currentLanguage();
    document.querySelectorAll(".language-button").forEach((button) => {
        const isActive = button.dataset.language === languageKey;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
    keyboardImage.src = language.image;
    keyboardImage.alt = `${language.name} keyboard layout`;
    referenceTitle.textContent = language.layoutName;
    document.body.dataset.language = languageKey;
    resetSession();
}
function toggleDirection() {
    state.direction = state.direction === "latin-to-cyrillic" ? "cyrillic-to-latin" : "latin-to-cyrillic";
    directionToggle.textContent = state.direction === "latin-to-cyrillic" ? "Latin to Cyrillic" : "Cyrillic to Latin";
    directionHint.innerHTML = `<strong>Current drill:</strong> ${directionToggle.textContent}.`;
    resetSession();
}
document.querySelectorAll(".language-button").forEach((button) => {
    button.addEventListener("click", () => {
        const language = button.dataset.language;
        if (language) {
            setLanguage(language);
        }
    });
});
document.querySelectorAll(".mode-button[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".mode-button[data-mode]").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        if (button.dataset.mode === "timed") {
            startTimedMode();
        }
        else {
            stopTimer(false);
            resetSession();
        }
    });
});
directionToggle.addEventListener("click", toggleDirection);
queryElement("#resetButton").addEventListener("click", resetSession);
answerInput.addEventListener("input", handleAnswer);
document.body.dataset.language = state.language;
resetSession();
