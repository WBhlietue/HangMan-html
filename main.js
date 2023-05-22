const ANSWERS = [
  "ZaWarudo",
  "WonderOfYou",
  "KillerQueen",
  "KingCringson",
  "LoveTrain",
  "StarPlutinum",
  "CrazyDiamond",
  "HermitPurple",
  "GoldenExperience",
  "WhiteSnake",
  "MadeInHeaven",
  "HeavensDoor",
  "WeatherReport",
  "StoneFree",
  "Tusk",
  "D4C",
  "SoftAndWet",
];
const ANSWER = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
const main = document.getElementById("main");
const startUI = document.getElementById("startUI");
const gameUI = document.getElementById("gameUI");

function CreateElement(className, id = "") {
  const element = document.createElement("div");
  element.id = id;
  element.className = className;
  return element;
}

function CreateElementWithTag(className, tag, id = "") {
  const element = document.createElement(tag);
  element.id = id;
  element.className = className;
  return element;
}

function Start() {
  let restart = false;
  let winCount = 0;
  let loseCount = 0;

  startUI.style.display = "none";
  gameUI.style.display = "flex";
  gameUI.innerHTML = "";

  const showAnswer = CreateElement("topAnswer");
  const people = CreateElement("people");
  const answer = CreateElement("answer");
  gameUI.appendChild(showAnswer);
  gameUI.appendChild(people);
  gameUI.appendChild(answer);

  const stand = CreateElement("stand");
  let currentAnswer = ANSWER.toLowerCase();
  let error = 0;
  let correct = 0;
  people.appendChild(stand);

  const bodyParts = [
    CreateElement("peopleTop"),
    CreateElement("peopleHead"),
    CreateElement("peopleBody"),
    CreateElement("peopleLArm"),
    CreateElement("peopleRArm"),
    CreateElement("peopleLLeg"),
    CreateElement("peopleRLeg"),
  ];

  bodyParts.forEach((part) => {
    stand.appendChild(part);
    part.style.display = "none";
  });

  const answerParts = [];
  for (let i of ANSWER) {
    let a = CreateElement("answerPart");
    answerParts.push(a);
  }
  answerParts.forEach((part) => {
    showAnswer.appendChild(part);
  });

  const input = CreateElementWithTag("input", "input");
  const btn = CreateElement("btn");
  btn.innerText = "Check";
  input.placeholder = "Enter a letter";
  answer.appendChild(input);
  answer.appendChild(btn);

  btn.addEventListener("click", () => {
    if (restart) {
      ReStart();
      return;
    }

    let char = input.value.toLowerCase();
    if (char.length !== 1) {
      alert("Please enter only one character!");
    } else {
      let a = currentAnswer.indexOf(char);
      if (a >= 0) {
        answerParts[a].innerText = ANSWER[a];
        currentAnswer = currentAnswer.replace(char, " ");
        correct++;
        if (correct >= ANSWER.length) {
          input.style.display = "none";
          btn.innerHTML = "You win!<br>Click to restart";
          btn.classList.add("win");

          winCount++;
          restart = true;
        }
      } else {
        error++;
        if (error >= 8) {
          input.style.display = "none";
          btn.innerHTML = `You lose!<br>Answer: ${ANSWER}<br>Click to restart`;
          btn.classList.add("lose");

          loseCount++;
          restart = true;
        } else {
          bodyParts[error - 1].style.display = "block";
        }
      }
    }

    input.value = "";
  });

  function ReStart() {
    restart = false;
    input.style.display = "block";
    btn.innerText = "Check";
    btn.classList.remove("win", "lose");

    currentAnswer = ANSWER.toLowerCase();
    error = 0;
    correct = 0;

    answerParts.forEach((part) => {
      part.innerText = "";
    });

    bodyParts.forEach((part) => {
      part.style.display = "none";
    });

    Start();
  }
}

startUI.style.display = "block";
