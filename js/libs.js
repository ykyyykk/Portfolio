function loadCSS(url) {
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

function loadJs(url) {
  var script = document.createElement("script");
  script.src = url;
  document.head.appendChild(script);
}

// Bootstrap_v5.3
loadCSS(
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
);
loadJs(
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
);

// FontAwesome_v6.0.0
loadCSS(
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
);

// Swiper
// loadCSS("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css");
// loadJs("https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js");

// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
// <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

// animejs
loadJs("https://cdn.jsdelivr.net/npm/animejs@3.2.2/lib/anime.min.js");

// youtube iframe api
// loadJs("https://www.youtube.com/iframe_api");
//<script src="https://www.youtube.com/iframe_api"></script>;
