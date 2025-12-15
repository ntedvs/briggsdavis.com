// Portfolio.js - Portfolio grid interactions

export function initPortfolio() {
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // Handle touch devices differently
    portfolioCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Toggle active state on tap
        const isActive = card.classList.contains('is-active');

        // Close all other cards
        portfolioCards.forEach(c => {
          c.classList.remove('is-active');
        });

        // Toggle current card
        if (!isActive) {
          card.classList.add('is-active');
        }
      });
    });

    // Add CSS for touch active state
    const style = document.createElement('style');
    style.textContent = `
      .portfolio-card.is-active .portfolio-card__overlay {
        opacity: 1;
      }
      .portfolio-card.is-active .portfolio-card__title,
      .portfolio-card.is-active .portfolio-card__description {
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  } else {
    // Desktop: hover effects are handled by CSS
    // Add additional interactivity if needed
    portfolioCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        // Optional: Add additional effects on hover
      });

      card.addEventListener('mouseleave', () => {
        // Optional: Cleanup on hover out
      });
    });
  }

  // Optional: Click to open full view/modal
  // Uncomment if you want to add modal functionality
  /*
  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      // Open modal with project details
      console.log('Opening project details...');
    });
  });
  */
}
