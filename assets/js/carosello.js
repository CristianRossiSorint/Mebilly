var images = document.querySelectorAll('.carosello-container img');
var currentImage = 0;
var maxImage = images.length - 1;
var intervalTime = 4000;
var carouselInterval;

// funzione che mostra l'immagine
function showImage(index) {
	images[currentImage].classList.remove('active');
	currentImage = index;
	images[currentImage].classList.add('active');
}

// avanti
function nextImage() {
	var next = currentImage === maxImage ? 0 : currentImage + 1;
	showImage(next);
	resetInterval();
}

// indietro
function prevImage() {
	var prev = currentImage === 0 ? maxImage : currentImage - 1;
	showImage(prev);
	resetInterval();
}

// autoplay
function startCarousel() {
	carouselInterval = setInterval(nextImage, intervalTime);
}

function resetInterval() {
	clearInterval(carouselInterval);
	startCarousel();
}

// eventi pulsanti
document.querySelector('.carousel-btn.next').addEventListener('click', nextImage);
document.querySelector('.carousel-btn.prev').addEventListener('click', prevImage);

// start
startCarousel();
