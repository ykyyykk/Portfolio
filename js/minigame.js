var attack_btn;
var conuterattack_btn;
var recover_btn;
var player_health;
var player_energy;

var enemy_health;
var enemy_energy;
const default_helath = 10;
const default_energy = 3;

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  attack_btn = document.getElementById("attack_btn");
  conuterattack_btn = document.getElementById("conuterattack_btn");
  recover_btn = document.getElementById("recover_btn");

  attack_btn.addEventListener("click", attackBtnOnClick);
  conuterattack_btn.addEventListener("click", counterAttackBtnOnClick);
  recover_btn.addEventListener("click", recoverBtnOnClick);

  player_health =
    localStorage.getItem("player_health") == null
      ? default_helath
      : localStorage.getItem("player_health");

  player_energy =
    localStorage.getItem("player_energy") == null
      ? default_energy
      : localStorage.getItem("player_energy");
  console.log(player_health);
  console.log(player_energy);
});

function getRandomCard() {}

function attackBtnOnClick() {
  if (player_energy < 3) {
    return;
  }
  console.log("attackBtnOnClick");
}

function counterAttackBtnOnClick() {
  if (player_energy < 2) {
    return;
  }
  console.log("counterAttackBtnOnClick");
}

function recoverBtnOnClick() {
  if (player_energy < 1) {
    return;
  }
  console.log("recoverBtnOnClick");
}
