var images = document.querySelectorAll('.carosello-container img');
var currentImage = 0;
var maxImage = images.length - 1;

setInterval(function() {
  images[currentImage].classList.remove('active');
  if (currentImage === maxImage) {
    currentImage = 0;
  } else {
    currentImage++;
  }
  images[currentImage].classList.add('active');
}, 4000);
