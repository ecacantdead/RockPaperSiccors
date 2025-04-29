// Rock Paper Scissors 2025 - Floating Text Version
document.addEventListener("DOMContentLoaded", () => {
  // Simulate loading progress
  const loadingContainer = document.querySelector(".loading-container");
  const loadingBar = document.querySelector(".loading-bar");
  const loadingText = document.querySelector(".loading-text");

  // Force progress even if images fail to load
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += 5;
    loadingBar.style.width = `${progress}%`;
    loadingText.textContent = `Loading... ${progress}%`;

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingContainer.style.opacity = "0";
        loadingContainer.style.visibility = "hidden";
        initGame();
        startFloatingText();
      }, 500);
    }
  }, 100); // Update every 100ms for a total of 2 seconds loading time

  // Initialize floating text background
  function startFloatingText() {
    const container = document.querySelector(".floating-text-container");
    const words = [
      "Rock",
      "Paper",
      "Scissors",
      "Win",
      "Lose",
      "Draw",
      "Game",
      "Play",
      "Choose",
      "Victory",
      "Challenge",
      "Battle",
      "✊",
      "✋",
      "✌️",
    ];

    // Create initial set of floating texts
    for (let i = 0; i < 15; i++) {
      createFloatingText(container, words);
    }

    // Continue creating floating texts at intervals
    setInterval(() => {
      createFloatingText(container, words);
    }, 1000);
  }

  function createFloatingText(container, words) {
    // Create text element
    const text = document.createElement("div");
    text.className = "floating-text";

    // Random word
    const word = words[Math.floor(Math.random() * words.length)];
    text.textContent = word;

    // Random position, size, and animation properties
    const startX = Math.random() * 100; // % of viewport width
    const drift = (Math.random() - 0.5) * 200; // px drift left or right
    const size = Math.random() * 30 + 20; // font size between 20px and 50px
    const duration = Math.random() * 10 + 15; // animation duration between 15s and 25s
    const maxOpacity = Math.random() * 0.2 + 0.05; // opacity between 0.05 and 0.25

    // Apply styles
    text.style.left = `${startX}%`;
    text.style.bottom = "-50px";
    text.style.fontSize = `${size}px`;
    text.style.setProperty("--duration", `${duration}s`);
    text.style.setProperty("--drift", `${drift}px`);
    text.style.setProperty("--max-opacity", maxOpacity);

    // Add to container
    container.appendChild(text);

    // Remove after animation completes
    setTimeout(() => {
      text.remove();
    }, duration * 1000);
  }

  // Initialize game
  function initGame() {
    console.log("Game initialized!");

    // Game variables
    let playerScore = 0;
    let computerScore = 0;

    // DOM elements
    const options = document.querySelectorAll(".option");
    const result = document.querySelector(".result");
    const playerScoreDisplay = document.querySelector(".player-score");
    const computerScoreDisplay = document.querySelector(".computer-score");
    const playerSelection = document.querySelector(".player-selection");
    const computerSelection = document.querySelector(".computer-selection");
    const resetButton = document.querySelector(".reset-btn");

    // Game logic
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const playerChoice = this.getAttribute("data-choice");
        playRound(playerChoice);
      });
    });

    resetButton.addEventListener("click", () => {
      playerScore = 0;
      computerScore = 0;
      updateScores();

      // Reset selections
      resetSelections();

      // Reset result
      result.textContent = "Choose your weapon!";
      result.className = "result";
    });

    function playRound(playerChoice) {
      // Get computer choice
      const choices = ["rock", "paper", "scissors"];
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      // Update selection displays
      updateSelectionDisplay(playerSelection, playerChoice);
      updateSelectionDisplay(computerSelection, computerChoice);

      // Determine winner
      let roundResult;

      if (playerChoice === computerChoice) {
        roundResult = "draw";
        result.textContent = "It's a draw!";
        result.className = "result draw";
      } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
      ) {
        roundResult = "win";
        playerScore++;
        result.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
        result.className = "result win";

        // Create extra floating text on win
        const container = document.querySelector(".floating-text-container");
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            createFloatingText(container, [
              "Winner!",
              "Victory!",
              "Champion!",
              "✨",
              "🏆",
            ]);
          }, i * 200);
        }
      } else {
        roundResult = "lose";
        computerScore++;
        result.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
        result.className = "result lose";
      }

      // Update scores
      updateScores();
    }

    function updateSelectionDisplay(selectionElement, choice) {
      // Clear previous selection
      selectionElement.innerHTML = "";

      // Create new icon element
      const iconElement = document.createElement("div");
      iconElement.className = `icon ${choice}-icon`;

      // Add to selection
      selectionElement.appendChild(iconElement);

      // Add animation
      selectionElement.classList.add("selected");
      setTimeout(() => {
        selectionElement.classList.remove("selected");
      }, 500);
    }

    function resetSelections() {
      playerSelection.innerHTML = '<div class="icon empty-icon"></div>';
      computerSelection.innerHTML = '<div class="icon empty-icon"></div>';
    }

    function updateScores() {
      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;
    }
  }
});
