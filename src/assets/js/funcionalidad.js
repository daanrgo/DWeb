// Carrusel de imágenes
let index = 0;
let iterations = 0; // Variable para contar las iteraciones
const maxIterations = 2; // Número máximo de iteraciones antes de volver al principio

function moveCarousel(direction) {
    const carousel = document.getElementById('carousel');
    const images = document.querySelectorAll('.carousel-item');  // Asegúrate de seleccionar los items, no solo las imágenes
    const totalImages = images.length;
    const imageWidth = images[0].clientWidth + 20;  // Calcula el ancho dinámicamente (ajustando el espacio entre elementos)

    index += direction;  // Aumenta o disminuye el índice según la dirección (1 o -1)

    // Si el índice es menor que 0, volvemos al final del carrusel (infinito)
    if (index < 0) {
        index = totalImages - 1;
    }

    // Si el índice supera el total de imágenes, volvemos al principio (infinito)
    if (index >= totalImages) {
        index = 0;
    }

    // Aplica la transición para mover el carrusel
    carousel.style.transition = 'transform 1s ease';  // Aplica una transición suave
    carousel.style.transform = `translateX(-${index * imageWidth}px)`;  // Mueve el carrusel a la nueva posición

    // Incrementa el contador de iteraciones
    if (direction === 1) {
        iterations++;
    }

    // Si el número de iteraciones alcanza el máximo, se detiene y vuelve al principio
    if (iterations >= maxIterations) {
        setTimeout(() => {
            // Resetear al principio
            carousel.style.transition = 'transform 1s ease';  // Reaplica la transición
            carousel.style.transform = `translateX(0px)`; // Vuelve al inicio
            index = 0; // Reinicia el índice
            iterations = 0; // Reinicia el contador de iteraciones
        }, 1000); // Tiempo de espera para asegurar que la transición se haya completado
    }
}

// Intervalo para mover el carrusel automáticamente (opcional)
setInterval(() => {
    moveCarousel(1); // Mueve hacia la derecha automáticamente
}, 3000); // Intervalo de 2 segundos
