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

// jQuery_v3.7.1
loadJs("https://code.jquery.com/jquery-3.7.1.js");

// FontAwesome_v6.0.0
loadCSS(
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
);
