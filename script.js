"use strict";
const languages = {
    russian: {
        name: "Russian",
        layoutName: "Russian layout",
        image: "src/KB_Russian.png",
        keys: [
            { code: "Backquote", label: "^", cyrillic: "Ё" },
            { code: "KeyQ", label: "Q", cyrillic: "Й" },
            { code: "KeyW", label: "W", cyrillic: "Ц" },
            { code: "KeyE", label: "E", cyrillic: "У" },
            { code: "KeyR", label: "R", cyrillic: "К" },
            { code: "KeyT", label: "T", cyrillic: "Е" },
            { code: "KeyY", label: "Z", cyrillic: "Н" },
            { code: "KeyU", label: "U", cyrillic: "Г" },
            { code: "KeyI", label: "I", cyrillic: "Ш" },
            { code: "KeyO", label: "O", cyrillic: "Щ" },
            { code: "KeyP", label: "P", cyrillic: "З" },
            { code: "BracketLeft", label: "Ü", cyrillic: "Х" },
            { code: "BracketRight", label: "+", cyrillic: "Ъ" },
            { code: "KeyA", label: "A", cyrillic: "Ф" },
            { code: "KeyS", label: "S", cyrillic: "Ы" },
            { code: "KeyD", label: "D", cyrillic: "В" },
            { code: "KeyF", label: "F", cyrillic: "А" },
            { code: "KeyG", label: "G", cyrillic: "П" },
            { code: "KeyH", label: "H", cyrillic: "Р" },
            { code: "KeyJ", label: "J", cyrillic: "О" },
            { code: "KeyK", label: "K", cyrillic: "Л" },
            { code: "KeyL", label: "L", cyrillic: "Д" },
            { code: "Semicolon", label: "Ö", cyrillic: "Ж" },
            { code: "Quote", label: "Ä", cyrillic: "Э" },
            { code: "KeyZ", label: "Y", cyrillic: "Я" },
            { code: "KeyX", label: "X", cyrillic: "Ч" },
            { code: "KeyC", label: "C", cyrillic: "С" },
            { code: "KeyV", label: "V", cyrillic: "М" },
            { code: "KeyB", label: "B", cyrillic: "И" },
            { code: "KeyN", label: "N", cyrillic: "Т" },
            { code: "KeyM", label: "M", cyrillic: "Ь" },
            { code: "Comma", label: ",", cyrillic: "Б" },
            { code: "Period", label: ".", cyrillic: "Ю" }
        ]
    },
    ukrainian: {
        name: "Ukrainian",
        layoutName: "Ukrainian layout",
        image: "src/KB_Ukrainian.PNG",
        keys: [
            { code: "Backquote", label: "^", cyrillic: "Ґ" },
            { code: "KeyQ", label: "Q", cyrillic: "Й" },
            { code: "KeyW", label: "W", cyrillic: "Ц" },
            { code: "KeyE", label: "E", cyrillic: "У" },
            { code: "KeyR", label: "R", cyrillic: "К" },
            { code: "KeyT", label: "T", cyrillic: "Е" },
            { code: "KeyY", label: "Z", cyrillic: "Н" },
            { code: "KeyU", label: "U", cyrillic: "Г" },
            { code: "KeyI", label: "I", cyrillic: "Ш" },
            { code: "KeyO", label: "O", cyrillic: "Щ" },
            { code: "KeyP", label: "P", cyrillic: "З" },
            { code: "BracketLeft", label: "Ü", cyrillic: "Х" },
            { code: "BracketRight", label: "+", cyrillic: "Ї" },
            { code: "KeyA", label: "A", cyrillic: "Ф" },
            { code: "KeyS", label: "S", cyrillic: "І" },
            { code: "KeyD", label: "D", cyrillic: "В" },
            { code: "KeyF", label: "F", cyrillic: "А" },
            { code: "KeyG", label: "G", cyrillic: "П" },
            { code: "KeyH", label: "H", cyrillic: "Р" },
            { code: "KeyJ", label: "J", cyrillic: "О" },
            { code: "KeyK", label: "K", cyrillic: "Л" },
            { code: "KeyL", label: "L", cyrillic: "Д" },
            { code: "Semicolon", label: "Ö", cyrillic: "Ж" },
            { code: "Quote", label: "Ä", cyrillic: "Є" },
            { code: "KeyZ", label: "Y", cyrillic: "Я" },
            { code: "KeyX", label: "X", cyrillic: "Ч" },
            { code: "KeyC", label: "C", cyrillic: "С" },
            { code: "KeyV", label: "V", cyrillic: "М" },
            { code: "KeyB", label: "B", cyrillic: "И" },
            { code: "KeyN", label: "N", cyrillic: "Т" },
            { code: "KeyM", label: "M", cyrillic: "Ь" },
            { code: "Comma", label: ",", cyrillic: "Б" },
            { code: "Period", label: ".", cyrillic: "Ю" }
        ]
    },
    belarusian: {
        name: "Belarusian",
        layoutName: "Belarusian layout",
        image: "src/KB_Belarusian.png",
        keys: [
            { code: "Backquote", label: "^", cyrillic: "Ё" },
            { code: "KeyQ", label: "Q", cyrillic: "Й" },
            { code: "KeyW", label: "W", cyrillic: "Ц" },
            { code: "KeyE", label: "E", cyrillic: "У" },
            { code: "KeyR", label: "R", cyrillic: "К" },
            { code: "KeyT", label: "T", cyrillic: "Е" },
            { code: "KeyY", label: "Z", cyrillic: "Н" },
            { code: "KeyU", label: "U", cyrillic: "Г" },
            { code: "KeyI", label: "I", cyrillic: "Ш" },
            { code: "KeyO", label: "O", cyrillic: "Ў" },
            { code: "KeyP", label: "P", cyrillic: "З" },
            { code: "BracketLeft", label: "Ü", cyrillic: "Х" },
            { code: "KeyA", label: "A", cyrillic: "Ф" },
            { code: "KeyS", label: "S", cyrillic: "Ы" },
            { code: "KeyD", label: "D", cyrillic: "В" },
            { code: "KeyF", label: "F", cyrillic: "А" },
            { code: "KeyG", label: "G", cyrillic: "П" },
            { code: "KeyH", label: "H", cyrillic: "Р" },
            { code: "KeyJ", label: "J", cyrillic: "О" },
            { code: "KeyK", label: "K", cyrillic: "Л" },
            { code: "KeyL", label: "L", cyrillic: "Д" },
            { code: "Semicolon", label: "Ö", cyrillic: "Ж" },
            { code: "Quote", label: "Ä", cyrillic: "Э" },
            { code: "KeyZ", label: "Y", cyrillic: "Я" },
            { code: "KeyX", label: "X", cyrillic: "Ч" },
            { code: "KeyC", label: "C", cyrillic: "С" },
            { code: "KeyV", label: "V", cyrillic: "М" },
            { code: "KeyB", label: "B", cyrillic: "І" },
            { code: "KeyN", label: "N", cyrillic: "Т" },
            { code: "KeyM", label: "M", cyrillic: "Ь" },
            { code: "Comma", label: ",", cyrillic: "Б" },
            { code: "Period", label: ".", cyrillic: "Ю" }
        ]
    }
};
const state = {
    language: "russian",
    direction: "latin-to-cyrillic",
    mode: "freeplay",
    target: "",
    expected: "",
    expectedCode: "",
    expectedLabel: "",
    expectedCyrillic: "",
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
function currentLanguage() {
    return languages[state.language];
}
function currentKeys() {
    return currentLanguage().keys;
}
function formatTime(seconds) {
    const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
    const rest = String(seconds % 60).padStart(2, "0");
    return `${minutes}:${rest}`;
}
function pickPrompt() {
    const keys = currentKeys();
    const entry = keys[Math.floor(Math.random() * keys.length)];
    if (state.direction === "latin-to-cyrillic") {
        state.target = entry.cyrillic;
        state.expected = entry.cyrillic;
        instructionText.textContent = "Press the German QWERTZ key that produces this Cyrillic letter.";
    }
    else {
        state.target = entry.cyrillic;
        state.expected = entry.label;
        instructionText.textContent = "Name the German QWERTZ key for this Cyrillic letter.";
    }
    state.expectedCode = entry.code;
    state.expectedLabel = entry.label;
    state.expectedCyrillic = entry.cyrillic;
    targetCharacter.textContent = state.target;
    solutionPanel.hidden = true;
}
function keyByCode(code) {
    return currentKeys().find((entry) => entry.code === code);
}
function keyByLabel(label) {
    return currentKeys().find((entry) => entry.label === label.toUpperCase());
}
function solutionText(entry = {
    code: state.expectedCode,
    label: state.expectedLabel,
    cyrillic: state.expectedCyrillic
}) {
    return `${entry.label} -> ${entry.cyrillic}`;
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
function scoreAttempt(entry, fallbackLabel) {
    if (state.locked)
        return;
    if (!entry && !fallbackLabel)
        return;
    state.locked = true;
    const isCorrect = entry?.code === state.expectedCode;
    const answerLabel = entry ? solutionText(entry) : fallbackLabel;
    const expectedLabel = solutionText();
    if (isCorrect) {
        state.correct += 1;
        state.streak += 1;
        setFeedback("correct", `Correct: ${expectedLabel}`);
    }
    else {
        state.wrong += 1;
        state.streak = 0;
        setFeedback("wrong", `Wrong. The solution was ${expectedLabel}.`);
        showSolution(answerLabel, expectedLabel);
    }
    updateStats();
    const nextPromptDelay = isCorrect ? 280 : 1300;
    window.setTimeout(() => {
        answerInput.value = "";
        answerInput.classList.remove("correct", "wrong");
        targetCharacter.classList.remove("correct", "wrong");
        pickPrompt();
        state.locked = false;
        answerInput.focus();
    }, nextPromptDelay);
}
function handleKeydown(event) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing)
        return;
    const entry = keyByCode(event.code);
    if (!entry && event.key.length !== 1)
        return;
    event.preventDefault();
    answerInput.value = entry?.label ?? event.key.toUpperCase();
    scoreAttempt(entry, event.key.toUpperCase());
}
function handleTextInput() {
    if (state.locked)
        return;
    const rawAnswer = answerInput.value.trim().slice(-1).toUpperCase();
    const entry = keyByLabel(rawAnswer);
    scoreAttempt(entry, rawAnswer);
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
answerInput.addEventListener("keydown", handleKeydown);
answerInput.addEventListener("input", handleTextInput);
document.body.dataset.language = state.language;
resetSession();
