// Función para mostrar/ocultar el menú de navegación
function MenuDesplegable() {
    const navMenu = document.querySelector(".nav-menu"); // Seleccionamos el menú por su clase
    navMenu.classList.toggle("hidden"); // Mostramos/ocultamos el menú
}

// Función para mostrar/ocultar el menú del usuario
function UserMenuDesplegable() {
    const userMenu = document.querySelector(".user-menu"); // Seleccionamos el menú del usuario
    userMenu.classList.toggle("hidden"); // Mostramos/ocultamos el menú del usuario
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

// Función para cerrar sesión
function logoutUser() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        loggedInUser = null;
        alert("Has cerrado sesión exitosamente.");
        document.querySelector(".auth-buttons").classList.remove("hidden");
        document.querySelector(".user-menu").classList.add("hidden");
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
