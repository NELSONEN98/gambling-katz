"use strict";

/* ============================================
   ANIMAL GAMBLING — game logic
   ============================================ */

const CHARACTERS = [
  {
    id: "penguin",
    name: "Tax Penguin",
    img: "img/penguin.png",
    age: "30",
    cond: "Wanted for tax evasion in three jurisdictions.",
    quote: "The house always wins. I just need to become the house.",
    loseQuote: "The IRS is gonna catch me now...",
    tags: ["FUGITIVE", "COLD-BLOODED"],
  },
  {
    id: "bear",
    name: "Bearnardo",
    img: "img/bear.png",
    age: "42",
    cond: "Ex-mob enforcer. Now pretends to be a butcher.",
    quote: "I've buried worse things than my losses.",
    loseQuote: "Shouldn't have left the family...",
    tags: ["HEAVY", "PATIENT"],
  },
  {
    id: "duck",
    name: "Lucky Ducky",
    img: "img/duck.png",
    age: "25",
    cond: "Degenerate. Here for the dopamine, not the money.",
    quote: "One more roll. Just one more. I promise.",
    loseQuote: "I can feel the next one. Let me play.",
    tags: ["RECKLESS", "TILTED"],
  },
  {
    id: "egg",
    name: "Mystery Egg",
    img: "img/egg.png",
    age: "???",
    cond: "Unknown. Has never been seen outside its shell.",
    quote: "...",
    loseQuote: "......",
    tags: ["???", "???"],
  },
];

/* ============================================
   STATE
   ============================================ */
const TWEAK_DEFAULS = /*EDITMODE-BEGIN*/{
  "goalScore": 50,
  "smokeOpacity": 0.35,
  "scanlines": true,
  "particles": true
}/*EDITMODE-END*/;

const state = {
  screen: "select", // "select" | "game" | "gameover"
  picking: 0, // which player is picking (0 or 1)
  players: [null, null], // each: { char, score, current }
  active: 0,
  playing: false,
  rollsTotal: 0,
  goal: TWEAK_DEFAULS.goalScore,
};

/* ============================================
   ELEMENT REFS
   ============================================ */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const screens = {
  select: $("#screen-select"),
  game: $("#screen-game"),
  gameover: $("#screen-gameover"),
};

/* ============================================
   RENDER — CHARACTER SELECT
   ============================================ */
function renderCharGrid() {
  const grid = $("#char-grid");
  grid.innerHTML = CHARACTERS.map((c, i) => `
    <div class="char-card" data-idx="${i}" data-id="${c.id}">
      <div class="char-id-row">
        <span>ID/${String(i + 1).padStart(3, "0")}</span>
        <span class="dot"></span>
      </div>
      <div class="char-img-wrap">
        <img src="${c.img}" alt="${c.name}">
      </div>
      <div class="char-info">
        <div class="char-name">${c.name}</div>
        <div class="char-meta">
          <span class="k">age</span><span class="v">${c.age}</span>
          <span class="k">tag</span><span class="v mono-dim">${c.tags.join(" · ")}</span>
          <span class="k">note</span><span class="v mono-dim">${c.cond}</span>
        </div>
      </div>
    </div>
  `).join("");

  grid.querySelectorAll(".char-card").forEach((el) => {
    el.addEventListener("click", () => pickCharacter(parseInt(el.dataset.idx, 10)));
  });
}

function updateSelectHeader() {
  const header = $("#select-header");
  const who = state.picking === 0 ? "PLAYER_01" : "PLAYER_02";
  header.classList.toggle("p2", state.picking === 1);
  $("#prompt-who").textContent = who;
  $("#p1-pick").textContent = state.players[0]?.char.name || "— none —";
  $("#p2-pick").textContent = state.players[1]?.char.name || "— none —";
}

function pickCharacter(idx) {
  const card = $$(".char-card")[idx];
  if (card.classList.contains("selected")) return;

  const char = CHARACTERS[idx];
  state.players[state.picking] = { char, score: 0, current: 0 };

  card.classList.add("selected", state.picking === 0 ? "p1" : "p2");
  card.setAttribute("data-player", state.picking === 0 ? "P1" : "P2");

  if (state.picking === 0) {
    state.picking = 1;
    $("#char-grid").classList.add("p2-turn");
    updateSelectHeader();
  } else {
    // both picked — start game
    updateSelectHeader();
    setTimeout(() => startGame(), 500);
  }
}

/* ============================================
   RENDER — GAME SCREEN
   ============================================ */
function renderGameUI() {
  for (let i = 0; i < 2; i++) {
    const p = state.players[i];
    const panel = $(`#panel-${i}`);
    panel.querySelector(".char-portrait img").src = p.char.img;
    panel.querySelector(".char-portrait img").alt = p.char.name;
    panel.querySelector(".char-nametag").textContent = p.char.name;
  }
  updateScores();
  updateActivePanel();
  $("#goal-num").textContent = state.goal;
}

function updateScores() {
  for (let i = 0; i < 2; i++) {
    const p = state.players[i];
    $(`#score-${i}`).textContent = p.score;
    $(`#current-${i}`).textContent = p.current;
    renderChips(i, p.score);
  }
  $("#hud-rolls").textContent = String(state.rollsTotal).padStart(3, "0");
  const p1Score = state.players[0]?.score || 0;
  const p2Score = state.players[1]?.score || 0;
  $("#hud-pot").textContent = String(p1Score + p2Score).padStart(3, "0");
}

function updateActivePanel() {
  for (let i = 0; i < 2; i++) {
    const panel = $(`#panel-${i}`);
    panel.classList.toggle("active", i === state.active && state.playing);
    panel.querySelector(".panel-status-label").textContent =
      i === state.active && state.playing ? "ROLLING" : "WAITING";
  }
}

function renderChips(pIdx, score) {
  const row = $(`#chips-${pIdx}`);
  // decompose score into chips: 10s gold, 5s red, 1s blue. cap rendering
  const gold = Math.floor(score / 10);
  const red = Math.floor((score % 10) / 5);
  const blue = score % 5;
  let html = "";
  for (let i = 0; i < gold; i++) html += `<div class="chip gold" style="animation-delay:${i*0.04}s"></div>`;
  for (let i = 0; i < red; i++) html += `<div class="chip red" style="animation-delay:${(gold+i)*0.04}s"></div>`;
  for (let i = 0; i < blue; i++) html += `<div class="chip blue" style="animation-delay:${(gold+red+i)*0.04}s"></div>`;
  if (!html) html = `<div class="chips-empty" style="font-family:var(--mono);font-size:1rem;color:var(--bone-dim);letter-spacing:.2rem;">— no chips —</div>`;
  row.innerHTML = html;
}

/* ============================================
   DICE
   ============================================ */
const DICE_ROTATIONS = {
  1: { x: 0, y: 0 },
  2: { x: 0, y: -90 },
  3: { x: 0, y: 180 },
  4: { x: 0, y: 90 },
  5: { x: -90, y: 0 },
  6: { x: 90, y: 0 },
};

function setDiceFace(n) {
  const dice = $("#dice-3d");
  const rot = DICE_ROTATIONS[n];
  dice.style.transform = `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`;
}

function rollDice() {
  if (!state.playing) return;

  const btnRoll = $("#btn-roll");
  const btnHold = $("#btn-hold");
  btnRoll.disabled = true;
  btnHold.disabled = true;

  const n = Math.trunc(Math.random() * 6) + 1;
  state.rollsTotal++;

  const dice = $("#dice-3d");
  dice.classList.remove("rolling");
  // force reflow
  void dice.offsetWidth;
  dice.classList.add("rolling");

  setTimeout(() => {
    dice.classList.remove("rolling");
    setDiceFace(n);

    if (n === 1) {
      // snake eye / bust
      showSnakeEyes();
      const p = state.players[state.active];
      p.current = 0;
      setTimeout(() => {
        switchPlayer();
        btnRoll.disabled = false;
        btnHold.disabled = false;
      }, 900);
    } else {
      const p = state.players[state.active];
      p.current += n;
      updateScores();
      btnRoll.disabled = false;
      btnHold.disabled = false;
    }
  }, 1150);
}

function showSnakeEyes() {
  const warn = $("#snake-warn");
  warn.classList.remove("show");
  void warn.offsetWidth;
  warn.classList.add("show");
}

function holdScore() {
  if (!state.playing) return;
  const p = state.players[state.active];
  p.score += p.current;
  p.current = 0;
  updateScores();

  if (p.score >= state.goal) {
    winGame(state.active);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  state.players[state.active].current = 0;
  state.active = state.active === 0 ? 1 : 0;
  updateScores();
  updateActivePanel();
}

/* ============================================
   WIN / GAME OVER
   ============================================ */
function winGame(winnerIdx) {
  state.playing = false;
  const winPanel = $(`#panel-${winnerIdx}`);
  const losePanel = $(`#panel-${winnerIdx === 0 ? 1 : 0}`);
  winPanel.classList.add("winner");
  winPanel.classList.remove("active");
  losePanel.classList.add("loser");

  launchParticles();
  $("#btn-roll").disabled = true;
  $("#btn-hold").disabled = true;

  setTimeout(() => showGameOver(winnerIdx), 2400);
}

function showGameOver(winnerIdx) {
  const winner = state.players[winnerIdx];
  const loser = state.players[winnerIdx === 0 ? 1 : 0];

  $("#go-winner-img").src = winner.char.img;
  $("#go-winner-name").textContent = winner.char.name;
  $("#go-winner-score").textContent = winner.score;
  $("#go-winner-quote").textContent = `"${winner.char.quote}"`;

  $("#go-loser-img").src = loser.char.img;
  $("#go-loser-name").textContent = loser.char.name;
  $("#go-loser-score").textContent = loser.score;
  $("#go-loser-quote").textContent = `"${loser.char.loseQuote}"`;

  switchScreen("gameover");
  setTimeout(() => launchParticles(60), 200);
}

function launchParticles(count = 80) {
  if (!TWEAK_DEFAULS.particles) return;
  const layer = $("#particles");
  const colors = ["gold", "red", "bone"];
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = `particle ${colors[i % 3]}`;
    p.style.left = Math.random() * 100 + "%";
    p.style.top = -10 + "%";
    p.style.animationDelay = Math.random() * 1.5 + "s";
    p.style.animationDuration = 2 + Math.random() * 2 + "s";
    p.style.width = (0.6 + Math.random() * 1) + "rem";
    p.style.height = p.style.width;
    layer.appendChild(p);
    setTimeout(() => p.remove(), 5000);
  }
}

/* ============================================
   FLOW
   ============================================ */
function switchScreen(name) {
  state.screen = name;
  Object.entries(screens).forEach(([k, el]) => {
    el.classList.toggle("active", k === name);
  });
}

function startGame() {
  state.active = 0;
  state.playing = true;
  state.rollsTotal = 0;
  state.players[0].score = 0;
  state.players[0].current = 0;
  state.players[1].score = 0;
  state.players[1].current = 0;

  switchScreen("game");
  renderGameUI();
  setDiceFace(1);
}

function fullReset() {
  state.screen = "select";
  state.picking = 0;
  state.players = [null, null];
  state.active = 0;
  state.playing = false;
  state.rollsTotal = 0;

  $$(".char-card").forEach((el) => {
    el.classList.remove("selected", "p1", "p2");
    el.removeAttribute("data-player");
  });
  $("#char-grid").classList.remove("p2-turn");
  $$(".player-panel").forEach((el) => el.classList.remove("winner", "loser", "active"));

  updateSelectHeader();
  switchScreen("select");
}

function newRound() {
  // Keep characters, reset scores
  state.active = 0;
  state.playing = true;
  state.rollsTotal = 0;
  state.players[0].score = 0;
  state.players[0].current = 0;
  state.players[1].score = 0;
  state.players[1].current = 0;
  $$(".player-panel").forEach((el) => el.classList.remove("winner", "loser"));
  switchScreen("game");
  renderGameUI();
  setDiceFace(1);
}

/* ============================================
   INIT
   ============================================ */
function init() {
  renderCharGrid();
  updateSelectHeader();
  switchScreen("select");

  $("#btn-roll").addEventListener("click", rollDice);
  $("#btn-hold").addEventListener("click", holdScore);
  $("#btn-new").addEventListener("click", fullReset);
  $("#btn-again").addEventListener("click", newRound);
  $("#btn-gameover-new").addEventListener("click", fullReset);

  // keyboard
  document.addEventListener("keydown", (e) => {
    if (state.screen !== "game" || !state.playing) return;
    if (e.code === "Space") { e.preventDefault(); rollDice(); }
    if (e.key === "Enter") { e.preventDefault(); holdScore(); }
  });

  // apply tweaks
  applyTweaks();
  setupTweaks();
}

/* ============================================
   TWEAKS
   ============================================ */
function applyTweaks() {
  $(".smoke").style.opacity = TWEAK_DEFAULS.smokeOpacity;
  $(".scanlines").style.display = TWEAK_DEFAULS.scanlines ? "block" : "none";
  state.goal = TWEAK_DEFAULS.goalScore;
  const goalEl = $("#goal-num");
  if (goalEl) goalEl.textContent = state.goal;
}

function setupTweaks() {
  window.addEventListener("message", (e) => {
    const d = e.data;
    if (d?.type === "__activate_edit_mode") $(".tweaks").classList.add("visible");
    if (d?.type === "__deactivate_edit_mode") $(".tweaks").classList.remove("visible");
  });

  const goalInput = $("#tweak-goal");
  const goalOut = $("#tweak-goal-val");
  goalInput.value = TWEAK_DEFAULS.goalScore;
  goalOut.textContent = TWEAK_DEFAULS.goalScore;
  goalInput.addEventListener("input", () => {
    const v = parseInt(goalInput.value, 10);
    TWEAK_DEFAULS.goalScore = v;
    state.goal = v;
    goalOut.textContent = v;
    const goalEl = $("#goal-num");
    if (goalEl) goalEl.textContent = v;
    postTweak({ goalScore: v });
  });

  const smokeInput = $("#tweak-smoke");
  const smokeOut = $("#tweak-smoke-val");
  smokeInput.value = TWEAK_DEFAULS.smokeOpacity;
  smokeOut.textContent = TWEAK_DEFAULS.smokeOpacity;
  smokeInput.addEventListener("input", () => {
    const v = parseFloat(smokeInput.value);
    TWEAK_DEFAULS.smokeOpacity = v;
    $(".smoke").style.opacity = v;
    smokeOut.textContent = v;
    postTweak({ smokeOpacity: v });
  });

  const btnScan = $("#tweak-scanlines");
  btnScan.classList.toggle("on", TWEAK_DEFAULS.scanlines);
  btnScan.addEventListener("click", () => {
    TWEAK_DEFAULS.scanlines = !TWEAK_DEFAULS.scanlines;
    $(".scanlines").style.display = TWEAK_DEFAULS.scanlines ? "block" : "none";
    btnScan.classList.toggle("on", TWEAK_DEFAULS.scanlines);
    postTweak({ scanlines: TWEAK_DEFAULS.scanlines });
  });

  const btnPart = $("#tweak-particles");
  btnPart.classList.toggle("on", TWEAK_DEFAULS.particles);
  btnPart.addEventListener("click", () => {
    TWEAK_DEFAULS.particles = !TWEAK_DEFAULS.particles;
    btnPart.classList.toggle("on", TWEAK_DEFAULS.particles);
    postTweak({ particles: TWEAK_DEFAULS.particles });
  });
}

function postTweak(edits) {
  try {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
  } catch (e) {}
}

// announce edit-mode after listener is registered
window.addEventListener("load", () => {
  try {
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
  } catch (e) {}
});

init();
