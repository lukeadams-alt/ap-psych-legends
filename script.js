const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let teams = [];
let currentTeam = 0;
let currentLetter = null;

// Example questions
const questions = {
  A: "What is classical conditioning?",
  B: "Define neurotransmitter",
  C: "What is the amygdala responsible for?"
};

// 🔧 SETUP TEAMS
function setupTeams() {
  let num = prompt("How many teams?");
  num = parseInt(num);

  for (let i = 0; i < num; i++) {
    let name = prompt(`Enter name for Team ${i + 1}`);
    teams.push({ name: name || `Team ${i + 1}`, score: 0 });
  }

  renderTeamButtons();
  updateScores();
}

// 🎯 TEAM BUTTONS
function renderTeamButtons() {
  const div = document.getElementById("teams");
  div.innerHTML = "";

  teams.forEach((team, index) => {
    const btn = document.createElement("button");
    btn.innerText = team.name;
    btn.onclick = () => setTeam(index);
    div.appendChild(btn);
  });
}

function setTeam(index) {
  currentTeam = index;
  document.getElementById("currentTeam").innerText =
    "Current: " + teams[index].name;
}

// 🧩 BOARD
function initBoard() {
  const board = document.getElementById("board");

  letters.forEach(letter => {
    const div = document.createElement("div");
    div.className = "box";
    div.innerText = letter;
    div.onclick = () => openQuestion(letter, div);
    board.appendChild(div);
  });
}

// ❓ QUESTION
function openQuestion(letter, element) {
  currentLetter = letter;

  document.getElementById("questionText").innerText =
    questions[letter] || "No question yet";

  document.getElementById("questionBox").classList.remove("hidden");
  element.style.visibility = "hidden";
}

function answer(correct) {
  document.getElementById("questionBox").classList.add("hidden");

  if (correct) {
    document.getElementById("decisionBox").classList.remove("hidden");
  }
}

// 🤝 DECISION
function resolveBox(choice) {
  document.getElementById("decisionBox").classList.add("hidden");

  if (choice === "give") {
    showGiveOptions();
  } else {
    applyEffect(getRandomEffect(), currentTeam);
  }
}

// 👀 VISUAL TEAM SELECTOR
function showGiveOptions() {
  const box = document.getElementById("giveBox");
  box.innerHTML = "<p>Give to which team?</p>";

  teams.forEach((team, index) => {
    const btn = document.createElement("button");
    btn.innerText = team.name;
    btn.onclick = () => {
      box.classList.add("hidden");
      applyEffect(getRandomEffect(), index);
    };
    box.appendChild(btn);
  });

  box.classList.remove("hidden");
}

// 🎲 EFFECTS
function getRandomEffect() {
  const effects = [
    { type: "add", value: 10 },
    { type: "subtract", value: 5 },
    { type: "steal", value: 10 },
    { type: "allAdd", value: 5 }
  ];
  return effects[Math.floor(Math.random() * effects.length)];
}

function applyEffect(effect, teamIndex) {
  if (effect.type === "add") {
    teams[teamIndex].score += effect.value;
  }

  if (effect.type === "subtract") {
    teams[teamIndex].score -= effect.value;
  }

  if (effect.type === "steal") {
    teams.forEach((t, i) => {
      if (i !== teamIndex) {
        t.score -= effect.value;
        teams[teamIndex].score += effect.value;
      }
    });
  }

  if (effect.type === "allAdd") {
    teams.forEach(t => t.score += effect.value);
  }

  alert(`Effect: ${effect.type} ${effect.value}`);
  updateScores();
}

// 📊 SCORES
function updateScores() {
  const div = document.getElementById("scores");
  div.innerHTML = teams
    .map(t => `${t.name}: ${t.score}`)
    .join("<br>");
}

// 🚀 INIT
setupTeams();
initBoard();
