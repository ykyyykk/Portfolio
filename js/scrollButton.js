var scroll_to_top_btn;
var scroll_to_bottom_btn;

document.addEventListener("DOMContentLoaded", () => {
  scroll_to_top_btn = document.getElementById("ScrollToTop");
  scroll_to_bottom_btn = document.getElementById("ScrollToBottom");

  scroll_to_top_btn.addEventListener("click", () => {
    console.log("scroll to top");
    window.scrollTo({
      top: 0,
      behavior: "smooth" /* 平滑捲動 */,
    });
  });

  scroll_to_bottom_btn.addEventListener("click", () => {
    console.log("scroll to bottom");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
});
