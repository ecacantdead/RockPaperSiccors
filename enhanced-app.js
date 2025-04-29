// Enhanced Rock Paper Scissors Game
document.addEventListener("DOMContentLoaded", () => {
  // Load Google Font
  const fontLink = document.createElement("link");
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700&display=swap";
  fontLink.rel = "stylesheet";
  document.head.appendChild(fontLink);

  // Game variables
  let playerScore = 0;
  let computerScore = 0;
  const options = document.querySelectorAll(".option");
  const result = document.querySelector(".result");
  const playerScoreDisplay = document.querySelector(".player-score");
  const computerScoreDisplay = document.querySelector(".computer-score");
  const playerSelectionImg = document.querySelector(".player-selection img");
  const computerSelectionImg = document.querySelector(
    ".computer-selection img"
  );
  const resetButton = document.querySelector(".reset");

  // Sound effects
  const sounds = {
    click: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-modern-technology-select-3124.mp3"
    ),
    win: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3"
    ),
    lose: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-losing-bleeps-2026.mp3"
    ),
    draw: new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-neutral-game-notification-937.mp3"
    ),
  };

  // Preload sounds
  Object.values(sounds).forEach((sound) => {
    sound.load();
    sound.volume = 0.5;
  });

  // Add 3D hover effect to options
  options.forEach((option) => {
    option.addEventListener("mousemove", (e) => {
      const rect = option.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angleX = (y - centerY) / 10;
      const angleY = (centerX - x) / 10;

      option.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    option.addEventListener("mouseleave", () => {
      option.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  // Game logic
  options.forEach((option) => {
    option.addEventListener("click", function () {
      // Play click sound
      sounds.click.currentTime = 0;
      sounds.click.play();

      // Visual feedback
      options.forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");

      // Get player choice
      const playerChoice = this.getAttribute("data-choice");

      // Show loading animation
      result.innerHTML = '<div class="loading"></div>';
      result.className = "result";

      // Delay computer choice for suspense
      setTimeout(() => {
        playRound(playerChoice);
      }, 1000);
    });
  });

  // Reset game
  resetButton.addEventListener("click", () => {
    sounds.click.currentTime = 0;
    sounds.click.play();

    // Reset scores
    playerScore = 0;
    computerScore = 0;
    updateScores();

    // Reset selections
    playerSelectionImg.src = "/placeholder.svg?height=100&width=100";
    computerSelectionImg.src = "/placeholder.svg?height=100&width=100";

    // Reset result
    result.textContent = "Choose your weapon!";
    result.className = "result";

    // Remove selected class
    options.forEach((opt) => opt.classList.remove("selected"));

    // Add reset animation
    resetButton.classList.add("reset-animation");
    setTimeout(() => resetButton.classList.remove("reset-animation"), 500);
  });

  function playRound(playerChoice) {
    // Get computer choice
    const choices = ["rock", "paper", "scissors"];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    // Update selection images
    playerSelectionImg.src = `./images/${playerChoice}.png`;
    computerSelectionImg.src = `./images/${computerChoice}.png`;

    // Determine winner
    let roundResult;

    if (playerChoice === computerChoice) {
      roundResult = "draw";
      result.textContent = "It's a draw!";
      result.className = "result draw";
      sounds.draw.currentTime = 0;
      sounds.draw.play();
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      roundResult = "win";
      playerScore++;
      result.textContent = `You win! ${playerChoice} beats ${computerChoice}`;
      result.className = "result win";
      sounds.win.currentTime = 0;
      sounds.win.play();
    } else {
      roundResult = "lose";
      computerScore++;
      result.textContent = `You lose! ${computerChoice} beats ${playerChoice}`;
      result.className = "result lose";
      sounds.lose.currentTime = 0;
      sounds.lose.play();
    }

    // Add animation to result
    result.style.animation = "none";
    setTimeout(() => {
      result.style.animation = "bounce 1s";
    }, 10);

    // Update scores
    updateScores();

    // Add selection animations
    animateSelections(roundResult);
  }

  function updateScores() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;

    // Add score change animation
    playerScoreDisplay.style.animation = "none";
    computerScoreDisplay.style.animation = "none";
    setTimeout(() => {
      playerScoreDisplay.style.animation = "glow 1.5s infinite";
      computerScoreDisplay.style.animation = "glow 1.5s infinite";
    }, 10);
  }

  function animateSelections(result) {
    const playerSelection = document.querySelector(
      ".player-selection .selection-image"
    );
    const computerSelection = document.querySelector(
      ".computer-selection .selection-image"
    );

    // Reset animations
    playerSelection.style.animation = "none";
    computerSelection.style.animation = "none";

    setTimeout(() => {
      if (result === "win") {
        playerSelection.style.animation = "glow 1.5s infinite";
        playerSelection.style.borderColor = "rgba(0, 255, 128, 0.7)";
        computerSelection.style.borderColor = "rgba(255, 0, 85, 0.7)";
      } else if (result === "lose") {
        computerSelection.style.animation = "glow 1.5s infinite";
        computerSelection.style.borderColor = "rgba(0, 255, 128, 0.7)";
        playerSelection.style.borderColor = "rgba(255, 0, 85, 0.7)";
      } else {
        playerSelection.style.animation = "glow 1.5s infinite";
        computerSelection.style.animation = "glow 1.5s infinite";
        playerSelection.style.borderColor = "rgba(255, 165, 0, 0.7)";
        computerSelection.style.borderColor = "rgba(255, 165, 0, 0.7)";
      }
    }, 10);
  }
});
