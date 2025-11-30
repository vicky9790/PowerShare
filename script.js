let batteryA = 70;
let batteryB = 80;

const batteryABar = document.getElementById("batteryA");
const batteryBBar = document.getElementById("batteryB");
const percentA = document.getElementById("percentA");
const percentB = document.getElementById("percentB");

const sendBtnA = document.getElementById("sendBtnA");
const sendBtnB = document.getElementById("sendBtnB");
const connectBtn = document.getElementById("connectBtn");
const resetBtn = document.getElementById("resetBtn");

const sendA = document.getElementById("sendA"); 
const sendB = document.getElementById("sendB");
const energyLine = document.getElementById("energyLine");
const statusText = document.getElementById("statusText");

let isConnected = false;

// -------------------- UPDATE UI --------------------
function updateUI() {
  batteryABar.style.width = batteryA + "%";
  batteryBBar.style.width = batteryB + "%";

  percentA.innerText = batteryA + "%";
  percentB.innerText = batteryB + "%";
}

// -------------------- CONNECT DEVICES --------------------
connectBtn.addEventListener("click", () => {
  isConnected = true;
  statusText.innerText = "Connected ✔";
  statusText.style.color = "green";
});

// -------------------- SEND A -> B --------------------
sendBtnA.addEventListener("click", () => {
  if (!isConnected) {
    alert("Please connect devices first!");
    return;
  }

  let amount = parseInt(sendA.value);

  if (!amount || amount <= 0) return;
  if (amount > batteryA) {
    alert("Phone A doesn't have enough battery!");
    return;
  }

  // Power transfer
  batteryA -= amount;
  batteryB += amount;

  showEnergyAnimation("AtoB");
  updateUI();
});

// -------------------- SEND B -> A (THIS FIXES YOUR ISSUE) --------------------
sendBtnB.addEventListener("click", () => {
  if (!isConnected) {
    alert("Please connect devices first!");
    return;
  }

  let amount = parseInt(sendB.value);

  if (!amount || amount <= 0) return;
  if (amount > batteryB) {
    alert("Phone B doesn't have enough battery!");
    return;
  }

  // Power transfer B → A
  batteryB -= amount;
  batteryA += amount;

  showEnergyAnimation("BtoA");
  updateUI();
});

// -------------------- ENERGY ANIMATION --------------------
function showEnergyAnimation(direction) {
  energyLine.style.opacity = 1;

  if (direction === "AtoB") {
    energyLine.style.transform = "translateX(0px)";
  } else {
    energyLine.style.transform = "translateX(-200px)";
  }

  setTimeout(() => {
    energyLine.style.opacity = 0;
  }, 800);
}

// -------------------- RESET --------------------
resetBtn.addEventListener("click", () => {
  batteryA = 70;
  batteryB = 80;
  isConnected = false;
  statusText.innerText = "Not Connected";
  statusText.style.color = "red";
  updateUI();
});

// Initialize UI
updateUI();
