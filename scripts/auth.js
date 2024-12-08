document.addEventListener('DOMContentLoaded', () => {
    // Menú desplegable
    const menuToggle = document.querySelector('.icono-menu');
    const menu = document.querySelector('.menu');
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('open');
    });

    // Menú de usuario
    const userIcon = document.getElementById('user-icon');
    const userMenu = document.getElementById('user-menu');
    userIcon.addEventListener('click', () => {
        userMenu.classList.toggle('open');
    });

    // Si hay usuario logueado, mostrar su nombre
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('user-name').textContent = `Hola, ${userName}`;
        document.getElementById('user-name').classList.remove('hidden');
        document.getElementById('login-link').classList.add('hidden');
        document.getElementById('register-link').classList.add('hidden');
        document.getElementById('logout-link').classList.remove('hidden');
    } else {
        document.getElementById('login-link').classList.remove('hidden');
        document.getElementById('register-link').classList.remove('hidden');
        document.getElementById('logout-link').classList.add('hidden');
    }
});

// Función para mostrar el formulario de inicio de sesión
function showLoginForm() {
    document.getElementById('login-form').classList.add('visible');
    document.getElementById('login-form').classList.remove('hidden');
}

// Función para cerrar el formulario de inicio de sesión
function closeLoginForm() {
    document.getElementById('login-form').classList.remove('visible');
    document.getElementById('login-form').classList.add('hidden');
}

// Función para mostrar el formulario de registro
function showRegisterForm() {
    document.getElementById('register-form').classList.add('visible');
    document.getElementById('register-form').classList.remove('hidden');
}

// Función para cerrar el formulario de registro
function closeRegisterForm() {
    document.getElementById('register-form').classList.remove('visible');
    document.getElementById('register-form').classList.add('hidden');
}

// Función de inicio de sesión
function loginUser(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Verificar las credenciales (esto puede ser más complejo en una aplicación real)
    const storedUser = localStorage.getItem('users');
    if (storedUser) {
        const users = JSON.parse(storedUser);
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            // Guardar nombre del usuario en localStorage
            localStorage.setItem('userName', user.name);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            document.getElementById('user-name').textContent = `Hola, ${user.name}`;
            document.getElementById('user-name').classList.remove('hidden');
            document.getElementById('login-link').classList.add('hidden');
            document.getElementById('register-link').classList.add('hidden');
            document.getElementById('logout-link').classList.remove('hidden');

            closeLoginForm();
        } else {
            alert("Credenciales incorrectas");
        }
    } else {
        alert("No hay usuarios registrados");
    }
}

// Función de registro
function registerUser(event) {
    event.preventDefault();

    // Obtener datos del formulario
    const name = document.getElementById('register-name').value;
    const lastname = document.getElementById('register-lastname').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const repeatPassword = document.getElementById('register-repeat-password').value;
    const age = document.getElementById('register-age').value;
    const city = document.getElementById('register-city').value;
    const country = document.getElementById('register-country').value;

    // Verificar si las contraseñas coinciden
    if (password !== repeatPassword) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Crear objeto de usuario
    const newUser = {
        name: name,
        lastname: lastname,
        email: email,
        password: password,
        age: age,
        city: city,
        country: country
    };

    // Obtener lista de usuarios
    let users = localStorage.getItem('users');
    users = users ? JSON.parse(users) : [];

    // Agregar el nuevo usuario
    users.push(newUser);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Cerrar el formulario de registro
    closeRegisterForm();

    // Mostrar el formulario de inicio de sesión
    showLoginForm();
}

// Función para cerrar sesión
function logoutUser() {
    // Eliminar el nombre de usuario de localStorage
    localStorage.removeItem('userName');
    document.getElementById('user-name').classList.add('hidden');
    document.getElementById('login-link').classList.remove('hidden');
    document.getElementById('register-link').classList.remove('hidden');
    document.getElementById('logout-link').classList.add('hidden');
}


/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

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
function enviarCarta(event) {
    event.preventDefault();

    // Obtener el usuario logueado desde localStorage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userName = localStorage.getItem('userName');
    
    // Verificar si el usuario está logueado
    if (!loggedInUser || !userName) {
        alert("Debe iniciar sesión para enviar una carta.");
        return;
    }

    // Aquí ya puedes acceder al nombre del usuario desde `userName`
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;

    // Validación de que el nombre y correo coinciden
    if (email !== loggedInUser.email) {
        alert("El correo electrónico debe coincidir con el usuario registrado.");
        return;
    }

    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;
    const carta = document.getElementById("carta").value;

    let cartas = localStorage.getItem('cartas');
    cartas = cartas ? JSON.parse(cartas) : [];
    const nuevaCarta = { nombre, email, ciudad, pais, carta };
    cartas.push(nuevaCarta);
    localStorage.setItem('cartas', JSON.stringify(cartas));

    // Mostrar el mensaje de que Papá Noel está mandando su respuesta
    const esperaDiv = document.createElement("div");
    esperaDiv.innerHTML = "<p><strong>Papá Noel está mandando su respuesta...</strong></p>";
    document.getElementById("enviar-carta").appendChild(esperaDiv);

    // Seleccionar una respuesta aleatoria
    let respuesta = respuestasPapaNoel[Math.floor(Math.random() * respuestasPapaNoel.length)];

    // Reemplazar el marcador {{nombre}} por el nombre del usuario
    respuesta = respuesta.replace("{{nombre}}", userName);

    // Retrasar la respuesta de Papá Noel durante 5 segundos
    setTimeout(function() {
        // Eliminar mensaje de espera
        document.getElementById("enviar-carta").removeChild(esperaDiv);

        // Mostrar la respuesta de Papá Noel en la página
        const respuestaDiv = document.createElement("div");
        respuestaDiv.innerHTML = `<p><strong>Respuesta de Papá Noel:</strong> ${respuesta}</p>`;
        document.getElementById("enviar-carta").appendChild(respuestaDiv);

        alert(`Carta enviada correctamente. ¡Gracias!\n\nRespuesta de Papá Noel: "${respuesta}"`);
    }, 5000); // Esperar 5 segundos antes de mostrar la respuesta

    // Limpiar el formulario
    document.getElementById("carta-form").reset();
}
