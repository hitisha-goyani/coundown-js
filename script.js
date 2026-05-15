// REPLACE old script.js with this updated version


const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const startSound =
  document.getElementById("startSound");

const finishSound =
  document.getElementById("finishSound");

let timer;
let isRunning = false;


/* =========================
   INPUT LIMITATIONS
========================= */

function validateInputs(){

  // Hours max 24
  if(parseInt(hoursInput.value) > 24){
    hoursInput.value = 24;
  }

  // Minutes max 59
  if(parseInt(minutesInput.value) > 59){
    minutesInput.value = 59;
  }

  // Seconds max 59
  if(parseInt(secondsInput.value) > 59){
    secondsInput.value = 59;
  }

  // No negative values
  if(parseInt(hoursInput.value) < 0){
    hoursInput.value = 0;
  }

  if(parseInt(minutesInput.value) < 0){
    minutesInput.value = 0;
  }

  if(parseInt(secondsInput.value) < 0){
    secondsInput.value = 0;
  }

}


/* Live validation */

hoursInput.addEventListener(
  "input",
  validateInputs
);

minutesInput.addEventListener(
  "input",
  validateInputs
);

secondsInput.addEventListener(
  "input",
  validateInputs
);


/* =========================
   START TIMER
========================= */

startBtn.addEventListener("click", () => {

  if(isRunning){

    clearInterval(timer);

    startBtn.innerText = "Start";

    isRunning = false;

    return;
  }

  validateInputs();

  let hours =
    parseInt(hoursInput.value) || 0;

  let minutes =
    parseInt(minutesInput.value) || 0;

  let seconds =
    parseInt(secondsInput.value) || 0;

  let totalSeconds =
    (hours * 3600) +
    (minutes * 60) +
    seconds;

  if(totalSeconds <= 0){
    alert("Please set timer!");
    return;
  }

  // Play start sound
  startSound.play();

  isRunning = true;

  startBtn.innerText = "Pause";

  timer = setInterval(() => {

    if(totalSeconds <= 0){

      clearInterval(timer);

      isRunning = false;

      startBtn.innerText = "Start";

      // Play finish sound
      finishSound.play();

      // Visual effect
      document.body.classList.add(
        "timer-finished"
      );

      setTimeout(() => {

        document.body.classList.remove(
          "timer-finished"
        );

      },3000);

      alert("Timer Completed!");

      return;
    }

    totalSeconds--;

    let h = Math.floor(
      totalSeconds / 3600
    );

    let m = Math.floor(
      (totalSeconds % 3600) / 60
    );

    let s = totalSeconds % 60;

    hoursInput.value =
      String(h).padStart(2,"0");

    minutesInput.value =
      String(m).padStart(2,"0");

    secondsInput.value =
      String(s).padStart(2,"0");

  },1000);

});


/* =========================
   RESET TIMER
========================= */

resetBtn.addEventListener("click", () => {

  clearInterval(timer);

  isRunning = false;

  startBtn.innerText = "Start";

  hoursInput.value = "00";
  minutesInput.value = "05";
  secondsInput.value = "00";

});


/* =========================
   SHARE TIMER
========================= */

const shareBtn =
  document.getElementById("shareBtn");

shareBtn.addEventListener(
  "click",
  async () => {

  const h = hoursInput.value;
  const m = minutesInput.value;
  const s = secondsInput.value;

  const shareURL =
    `${window.location.origin}${window.location.pathname}?h=${h}&m=${m}&s=${s}`;

  if(navigator.share){

    try{

      await navigator.share({

        title:"Live Countdown Timer",

        text:
        `Join my timer ${h}:${m}:${s}`,

        url:shareURL

      });

    }catch(error){

      console.log(error);
    }

  }else{

    navigator.clipboard.writeText(
      shareURL
    );

    alert("Timer link copied!");
  }

});


/* =========================
   LOAD SHARED TIMER
========================= */

const params =
  new URLSearchParams(
    window.location.search
  );

const sharedHours =
  params.get("h");

const sharedMinutes =
  params.get("m");

const sharedSeconds =
  params.get("s");

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