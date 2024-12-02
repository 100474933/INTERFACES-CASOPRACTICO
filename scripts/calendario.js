document.addEventListener('DOMContentLoaded', function () {
    const calendario = document.getElementById('ventanas-calendario');
    
    // Lista de las imágenes disponibles (asegúrate de que las rutas sean correctas)
    const imagenes = [
        'imagenes/regalo-dia1.gif', 
        'imagenes/regalo-dia2.gif', 
        'imagenes/regalo-dia3.gif'  
    ];

    // Crear las 24 ventanas del calendario
    for (let i = 1; i <= 24; i++) {
        const ventana = document.createElement('div');
        ventana.classList.add('ventana');
        ventana.innerText = i; 
        ventana.setAttribute('data-dia', i);

        const contenido = document.createElement('div');
        contenido.classList.add('contenido');

        // Crear la imagen y agregarla al contenido
        const imagen = document.createElement('img');
        imagen.classList.add('imagen');

        // Elegir una imagen aleatoria de la lista
        const imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
        imagen.src = imagenAleatoria; 
        imagen.alt = `Sorpresa del día ${i}`;

        contenido.appendChild(imagen); 
        contenido.style.display = 'none';

        ventana.appendChild(contenido);

        // Añadir el evento de clic para abrir la ventana
        ventana.addEventListener('click', function () {
            if (!ventana.classList.contains('abierta')) {
                ventana.classList.add('abierta');
                contenido.style.display = 'block'; 

                // Mostrar la imagen durante 10 segundos
                imagen.style.display = 'block'; 
                setTimeout(function() {
                    imagen.style.display = 'none'; 
                }, 10000); 
            }
        });
        calendario.appendChild(ventana);
    }
});
