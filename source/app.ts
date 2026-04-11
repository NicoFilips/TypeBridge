type LanguageKey = "russian" | "ukrainian" | "belarusian";
type PracticeDirection = "latin-to-cyrillic" | "cyrillic-to-latin";
type PracticeMode = "freeplay" | "timed";
type FeedbackType = "neutral" | "correct" | "wrong";

type LanguageConfig = {
  name: string;
  layoutName: string;
  image: string;
  map: Record<string, string>;
};

type AppState = {
  language: LanguageKey;
  direction: PracticeDirection;
  mode: PracticeMode;
  target: string;
  expected: string;
  correct: number;
  wrong: number;
  streak: number;
  timerId: number | undefined;
  remaining: number;
  locked: boolean;
};

const languages: Record<LanguageKey, LanguageConfig> = {
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

const state: AppState = {
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

function queryElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);

  if (!element) {
    throw new Error(`Missing required element: ${selector}`);
  }

  return element;
}

const targetCharacter = queryElement<HTMLDivElement>("#targetCharacter");
const answerInput = queryElement<HTMLInputElement>("#answerInput");
const feedback = queryElement<HTMLParagraphElement>("#feedback");
const correctCount = queryElement<HTMLSpanElement>("#correctCount");
const wrongCount = queryElement<HTMLSpanElement>("#wrongCount");
const accuracy = queryElement<HTMLSpanElement>("#accuracy");
const streak = queryElement<HTMLSpanElement>("#streak");
const timer = queryElement<HTMLSpanElement>("#timer");
const timerBlock = queryElement<HTMLDivElement>(".timer-block");
const keyboardImage = queryElement<HTMLImageElement>("#keyboardImage");
const referenceTitle = queryElement<HTMLHeadingElement>("#referenceTitle");
const instructionText = queryElement<HTMLParagraphElement>("#instructionText");
const directionToggle = queryElement<HTMLButtonElement>("#directionToggle");
const directionHint = queryElement<HTMLParagraphElement>("#directionHint");
const solutionPanel = queryElement<HTMLDivElement>("#solutionPanel");
const typedAnswer = queryElement<HTMLElement>("#typedAnswer");
const correctAnswer = queryElement<HTMLElement>("#correctAnswer");
const resultDialog = queryElement<HTMLDialogElement>("#resultDialog");
const resultSummary = queryElement<HTMLParagraphElement>("#resultSummary");
const resultCorrect = queryElement<HTMLSpanElement>("#resultCorrect");
const resultWrong = queryElement<HTMLSpanElement>("#resultWrong");
const resultAccuracy = queryElement<HTMLSpanElement>("#resultAccuracy");

function reverseMap(map: Record<string, string>): Record<string, string> {
  return Object.fromEntries(Object.entries(map).map(([latin, cyrillic]) => [cyrillic, latin]));
}

function mappedCharacters(map: Record<string, string>): string[] {
  return [...new Set(Object.values(map))];
}

function currentLanguage(): LanguageConfig {
  return languages[state.language];
}

function formatTime(seconds: number): string {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const rest = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${rest}`;
}

function pickPrompt(): void {
  const language = currentLanguage();
  const reverse = reverseMap(language.map);
  const characters = mappedCharacters(language.map);
  const cyrillic = characters[Math.floor(Math.random() * characters.length)];

  if (state.direction === "latin-to-cyrillic") {
    state.target = cyrillic;
    state.expected = cyrillic;
    instructionText.textContent = "Type the matching Cyrillic key.";
  } else {
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

function normalizeAnswer(value: string): string {
  const character = value.trim().slice(-1).toUpperCase();
  if (!character) return "";

  if (state.direction === "latin-to-cyrillic") {
    return currentLanguage().map[character] ?? character;
  }

  return character;
}

function formatTypedAnswer(rawAnswer: string, normalizedAnswer: string): string {
  if (!rawAnswer) return "-";
  if (rawAnswer !== normalizedAnswer) {
    return `${rawAnswer} -> ${normalizedAnswer}`;
  }
  return rawAnswer;
}

function updateStats(): void {
  const total = state.correct + state.wrong;
  const accuracyValue = total === 0 ? 100 : Math.round((state.correct / total) * 100);
  correctCount.textContent = String(state.correct);
  wrongCount.textContent = String(state.wrong);
  accuracy.textContent = `${accuracyValue}%`;
  streak.textContent = String(state.streak);
}

function setFeedback(type: FeedbackType, text: string): void {
  feedback.className = `feedback ${type}`;
  feedback.textContent = text;
  answerInput.classList.remove("correct", "wrong");
  targetCharacter.classList.remove("correct", "wrong");
  if (type === "correct" || type === "wrong") {
    answerInput.classList.add(type);
    targetCharacter.classList.add(type);
  }
}

function showSolution(answer: string, expected: string): void {
  typedAnswer.textContent = answer || "-";
  correctAnswer.textContent = expected;
  solutionPanel.hidden = false;
}

function handleAnswer(): void {
  if (state.locked) return;

  const rawAnswer = answerInput.value.trim().slice(-1).toUpperCase();
  const answer = normalizeAnswer(answerInput.value);
  if (!answer) return;

  state.locked = true;
  const expected = state.expected.toUpperCase();

  if (answer === expected) {
    state.correct += 1;
    state.streak += 1;
    setFeedback("correct", `Correct: ${state.target} = ${state.expected}`);
  } else {
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

function resetSession(): void {
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

function stopTimer(showResult = false): void {
  window.clearInterval(state.timerId);
  state.timerId = undefined;
  state.mode = "freeplay";
  document.querySelectorAll<HTMLButtonElement>(".mode-button[data-mode]").forEach((button) => {
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

function startTimedMode(): void {
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

function setLanguage(languageKey: LanguageKey): void {
  state.language = languageKey;
  const language = currentLanguage();

  document.querySelectorAll<HTMLButtonElement>(".language-button").forEach((button) => {
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

function toggleDirection(): void {
  state.direction = state.direction === "latin-to-cyrillic" ? "cyrillic-to-latin" : "latin-to-cyrillic";
  directionToggle.textContent = state.direction === "latin-to-cyrillic" ? "Latin to Cyrillic" : "Cyrillic to Latin";
  directionHint.innerHTML = `<strong>Current drill:</strong> ${directionToggle.textContent}.`;
  resetSession();
}

document.querySelectorAll<HTMLButtonElement>(".language-button").forEach((button) => {
  button.addEventListener("click", () => {
    const language = button.dataset.language as LanguageKey | undefined;
    if (language) {
      setLanguage(language);
    }
  });
});

document.querySelectorAll<HTMLButtonElement>(".mode-button[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll<HTMLButtonElement>(".mode-button[data-mode]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    if (button.dataset.mode === "timed") {
      startTimedMode();
    } else {
      stopTimer(false);
      resetSession();
    }
  });
});

directionToggle.addEventListener("click", toggleDirection);
queryElement<HTMLButtonElement>("#resetButton").addEventListener("click", resetSession);
answerInput.addEventListener("input", handleAnswer);

document.body.dataset.language = state.language;
resetSession();
