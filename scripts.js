const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

let teams = [
  { name: "Team 1", score: 0 },
  { name: "Team 2", score: 0 },
  { name: "Team 3", score: 0 }
];

let currentTeam = 0;
let currentLetter = null;

// Example questions
const questions = {
  A: "What is classical conditioning?",
  B: "Define neurotransmitter",
  C: "What is the amygdala responsible for?"
};

function initBoard() {
  const board = document.getElementById("board");

  letters.forEach(letter => {
    const div = document.createElement("div");
    div.className = "box";
    div.innerText = letter;
    div.onclick = () => openQuestion(letter, div);
    board.appendChild(div);
  });

  updateScores();
}

function setTeam(index) {
  currentTeam = index;
  document.getElementById("currentTeam").innerText =
    "Current: " + teams[index].name;
}

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

function resolveBox(choice) {
  document.getElementById("decisionBox").classList.add("hidden");

  let effect = getRandomEffect();

  if (choice === "give") {
    let target = prompt("Give to which team? (0,1,2)");
    applyEffect(effect, parseInt(target));
  } else {
    applyEffect(effect, currentTeam);
  }

  updateScores();
}

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

  alert("Effect: " + effect.type + " " + effect.value);
}

function updateScores() {
  const div = document.getElementById("scores");
  div.innerHTML = teams
    .map(t => `${t.name}: ${t.score}`)
    .join("<br>");
}

initBoard();
