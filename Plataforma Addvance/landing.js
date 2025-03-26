/**
 * Addvance Landing Page JavaScript
 * Optimized for performance and accessibility
 */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollTop = scrollTop;
  });
  
  // Button hover effects
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
  
  // Login and register buttons
  const loginBtn = document.querySelector('.login-btn');
  const registerBtn = document.querySelector('.register-btn');
  
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
  
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
  
  // CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
  
  // Feature card hover effects
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
  });
  
  // Secondary buttons
  const secondaryButtons = document.querySelectorAll('.secondary-button');
  secondaryButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
    
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });
  });
});