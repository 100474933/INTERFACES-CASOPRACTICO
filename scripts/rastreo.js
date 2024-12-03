document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el mapa
    const mapa = L.map('mapa-rastreo').setView([51.505, -0.09], 2); // Ubicación inicial en el centro del mundo

    // Agregar el mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Crear un icono personalizado para Papá Noel
    const iconoPapaNoel = L.icon({
        iconUrl: 'imagenes/papanoelvolando.png',
        iconSize: [110, 110],
        iconAnchor: [55, 55],
        popupAnchor: [0, -50]
    });

    // Crear un marcador con el icono personalizado
    let marcador = L.marker([51.505, -0.09], { icon: iconoPapaNoel }).addTo(mapa);

    // Rutas simuladas (coordenadas de ejemplo para simular el movimiento)
    const ruta = [
        [51.505, -0.09],   // Londres
        [48.8566, 2.3522], // París
        [40.4168, -3.7038], // Madrid (España)
        [40.7128, -74.0060], // Nueva York
        [34.0522, -118.2437], // Los Ángeles
        [40.73061, -73.935242], // Brooklyn
        [35.6895, 139.6917], // Tokio
        [55.7558, 37.6173], // Moscú
        [39.9042, 116.4074], // Pekín
        [19.4326, -99.1332], // Ciudad de México
        [28.6139, 77.2090]  // Nueva Delhi
    ];

    // Mensajes en los idiomas correspondientes
    const nombresUbicaciones = [
        { lugar: 'Londres', mensaje: 'Hohoho, I am in London. I will be at your home soon! I hope you are being very good and helping a lot at home.' },
        { lugar: 'París', mensaje: 'Hohoho, je suis à Paris. Je serai bientôt chez toi ! J’espère que tu te comportes très bien et que tu aides beaucoup à la maison.' },
        { lugar: 'Madrid', mensaje: 'Hohoho, estoy en Madrid. ¡Ya me queda menos para ir a tu casa! Espero que te estés portando súper bien y ayudando mucho en casa.' },
        { lugar: 'Nueva York', mensaje: 'Hohoho, I am in New York. I will be at your home soon! I hope you are being very good and helping a lot at home.' },
        { lugar: 'Los Ángeles', mensaje: 'Hohoho, I am in Los Angeles. I will be at your home soon! I hope you are being very good and helping a lot at home.' },
        { lugar: 'Brooklyn', mensaje: 'Hohoho, I am in Brooklyn. I will be at your home soon! I hope you are being very good and helping a lot at home.' },
        { lugar: 'Tokio', mensaje: 'ホホホ、私は東京にいます。すぐにあなたの家に行きますよ！いい子にしていて、おうちをよく手伝っていることを願っています。' },
        { lugar: 'Moscú', mensaje: 'Хо-хо-хо, я в Москве. Я скоро буду у тебя дома! Надеюсь, ты ведешь себя хорошо и много помогаешь дома.' },
        { lugar: 'Pekín', mensaje: 'Hohoho, 我在北京。 我很快就会去你家！ 希望你表现得很好，在家里帮了很多忙。' },
        { lugar: 'Ciudad de México', mensaje: 'Hohoho, estoy en Ciudad de México. ¡Ya me queda menos para ir a tu casa! Espero que te estés portando súper bien y ayudando mucho en casa.' },
        { lugar: 'Nueva Delhi', mensaje: 'Hohoho, मैं नई दिल्ली में हूँ। मैं जल्द ही तुम्हारे घर आऊँगा! आशा है कि आप बहुत अच्छे होंगे और घर पर बहुत मदद कर रहे होंगे।' }
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

    // Botón para preguntar dónde está Santa
    const botonDondeEstaSanta = document.getElementById('boton-donde-esta-santa');
    const mensajeSanta = document.getElementById('mensaje-santa');

    botonDondeEstaSanta.addEventListener('click', function () {
        const ubicacionActual = nombresUbicaciones[indexRuta - 1] || nombresUbicaciones[0];
        mensajeSanta.textContent = ubicacionActual.mensaje; // Mostrar mensaje en el idioma correspondiente
    });
});
