document.getElementById("ScrollToTop").addEventListener("click", function () {
  console.log("scroll to top");
  window.scrollTo({
    top: 0,
    behavior: "smooth" /* 平滑捲動 */,
  });
});

document
  .getElementById("ScrollToBottom")
  .addEventListener("click", function () {
    console.log("scroll to bottom");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
