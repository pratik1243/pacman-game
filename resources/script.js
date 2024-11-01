let y = 250;
let x = 700;
let count = 0;
let speed = 100;
let pacManTime;
let direction = null;
let randomColor = [
  "#e81416",
  "#ffa500",
  "#faeb36",
  "#79c314",
  "#487de7",
  "#4b369d",
  "#70369d",
  "#A3E4D7 ",
  "#F4F6F7",
  "#D2B4DE",
  "#45B39D",
  "#D4AC0D",
];
let food = document.querySelector(".food");
let pacMan = document.querySelector(".pac-body");
let gameOver = document.querySelector(".game-over-sec");
let playBtn = document.querySelector(".play-again-btn");
let pacEatSound = document.querySelector(".pac-eat-sound");
let countSec = document.querySelector(".count");
let gameSec = document.querySelector(".game-sec");
let gameStartSec = document.querySelector(".game-start-sec");
let startBtn = document.querySelector(".start-game-btn");
let keyBtn = document.querySelectorAll(".key-btn");

function foodPosition() {
  let foodXPosition = Math.floor(Math.random() * 81);
  let foodYPosition = Math.floor(Math.random() * 50);
  food.style.display = "block";
  food.style.backgroundColor = randomColor[Math.floor(Math.random() * 7)];
  food.style.top = `${foodYPosition}0px`;
  food.style.left = `${foodXPosition}0px`;
}

function movepacMan() {
  let foodX = window.getComputedStyle(food).getPropertyValue("left");
  let foodY = window.getComputedStyle(food).getPropertyValue("top");

  if (x == 800 || x == 0 || y == 0 || y == 470) {
    pacEatSound.setAttribute("src", "/resources/pacman_death.wav");
    pacEatSound.play();
    clearInterval(pacManTime);
    food.style.display = "none";
    pacMan.style.display = "none";
    gameOver.style.display = "block";
    gameSec.style.display = "none";
  } else {
    if (direction == "bottom") {
      y = y + 10;
      pacMan.style.top = `${y}px`;
      pacMan.style.transform = "rotateZ(283deg)";
    } else if (direction == "top") {
      y = y - 10;
      pacMan.style.top = `${y}px`;
      pacMan.style.transform = "rotateZ(107deg)";
    } else if (direction == "right") {
      x = x + 10;
      pacMan.style.left = `${x}px`;
      pacMan.style.transform = "rotateZ(195deg)";
    } else if (direction == "left") {
      x = x - 10;
      pacMan.style.left = `${x}px`;
      pacMan.style.transform = "rotateZ(13deg)";
    } else if (direction == null) {
      x = x - 10;
      direction = "left";
      pacMan.style.display = "block";
      pacMan.style.left = `${x}px`;
      pacMan.style.top = `${y}px`;
    }

    if (
      y > Math.floor(parseInt(foodY) - 40) &&
      y < Math.floor(parseInt(foodY) + 20) &&
      x > Math.floor(parseInt(foodX) - 40) &&
      x < Math.floor(parseInt(foodX) + 20)
    ) {
      clearInterval(pacManTime);
      foodPosition();
      pacEatSound.play();
      count = count + 3;
      countSec.innerHTML = count;
      speed = speed - 3;
      pacManTime = setInterval(movepacMan, speed);
    }
  }
}

foodPosition();

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowUp") {
    if (direction == "left" || direction == "right") {
      direction = "top";
    }
  } else if (event.key == "ArrowDown") {
    if (direction == "left" || direction == "right") {
      direction = "bottom";
    }
  } else if (event.key == "ArrowRight") {
    if (direction == "top" || direction == "bottom") {
      direction = "right";
    }
  } else if (event.key == "ArrowLeft") {
    if (direction == "top" || direction == "bottom") {
      direction = "left";
    }
  }
});

keyBtn.forEach((key) => {
  key.addEventListener("click", function (event) {
    let keyType = event.currentTarget.dataset.id;

    if (keyType == "ArrowUp") {
      if (direction == "left" || direction == "right") {
        direction = "top";
      }
    } else if (keyType == "ArrowDown") {
      if (direction == "left" || direction == "right") {
        direction = "bottom";
      }
    } else if (keyType == "ArrowRight") {
      if (direction == "top" || direction == "bottom") {
        direction = "right";
      }
    } else if (keyType == "ArrowLeft") {
      if (direction == "top" || direction == "bottom") {
        direction = "left";
      }
    }
  });
});

playBtn.addEventListener("click", function () {
  location.reload();
});

startBtn.addEventListener("click", function () {
  gameStartSec.style.display = "none";
  gameSec.style.display = "block";
  pacManTime = setInterval(movepacMan, speed);
});
