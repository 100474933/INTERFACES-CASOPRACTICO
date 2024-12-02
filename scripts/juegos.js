// Función para iniciar un juego
function startGame(game) {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = ''; // Limpiar el contenedor de juegos

    if (game === 'guessNumber') {
        startGuessNumberGame(gameContainer);
    } else if (game === 'clickCircle') {
        startClickCircleGame(gameContainer);
    } else if (game === 'countLetters') {
        startCountLettersGame(gameContainer);
    }
}

// Juego 1: Adivina el número
function startGuessNumberGame(container) {
    container.innerHTML = `
        <h3>Adivina el número</h3>
        <p>Estoy pensando en un número entre 1 y 100. ¡Intenta adivinarlo!</p>
        <input type="number" id="guessInput" placeholder="Escribe tu número">
        <button onclick="checkGuess()">Adivinar</button>
        <p id="guessResult"></p>
    `;

    let randomNumber = Math.floor(Math.random() * 100) + 1;

    // Función para verificar el número
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

// Juego 3: Cuenta las letras
function startCountLettersGame(container) {
    container.innerHTML = `
        <h3>Cuenta las letras</h3>
        <p>Te daré una palabra navideña, tienes que contar cuántas veces aparece una letra en ella.</p>
        <p id="word"></p>
        <input type="text" id="letterInput" placeholder="Escribe una letra">
        <button onclick="checkLetterCount()">Contar</button>
        <p id="letterResult"></p>
        <p id="wordNumber">Palabra 1 de 10</p>
    `;

    // Lista de 10 palabras navideñas
    const words = ["villancicos", "nieve", "renos", "papanoel", "arbol", "estrella", "regalos", "celebracion", "aguinaldo", "feliz"];
    let currentWordIndex = 0;  // Para llevar el registro de la palabra actual

    const wordElement = document.getElementById('word');
    const wordNumberElement = document.getElementById('wordNumber');
    const resultElement = document.getElementById('letterResult');
    
    // Mostrar la primera palabra
    wordElement.textContent = `Palabra: ${words[currentWordIndex]}`;

    // Función para contar la letra
    window.checkLetterCount = function () {
        const letter = document.getElementById('letterInput').value;
        const currentWord = words[currentWordIndex];
        
        // Contar las ocurrencias de la letra
        const count = currentWord.split(letter).length - 1;
        
        // Mostrar el resultado
        resultElement.textContent = `La letra "${letter}" aparece ${count} veces en la palabra "${currentWord}".`;
        
        // Limpiar el campo de entrada
        document.getElementById('letterInput').value = '';

        // Pasar a la siguiente palabra
        currentWordIndex++;

        // Si hay más palabras, mostrar la siguiente
        if (currentWordIndex < words.length) {
            wordElement.textContent = `Palabra: ${words[currentWordIndex]}`;
            wordNumberElement.textContent = `Palabra ${currentWordIndex + 1} de 10`;
        } else {
            wordElement.textContent = "¡Has terminado el juego!";
            wordNumberElement.textContent = "¡Gracias por jugar!";
        }
    };
}
// Juego 2: Clic en la bola de Navidad
function startClickCircleGame(container) {
    container.innerHTML = `
        <h3>¡Haz clic en la bola de Navidad!</h3>
        <p>Haz clic en la bola de Navidad que aparece en la pantalla. ¡Intenta hacerlo antes de que se vaya!</p>
        <div id="gameArea" style="width: 600px; height: 400px; position: relative; background-color: #f0f0f0; overflow: hidden; margin: 0 auto; border: 2px solid black;">
            <img id="ball" src="../imagenes/bolanavidad.jpg" alt="Bola de Navidad" style="width: 50px; height: 50px; position: absolute; cursor: pointer;">
        </div>
        <p id="score">Puntuación: 0</p>
    `;

    let score = 0;
    const ball = document.getElementById('ball');
    const scoreElement = document.getElementById('score');
    const gameArea = document.getElementById('gameArea');

    // Mover la bola de Navidad a una nueva posición aleatoria dentro del área del juego
    function moveBall() {
        const x = Math.random() * (gameArea.offsetWidth - 50);  // 50 es el tamaño de la bola
        const y = Math.random() * (gameArea.offsetHeight - 50); // 50 es el tamaño de la bola
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
    }

    // Aumentar la puntuación y mover la bola al hacer clic
    ball.addEventListener('click', function () {
        score++;
        scoreElement.textContent = `Puntuación: ${score}`;
        moveBall();
    });

    // Mover la bola inicialmente
    moveBall();
}
