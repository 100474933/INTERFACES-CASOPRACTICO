document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el mapa
    const mapa = L.map('mapa-rastreo').setView([51.505, -0.09], 2); // Ubicación inicial en el centro del mundo

    // Agregar el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Crear un marcador (representa a Papá Noel)
    let marcador = L.marker([51.505, -0.09]).addTo(mapa); // Empezamos en Londres

    // Contador de tiempo
    let contadorSegundos = 0;
    const contadorElemento = document.getElementById('contador-rastreo');

    // Función para actualizar el contador
    function actualizarContador() {
        contadorSegundos++;
        contadorElemento.textContent = `Tiempo de recorrido: ${contadorSegundos} segundos`;
    }

    // Rutas simuladas (coordenadas de ejemplo para simular el movimiento)
    const ruta = [
        [51.505, -0.09],   // Londres
        [48.8566, 2.3522], // París
        [40.7128, -74.0060], // Nueva York
        [34.0522, -118.2437], // Los Angeles
        [40.73061, -73.935242], // Brooklyn
    ];

    let indexRuta = 0;

    // Función para mover el marcador de un punto a otro
    function moverMarcador() {
        if (indexRuta < ruta.length) {
            marcador.setLatLng(ruta[indexRuta]); // Mover el marcador
            mapa.panTo(ruta[indexRuta]); // Centrar el mapa en el nuevo punto
            indexRuta++;
        } else {
            // Cuando la ruta haya terminado, reiniciamos
            indexRuta = 0;
        }
    }

    // Actualizar el contador cada segundo
    setInterval(actualizarContador, 1000); // Cada segundo se incrementa el contador

    // Mover el marcador a intervalos (simula el movimiento de Papá Noel)
    setInterval(moverMarcador, 5000); // Mueve el marcador cada 5 segundos

});
