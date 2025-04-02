/**
 * Empresa Navigation Script
 * Manages the navigation between different sections in the empresa interface
 */

function initializeEmpresaNavigation() {
  // Get all menu options
  const perfilOption = document.getElementById('perfilOption');
  const cursoOption = document.getElementById('cursoOption');
  const networkOption = document.getElementById('networkOption');
  const rankingsOption = document.getElementById('rankingsOption');
  const achievementsOption = document.getElementById('achievementsOption');
  const messagingOption = document.getElementById('empresaMessagingOption');
  const notificationsOption = document.getElementById('empresaNotificationsOption');
  
  // Get all sections
  const profileSection = document.getElementById('profileSection');
  const cursoSection = document.getElementById('cursoSection');
  const networkSection = document.getElementById('networkSection');
  const rankingsSection = document.getElementById('rankingsSection');
  const achievementsSection = document.getElementById('achievementsSection');
  const messagingSection = document.getElementById('empresaMessagingSection');
  const notificationsSection = document.getElementById('empresaNotificationsSection');
  
  // Function to hide all sections
  function hideAllSections() {
    profileSection.style.display = 'none';
    cursoSection.style.display = 'none';
    networkSection.style.display = 'none';
    rankingsSection.style.display = 'none';
    achievementsSection.style.display = 'none';
    
    // Check if messaging and notifications sections exist before trying to hide them
    if (messagingSection) messagingSection.style.display = 'none';
    if (notificationsSection) notificationsSection.style.display = 'none';
  }
  
  // Function to show a specific section
  function showSection(section) {
    hideAllSections();
    if (section) {
      section.style.display = 'block';
    }
  }
  
  // Add click handlers to menu options
  perfilOption.addEventListener('click', function() {
    showSection(profileSection);
    initializeProfileCardFlip();
  });
  
  cursoOption.addEventListener('click', function() {
    showSection(cursoSection);
  });
  
  networkOption.addEventListener('click', function() {
    showSection(networkSection);
  });
  
  rankingsOption.addEventListener('click', function() {
    showSection(rankingsSection);
  });
  
  achievementsOption.addEventListener('click', function() {
    showSection(achievementsSection);
  });
  
  // Add event listeners for messaging and notifications if the sections exist
  if (messagingOption && messagingSection) {
    messagingOption.addEventListener('click', function() {
      showSection(messagingSection);
    });
  }
  
  if (notificationsOption && notificationsSection) {
    notificationsOption.addEventListener('click', function() {
      showSection(notificationsSection);
    });
  }
  
  // Set curso section as visible by default
  showSection(cursoSection);
}

// Initialize navigation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeEmpresaNavigation();
});