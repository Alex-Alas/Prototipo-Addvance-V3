/**
 * Menu Toggle Functionality
 * Handles the expand/collapse functionality for the vertical navigation menu
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize menu toggle functionality
  initializeMenuToggle();
});

// Function to initialize menu toggle functionality
function initializeMenuToggle() {
  const menuToggleBtn = document.getElementById('menuToggle');
  const menu = document.querySelector('.menu');
  
  if (menuToggleBtn && menu) {
    // Set initial state
    let isExpanded = false;
    
    menuToggleBtn.addEventListener('click', function() {
      isExpanded = !isExpanded;
      
      if (isExpanded) {
        menu.classList.add('expanded');
        menuToggleBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
      } else {
        menu.classList.remove('expanded');
        menuToggleBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
      }
    });
    
    // Set active class on menu options
    const menuOptions = document.querySelectorAll('.menu-option');
    menuOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove active class from all options
        menuOptions.forEach(opt => opt.classList.remove('active'));
        // Add active class to clicked option
        this.classList.add('active');
      });
    });
  }
}