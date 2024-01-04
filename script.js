let correctCount = 0;
let incorrectCount = 0;

const russianCyrillics = [
    "А", "а", "Б", "б", "В", "в", "Г", "г", "Д", "д",
    "Е", "е", "Ё", "ё", "Ж", "ж", "З", "з", "И", "и",
    "Й", "й", "К", "к", "Л", "л", "М", "м", "Н", "н",
    "О", "о", "П", "п", "Р", "р", "С", "с", "Т", "т",
    "У", "у", "Ф", "ф", "Х", "х", "Ц", "ц", "Ч", "ч",
    "Ш", "ш", "Щ", "щ", "Ъ", "ъ", "Ы", "ы", "Ь", "ь"
];

const qwertzToRussian = {
    'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Z': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З',
    'A': 'Ф', 'S': 'Ы', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', 
    'Y': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', 
    'Ä': 'Э', 'Ö': 'Ж', 'Ü': 'Ю',
};

const ukrainianCyrillics = [
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
};

const wordDisplay = document.getElementById("wordDisplay");
const userInput = document.getElementById("userInput");
let correctCountEl = document.getElementById("correctCount");
let incorrectCountEl = document.getElementById("incorrectCount");
const correctCountLabel = document.getElementById("correctLabel")
const incorrectCountLabel = document.getElementById("incorrectLabel")
let feedback = document.getElementById("feedback");

function createReverseMapping(mapping) {
    let reverseMapping = {};
    for (let key in mapping) {
        let value = mapping[key.toUpperCase];
        reverseMapping[value] = key;
    }
    return reverseMapping;
}

const cyrillicToRussian = createReverseMapping(qwertzToRussian);
const cyrillicToUkrainian = createReverseMapping(qwertzToUkrainian)

let isLayoutSwapped = false;

function getRandomLetter() {
    let letter;

    if (currentLanguage === 'Russian') {
        letter = russianCyrillics[Math.floor(Math.random() * russianCyrillics.length)];
        if (isLayoutSwapped) {
            return cyrillicToRussian[letter] || letter; // Wende das Mapping an, falls vorhanden
        } else {
            return letter; // Gebe den ursprünglichen Buchstaben zurück, wenn das Layout nicht umgekehrt ist
        }
    } else if (currentLanguage === 'Ukrainian') {
        letter = ukrainianCyrillics[Math.floor(Math.random() * ukrainianCyrillics.length)];
        if (isLayoutSwapped) {
            return cyrillicToUkrainian[letter] || letter; // Wende das Mapping an, falls vorhanden
        } else {
            return letter; // Gebe den ursprünglichen Buchstaben zurück, wenn das Layout nicht umgekehrt ist
        }
    }
}

function displayNewLetter() {
    wordDisplay.innerText = getRandomLetter();
}

let currentLanguage = 'Russian';
let header = document.getElementById('headerTitle');

userInput.addEventListener('input', () => {
    userInput.disabled = true;
    
    let lastChar = userInput.value.slice(-1).toUpperCase();
    let cyrillicChar;
    if (currentLanguage === 'Russian') {
        cyrillicChar = qwertzToRussian[lastChar];
    } else if (currentLanguage === 'Ukrainian') {
        cyrillicChar = qwertzToUkrainian[lastChar];
    }

    if (cyrillicChar) {
        // Ersetze den letzten Buchstaben durch den entsprechenden kyrillischen Buchstaben
        userInput.value = userInput.value.slice(0, -1) + cyrillicChar;
    }

    console.log(userInput.value.toUpperCase() +" "+ wordDisplay.innerText.toUpperCase())
    if (userInput.value.toUpperCase() === wordDisplay.innerText.toUpperCase()) {
        correctInput();
    } else {
        wrongInput();
    }

    setTimeout(() => {
        userInput.value = '';
        userInput.style.backgroundColor = ""; // Setze Hintergrundfarbe zurück
    }, 300); // Verzögerung von 500 Millisekunden    
    displayNewLetter();
    unlockAndFocusTextbox();
});

function correctInput(){
    correctCount++;
    correctCountEl.textContent  = correctCount;
    feedback.innerText = "Correct!";
    feedback.style.color = "green";
    userInput.style.backgroundColor = "lightgreen";
    console.log('innertext: ' + correctCountEl.innerText);
    console.log('correct input! count: ' + correctCount);
}

function wrongInput(){
    incorrectCount++;
    incorrectCountEl.textContent   = incorrectCount;
    incorrectCountEl.color = "black";
    feedback.innerText = "Wrong!";
    feedback.style.color = "red";
    userInput.style.backgroundColor = "lightcoral"; 
    console.log('innertext: ' + incorrectCountEl.innerText);
    console.log('wrong input! count: ' + incorrectCount);
}


document.getElementById('russianLanguage').addEventListener('click', function() {
    console.log('user choosed russian layout');
    document.body.className = 'russian-background'; 
});

document.getElementById('ukrainianLanguage').addEventListener('click', function() {
    console.log('user choosed ukrainian layout')
    document.body.className = 'ukrainian-background'; // Setzt die Klasse auf ukrainische Farben
});


displayNewLetter();


document.getElementById('russianLanguage').addEventListener('click', function() {
    currentLanguage = 'Russian';
    header.textContent = 'Практикуйте свои навыки раскладки клавиатуры!';
    correctCountLabel.textContent  = 'правильные:';
    incorrectCountLabel.textContent  = 'неправильные:';
    unlockAndFocusTextbox();
});

document.getElementById('ukrainianLanguage').addEventListener('click', function() {
    currentLanguage = 'Ukrainian';
    header.textContent = 'Практикуйте свої навички клавіатури!';
    correctCountLabel.innerText = 'правильно:';
    incorrectCountLabel.innerText = 'неправильно:';
    unlockAndFocusTextbox();
});


document.getElementById('toggleLayout').addEventListener('click', function() {
    console.log('Layoutswapp is now: ' + !isLayoutSwapped);
    isLayoutSwapped = !isLayoutSwapped; // Wechselt den Status bei jedem Klick
    updateLayoutButtonLabel();
    displayNewLetter();
});

function updateLayoutButtonLabel() {
    document.getElementById('toggleLayout').textContent = isLayoutSwapped ? 'Latin Layout' : currentLanguage + " Layout";
}

updateLayoutButtonLabel();

function unlockAndFocusTextbox() {
    console.log('unlockAndFocusTextbox');
    var layoutInput = document.getElementById('toggleLayout');
    layoutInput.disabled = false;
    var textInput = document.getElementById('userInput');
    textInput.disabled = false; 
    textInput.focus();
}

    // Funktion, die aufgerufen wird, wenn ein Button geklickt wird
    function handleButtonClick(event) {
        // Alle Buttons holen
        var buttons = document.querySelectorAll('.game-button');

        // Entferne die 'active' Klasse von allen Buttons
        buttons.forEach(function(button) {
            button.classList.remove('active');
        });

        // Füge die 'active' Klasse zum geklickten Button hinzu
        event.currentTarget.classList.add('active');
    }

    // Event-Listener zu den Buttons hinzufügen
    document.addEventListener('DOMContentLoaded', (event) => {
        correctCountEl = document.getElementById("correctCount");
        incorrectCountEl = document.getElementById("incorrectCount");
        var buttons = document.querySelectorAll('.game-button');
        buttons.forEach(function(button) {
            button.addEventListener('click', handleButtonClick);
        });
    });


    var timerInterval; // Variable für das Timer-Intervall
    var isTimerRunning = false; // Zustandsvariable, um zu überprüfen, ob der Timer läuft
    
    function startTimer(duration, display, button) {
        if (isTimerRunning) {
            return; // Verhindert das Neustarten des Timers, wenn er bereits läuft
        }
    
        isTimerRunning = true;
        var timer = duration, minutes, seconds;
    
        timerInterval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--timer < 0) {
                clearInterval(timerInterval); 
                isTimerRunning = false; 
                display.textContent = "01:00";
            }
        }, 1000);
    }
    
    function resetTimer(display, button) {
        if (!isTimerRunning) {
            incorrectCount = 0;
            incorrectCountEl = 0;
            return; // Verhindert das Zurücksetzen des Timers, wenn er nicht läuft
        }
    
        clearInterval(timerInterval); // Stoppt den laufenden Timer
        isTimerRunning = false;
        display.textContent = "01:00"; // Setzt den Timer-Text zurück
        button.disabled = false; // Reaktiviert den Button
    }
    
    function handleButtonClick(event) {
        event.preventDefault();
        event.stopPropagation();
    
        var button = event.currentTarget;
        var display = document.querySelector('#timer');
    
        // Nur für den "1 minute mode" Button
        if (button.id === "oneMinuteMode") {
            // Startet oder resettet den Timer
            if (isTimerRunning) {
                console.log("Reset Timer");
                resetTimer(display, button);
            } else {
                console.log("Start Timer");
                startTimer(60, display, button);
            }
        } else {
            console.log("Freeplay Mode oder anderer Button geklickt");
            incorrectCount = 0;
            incorrectCountEl = 0;
            active
        }
    }
    
    // Event-Listener zu den Buttons hinzufügen
    document.addEventListener('DOMContentLoaded', function() {
        var buttons = document.querySelectorAll('.game-button');
        buttons.forEach(function(button) {
            button.addEventListener('click', handleButtonClick);
        });
    });