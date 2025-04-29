// Rock Paper Scissors 2025 - SVG Version
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
      }, 500);
    }
  }, 100); // Update every 100ms for a total of 2 seconds loading time

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
