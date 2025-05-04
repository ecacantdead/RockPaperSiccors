// Create particle effects for the background
document.addEventListener("DOMContentLoaded", () => {
  // Create particles container
  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles";
  document.body.appendChild(particlesContainer);

  // Generate random particles
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }

  // Add particles on mouse move
  document.addEventListener("mousemove", (e) => {
    if (Math.random() > 0.9) {
      createParticle(particlesContainer, e.clientX, e.clientY);
    }
  });

  // Add click effect
  document.addEventListener("click", (e) => {
    for (let i = 0; i < 10; i++) {
      createParticle(particlesContainer, e.clientX, e.clientY);
    }
  });
});

function createParticle(container, x, y) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random position if not specified
  const posX = x || Math.random() * window.innerWidth;
  const posY = y || Math.random() * window.innerHeight;

  // Random size
  const size = Math.random() * 5 + 2;

  // Random color
  const colors = ["#6e00ff", "#00e5ff", "#ff00e5", "#00ff9d", "#ffcc00"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  // Random movement direction
  const moveX = (Math.random() - 0.5) * 200;
  const moveY = (Math.random() - 0.5) * 200;

  // Set styles
  particle.style.left = `${posX}px`;
  particle.style.top = `${posY}px`;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = color;
  particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
  particle.style.setProperty("--x", `${moveX}px`);
  particle.style.setProperty("--y", `${moveY}px`);

  // Random animation duration
  const duration = Math.random() * 4 + 4;
  particle.style.animationDuration = `${duration}s`;

  // Add to container
  container.appendChild(particle);

  // Remove after animation completes
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}
