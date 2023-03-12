const button = document.querySelector("#generate");
const closeButton = document.querySelector("#close");
const letterDisplay = document.querySelector("#letter");
const timerDisplay = document.querySelector("#timer");
const stopDisplay = document.querySelector("#stop");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let timer;
let countDownTimer;
let usedLetters = [];

// Create an audio element for the alarm sound
const alarmSound = new Audio("alarm.mp3");

button.addEventListener("click", function() {
  button.disabled = true;
  stopDisplay.style.display = "none";
  clearInterval(timer);
  clearInterval(countDownTimer);
  if (usedLetters.length === letters.length) {
    usedLetters = [];
  }
  timer = setInterval(() => {
    let randomLetter;
    do {
      const randomIndex = Math.floor(Math.random() * letters.length);
      randomLetter = letters[randomIndex];
    } while (usedLetters.includes(randomLetter));
    usedLetters.push(randomLetter);
    letterDisplay.textContent = randomLetter;
    if (usedLetters.length === letters.length) {
      clearInterval(timer);
      button.disabled = false;
    }
  }, 100);

  setTimeout(() => {
    clearInterval(timer);
    timerDisplay.textContent = "100";
    countDownTimer = setInterval(() => {
      timerDisplay.textContent = parseInt(timerDisplay.textContent) - 1;
      if (timerDisplay.textContent == 0) {
        clearInterval(countDownTimer);
        stopDisplay.style.display = "block";
        button.disabled = false;
        alarmSound.play();
      }
    }, 1000);
  }, 5000);
});

closeButton.addEventListener("click", function() {
  window.close();
});
