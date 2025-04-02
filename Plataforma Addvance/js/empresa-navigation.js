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
  
  // Create an array of all menu options for easier management
  const allMenuOptions = [
    perfilOption,
    cursoOption,
    networkOption,
    rankingsOption,
    achievementsOption,
    messagingOption,
    notificationsOption
  ].filter(option => option !== null); // Filter out any null options
  
  // Remove active class from all menu options initially
  allMenuOptions.forEach(option => {
    if (option) option.classList.remove('active');
  });
  
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
  
  // Function to remove active class from all menu options
  function removeActiveClassFromAllOptions() {
    allMenuOptions.forEach(option => {
      option.classList.remove('active');
    });
  }
  
  // Function to show a specific section and activate corresponding menu option
  function showSection(section, activeOption) {
    hideAllSections();
    removeActiveClassFromAllOptions();
    
    if (section) {
      section.style.display = 'block';
    }
    
    if (activeOption) {
      // Asegurarse de que solo esta opción tenga la clase 'active'
      activeOption.classList.add('active');
    }
  }
  
  // Add click handlers to menu options
  perfilOption.addEventListener('click', function() {
    showSection(profileSection, perfilOption);
    initializeProfileCardFlip();
  });
  
  cursoOption.addEventListener('click', function() {
    showSection(cursoSection, cursoOption);
  });
  
  networkOption.addEventListener('click', function() {
    showSection(networkSection, networkOption);
  });
  
  rankingsOption.addEventListener('click', function() {
    showSection(rankingsSection, rankingsOption);
  });
  
  achievementsOption.addEventListener('click', function() {
    showSection(achievementsSection, achievementsOption);
  });
  
  // Add event listeners for messaging and notifications if the sections exist
  if (messagingOption && messagingSection) {
    messagingOption.addEventListener('click', function() {
      showSection(messagingSection, messagingOption);
    });
  }
  
  if (notificationsOption && notificationsSection) {
    notificationsOption.addEventListener('click', function() {
      showSection(notificationsSection, notificationsOption);
    });
  }
  
  // Set curso section as visible by default and activate its menu option
  showSection(cursoSection, cursoOption);
}

// Initialize navigation when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeEmpresaNavigation();
});