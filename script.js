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

const qwertzToCyrillic = {
    'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Z': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З',
    'A': 'Ф', 'S': 'Ы', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', 
    'Y': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', 
    'Ä': 'Э', 'Ö': 'Ж', 'Ü': 'Ю',
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0'
};

const ukrainischeBuchstaben = [
    "А", "а", "Б", "б", "В", "в", "Г", "г", "Ґ", "ґ",
    "Д", "д", "Е", "е", "Є", "є", "Ж", "ж", "З", "з",
    "И", "и", "І", "і", "Ї", "ї", "Й", "й", "К", "к",
    "Л", "л", "М", "м", "Н", "н", "О", "о", "П", "п",
    "Р", "р", "С", "с", "Т", "т", "У", "у", "Ф", "ф",
    "Х", "х", "Ц", "ц", "Ч", "ч", "Ш", "ш", "Щ", "щ",
    "Ь", "ь", "Ю", "ю", "Я", "я"
];

const qwertzToUkrainian = {
    'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Z': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З', 'Ü': 'Ж',
    'A': 'Ф', 'S': 'І', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', 'Ö': 'Ж', 'Ä': 'Є',
    'Y': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь',
    '1': '1', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7', '8': '8', '9': '9', '0': '0'
    // Füge weitere Tasten bei Bedarf hinzu
};

const wordDisplay = document.getElementById("wordDisplay");
const userInput = document.getElementById("userInput");
const correctCountEl = document.getElementById("correctCount");
const incorrectCountEl = document.getElementById("incorrectCount");
let correctCountLabel = document.getElementById("correctLabel")
let incorrectCountLabel = document.getElementById("incorrectLabel")
const feedback = document.getElementById("feedback");

function createReverseMapping(mapping) {
    let reverseMapping = {};
    for (let key in mapping) {
        let value = mapping[key];
        reverseMapping[value] = key;
    }
    return reverseMapping;
}

const cyrillicToQwertz = createReverseMapping(qwertzToCyrillic);

function getRandomLetter() {
    if (currentLanguage === 'Russian') {
        let letter = kyrillischeBuchstaben[Math.floor(Math.random() * kyrillischeBuchstaben.length)];
        return cyrillicToQwertz[letter] || letter; // Fallback auf den ursprünglichen Buchstaben, falls keine Zuordnung vorhanden ist
    } else if (currentLanguage === 'Ukrainian') {
        let letter = ukrainischeBuchstaben[Math.floor(Math.random() * ukrainischeBuchstaben.length)];
        return cyrillicToQwertz[letter] || letter; // Hier müssten Sie das gleiche für das ukrainische Layout tun
    }
}

function displayNewLetter() {
    wordDisplay.innerText = getRandomLetter();
}

let currentLanguage = 'Russian';
let header = document.getElementById('headerTitle');

userInput.addEventListener('input', () => {
    let lastChar = userInput.value.slice(-1).toUpperCase();
    let cyrillicChar;
    if (currentLanguage === 'Russian') {
        cyrillicChar = qwertzToCyrillic[lastChar];
    } else if (currentLanguage === 'Ukrainian') {
        cyrillicChar = qwertzToUkrainian[lastChar];
    }

    if (cyrillicChar) {
        // Ersetze den letzten Buchstaben durch den entsprechenden kyrillischen Buchstaben
        userInput.value = userInput.value.slice(0, -1) + cyrillicChar;
    }

    if (userInput.value.toUpperCase() === wordDisplay.innerText.toUpperCase()) {
        correctCount++;
        feedback.innerText = "Richtig!";
        feedback.style.color = "green";
        userInput.style.backgroundColor = "lightgreen"; // Grün bei richtiger Eingabe
    } else {
        incorrectCount++;
        feedback.innerText = "Falsch!";
        feedback.style.color = "red";
        userInput.style.backgroundColor = "lightcoral"; // Rot bei falscher Eingabe
    }
    correctCountEl.innerText = correctCount;
    incorrectCountEl.innerText = incorrectCount;

    // Setze das Eingabefeld nach kurzer Verzögerung zurück
    setTimeout(() => {
        userInput.value = '';
        userInput.style.backgroundColor = ""; // Setze Hintergrundfarbe zurück
    }, 500); // Verzögerung von 500 Millisekunden    
    displayNewLetter();
});


document.getElementById('russianLanguage').addEventListener('click', function() {
    document.body.className = 'russian-background'; // Setzt die Klasse auf russische Farben
});

document.getElementById('ukrainianLanguage').addEventListener('click', function() {
    document.body.className = 'ukrainian-background'; // Setzt die Klasse auf ukrainische Farben
});


displayNewLetter();


document.getElementById('russianLanguage').addEventListener('click', function() {
    currentLanguage = 'Russian';
    header.textContent = 'Практикуйте свои навыки раскладки клавиатуры!';
    correctCountLabel.textContent = 'правильные:';
    incorrectCountLabel.textContent = 'неправильные:';
    unlockAndFocusTextbox();
});

document.getElementById('ukrainianLanguage').addEventListener('click', function() {
    currentLanguage = 'Ukrainian';
    header.textContent = 'Практикуйте свої навички клавіатури!';
    correctCountLabel.textContent = 'правильно:';
    incorrectCountLabel.textContent = 'неправильно:';
    unlockAndFocusTextbox();
});


let isLayoutSwapped = false;

document.getElementById('toggleLayout').addEventListener('click', function() {
    isLayoutSwapped = !isLayoutSwapped; // Wechselt den Status bei jedem Klick
    updateLayoutButtonLabel();
    displayNewLetter();
});

function updateLayoutButtonLabel() {
    document.getElementById('toggleLayout').textContent = isLayoutSwapped ? 'German Layout' : currentLanguage + " Layout";
}

updateLayoutButtonLabel();

function unlockAndFocusTextbox() {
    var layoutInput = document.getElementById('toggleLayout');
    layoutInput.disabled = false;
    var textInput = document.getElementById('userInput');
    textInput.disabled = false; // Textbox entsperren
    textInput.focus(); // Fokus auf die Textbox setzen
}