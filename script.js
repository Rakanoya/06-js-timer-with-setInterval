// Select the timer display, counter display, and increment button elements
const timerDisplay = document.querySelector('#timer');
const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#incrementButton');
const startButton = document.querySelector('#startButton');

// Initialize the timer value
let timerValue = 20;

// Variable to store the countdown interval
let countdownInterval = null;

// Variable to track if countdown is running
let isCountdownRunning = false;

// Variable to store the time when countdown started
let countdownStartTime = null;

// Initialize the counter value
let counterValue = 0;

// Function to start the countdown
function startCountdown() {
    // Only start if not already running
    if (isCountdownRunning) {
        return;
    }
    isCountdownRunning = true;
    timerValue = 20;
    timerDisplay.textContent = timerValue;
    countdownStartTime = Date.now(); // Store the start time in milliseconds

    // Reset counter for new round
    counterValue = 0;
    counterDisplay.textContent = counterValue;

    // Start the countdown interval
    countdownInterval = setInterval(function() {
        // Decrement the timer value
        timerValue--;
        // Update the timer display
        timerDisplay.textContent = timerValue;

        // Stop the countdown when the timer reaches 0
        if (timerValue <= 0) {
            clearInterval(countdownInterval);
            isCountdownRunning = false;
            timerDisplay.textContent = '0'; // Ensure the display shows 0
        }
    }, 1000);
}

// Function to increase the counter
function increaseCounter() {
    // Only allow increasing if countdown is running
    if (!isCountdownRunning) {
        return;
    }
    // Increment the counter value
    counterValue++;
    // Update the counter display
    counterDisplay.textContent = counterValue;

    // Check if counter is 10 or more and within 10 seconds
    const now = Date.now();
    const secondsPassed = Math.floor((now - countdownStartTime) / 1000);

    if (counterValue >= 10 && secondsPassed <= 10) {
        // Show confetti using the confetti library
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        // Prevent more confetti for this round
        isCountdownRunning = false;
        clearInterval(countdownInterval);
        timerDisplay.textContent = timerValue;
    }
}

// Add an event listener to the increment button to increase the counter when clicked
incrementButton.addEventListener('click', increaseCounter);

// Add an event listener to the start button to start the countdown when clicked
startButton.addEventListener('click', startCountdown);
