/**
 * Notifications System for Addvance Platform
 * Handles user notifications and notification center
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const currentUser = obtenerUsuarioActual();
  if (currentUser) {
    // Add notification icon to header
    createNotificationIcon();
  }
});

// Create notification icon in header
function createNotificationIcon() {
  // Check if notification icon already exists
  if (document.getElementById('notification-icon')) return;
  
  // Get header container
  const headerContainer = document.querySelector('.header-container') || 
                          document.querySelector('.auth-buttons');
  
  if (!headerContainer) return;
  
  // Create notification container
  const notificationContainer = document.createElement('div');
  notificationContainer.className = 'notification-container';
  
  // Create notification icon
  const notificationIcon = document.createElement('div');
  notificationIcon.id = 'notification-icon';
  notificationIcon.className = 'notification-icon';
  notificationIcon.innerHTML = `<i class="fas fa-bell"></i>`;
  notificationIcon.addEventListener('click', toggleNotificationDropdown);
  
  // Append to container
  notificationContainer.appendChild(notificationIcon);
  
  // Create notification dropdown
  const notificationDropdown = document.createElement('div');
  notificationDropdown.id = 'notification-dropdown';
  notificationDropdown.className = 'notification-dropdown';
  notificationDropdown.style.display = 'none';
  
  // Add dropdown header
  notificationDropdown.innerHTML = `
    <div class="notification-header">
      <h3>Notificaciones</h3>
      <button id="mark-all-read">Marcar todas como leídas</button>
    </div>
    <div id="notification-list"></div>
  `;
  
  // Append dropdown to container
  notificationContainer.appendChild(notificationDropdown);
  
  // Insert before auth buttons if they exist
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons) {
    headerContainer.insertBefore(notificationContainer, authButtons