// Main.js - Module Orchestrator

import { initSmoothScroll } from './scroll.js';
import { initScrollAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initPortfolio } from './portfolio.js';

// Initialize all modules when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Briggs Davis website loaded');

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize scroll-triggered animations
  initScrollAnimations();

  // Initialize navigation behavior
  initNavigation();

  // Initialize portfolio interactions
  initPortfolio();
});
