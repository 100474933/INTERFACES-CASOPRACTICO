
function startGame(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '';

    if (game === 'guessNumber') {
        startGuessNumberGame(gameContainer);
    } else if (game === 'clickCircle') {
        startClickCircleGame(gameContainer);
    } else if (game === 'countLetters') {
        startCountLettersGame(gameContainer);
    }
}

function startGuessNumberGame(container) {
    container.innerHTML = `
        <h3>Adivina el número</h3>
        <p>Estoy pensando en un número entre 1 y 100. ¡Intenta adivinarlo!</p>
        <input type="number" id="guessInput" placeholder="Escribe tu número">
        <button onclick="checkGuess()">Adivinar</button>
        <p id="guessResult"></p>
    `;

    let randomNumber = Math.floor(Math.random() * 100) + 1;

    window.checkGuess = function () {
        const guess = parseInt(document.getElementById('guessInput').value);
        const result = document.getElementById('guessResult');
        if (guess === randomNumber) {
            result.textContent = '¡Felicidades, adivinaste el número!';
        } else if (guess > randomNumber) {
            result.textContent = 'Demasiado alto. Intenta de nuevo.';
        } else {
            result.textContent = 'Demasiado bajo. Intenta de nuevo.';
        }
    };
}

// Juego de contar letras
function startCountLettersGame(container) {
    container.innerHTML = `
        <h3>Cuenta las letras</h3>
        <p>Te daré una palabra navideña, tienes que contar cuántas veces aparece una letra en ella.</p>
        <p id="word"></p>
        <input type="text" id="letterInput" placeholder="Escribe una letra">
        <button onclick="checkLetterCount()">Contar</button>
        <p id="letterResult"></p>
    `;

    const words = ["villancicos", "nieve", "renos", "papanoel", "arbol", "estrella", "regalos", "celebracion", "aguinaldo", "feliz"];
    let currentWordIndex = 0;

    const wordElement = document.getElementById('word');
    wordElement.textContent = `Palabra: ${words[currentWordIndex]}`;

    window.checkLetterCount = function () {
        const letter = document.getElementById('letterInput').value;
        const currentWord = words[currentWordIndex];

        const count = currentWord.split(letter).length - 1;
        const resultElement = document.getElementById('letterResult');
        resultElement.textContent = `La letra "${letter}" aparece ${count} veces en la palabra "${currentWord}".`;

        currentWordIndex++;
        if (currentWordIndex < words.length) {
            wordElement.textContent = `Palabra: ${words[currentWordIndex]}`;
        } else {
            wordElement.textContent = "¡Has terminado el juego!";
        }
    };
}
