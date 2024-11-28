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
