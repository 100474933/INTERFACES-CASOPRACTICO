// Juego 1: Tres en Raya
function startTicTacToeGame(container) {
    container.innerHTML = `
        <h3>Tres en Raya</h3>
        <div id="ticTacToeBoard" style="display: grid; grid-template-columns: repeat(3, 100px); gap: 5px; margin: 20px auto;"></div>
        <p id="ticTacToeMessage">Tu turno.</p>
    `;

    const board = document.getElementById("ticTacToeBoard");
    const message = document.getElementById("ticTacToeMessage");
    const cells = Array(9).fill(null);
    let currentPlayer = "player"; // "player" o "machine"

    // Rutas de las imágenes
    const playerImage = "../imagenes/X.png"; // Imagen del jugador
    const machineImage = "../imagenes/O.png";  // Imagen de la máquina

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        for (const [a, b, c] of winningCombinations) {
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                return cells[a];
            }
        }
        return cells.includes(null) ? null : "Empate";
    }

function handleCellClick(index) {
    if (cells[index] || checkWinner()) return;
    cells[index] = playerImage; // El jugador coloca su imagen
    renderBoard();
    const winner = checkWinner();
    if (winner) {
        message.textContent = winner === "Empate" ? "¡Es un empate!" : `¡Ganador: ${winner === playerImage ? "Jugador" : "Máquina"}!`;
    } else {
        currentPlayer = "machine";
        message.textContent = "Turno de la máquina.";
        makeAIMove();
    }
}

function makeAIMove() {
    const availableCells = cells.map((v, i) => (v === null ? i : null)).filter(v => v !== null);

    if (availableCells.length === 0) return;

    setTimeout(() => {
        const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        cells[randomIndex] = machineImage; // La máquina coloca su imagen
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            message.textContent = winner === "Empate" ? "¡Es un empate!" : `¡Ganador: ${winner === playerImage ? "Jugador" : "Máquina"}!`;
        } else {
            currentPlayer = "player";
            message.textContent = "Tu turno.";
        }
    }, 2000); // Retraso de 2 segundos
}

function renderBoard() {
    board.innerHTML = "";
    cells.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.style.cssText = "width: 100px; height: 100px; border: 1px solid black; display: flex; justify-content: center; align-items: center; background-color: white;";

        if (value) {
            const img = document.createElement("img");
            img.src = value;
            img.style.width = "80%";
            img.style.height = "80%";
            cell.appendChild(img);
        } else {
            cell.addEventListener("click", () => handleCellClick(index));
        }

        board.appendChild(cell);
    });
}

renderBoard();
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




// Juego 3: Snake
function startSnakeGame(container) {
    container.innerHTML = `
        <h3>Snake</h3>
        <canvas id="snakeCanvas" width="400" height="400" style="border: 1px solid black;"></canvas>
        <p id="snakeScore">Puntuación: 0</p>
    `;

    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let score = 0;
    let snake = [{ x: 10 * box, y: 10 * box }];
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box,
    };
    let direction = null;

    document.addEventListener("keydown", event => {
        if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    });

    function drawGame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snake.forEach((segment, index) => {
            ctx.fillStyle = index === 0 ? "green" : "lightgreen";
            ctx.fillRect(segment.x, segment.y, box, box);
        });
        ctx.fillStyle = "red";
        ctx.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "UP") snakeY -= box;
        if (direction === "DOWN") snakeY += box;
        if (direction === "LEFT") snakeX -= box;
        if (direction === "RIGHT") snakeX += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            document.getElementById("snakeScore").textContent = `Puntuación: ${score}`;
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box,
            };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY };

        if (
            snakeX < 0 || snakeX >= canvas.width || 
            snakeY < 0 || snakeY >= canvas.height || 
            snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
        ) {
            alert("¡Game Over!");
            clearInterval(game);
        }

        snake.unshift(newHead);
    }

    const game = setInterval(drawGame, 100);
}

function startGame(game) {
    const gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = ""; // Limpiar el contenedor de juegos
    if (game === "ticTacToe") startTicTacToeGame(gameContainer);
    if (game === "snake") startSnakeGame(gameContainer);
    if (game === "clickCircle") startClickCircleGame(gameContainer);
}