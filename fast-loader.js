// Fast loader that doesn't get stuck
document.addEventListener("DOMContentLoaded", () => {
  // Get loading elements
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
    const playerSelectionImg = document.querySelector(".player-selection img");
    const computerSelectionImg = document.querySelector(
      ".computer-selection img"
    );
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
      playerSelectionImg.src = "/placeholder.svg?height=80&width=80";
      computerSelectionImg.src = "/placeholder.svg?height=80&width=80";

      // Reset result
      result.textContent = "Choose your weapon!";
      result.className = "result";
    });

    function playRound(playerChoice) {
      // Get computer choice
      const choices = ["rock", "paper", "scissors"];
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

      // Update selection images with fallbacks
      try {
        playerSelectionImg.src = `./images/${playerChoice}.png`;
        playerSelectionImg.onerror = () => {
          playerSelectionImg.src = "/placeholder.svg?height=80&width=80";
        };
      } catch (e) {
        playerSelectionImg.src = "/placeholder.svg?height=80&width=80";
      }

      try {
        computerSelectionImg.src = `./images/${computerChoice}.png`;
        computerSelectionImg.onerror = () => {
          computerSelectionImg.src = "/placeholder.svg?height=80&width=80";
        };
      } catch (e) {
        computerSelectionImg.src = "/placeholder.svg?height=80&width=80";
      }

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

    function updateScores() {
      playerScoreDisplay.textContent = playerScore;
      computerScoreDisplay.textContent = computerScore;
    }
  }
});
