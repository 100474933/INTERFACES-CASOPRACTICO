
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
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Bienvenido, ${user.name}`);
        loggedInUser = user;
        document.getElementById("login-form").classList.add("hidden");
    } else {
        alert("Correo o contraseña incorrectos");
    }
}
