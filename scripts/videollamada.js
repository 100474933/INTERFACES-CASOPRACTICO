document.addEventListener('DOMContentLoaded', function () {
    const botonLlamar = document.getElementById('boton-llamar');
    const botonColgar = document.getElementById('boton-colgar');
    const llamadaContainer = document.getElementById('llamada-container');
    const videoPapaNoel = document.getElementById('video-papa-noel');
    
    // Función para hacer la llamada
    botonLlamar.addEventListener('click', function() {
        // Ocultar el botón de llamar
        botonLlamar.style.display = 'none';
        
        // Mostrar el contenedor de la llamada con el video y el botón de colgar
        llamadaContainer.style.display = 'block';
        
        // Reproducir el video
        videoPapaNoel.play();
        
        // Mostrar el botón de colgar
        botonColgar.style.display = 'block';
    });
    
    // Función para colgar la llamada
    botonColgar.addEventListener('click', function() {
        // Detener el video
        videoPapaNoel.pause();
        videoPapaNoel.currentTime = 0; // Reiniciar el video
        
        // Ocultar el contenedor de la llamada
        llamadaContainer.style.display = 'none';
        
        // Mostrar nuevamente el botón de llamar
        botonLlamar.style.display = 'block';
        
        // Ocultar el botón de colgar
        botonColgar.style.display = 'none';
    });
});
