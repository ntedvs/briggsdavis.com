// Navigation.js - Nav behavior and active states

export function initNavigation() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__menu a:not(.btn)');
  const sections = document.querySelectorAll('section[id]');

  // Add scrolled class to nav on scroll
  let lastScrollY = window.pageYOffset;

  function updateNavOnScroll() {
    const currentScrollY = window.pageYOffset;

    // Add scrolled class when scrolled down
    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  // Throttle scroll events for performance
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateNavOnScroll();
        updateActiveSection();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Update active section highlighting
  function updateActiveSection() {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to current section link
        const activeLink = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  // Initial call
  updateNavOnScroll();
  updateActiveSection();
}
