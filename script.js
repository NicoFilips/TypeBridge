let correctCount = 0;
let incorrectCount = 0;
const kyrillischeBuchstaben = [
    "А", "а", "Б", "б", "В", "в", "Г", "г", "Д", "д",
    "Е", "е", "Ё", "ё", "Ж", "ж", "З", "з", "И", "и",
    "Й", "й", "К", "к", "Л", "л", "М", "м", "Н", "н",
    "О", "о", "П", "п", "Р", "р", "С", "с", "Т", "т",
    "У", "у", "Ф", "ф", "Х", "х", "Ц", "ц", "Ч", "ч",
    "Ш", "ш", "Щ", "щ", "Ъ", "ъ", "Ы", "ы", "Ь", "ь"
];
const ukrainischeBuchstaben = [
    "А", "а", "Б", "б", "В", "в", "Г", "г", "Ґ", "ґ",
    "Д", "д", "Е", "е", "Є", "є", "Ж", "ж", "З", "з",
    "И", "и", "І", "і", "Ї", "ї", "Й", "й", "К", "к",
    "Л", "л", "М", "м", "Н", "н", "О", "о", "П", "п",
    "Р", "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф",
    "Х", "х", "Ц", "ц", "Ч", "ч", "Ш", "ш", "Щ", "щ",
    "Ь", "ь", "Ю", "ю", "Я", "я"
];
const wordDisplay = document.getElementById("wordDisplay");
const userInput = document.getElementById("userInput");
const correctCountEl = document.getElementById("correctCount");
const incorrectCountEl = document.getElementById("incorrectCount");
const feedback = document.getElementById("feedback");

function getRandomLetter() {
    return kyrillischeBuchstaben[Math.floor(Math.random() * kyrillischeBuchstaben.length)];
}

function displayNewLetter() {
    wordDisplay.innerText = getRandomLetter();
}

userInput.addEventListener('input', () => {
    if(userInput.value.toUpperCase() === wordDisplay.innerText) {
        correctCount++;
        feedback.innerText = "Richtig!";
        feedback.style.color = "green";
    } else {
        incorrectCount++;
        feedback.innerText = "Falsch!";
        feedback.style.color = "red";
    }
    correctCountEl.innerText = correctCount;
    incorrectCountEl.innerText = incorrectCount;
    userInput.value = '';
    displayNewLetter();
});

displayNewLetter();