// Rock Paper Scissors 2025 - Optimized & Innovative
document.addEventListener("DOMContentLoaded", () => {
  // Simulate loading progress
  const loadingContainer = document.querySelector(".loading-container")
  const loadingBar = document.querySelector(".loading-bar")
  const loadingText = document.querySelector(".loading-text")

  // Preload assets
  const preloadImages = ["rock.png", "paper.png", "scissors.png", "lizard.png", "spock.png"]

  let loadedAssets = 0
  const totalAssets = preloadImages.length

  // Simulate faster loading with preloaded assets
  preloadImages.forEach((imgSrc) => {
    const img = new Image()
    img.src = `./images/${imgSrc}`
    img.onload = () => {
      loadedAssets++
      const progress = (loadedAssets / totalAssets) * 100
      loadingBar.style.width = `${progress}%`
      loadingText.textContent = `Loading... ${Math.round(progress)}%`

      if (loadedAssets === totalAssets) {
        setTimeout(() => {
          loadingContainer.style.opacity = "0"
          loadingContainer.style.visibility = "hidden"
          initGame()
        }, 500)
      }
    }

    // Fallback if image fails to load
    img.onerror = () => {
      loadedAssets++
      const progress = (loadedAssets / totalAssets) * 100
      loadingBar.style.width = `${progress}%`

      if (loadedAssets === totalAssets) {
        setTimeout(() => {
          loadingContainer.style.opacity = "0"
          loadingContainer.style.visibility = "hidden"
          initGame()
        }, 500)
      }
    }
  })

  // Initialize game after loading
  function initGame() {
    // Game variables
    let playerScore = 0
    let computerScore = 0
    let gameHistory = []
    let gameMode = "classic" // classic or extended
    let streakCount = 0
    let maxStreak = 0
    let gamesPlayed = 0
    let winCount = 0
    let loseCount = 0
    let drawCount = 0

    // DOM elements
    const options = document.querySelectorAll(".option")
    const result = document.querySelector(".result")
    const playerScoreDisplay = document.querySelector(".player-score")
    const computerScoreDisplay = document.querySelector(".computer-score")
    const playerSelectionImg = document.querySelector(".player-selection img")
    const computerSelectionImg = document.querySelector(".computer-selection img")
    const resetButton = document.querySelector(".reset-btn")
    const statsButton = document.querySelector(".stats-btn")
    const statsSection = document.querySelector(".stats")
    const historySection = document.querySelector(".history")
    const historyList = document.querySelector(".history-list")
    const achievementsSection = document.querySelector(".achievements")
    const modeBtns = document.querySelectorAll(".mode-btn")
    const extendedOptions = document.querySelectorAll(".extended-option")
    const themeToggle = document.querySelector(".theme-toggle")
    const aiAssistant = document.querySelector(".ai-assistant")
    const aiChat = document.querySelector(".ai-chat")
    const aiChatClose = document.querySelector(".ai-chat-close")
    const aiChatInput = document.querySelector(".ai-chat-input input")
    const aiChatSend = document.querySelector(".ai-chat-input button")

    // Game rules
    const gameRules = {
      classic: {
        rock: { scissors: true, paper: false },
        paper: { rock: true, scissors: false },
        scissors: { paper: true, rock: false },
      },
      extended: {
        rock: { scissors: true, lizard: true, paper: false, spock: false },
        paper: { rock: true, spock: true, scissors: false, lizard: false },
        scissors: { paper: true, lizard: true, rock: false, spock: false },
        lizard: { paper: true, spock: true, rock: false, scissors: false },
        spock: { rock: true, scissors: true, paper: false, lizard: false },
      },
    }

    // Achievement definitions
    const achievements = [
      { id: "first_win", name: "First Victory", desc: "Win your first game", icon: "🏆", unlocked: false },
      { id: "streak_3", name: "Hat Trick", desc: "Win 3 games in a row", icon: "🔥", unlocked: false },
      { id: "games_10", name: "Dedicated", desc: "Play 10 games", icon: "🎮", unlocked: false },
      { id: "perfect_5", name: "Perfect", desc: "Win 5 games without losing", icon: "⭐", unlocked: false },
      { id: "master", name: "Master", desc: "Win 10 games total", icon: "👑", unlocked: false },
      { id: "explorer", name: "Explorer", desc: "Try extended mode", icon: "🔍", unlocked: false },
    ]

    // Initialize achievements
    renderAchievements()

    // AI assistant responses
    const aiResponses = {
      greetings: [
        "Hello! Need help with the game?",
        "Hi there! I can give you tips on how to play.",
        "Welcome! Ask me anything about the game.",
      ],
      tips: [
        "In classic mode, paper beats rock, rock beats scissors, and scissors beats paper.",
        "In extended mode, Spock beats scissors and rock, while lizard beats Spock and paper.",
        "Try to recognize patterns in your opponent's choices.",
        "The computer's choices are random, so don't overthink your strategy.",
        "Check your stats to see how you're performing over time.",
      ],
      encouragement: [
        "You're doing great! Keep playing!",
        "Don't give up, you can turn this around!",
        "That was close! Try again!",
        "You're getting better with each game!",
      ],
    }

    // Event listeners
    options.forEach((option) => {
      option.addEventListener("click", function () {
        const playerChoice = this.getAttribute("data-choice")
        playRound(playerChoice)
      })
    })

    resetButton.addEventListener("click", resetGame)

    statsButton.addEventListener("click", () => {
      statsSection.classList.toggle("active")
      historySection.classList.toggle("active")
      achievementsSection.classList.toggle("active")
      updateStats()
    })

    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        modeBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        gameMode = btn.getAttribute("data-mode")

        // Show/hide extended options
        if (gameMode === "extended") {
          extendedOptions.forEach((opt) => (opt.style.display = "flex"))
          // Unlock explorer achievement
          unlockAchievement("explorer")
        } else {
          extendedOptions.forEach((opt) => (opt.style.display = "none"))
        }

        resetGame()
      })
    })

    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode")
      const toggleThumb = themeToggle.querySelector(".toggle-thumb")
      toggleThumb.style.transform = document.body.classList.contains("dark-mode") ? "translateX(25px)" : "translateX(0)"
    })

    aiAssistant.addEventListener("click", () => {
      aiChat.classList.toggle("active")
      if (aiChat.classList.contains("active")) {
        // Add initial bot message
        addAiMessage(getRandomResponse(aiResponses.greetings), "bot")
      }
    })

    aiChatClose.addEventListener("click", () => {
      aiChat.classList.remove("active")
    })

    aiChatSend.addEventListener("click", sendUserMessage)

    aiChatInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendUserMessage()
      }
    })

    // Game functions
    function playRound(playerChoice) {
      // Get available choices based on game mode
      const choices = gameMode === "classic" ? ["rock", "paper", "scissors"] : ["rock", "paper", "scissors"]
      : ["rock\", \"paper", "scissors", "lizard", "spock"]
      const computerChoice = choices[Math.floor(Math.random() * choices.length)]

      // Update selection images
      playerSelectionImg.src = `./images/${playerChoice}.png`
      computerSelectionImg.src = `./images/${computerChoice}.png`

      // Add selection animations
      const playerSelection = document.querySelector(".player-selection .selection-image")
      const computerSelection = document.querySelector(".computer-selection .selection-image")

      playerSelection.style.animation = "pulse 0.5s"
      computerSelection.style.animation = "pulse 0.5s"

      // Reset animations after they complete
      setTimeout(() => {
        playerSelection.style.animation = ""
        computerSelection.style.animation = ""
      }, 500)

      // Determine winner
      let roundResult

      if (playerChoice === computerChoice) {
        roundResult = "draw"
        result.textContent = "It's a draw!"
        result.className = "result draw"
        drawCount++
        streakCount = 0
      } else if (gameRules[gameMode][playerChoice][computerChoice]) {
        roundResult = "win"
        result.textContent = `You win! ${playerChoice} beats ${computerChoice}`
        result.className = "result win"
        playerScore++
        winCount++
        streakCount++

        // Create confetti on win
        createConfetti()

        // Check for achievements
        if (winCount === 1) unlockAchievement("first_win")
        if (streakCount >= 3) unlockAchievement("streak_3")
        if (winCount >= 5 && loseCount === 0) unlockAchievement("perfect_5")
        if (winCount >= 10) unlockAchievement("master")

        // Update max streak
        if (streakCount > maxStreak) {
          maxStreak = streakCount
        }
      } else {
        roundResult = "lose"
        result.textContent = `You lose! ${computerChoice} beats ${playerChoice}`
        result.className = "result lose"
        computerScore++
        loseCount++
        streakCount = 0
      }

      // Update scores
      updateScores()

      // Add to history
      addToHistory(playerChoice, computerChoice, roundResult)

      // Update game count
      gamesPlayed++
      if (gamesPlayed >= 10) unlockAchievement("games_10")

      // Update stats
      updateStats()
    }

    function updateScores() {
      playerScoreDisplay.textContent = playerScore
      computerScoreDisplay.textContent = computerScore

      // Add score change animation
      playerScoreDisplay.style.animation = "pulse 0.5s"
      computerScoreDisplay.style.animation = "pulse 0.5s"

      setTimeout(() => {
        playerScoreDisplay.style.animation = ""
        computerScoreDisplay.style.animation = ""
      }, 500)
    }

    function resetGame() {
      playerScore = 0
      computerScore = 0
      updateScores()

      // Reset selections
      playerSelectionImg.src = "/placeholder.svg?height=80&width=80"
      computerSelectionImg.src = "/placeholder.svg?height=80&width=80"

      // Reset result
      result.textContent = "Choose your weapon!"
      result.className = "result"

      // Clear history but keep stats
      gameHistory = []
      historyList.innerHTML = ""
    }

    function addToHistory(playerChoice, computerChoice, outcome) {
      // Add to history array
      gameHistory.push({
        playerChoice,
        computerChoice,
        outcome,
        timestamp: new Date().toLocaleTimeString(),
      })

      // Limit history to last 10 games
      if (gameHistory.length > 10) {
        gameHistory.shift()
      }

      // Update history display
      updateHistoryDisplay()
    }

    function updateHistoryDisplay() {
      historyList.innerHTML = ""

      gameHistory.forEach((game) => {
        const historyItem = document.createElement("div")
        historyItem.className = "history-item"

        historyItem.innerHTML = `
          <span>${game.timestamp}: You chose ${game.playerChoice}, Computer chose ${game.computerChoice}</span>
          <span class="history-result ${game.outcome}">${game.outcome.toUpperCase()}</span>
        `

        historyList.appendChild(historyItem)
      })
    }

    function updateStats() {
      // Update stats values
      document.querySelector(".games-played .stat-value").textContent = gamesPlayed
      document.querySelector(".wins .stat-value").textContent = winCount
      document.querySelector(".losses .stat-value").textContent = loseCount
      document.querySelector(".draws .stat-value").textContent = drawCount
      document.querySelector(".win-rate .stat-value").textContent =
        gamesPlayed > 0 ? `${Math.round((winCount / gamesPlayed) * 100)}%` : "0%"
      document.querySelector(".max-streak .stat-value").textContent = maxStreak
    }

    function renderAchievements() {
      const achievementsGrid = document.querySelector(".achievements-grid")
      achievementsGrid.innerHTML = ""

      achievements.forEach((achievement) => {
        const achievementEl = document.createElement("div")
        achievementEl.className = `achievement ${achievement.unlocked ? "" : "locked"}`
        achievementEl.id = `achievement-${achievement.id}`

        achievementEl.innerHTML = `
          <div class="achievement-icon">${achievement.icon}</div>
          <div class="achievement-name">${achievement.name}</div>
          <div class="achievement-desc">${achievement.desc}</div>
          ${achievement.unlocked ? '<div class="achievement-unlock">✓</div>' : ""}
        `

        achievementsGrid.appendChild(achievementEl)
      })
    }

    function unlockAchievement(id) {
      const achievement = achievements.find((a) => a.id === id)
      if (achievement && !achievement.unlocked) {
        achievement.unlocked = true
        renderAchievements()

        // Show notification
        showAchievementNotification(achievement)
      }
    }

    function showAchievementNotification(achievement) {
      const notification = document.createElement("div")
      notification.className = "achievement-notification"
      notification.innerHTML = `
        <div class="notification-icon">${achievement.icon}</div>
        <div class="notification-content">
          <div class="notification-title">Achievement Unlocked!</div>
          <div class="notification-name">${achievement.name}</div>
          <div class="notification-desc">${achievement.desc}</div>
        </div>
      `

      document.body.appendChild(notification)

      setTimeout(() => {
        notification.classList.add("show")
      }, 100)

      setTimeout(() => {
        notification.classList.remove("show")
        setTimeout(() => notification.remove(), 500)
      }, 3000)
    }

    function createConfetti() {
      const confettiCount = 100
      const colors = ["#6e00ff", "#00e5ff", "#ff00e5", "#00ff9d", "#ffcc00"]

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement("div")
        confetti.className = "confetti"

        // Random position, color, and size
        const size = Math.random() * 10 + 5
        const color = colors[Math.floor(Math.random() * colors.length)]

        confetti.style.width = `${size}px`
        confetti.style.height = `${size}px`
        confetti.style.backgroundColor = color
        confetti.style.left = `${Math.random() * 100}%`
        confetti.style.top = "-10px"

        document.body.appendChild(confetti)

        // Animate confetti
        const duration = Math.random() * 3 + 2
        const rotation = Math.random() * 360
        const spread = Math.random() * 100 - 50

        confetti.animate(
          [
            { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
            { transform: `translateY(100vh) translateX(${spread}px) rotate(${rotation}deg)`, opacity: 0 },
          ],
          {
            duration: duration * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.9, 0.2)",
          },
        )

        // Remove confetti after animation
        setTimeout(() => {
          confetti.remove()
        }, duration * 1000)
      }
    }

    function sendUserMessage() {
      const message = aiChatInput.value.trim()
      if (!message) return

      // Add user message
      addAiMessage(message, "user")
      aiChatInput.value = ""

      // Process message and respond
      setTimeout(() => {
        let response

        if (message.toLowerCase().includes("help") || message.toLowerCase().includes("how")) {
          response = getRandomResponse(aiResponses.tips)
        } else if (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) {
          response = getRandomResponse(aiResponses.greetings)
        } else {
          response = getRandomResponse(aiResponses.encouragement)
        }

        addAiMessage(response, "bot")
      }, 500)
    }

    function addAiMessage(message, type) {
      const messagesContainer = document.querySelector(".ai-chat-messages")
      const messageEl = document.createElement("div")
      messageEl.className = `ai-message ${type}`
      messageEl.textContent = message

      messagesContainer.appendChild(messageEl)
      messagesContainer.scrollTop = messagesContainer.scrollHeight
    }

    function getRandomResponse(responses) {
      return responses[Math.floor(Math.random() * responses.length)]
    }
  }
})
