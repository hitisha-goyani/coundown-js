// script.js

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let timer;
let isRunning = false;

startBtn.addEventListener("click", () => {

  if(isRunning){

    clearInterval(timer);

    startBtn.innerText = "Start";

    isRunning = false;

    return;
  }

  let hours = parseInt(hoursInput.value) || 0;
  let minutes = parseInt(minutesInput.value) || 0;
  let seconds = parseInt(secondsInput.value) || 0;

  let totalSeconds =
    (hours * 3600) +
    (minutes * 60) +
    seconds;

  if(totalSeconds <= 0){
    return;
  }

  isRunning = true;

  startBtn.innerText = "Pause";

  timer = setInterval(() => {

    if(totalSeconds <= 0){

      clearInterval(timer);

      startBtn.innerText = "Start";

      isRunning = false;

      alert("Time Finished!");

      return;
    }

    totalSeconds--;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    hoursInput.value = String(h).padStart(2,"0");
    minutesInput.value = String(m).padStart(2,"0");
    secondsInput.value = String(s).padStart(2,"0");

  },1000);

});


resetBtn.addEventListener("click", () => {

  clearInterval(timer);

  hoursInput.value = "00";
  minutesInput.value = "05";
  secondsInput.value = "00";

  startBtn.innerText = "Start";

  isRunning = false;

});


// Add this BELOW existing JavaScript


/* =========================
   EXTRA BUTTONS FUNCTIONALITY
========================= */

const extraButtons = document.querySelectorAll(".extra-btn");

const fullScreenBtn = extraButtons[0];
const editTitleBtn = extraButtons[1];
const addMinuteBtn = extraButtons[2];

const title = document.querySelector("h1");


/* FULL SCREEN */


const timerCard = document.querySelector(".timer-card");

fullScreenBtn.addEventListener("click", () => {

  if(!document.fullscreenElement){

    timerCard.requestFullscreen();

    fullScreenBtn.innerText = "Exit Full-screen";

  }else{

    document.exitFullscreen();

    fullScreenBtn.innerText = "Full-screen";
  }

});


/* EDIT TITLE */

editTitleBtn.addEventListener("click", () => {

  let newTitle = prompt(
    "Enter New Timer Title"
  );

  if(newTitle && newTitle.trim() !== ""){

    title.innerText = newTitle;
  }

});


/* +1 MINUTE */

addMinuteBtn.addEventListener("click", () => {

  let currentMinutes =
    parseInt(minutesInput.value) || 0;

  let currentHours =
    parseInt(hoursInput.value) || 0;

  currentMinutes++;

  // Handle overflow
  if(currentMinutes >= 60){

    currentHours++;
    currentMinutes = 0;
  }

  hoursInput.value =
    String(currentHours).padStart(2,"0");

  minutesInput.value =
    String(currentMinutes).padStart(2,"0");

});

/* =========================
   SHARE TIMER FUNCTIONALITY
========================= */

const shareBtn = document.getElementById("shareBtn");

shareBtn.addEventListener("click", async () => {

  // Current timer values
  const h = hoursInput.value;
  const m = minutesInput.value;
  const s = secondsInput.value;

  // Create sharable URL
  const shareURL =
    `${window.location.origin}${window.location.pathname}?h=${h}&m=${m}&s=${s}`;

  // Share API
  if(navigator.share){

    try{

      await navigator.share({

        title: "Live Countdown Timer",

        text:
        `Join my live countdown timer: ${h}:${m}:${s}`,

        url: shareURL

      });

    }catch(error){

      console.log(error);
    }

  }else{

    // Copy fallback
    navigator.clipboard.writeText(shareURL);

    alert("Timer link copied!");
  }

});


/* =========================
   LOAD SHARED TIMER
========================= */

const params = new URLSearchParams(
  window.location.search
);

const sharedHours = params.get("h");
const sharedMinutes = params.get("m");
const sharedSeconds = params.get("s");

if(sharedHours !== null){

  hoursInput.value =
    String(sharedHours).padStart(2,"0");
}

if(sharedMinutes !== null){

  minutesInput.value =
    String(sharedMinutes).padStart(2,"0");
}

if(sharedSeconds !== null){

  secondsInput.value =
    String(sharedSeconds).padStart(2,"0");
}