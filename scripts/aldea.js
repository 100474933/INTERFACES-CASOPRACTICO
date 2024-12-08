// Función para mostrar la descripción del lugar
function mostrarDescripcion(lugar) {
    let descripcion = "";

    // Asignar descripción según el lugar
    if (lugar === "casa") {
        descripcion = "¡Bienvenido a la Casa de Papá Noel! Aquí, Papá Noel se relaja entre sus viajes. Vive en una acogedora casita llena de decoraciones navideñas y mapas para planificar su gran noche. Este es el lugar donde recarga energías antes de la Navidad.";
    } else if (lugar === "taller") {
        descripcion = "¡Bienvenidos al Taller de Juguetes! Aquí, los elfos trabajan sin descanso, fabricando juguetes para todos los niños del mundo. Cada juguete es hecho a mano con mucho amor y cuidado, listo para ser entregado en Nochebuena.";
    } else if (lugar === "cartas") {
        descripcion = "¡Este es el lugar donde Papá Noel recibe todas las cartas de los niños! Cada carta es leída con atención por los ayudantes de Papá Noel, quienes le cuentan sobre los deseos y sueños de los niños. ¡Es un lugar lleno de magia y esperanza!";
    } else if (lugar === "elfos") {
        descripcion = "El Taller de los Elfos es donde se crean los juguetes mágicos. Los elfos, con su energía incansable, preparan todo lo necesario para la gran noche. Sin ellos, la Navidad no sería posible.";
    } else if (lugar === "mano_derecha") {
        descripcion = "La Mano Derecha de Papá Noel es un personaje muy especial que ayuda a Papá Noel a coordinar todos los preparativos para la Navidad. Siempre tiene una sonrisa en el rostro y una gran organización, lo que hace que todo funcione a la perfección.";
    } else if (lugar === "renos") {
        descripcion = "La zona de los Renos es donde estos animales mágicos descansan y se preparan para la gran noche. Cada uno tiene su propio carácter y habilidad para volar, y juntos forman el equipo de renos más famoso del mundo.";
    }

    // Mostrar el texto de la descripción en el popup
    document.getElementById('descripcion-texto').textContent = descripcion;

    // Mostrar el popup con la descripción
    document.getElementById('descripcion-popup').style.display = 'block';
}

// Añadir eventos para accesibilidad
document.querySelectorAll('.imagen-aldea').forEach(function(element) {
    element.addEventListener('click', function() {
        mostrarDescripcion(this.dataset.lugar);
    });
    element.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            mostrarDescripcion(this.dataset.lugar);
        }
    });
});

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('descripcion-popup').style.display = 'none';
}
