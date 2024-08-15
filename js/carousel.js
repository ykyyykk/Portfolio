let images = [
  "",
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
var lastImgElement;

// 不知道為什麼 有的時候 沒有""會Error
$(document).ready(() => {
  console.log("ready");

  checkIndexShowImage();
  ButtonInit();
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
  // 避免手動選第三張 在按下一張的index不對
  currentIndex = carouselIndex;
  // console.log(currentIndex);
  checkIndexShowImage();

  $("#big_img").attr("src", images[currentIndex]);
  // ChangeFoucusBorder(currentIndex);

  animation.reset();
  animation.play();
}

function nextImage() {
  currentIndex++;
  currentIndex = currentIndex >= images.length ? 0 : currentIndex;
  updateImage(currentIndex);
}

function previousImage() {
  currentIndex--;
  currentIndex = currentIndex < 0 ? images.length - 1 : currentIndex;
  console.log(currentIndex);
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
    },
  });
}

function ButtonInit() {
  $("#nextPageBtn").on("click", () => {
    nextImage();
  });
  $("#previousPageBtn").on("click", () => {
    previousImage();
  });
}

function checkIndexShowImage() {
  if (currentIndex != 0) {
    $("#trailer").css("display", "none");
    $("#big_img").css("display", "block");
  } else {
    $("#trailer").css("display", "block");
    $("#big_img").css("display", "none");
  }
}

function ChangeFoucusBorder(currentIndex) {
  $(`#carousel${currentIndex}`).addClass("border border-2 border-primary");
  if ($(lastImgElement) != undefined) {
    $(lastImgElement).removeClass("border border-2 border-primary");
  }
  lastImgElement = $(`#carousel${currentIndex}`);
}
