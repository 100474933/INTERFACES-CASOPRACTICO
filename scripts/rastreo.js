document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el mapa
    const mapa = L.map('mapa-rastreo').setView([51.505, -0.09], 2); // Ubicación inicial en el centro del mundo

    // Agregar el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Crear un marcador (representa a Papá Noel)
    let marcador = L.marker([51.505, -0.09]).addTo(mapa); // Empezamos en Londres

    // Rutas simuladas (coordenadas de ejemplo para simular el movimiento)
    const ruta = [
        [51.505, -0.09],   // Londres
        [48.8566, 2.3522], // París
        [40.7128, -74.0060], // Nueva York
        [34.0522, -118.2437], // Los Angeles
        [40.73061, -73.935242], // Brooklyn
        [35.6895, 139.6917], // Tokio
        [55.7558, 37.6173], // Moscú
        [39.9042, 116.4074], // Pekín
        [19.4326, -99.1332], // Ciudad de México
        [28.6139, 77.2090] // Nueva Delhi
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

    // Mover el marcador a intervalos (simula el movimiento de Papá Noel)
    setInterval(moverMarcador, 5000); // Mueve el marcador cada 5 segundos

});
