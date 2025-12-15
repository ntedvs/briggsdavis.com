// Animations.js - Intersection Observer for scroll-triggered animations

export function initScrollAnimations() {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // If user prefers reduced motion, immediately show all elements
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.classList.add('animate-in');
    });
    return;
  }

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animate-in class when element enters viewport
          entry.target.classList.add('animate-in');

          // Optional: Stop observing after animation (one-time animation)
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    }
  );

  // Observe all elements with data-animate attribute
  const animatedElements = document.querySelectorAll('[data-animate]');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}
