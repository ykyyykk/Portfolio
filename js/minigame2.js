var horizontal = 0;
var vertical = 0;
var speed = 10;
var keys = {};
var playerPosition = { x: 0, y: 0 };
var projectiles = [];
var projectileIndex = 0;
var shootDirection = "right";
var windowWidth = 0;
var windowHeight = 0;

$(document).ready(() => {
  windowWidth = document.documentElement.clientWidth;
  windowHeight = document.documentElement.clientHeight;
  window.addEventListener("keydown", (e) => {
    keys[e.key] = true; // Mark the key as pressed
  });

  window.addEventListener("keyup", (e) => {
    keys[e.key] = false; // Mark the key as released
  });

  setInterval(() => {
    getInput();
    updatePlayerPosition();
    movemPosition();
  }, 100);
});

function getInput() {
  if (keys["a"]) {
    shootDirection = "left";
    horizontal -= speed;
  }
  if (keys["d"]) {
    shootDirection = "right";
    horizontal += speed;
  }
  if (keys["w"]) {
    vertical -= speed;
  }
  if (keys["s"]) {
    vertical += speed;
  }
  // 這是空白鍵
  if (keys[" "]) {
    spawnProjectile();
  }
  horizontal = Clamp(horizontal, 0, windowWidth);
  vertical = Clamp(vertical, 0, windowHeight);
}

function Clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function movemPosition() {
  anime({
    targets: "#player",
    translateX: horizontal,
    translateY: vertical,
  });
}

function updatePlayerPosition() {
  playerPosition.x = horizontal;
  playerPosition.y = vertical;
}

function spawnProjectile() {
  var projectile = $(
    `<div id = "projectile${projectileIndex}" class = "projectile"></div>`
  );

  projectile.css({
    border: "0px",
    position: "absolute",
    left: `${playerPosition.x}px`,
    top: `${playerPosition.y}px`,
    width: "20px",
    height: "10px",
    backgroundColor: "red",
  });

  $("body").append(projectile);

  shoot(`#projectile${projectileIndex}`);
  projectileIndex++;
}

function shoot(target) {
  direction = shootDirection == "right" ? 1000 : -1000;

  anime({
    targets: target,
    translateX: direction,
    // 透明
    background: "rgba(255, 0, 0, 0)",
    duration: 500,
    easing: "linear",
    begin: () => {
      console.log(`begin`);
    },
    update: () => {
      // console.log(target);
      // var top = $(target).css("top");
      // var left = $(target).css("left");
      // projectiles[target] = { top: top, left: left };
      // console.log(projectiles[target]);
    },
    complete: () => {
      console.log(target);
      var top = $(target).css("top");
      var left = $(target).css("left");
      projectiles[target] = { top: top, left: left };
      console.log(projectiles[target]);
    },
  });
}

function detect() {}
