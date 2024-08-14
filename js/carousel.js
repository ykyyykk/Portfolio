let images = [
  "image/1.jpg",
  "image/2.jpg",
  "image/3.jpg",
  "image/4.jpg",
  "image/5.jpg",
]; /* ImageURL */

var currentIndex = 0;
// 5秒
var changeDuration = 3000;
var animation;

// 不知道為什麼 有的時候 沒有""會Error
$(document).ready(() => {
  console.log("ready");
  animationInit();
  animation.play();

  $("#big_img").on("mouseenter", () => {
    animation.pause();
  });

  $("#big_img").on("mouseleave", () => {
    animation.play();
  });
});

function updateImage(carouselIndex) {
  // console.log(carouselIndex);
  // 避免手動選第三張 在按下一張的index不對
  currentIndex = carouselIndex;
  document.getElementById("big_img").src = images[carouselIndex];
}

function nextImage() {
  currentIndex++;
  currentIndex = currentIndex >= images.length ? 0 : currentIndex;
  updateImage(currentIndex);
}

function previousImage() {
  currentIndex--;
  currentIndex = currentIndex <= 0 ? images.length - 1 : currentIndex;
  updateImage(currentIndex);
}

function animationInit() {
  animation = anime({
    targets: "#fill",
    width: "100%",
    easing: "linear",
    duration: changeDuration,
    autoplay: false,
    complete: () => {
      $("#fill").css("width", "0%");
      nextImage();
      animation.play();
    },
  });
}
