var attack_btn;
var conuterattack_btn;
var recover_btn;
var next_game_btn;
var reset_record_btn;

var consecutive_win_count_txt;
var player_health_txt;
var player_energy_txt;
var enemy_health_txt;
var enemy_energy_txt;

var consecutiveWinCount;
var player_health;
var player_energy;

var enemy_health;
var enemy_energy;

var player_action;
var enemy_action;

var history_log;
var is_playing = false;

const attack_value = 6;
const counterattack_value = 8;
const recover_value = 3;

const attack_cost = 2;
const counterattack_cost = 3;
const recover_cost = 1;

const default_helath = 15;
const default_increase_health = 10;
const default_energy = 2;
const default_recover_energy = 2;

document.addEventListener("DOMContentLoaded", () => {
  attack_btn = document.getElementById("attack_btn");
  conuterattack_btn = document.getElementById("conuterattack_btn");
  recover_btn = document.getElementById("recover_btn");
  next_game_btn = document.getElementById("next_game_btn");
  reset_record_btn = document.getElementById("reset_record_btn");
  consecutive_win_count_txt = document.getElementById(
    "consecutive_win_count_txt"
  );
  player_health_txt = document.getElementById("player_health_txt");
  player_energy_txt = document.getElementById("player_energy_txt");
  enemy_health_txt = document.getElementById("enemy_health_txt");
  enemy_energy_txt = document.getElementById("enemy_energy_txt");
  history_log = document.getElementById("history_log");

  attack_btn.addEventListener("click", attackBtnOnClick);
  conuterattack_btn.addEventListener("click", counterAttackBtnOnClick);
  recover_btn.addEventListener("click", recoverBtnOnClick);
  next_game_btn.addEventListener("click", nextGameBtnOnClick);
  reset_record_btn.addEventListener("click", resetRecordOnClick);

  consecutiveWinCount =
    localStorage.getItem("consecutiveWinCount") == null
      ? 0
      : localStorage.getItem("consecutiveWinCount");

  player_health =
    localStorage.getItem("player_health") == null
      ? default_helath
      : localStorage.getItem("player_health");

  player_energy =
    localStorage.getItem("player_energy") == null
      ? default_energy
      : localStorage.getItem("player_energy");

  enemy_health =
    localStorage.getItem("enemy_health") == null
      ? default_helath
      : localStorage.getItem("enemy_health");

  enemy_energy =
    localStorage.getItem("enemy_energy") == null
      ? default_energy
      : localStorage.getItem("enemy_energy");

  is_playing = true;
  updateLog("遊戲開始");
  updateInfo();
});

function getRandomAction() {
  const actions = [];
  if (enemy_energy >= attack_cost) {
    enemy_energy -= attack_cost;
    actions.push("attack");
  }
  if (enemy_energy >= counterattack_cost) {
    enemy_energy -= counterattack_cost;
    actions.push("counterattack");
  }
  if (enemy_energy >= recover_cost) {
    enemy_energy -= recover_cost;
    actions.push("recover");
  }

  if (actions.length === 0) {
    return null; // If no actions can be performed, return null
  }

  const randomIndex = Math.floor(Math.random() * actions.length);
  return actions[randomIndex];
}

function attackBtnOnClick() {
  if (!is_playing) {
    return;
  }
  if (player_energy < attack_cost) {
    return;
  }
  player_energy -= attack_cost;
  player_action = "attack";
  enemy_action = getRandomAction();
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function counterAttackBtnOnClick() {
  if (!is_playing) {
    return;
  }
  if (player_energy < counterattack_cost) {
    return;
  }
  player_energy -= counterattack_cost;
  player_action = "counterattack";
  enemy_action = getRandomAction();
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function recoverBtnOnClick() {
  if (!is_playing) {
    return;
  }
  if (player_energy < recover_cost) {
    return;
  }

  player_energy -= recover_cost;
  player_action = "recover";
  enemy_action = getRandomAction();
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function checkResult() {
  updateLog(`敵人使用: ${enemy_action}`);
  if (player_action == "attack" && enemy_action != "counterattack") {
    enemy_health -= attack_value;
    updateLog(`敵人受到: ${attack_value} 點傷害 剩餘血量: ${enemy_health}`);
  }

  if (enemy_action == "attack" && player_action != "counterattack") {
    player_health -= attack_value;
    updateLog(`玩家受到: ${attack_value} 點傷害 剩餘血量: ${player_health}`);
  }

  if (player_action == "counterattack" && enemy_action == "attack") {
    enemy_health -= counterattack_value;
    updateLog(`玩家反擊 玩家剩餘血量: ${player_health}`);
    updateLog(
      `敵人受到: ${counterattack_value} 點傷害 剩餘血量: ${enemy_health}`
    );
  }

  if (enemy_action == "counterattack" && player_action == "attack") {
    player_health -= counterattack_value;
    updateLog(`敵人反擊 敵人剩餘血量: ${enemy_health}`);
    updateLog(
      `玩家受到: ${counterattack_value} 點傷害 剩餘血量: ${player_health}`
    );
  }

  if (player_action == "recover") {
    player_health += recover_value;
    updateLog(`玩家回復: ${recover_value} 點血量 剩餘血量: ${player_health}`);
  }

  if (enemy_action == "recover") {
    enemy_health += recover_value;
    updateLog(`敵人回復: ${recover_value} 點血量 剩餘血量: ${enemy_health}`);
  }

  player_energy += default_recover_energy;
  enemy_energy += default_recover_energy;
  checkHealth();
  updateInfo();
}

function checkHealth() {
  if (player_health <= 0 && enemy_health <= 0) {
    updateLog(`雙方平手`);
    is_playing = false;
  }
  if (enemy_health <= 0) {
    updateLog(`玩家勝利 剩餘血量: ${player_health}`);
    is_playing = false;
  }
  if (player_health <= 0) {
    updateLog(`敵人勝利 剩餘血量: ${enemy_health}`);
    is_playing = false;
  }
}

function updateInfo() {
  consecutive_win_count_txt.innerHTML = `連續勝利: ${consecutiveWinCount}`;
  player_health_txt.innerHTML = `玩家血量: ${player_health}`;
  player_energy_txt.innerHTML = `玩家能量: ${player_energy}`;
  enemy_health_txt.innerHTML = `敵人血量: ${enemy_health}`;
  enemy_energy_txt.innerHTML = `敵人能量: ${enemy_energy}`;

  setButtonStatus(attack_btn, is_playing && player_energy >= attack_cost);
  setButtonStatus(
    conuterattack_btn,
    is_playing && player_energy >= counterattack_cost
  );
  setButtonStatus(recover_btn, is_playing && player_energy >= recover_cost);
  setButtonStatus(next_game_btn, !is_playing);
}

function updateLog(log) {
  history_log.innerHTML += `${log}<br>`;
}

function clearLog() {
  history_log.innerHTML = "";
}

function setButtonStatus(btn, enable) {
  btn.disabled = !enable;

  if (enable) {
    btn.classList.add("btn-primary");
    btn.classList.remove("btn-secondary");
    return;
  }
  btn.classList.remove("btn-primary");
  btn.classList.add("btn-secondary");
}

function nextGameBtnOnClick() {
  updateLog("nextGameOnClick");
  is_playing = true;
  enemy_health = default_helath;
  enemy_energy = default_energy;

  if (player_health <= 0) {
    consecutiveWinCount = 0;
    player_health = default_helath;
    player_energy = default_energy;
  } else {
    consecutiveWinCount++;
    player_health += default_increase_health;
  }

  saveResult();
  updateInfo();
  clearLog();
}

function resetRecordOnClick() {
  updateLog("resetRecordOnClick");
  enemy_health = default_helath;
  enemy_energy = default_energy;
  player_health = default_helath;
  player_energy = default_energy;
  consecutiveWinCount = 0;

  localStorage.setItem("enemy_health", default_helath);
  localStorage.setItem("enemy_energy", default_energy);
  localStorage.setItem("player_health", default_helath);
  localStorage.setItem("player_energy", default_energy);
  localStorage.setItem("consecutiveWinCount", 0);
  updateInfo();
  clearLog();
}

function saveResult() {
  localStorage.setItem("enemy_health", enemy_health);
  localStorage.setItem("enemy_energy", enemy_energy);
  localStorage.setItem("player_health", player_health);
  localStorage.setItem("player_energy", player_energy);
  localStorage.setItem("consecutiveWinCount", consecutiveWinCount);
}
