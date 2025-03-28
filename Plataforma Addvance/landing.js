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
  
  // Hamburger menu toggle
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const mainNav = document.querySelector('.main-nav');
  const authButtons = document.querySelector('.auth-buttons');
  const headerContainer = document.querySelector('.header-container');
  
  if (hamburgerMenu) {
    hamburgerMenu.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      
      // Change hamburger icon to X when menu is open
      if (mainNav.classList.contains('active')) {
        hamburgerMenu.innerHTML = '<i class="fas fa-times"></i>';
        // Siempre mover los botones de autenticación al menú de navegación cuando está activo
        if (!document.querySelector('.auth-buttons.mobile-visible')) {
          authButtons.classList.add('mobile-visible');
          mainNav.appendChild(authButtons);
        }
      } else {
        hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        // Devolver los botones de autenticación a su posición original
        authButtons.classList.remove('mobile-visible');
        headerContainer.appendChild(authButtons);
      }
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        hamburgerMenu.innerHTML = '<i class="fas fa-bars"></i>';
        // Devolver los botones de autenticación a su posición original
        authButtons.classList.remove('mobile-visible');
        headerContainer.appendChild(authButtons);
      });
    });
  }
  
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
      window.location.href = 'auth.html';
    });
  }
  
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.location.href = 'auth.html?form=register';
    });
  }
  
  // CTA button
  const ctaButton = document.querySelector('.cta-button');
  if (ctaButton) {
    ctaButton.addEventListener('click', () => {
      window.location.href = 'auth.html?form=register';
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
  const secondaryButtons = document.querySelectorAll('.secondary-button:not(.register-empresa-btn):not(.register-proveedor-btn)');
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
  
  // Registro empresa button
  const registerEmpresaBtn = document.querySelector('.register-empresa-btn');
  if (registerEmpresaBtn) {
    registerEmpresaBtn.addEventListener('click', () => {
      window.location.href = 'registro-empresa.html';
    });
    
    registerEmpresaBtn.addEventListener('mouseenter', () => {
      registerEmpresaBtn.style.transform = 'translateY(-2px)';
    });
    
    registerEmpresaBtn.addEventListener('mouseleave', () => {
      registerEmpresaBtn.style.transform = 'translateY(0)';
    });
  }
  
  // Registro proveedor button
  const registerProveedorBtn = document.querySelector('.register-proveedor-btn');
  if (registerProveedorBtn) {
    registerProveedorBtn.addEventListener('click', () => {
      window.location.href = 'registro-proveedor.html';
    });
    
    registerProveedorBtn.addEventListener('mouseenter', () => {
      registerProveedorBtn.style.transform = 'translateY(-2px)';
    });
    
    registerProveedorBtn.addEventListener('mouseleave', () => {
      registerProveedorBtn.style.transform = 'translateY(0)';
    });
  }
});