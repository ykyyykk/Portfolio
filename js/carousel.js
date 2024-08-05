let images = [
  "image/1.jpg",
  "image/2.jpg",
  "image/3.jpg",
  "image/4.jpg",
  "image/5.jpg",
]; /* ImageURL */

let currentIndex = [0, 0];

function updateImage(carouselIndex) {
  console.log(carouselIndex);
  console.log(currentIndex[carouselIndex]);
  /*   document.getElementById("carousel-image-${carouselIndex}").src =
    images[currentIndex[carouselIndex]]; */
  document.getElementById(`carousel-image-${carouselIndex}`).src =
    images[currentIndex[carouselIndex]];
}

function nextImage(carouselIndex) {
  console.log("nextImage");
  currentIndex[carouselIndex] =
    (currentIndex[carouselIndex] + 1) % images.length;
  updateImage(carouselIndex);
}

function previousImage(carouselIndex) {
  console.log("previ");
  currentIndex[carouselIndex] =
    (currentIndex[carouselIndex] - 1 + images.length) % images.length;
  updateImage(carouselIndex);
}

// Initialize the carousel with the first image
// updateImage(0);
// updateImage(1);
