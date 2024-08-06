var attack_btn;
var counterattack_btn;
var recover_btn;
var next_game_btn;
var reset_record_btn;

var consecutive_win_count_txt;
var player_health_txt;
var player_energy_txt;
var enemy_health_txt;
var enemy_energy_txt;

var consecutiveWinCount;
var player_max_health;
var player_health;
var player_energy;

var enemy_max_health;
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

const default_health = 15;
const default_increase_health = 10;
const default_energy = 2;
const default_recover_energy = 2;

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,
    easing: "ease-out-back",
    once: false,
  });
  attack_btn = document.getElementById("attack_btn");
  counterattack_btn = document.getElementById("counterattack_btn");
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
  counterattack_btn.addEventListener("click", counterAttackBtnOnClick);
  recover_btn.addEventListener("click", recoverBtnOnClick);
  next_game_btn.addEventListener("click", nextGameBtnOnClick);
  reset_record_btn.addEventListener("click", resetRecordOnClick);

  // 這裡沒有依靠AOS 拿起動畫
  attack_btn.addEventListener(
    "mouseenter",
    mouseEnter(attack_btn, attack_cost)
  );
  attack_btn.addEventListener("mouseleave", mouseLeave);
  counterattack_btn.addEventListener(
    "mouseenter",
    mouseEnter(counterattack_btn, counterattack_cost)
  );
  counterattack_btn.addEventListener("mouseleave", mouseLeave);
  recover_btn.addEventListener(
    "mouseenter",
    mouseEnter(recover_btn, recover_cost)
  );
  recover_btn.addEventListener("mouseleave", mouseLeave);

  consecutiveWinCount =
    localStorage.getItem("consecutiveWinCount") == null
      ? 0
      : localStorage.getItem("consecutiveWinCount");

  player_max_health =
    localStorage.getItem("player_max_health") == null
      ? default_health
      : localStorage.getItem("player_max_health");

  player_health =
    localStorage.getItem("player_health") == null
      ? default_health
      : localStorage.getItem("player_health");

  player_energy =
    localStorage.getItem("player_energy") == null
      ? default_energy
      : localStorage.getItem("player_energy");

  enemy_max_health =
    localStorage.getItem("enemy_max_health") == null
      ? default_health
      : localStorage.getItem("enemy_max_health");

  enemy_health =
    localStorage.getItem("enemy_health") == null
      ? default_health
      : localStorage.getItem("enemy_health");

  enemy_energy =
    localStorage.getItem("enemy_energy") == null
      ? default_energy
      : localStorage.getItem("enemy_energy");

  console.log(enemy_health);
  is_playing = true;
  updateLog("遊戲開始");
  updateInfo();
  setDescription();
});

// 不能用一般的方法 這是閉包
function mouseEnter(btn, cost) {
  return function (event) {
    if (player_energy < cost) {
      return;
    }
    btn.style.transform = "translateY(-30px)";
  };
}

function mouseLeave() {
  this.style.transform = "translateY(0)";
}

function getRandomAction() {
  const actions = [];

  if (enemy_energy >= recover_cost) {
    actions.push("recover");
  }
  if (enemy_energy >= attack_cost) {
    actions.push("attack");
  }
  if (enemy_energy >= counterattack_cost) {
    actions.push("counterattack");
  }

  if (actions.length === 0) {
    return null; // If no actions can be performed, return null
  }

  const randomIndex = Math.floor(Math.random() * actions.length);
  const selectedAction = actions[randomIndex];

  // Decrease the corresponding cost based on the selected action
  switch (selectedAction) {
    case "recover":
      enemy_energy -= recover_cost;
      break;
    case "attack":
      enemy_energy -= attack_cost;
      break;
    case "counterattack":
      enemy_energy -= counterattack_cost;
      break;
  }

  return selectedAction;
}

function attackBtnOnClick() {
  console.log(enemy_health);
  if (!is_playing) {
    return;
  }
  if (player_energy < attack_cost) {
    return;
  }
  player_energy -= attack_cost;
  player_action = "attack";
  enemy_action = getRandomAction();
  updateLog(`===========================================`);
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function counterAttackBtnOnClick() {
  console.log(enemy_health);
  if (!is_playing) {
    return;
  }
  if (player_energy < counterattack_cost) {
    return;
  }
  player_energy -= counterattack_cost;
  player_action = "counterattack";
  enemy_action = getRandomAction();
  updateLog(`===========================================`);
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function recoverBtnOnClick() {
  console.log(enemy_health);
  if (!is_playing) {
    return;
  }
  if (player_energy < recover_cost) {
    return;
  }

  player_energy -= recover_cost;
  player_action = "recover";
  enemy_action = getRandomAction();
  updateLog(`===========================================`);
  updateLog(`玩家使用: ${player_action}`);
  checkResult();
}

function checkResult() {
  console.log(enemy_health);
  // 回復動作要先 這樣才不會永遠打不死
  updateLog(`敵人使用: ${enemy_action}`);
  if (player_action == "recover") {
    player_health += +recover_value;
    updateLog(`玩家回復: ${recover_value} 點血量 剩餘血量: ${player_health}`);
  }

  if (enemy_action == "recover") {
    enemy_health += +recover_value;
    updateLog(`敵人回復: ${recover_value} 點血量 剩餘血量: ${enemy_health}`);
  }

  if (enemy_action == "attack" && player_action != "counterattack") {
    player_health =
      player_health >= attack_value ? +player_health - +attack_value : 0;
    updateLog(`玩家受到: ${attack_value} 點傷害 剩餘血量: ${player_health}`);
  }

  if (player_action == "attack" && enemy_action != "counterattack") {
    enemy_health =
      enemy_health >= attack_value ? +enemy_health - +attack_value : 0;
    updateLog(`敵人受到: ${attack_value} 點傷害 剩餘血量: ${enemy_health}`);
  }

  if (player_action == "counterattack" && enemy_action == "attack") {
    enemy_health =
      enemy_health >= counterattack_value
        ? +enemy_health - +counterattack_value
        : 0;
    updateLog(`玩家反擊 玩家剩餘血量: ${player_health}`);
    updateLog(
      `敵人受到: ${counterattack_value} 點傷害 剩餘血量: ${enemy_health}`
    );
  }

  if (enemy_action == "counterattack" && player_action == "attack") {
    player_health =
      player_health >= counterattack_value
        ? +player_health - +counterattack_value
        : 0;
    updateLog(`敵人反擊 敵人剩餘血量: ${enemy_health}`);
    updateLog(
      `玩家受到: ${counterattack_value} 點傷害 剩餘血量: ${player_health}`
    );
  }
  if (enemy_action == "counterattack" && player_action == "counterattack") {
    updateLog(`雙方都使用 反擊 沒有發生任何事`);
  }
  player_energy += +default_recover_energy;
  enemy_energy += +default_recover_energy;
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
  player_health_txt.innerHTML = `玩家血量: ${player_health} / ${player_max_health}`;
  player_energy_txt.innerHTML = `玩家能量: ${player_energy}`;
  enemy_health_txt.innerHTML = `敵人血量: ${enemy_health} / ${enemy_max_health}`;
  enemy_energy_txt.innerHTML = `敵人能量: ${enemy_energy}`;
  healthAnimation("player", player_health, player_max_health);
  console.log(enemy_max_health);
  console.log(enemy_health);
  healthAnimation("enemy", enemy_health, enemy_max_health);

  setButtonStatus(attack_btn, is_playing && player_energy >= attack_cost);
  setButtonStatus(
    counterattack_btn,
    is_playing && player_energy >= counterattack_cost
  );
  setButtonStatus(recover_btn, is_playing && player_energy >= recover_cost);
  setButtonStatus(next_game_btn, !is_playing);
}

function updateLog(log) {
  history_log.innerHTML += `${log}<br>`;
  history_log.scrollTop = history_log.scrollHeight;
}

function clearLog() {
  history_log.innerHTML = "";
}

function setButtonStatus(btn, enable) {
  btn.disabled = !enable;

  if (enable) {
    btn.classList.add("text-bg-primary");
    btn.classList.remove("text-bg-secondary");
    return;
  }
  btn.classList.remove("text-bg-primary");
  btn.classList.add("text-bg-secondary");
}

function nextGameBtnOnClick() {
  updateLog("nextGameOnClick");
  is_playing = true;
  // 為了避免 文字 + 數字的情況 變數前面+號 強制數字運算
  if (+player_health <= 0) {
    consecutiveWinCount = 0;
    player_health = +default_health;
    player_energy = +default_energy;
  } else {
    consecutiveWinCount++;
    player_max_health = +player_max_health + +default_increase_health;
    player_health = +player_health + +default_increase_health;
  }

  var multiplier = Math.floor(+consecutiveWinCount / 5);
  enemy_max_health = +default_health + default_increase_health * +multiplier;
  enemy_health = +enemy_max_health;
  enemy_energy = +default_energy;

  saveResult();
  updateInfo();
  clearLog();
}

function resetRecordOnClick() {
  updateLog("resetRecordOnClick");
  enemy_max_health = default_health;
  enemy_health = default_health;
  enemy_energy = default_energy;
  player_max_health = default_health;
  player_health = default_health;
  player_energy = default_energy;
  consecutiveWinCount = 0;
  is_playing = true;

  localStorage.setItem("enemy_max_health", default_health);
  localStorage.setItem("enemy_health", default_health);
  localStorage.setItem("enemy_energy", default_energy);
  localStorage.setItem("player_max_health", default_health);
  localStorage.setItem("player_health", default_health);
  localStorage.setItem("player_energy", default_energy);
  localStorage.setItem("consecutiveWinCount", 0);
  updateInfo();
  clearLog();
}

function saveResult() {
  localStorage.setItem("enemy_max_health", enemy_max_health);
  localStorage.setItem("enemy_health", enemy_health);
  localStorage.setItem("enemy_energy", enemy_energy);
  localStorage.setItem("player_max_health", player_max_health);
  localStorage.setItem("player_health", player_health);
  localStorage.setItem("player_energy", player_energy);
  localStorage.setItem("consecutiveWinCount", consecutiveWinCount);
}

function setDescription() {
  const attack_btn_info = document.querySelector("#attack_btn .card-text");
  const counterattack_btn_info = document.querySelector(
    "#counterattack_btn .card-text"
  );
  const recover_btn_info = document.querySelector("#recover_btn .card-text");

  attack_btn_info.innerHTML = `消耗 ${attack_cost} 能量 <br> 對敵人造成 ${attack_value} 點傷害`;
  counterattack_btn_info.innerHTML = `消耗 ${counterattack_cost} 能量 <br> 如果敵人攻擊玩家則不造成任何傷害 且對敵人造成 ${counterattack_value} 點傷害`;
  recover_btn_info.innerHTML = `消耗 ${recover_cost} 能量 <br> 回復 ${attack_value} 點血量`;
}

function healthAnimation(side, currenthealth, maxhealth) {
  const health_text = document.getElementById(`${side}_health_txt`);

  const healthPercentage = (currenthealth / maxhealth) * 100;
  console.log(`currenthealth: ${currenthealth}`);
  console.log(`maxhealth: ${maxhealth}`);
  console.log(`healthPercentage: ${healthPercentage}`);
  health_text.style.width = `${healthPercentage}%`;
}

// 有可能會因為 文字 + 數字 導致數字錯誤
