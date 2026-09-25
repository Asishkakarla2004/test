const timerDisplay = document.getElementById("timer");
const timerSelect = document.getElementById("timerSelect");
const progress = document.getElementById("progress");
const statusText = document.getElementById("status");
const quoteText = document.getElementById("quote");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const quoteBtn = document.getElementById("quoteBtn");

let totalSeconds = 1500;
let remainingSeconds = totalSeconds;
let timerInterval = null;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
  progress.style.width = `${(remainingSeconds / totalSeconds) * 100}%`;
}

async function loadTimers() {
  try {
    const response = await fetch("/api/timers");
    if (!response.ok) throw new Error("Could not load timers");
    const result = await response.json();

    timerSelect.innerHTML = "";
    result.data.forEach(timer => {
      const option = document.createElement("option");
      option.value = timer.duration * 60;
      option.textContent = `${timer.name} - ${timer.duration} minutes`;
      timerSelect.appendChild(option);
    });

    timerSelect.value = "1500";
    resetTimer();
  } catch (error) {
    statusText.textContent = "Unable to load timer presets.";
  }
}

function startTimer() {
  if (timerInterval !== null || remainingSeconds <= 0) return;
  statusText.textContent = "Stay focused and enjoy nature.";

  timerInterval = setInterval(() => {
    remainingSeconds--;
    updateDisplay();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      statusText.textContent = "🌳 Session complete! Take a relaxing break.";
      alert("Timer completed! Great work.");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  statusText.textContent = "Timer paused.";
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = Number(timerSelect.value) || 1500;
  remainingSeconds = totalSeconds;
  updateDisplay();
  statusText.textContent = "Take a deep breath and begin.";
}

async function loadQuote() {
  try {
    const response = await fetch("/api/quote");
    if (!response.ok) throw new Error("Could not load quote");
    const result = await response.json();
    quoteText.textContent = result.quote;
  } catch (error) {
    quoteText.textContent = "Keep growing, one moment at a time.";
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
timerSelect.addEventListener("change", resetTimer);
quoteBtn.addEventListener("click", loadQuote);

updateDisplay();
loadTimers();
loadQuote();
