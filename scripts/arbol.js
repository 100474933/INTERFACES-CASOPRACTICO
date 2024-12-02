// Funcionalidad para arrastrar y soltar adornos sobre el árbol
const ornaments = document.querySelectorAll('.ornament');
const treeContainer = document.getElementById('tree-container');
const tree = document.getElementById('tree');

// Mantener un historial de los adornos colocados
let ornamentsHistory = [];  // Array para almacenar los adornos colocados

// Hacer los adornos arrastrables
ornaments.forEach(ornament => {
    ornament.addEventListener('dragstart', dragStart);
    ornament.addEventListener('dragend', dragEnd);
});

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);  // Guardar el id del adorno arrastrado
    e.target.style.opacity = "0.4";  // Hacer que el adorno sea más transparente mientras se arrastra
}

function dragEnd(e) {
    e.target.style.opacity = "1";  // Restaurar la opacidad del adorno
}

// Permitir que los adornos sean soltados sobre el árbol
treeContainer.addEventListener('dragover', dragOver);
treeContainer.addEventListener('drop', drop);

function dragOver(e) {
    e.preventDefault(); // Permitir que el adorno se pueda soltar
}

function drop(e) {
    e.preventDefault();
    
    const ornamentId = e.dataTransfer.getData("text");
    const ornament = document.getElementById(ornamentId);

    // Crear un nuevo adorno en la posición donde el usuario suelta el objeto
    const newOrnament = document.createElement('div');
    newOrnament.textContent = ornament.textContent;
    newOrnament.style.position = 'absolute';
    newOrnament.style.left = `${e.offsetX - 15}px`;  // Ajustar la posición (centrar el adorno)
    newOrnament.style.top = `${e.offsetY - 15}px`;   // Ajustar la posición
    newOrnament.style.fontSize = '40px';

    treeContainer.appendChild(newOrnament); // Añadir el adorno al árbol

    // Guardar el adorno en el historial para poder deshacerlo
    ornamentsHistory.push(newOrnament);
}

// Funcionalidad para limpiar todos los adornos
document.getElementById('clear-button').addEventListener('click', function () {
    const allOrnaments = treeContainer.querySelectorAll('div');
    allOrnaments.forEach(ornament => {
        if (ornament !== tree) {  // Evitar eliminar el árbol de Navidad
            ornament.remove();
        }
    });
    ornamentsHistory = [];  // Limpiar el historial de adornos
});

// Funcionalidad para deshacer el último adorno colocado
document.getElementById('undo-button').addEventListener('click', function () {
    if (ornamentsHistory.length > 0) {
        const lastOrnament = ornamentsHistory.pop();  // Eliminar el último adorno del historial
        lastOrnament.remove();  // Eliminar el último adorno del árbol
    } else {
        alert('No hay adornos para deshacer.');
    }
});