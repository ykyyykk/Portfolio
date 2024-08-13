let images = [
  "image/1.jpg",
  "image/2.jpg",
  "image/3.jpg",
  "image/4.jpg",
  "image/5.jpg",
]; /* ImageURL */

var currentIndex = 0;

function updateImage(carouselIndex) {
  console.log(carouselIndex);
  // 避免手動選第三張 在按下一張的index不對
  currentIndex = carouselIndex;
  document.getElementById(`big_img`).src = images[carouselIndex];
}

function nextImage() {
  currentIndex++;
  currentIndex =
    currentIndex >= images.length ? images.length - 1 : currentIndex;
  updateImage(currentIndex);
}

function previousImage() {
  currentIndex--;
  currentIndex = currentIndex <= 0 ? 0 : currentIndex;
  updateImage(currentIndex);
}
