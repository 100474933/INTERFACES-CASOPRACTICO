// Función para mostrar/ocultar el menú de navegación
function MenuDesplegable() {
    const navMenu = document.querySelector(".nav-menu"); // Seleccionamos el menú por su clase
    navMenu.classList.toggle("hidden"); // Mostramos/ocultamos el menú
}

// Función para mostrar/ocultar los botones de autenticación
function UserMenuDesplegable() {
    const authButtons = document.querySelector(".auth-buttons"); // Seleccionamos el div de los botones
    authButtons.classList.toggle("hidden"); // Mostramos/ocultamos los botones
}

let loggedInUser = null; // Variable global para almacenar el usuario que inició sesión

// Lista de respuestas predefinidas de Papá Noel, ahora con el marcador para el nombre del usuario
const respuestasPapaNoel = [
    "¡Ho, ho, ho! Gracias por tu carta, {{nombre}}. Estoy seguro de que te encantará esta Navidad.",
    "He leído tu carta con mucho cariño, {{nombre}}. ¡Sigue siendo bueno este año!",
    "¡Qué deseos más maravillosos, {{nombre}}! Haré lo posible por cumplirlos.",
    "Gracias por escribirme, {{nombre}}. ¡Prepárate para una Navidad mágica!",
    "He recibido tu carta, {{nombre}}. Los elfos ya están trabajando en tus deseos.",
    "Estoy muy feliz de recibir tu carta, {{nombre}}. ¡Nos vemos pronto en Nochebuena!",
    "Recibí tu carta y estoy orgulloso de ti, {{nombre}}. ¡Sigue siendo tan increíble!",
    "Los regalos ya están en camino, {{nombre}}. ¡Espero que disfrutes mucho esta Navidad!",
    "Tu carta llegó justo a tiempo, {{nombre}}. ¡No olvides dejarme unas galletas!",
    "¡Qué lista de deseos tan especial, {{nombre}}! Trabajaré duro para hacerla realidad."
];

function toggleLoginForm() {
    document.getElementById("login-form").classList.toggle("hidden");
    document.getElementById("register-form").classList.add("hidden");
}

function toggleRegisterForm() {
    document.getElementById("register-form").classList.toggle("hidden");
    document.getElementById("login-form").classList.add("hidden");
}

// Función para ocultar los botones de autenticación
function hideAuthButtons() {
    const authButtons = document.querySelector(".auth-buttons");
    if (authButtons) {
        authButtons.classList.add("hidden");
    }
}

// Función para registrar al usuario
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value;
    const lastname = document.getElementById("register-lastname").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const repeatPassword = document.getElementById("register-repeat-password").value;
    const age = document.getElementById("register-age").value;
    const city = document.getElementById("register-city").value;
    const country = document.getElementById("register-country").value;

    if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        alert("El correo ya está registrado");
        return;
    }

    users.push({ name, lastname, email, password, age, city, country });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registro exitoso");

    document.getElementById("register-form").classList.add("hidden");
    hideAuthButtons();
}

// Función para iniciar sesión
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Bienvenido, ${user.name}`);
        loggedInUser = user; // Guardar el usuario que inició sesión
        document.getElementById("login-form").classList.add("hidden");
        hideAuthButtons();
    } else {
        alert("Correo o contraseña incorrectos");
    }
}

// Función para enviar carta
function enviarCarta(event) {
    event.preventDefault();

    if (!loggedInUser) {
        alert("Debe iniciar sesión para enviar una carta.");
        return;
    }

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    // Validación de que el nombre y correo coinciden
    if (nombre !== loggedInUser.name || email !== loggedInUser.email) {
        alert("El nombre y el correo electrónico deben coincidir con el usuario registrado.");
        return;
    }

    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;
    const carta = document.getElementById("carta").value;

    // Crear objeto de la carta
    const nuevaCarta = { ciudad, pais, carta };

    // Mostrar el mensaje de que Papá Noel está mandando su respuesta
    const esperaDiv = document.createElement("div");
    esperaDiv.innerHTML = "<p><strong>Papá Noel está mandando su respuesta...</strong></p>";
    document.getElementById("enviar-carta").appendChild(esperaDiv);

    // Seleccionar una respuesta aleatoria
    let respuesta = respuestasPapaNoel[Math.floor(Math.random() * respuestasPapaNoel.length)];

    // Reemplazar el marcador {{nombre}} por el nombre del usuario
    respuesta = respuesta.replace("{{nombre}}", loggedInUser.name);

    // Retrasar la respuesta de Papá Noel durante 5 segundos
    setTimeout(function() {
        // Eliminar mensaje de espera
        document.getElementById("enviar-carta").removeChild(esperaDiv);

        // Mostrar la respuesta de Papá Noel
        const respuestaDiv = document.createElement("div");
        respuestaDiv.innerHTML = `<p><strong>Respuesta de Papá Noel:</strong> ${respuesta}</p>`;
        document.getElementById("enviar-carta").appendChild(respuestaDiv);

        alert(`Carta enviada correctamente. ¡Gracias!\n\nRespuesta de Papá Noel: "${respuesta}"`);
    }, 5000); // Esperar 5 segundos antes de mostrar la respuesta

    // Limpiar el formulario
    document.getElementById("carta-form").reset();
}

// Funcionalidad del contador de tiempo
const countdownDate = new Date('2024-12-25T00:00:00').getTime();
const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.getElementById('contador').innerText = '¡Feliz Navidad!';
    }
}, 1000);

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


// Funcionalidad para arrastrar y soltar adornos sobre el árbol
const ornaments = document.querySelectorAll('.ornament');
const treeContainer = document.getElementById('tree-container');
const tree = document.getElementById('tree');

// Mantener un historial de los adornos colocados
let ornamentsHistory = [];  // Array para almacenar los adornos colocados

// Hacer los adornos arrastrables
ornaments.forEach(ornament => {
    ornament.addEventListener('dragstart', dragStart);
    ornament.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);  // Guardar el id del adorno arrastrado
    e.target.style.opacity = "0.4";  // Hacer que el adorno sea más transparente mientras se arrastra
}

function dragEnd(e) {
    e.target.style.opacity = "1";  // Restaurar la opacidad del adorno
}

// Permitir que los adornos sean soltados sobre el árbol
treeContainer.addEventListener('dragover', dragOver);
treeContainer.addEventListener('drop', drop);

function dragOver(e) {
    e.preventDefault(); // Permitir que el adorno se pueda soltar
}

function drop(e) {
    e.preventDefault();
    
    const ornamentId = e.dataTransfer.getData("text");
    const ornament = document.getElementById(ornamentId);

    // Crear un nuevo adorno en la posición donde el usuario suelta el objeto
    const newOrnament = document.createElement('div');
    newOrnament.textContent = ornament.textContent;
    newOrnament.style.position = 'absolute';
    newOrnament.style.left = `${e.offsetX - 15}px`;  // Ajustar la posición (centrar el adorno)
    newOrnament.style.top = `${e.offsetY - 15}px`;   // Ajustar la posición
    newOrnament.style.fontSize = '40px';

    treeContainer.appendChild(newOrnament); // Añadir el adorno al árbol

    // Guardar el adorno en el historial para poder deshacerlo
    ornamentsHistory.push(newOrnament);
}

// Funcionalidad para limpiar todos los adornos
document.getElementById('clear-button').addEventListener('click', function () {
    const allOrnaments = treeContainer.querySelectorAll('div');
    allOrnaments.forEach(ornament => {
        if (ornament !== tree) {  // Evitar eliminar el árbol de Navidad
            ornament.remove();
        }
    });
    ornamentsHistory = [];  // Limpiar el historial de adornos
});

// Funcionalidad para deshacer el último adorno colocado
document.getElementById('undo-button').addEventListener('click', function () {
    if (ornamentsHistory.length > 0) {
        const lastOrnament = ornamentsHistory.pop();  // Eliminar el último adorno del historial
        lastOrnament.remove();  // Eliminar el último adorno del árbol
    } else {
        alert('No hay adornos para deshacer.');
    }
});


