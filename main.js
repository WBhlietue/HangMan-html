const ANSWERs = [
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
const ANSWER = ANSWERs[Math.floor(Math.random() * ANSWERs.length)];
const main = document.getElementById("main");
const startUI = document.getElementById("startUI");
const gameUI = document.getElementById("gameUI");
function CreateElement(className, id = "") {
  var element = document.createElement("div");
  element.id = id;
  element.className = className;
  return element;
}
function CreateElementWithTag(className, tag, id = "") {
  var element = document.createElement(tag);
  element.id = id;
  element.className = className;
  return element;
}

function Start() {
  let restart = 0;
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
    if (restart == 1) {
      location.reload();
      return;
    }
    let char = input.value.toLowerCase();
    if (char.length != 1) {
      alert("JUST ENTER 1 CHAR, OK?");
    } else {
      let a = currentAnswer.indexOf(char);
      if (a >= 0) {
        answerParts[a].innerText = ANSWER[a];
        currentAnswer = currentAnswer.replace(char, " ");
        correct++;
        if (correct >= ANSWER.length) {
          input.style.display = "none";
          btn.innerHTML = "You win</br>Click to restart";
          restart = 1;
        }
      } else {
        error++;
        if (error >= 8) {
          input.style.display = "none";
          btn.innerHTML =
            "You lose, Answer is " + ANSWER + "</br>Click to restart";
          restart = 1;
        } else {
          bodyParts[error - 1].style.display = "block";
        }
      }
    }
    input.value = "";
  });
}
function ReStart() {}

startUI.style.display = "block";
