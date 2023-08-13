let header = document.querySelector("header");
let gameover = document.querySelector("gameover");
let timer = 60;
let score = 0;
let hitsRn = 0;
let totalBabbles = 50;
function increaseScore() {
  score += 10;
  document.querySelector(".score").textContent = score;
}

function hits() {
  hitsRn = Number(Math.floor(Math.random() * 10));
  document.querySelector(".hit").textContent = hitsRn;
}

function RGBcolor() {
  for (let i = 0; i <= totalBabbles; i++) {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    document.querySelectorAll(".bubble")[i].style.backgroundColor =
      "rgb(" + r + "," + g + "," + b + ")";
  }
}

function playSound() {
  var track = document.getElementById("track");
  track.play();
}

function makeBubbls() {
  let bubble = "";
  for (var i = 0; i <= totalBabbles; i++) {
    let rn = Math.floor(Math.random() * 10);
    bubble += `<div class="bubble delay-${[i]}" style="animation-duration:${
      rn + 7
    }s">${rn}</div>`;
  }
  document.querySelector(".bubbles").innerHTML = bubble;
}

function timerStart() {
  setInterval(() => {
    if (timer > 0) {
      timer--;
      document.querySelector("#timer").textContent = timer;
    } else {
      clearInterval(timer);
      document.querySelector(
        "#bubbles"
      ).innerHTML = `<div class="gameover" id="gameover"><h2>Game Over</h2></div>`;
      document.querySelector(".gameover").style.width = "100%";
      document.querySelector(".gameover h2").style.opacity = "1";
      header.style.display = "none";
    }
    if (timer < 10) {
      document.querySelector("#timer").classList.add("blink");
    }
    if (timer <= 0) {
      document.querySelector("#timer").classList.remove("blink");
    }
  }, 1000);
}

document.querySelector("#bubbles").addEventListener("click", function (e) {
  let targetClicker = e.target;
  let targetNum = Number(e.target.textContent);

  if (targetNum == hitsRn) {
    increaseScore();
    targetClicker.classList.add("flying");
    setTimeout(function () {
      targetClicker.classList.remove("flying");
    }, 1000);

    playSound();
    setTimeout(function () {
      hits();
      makeBubbls();
      RGBcolor();
    }, 2000);
  } else {
    // targetClicker.classList.add("shake");
    setTimeout(function () {
      targetClicker.classList.remove("shake");
    }, 3000);
  }
});

hits();
timerStart();
makeBubbls();
RGBcolor();
