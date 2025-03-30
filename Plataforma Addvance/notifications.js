/**
 * Notifications System for Addvance Platform
 * Handles user notifications and notification center
 * @module notifications
 * @description Sistema de notificaciones para la plataforma Addvance
 * @requires auth.js - Para obtener información del usuario actual
 * @requires localStorage - Para almacenar y recuperar notificaciones
 */

/**
 * Inicializa el sistema de notificaciones cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Verificar si el usuario está autenticado
    const currentUser = obtenerUsuarioActual();
    if (currentUser) {
      // Inicializar el almacenamiento de notificaciones si no existe
      initializeNotificationsStorage();
      // Añadir icono de notificaciones al encabezado
      createNotificationIcon();
    }
  } catch (error) {
    console.error('Error al inicializar el sistema de notificaciones:', error);
  }
});

/**
 * Inicializa el almacenamiento de notificaciones en localStorage si no existe
 * @function initializeNotificationsStorage
 */
function initializeNotificationsStorage() {
  try {
    if (!localStorage.getItem('notificaciones')) {
      localStorage.setItem('notificaciones', JSON.stringify([]));
      console.log('Sistema de notificaciones inicializado correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar el almacenamiento de notificaciones:', error);
  }
}

/**
 * Crea el icono de notificaciones en el encabezado
 * @function createNotificationIcon
 * @returns {void}
 */
function createNotificationIcon() {
  try {
    // Verificar si el icono de notificaciones ya existe
    if (document.getElementById('notification-icon')) return;
    
    // Obtener el contenedor del encabezado
    const headerContainer = document.querySelector('.header-container') || 
                            document.querySelector('.auth-buttons');
    
    if (!headerContainer) {
      console.warn('No se encontró el contenedor del encabezado');
      return;
    }
    
    // Crear contenedor de notificaciones
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-container';
    
    // Crear icono de notificaciones
    const notificationIcon = document.createElement('div');
    notificationIcon.id = 'notification-icon';
    notificationIcon.className = 'notification-icon';
    notificationIcon.innerHTML = `<i class="fas fa-bell"></i>`;
    notificationIcon.setAttribute('title', 'Notificaciones');
    notificationIcon.addEventListener('click', toggleNotificationDropdown);
    
    // Añadir contador de notificaciones no leídas
    const unreadBadge = document.createElement('span');
    unreadBadge.id = 'unread-notifications-badge';
    unreadBadge.className = 'unread-badge';
    unreadBadge.style.display = 'none';
    notificationIcon.appendChild(unreadBadge);
    
    // Añadir al contenedor
    notificationContainer.appendChild(notificationIcon);
    
    // Crear menú desplegable de notificaciones
    const notificationDropdown = document.createElement('div');
    notificationDropdown.id = 'notification-dropdown';
    notificationDropdown.className = 'notification-dropdown';
    notificationDropdown.style.display = 'none';
    
    // Añadir encabezado del menú desplegable
    notificationDropdown.innerHTML = `
      <div class="notification-header">
        <h3>Notificaciones</h3>
        <button id="mark-all-read">Marcar todas como leídas</button>
      </div>
      <div id="notification-list"></div>
    `;
    
    // Añadir menú desplegable al contenedor
    notificationContainer.appendChild(notificationDropdown);
    
    // Insertar antes de los botones de autenticación si existen
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
      headerContainer.insertBefore(notificationContainer, authButtons);
    } else {
      headerContainer.appendChild(notificationContainer);
    }
    
    // Añadir evento para marcar todas las notificaciones como leídas
    const markAllReadBtn = document.getElementById('mark-all-read');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', markAllNotificationsAsRead);
    }
    
    // Cargar notificaciones y actualizar contador
    loadNotifications();
    updateUnreadNotificationsBadge();
  } catch (error) {
    console.error('Error al crear el icono de notificaciones:', error);
  }
}

/**
 * Alterna la visibilidad del menú desplegable de notificaciones
 * @function toggleNotificationDropdown
 */
function toggleNotificationDropdown() {
  try {
    const dropdown = document.getElementById('notification-dropdown');
    if (!dropdown) return;
    
    const isVisible = dropdown.style.display === 'block';
    
    // Ocultar todos los menús desplegables abiertos
    document.querySelectorAll('.notification-dropdown, .messaging-modal').forEach(el => {
      el.style.display = 'none';
    });
    
    // Mostrar u ocultar el menú desplegable de notificaciones
    dropdown.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
      // Cargar notificaciones al abrir el menú
      loadNotifications();
    }
  } catch (error) {
    console.error('Error al alternar el menú desplegable de notificaciones:', error);
  }
}

/**
 * Carga las notificaciones del usuario actual
 * @function loadNotifications
 */
function loadNotifications() {
  try {
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) return;
    
    const notificationList = document.getElementById('notification-list');
    if (!notificationList) return;
    
    // Obtener notificaciones del usuario
    const userNotifications = getUserNotifications(currentUser.correo);
    
    // Limpiar lista actual
    notificationList.innerHTML = '';
    
    // Si no hay notificaciones, mostrar mensaje
    if (userNotifications.length === 0) {
      notificationList.innerHTML = '<div class="empty-notifications">No tienes notificaciones</div>';
      return;
    }
    
    // Ordenar notificaciones por fecha (más recientes primero)
    userNotifications.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    // Añadir notificaciones a la lista
    userNotifications.forEach(notification => {
      const notificationItem = document.createElement('div');
      notificationItem.className = `notification-item ${notification.leida ? '' : 'unread'}`;
      notificationItem.dataset.id = notification.id;
      
      // Formatear fecha
      const date = new Date(notification.fecha);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      let dateDisplay = '';
      if (date.toDateString() === today.toDateString()) {
        // Hoy - mostrar hora
        dateDisplay = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        // Ayer
        dateDisplay = 'Ayer';
      } else {
        // Otra fecha
        dateDisplay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
      
      notificationItem.innerHTML = `
        <div class="notification-content">
          <p>${notification.mensaje}</p>
          <span class="notification-time">${dateDisplay}</span>
        </div>
        <div class="notification-actions">
          <button class="mark-read-btn" title="Marcar como leída">
            <i class="fas ${notification.leida ? 'fa-envelope-open' : 'fa-envelope'}"></i>
          </button>
        </div>
      `;
      
      // Añadir evento para marcar como leída
      const markReadBtn = notificationItem.querySelector('.mark-read-btn');
      if (markReadBtn) {
        markReadBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          markNotificationAsRead(notification.id);
        });
      }
      
      notificationList.appendChild(notificationItem);
    });
    
    // Actualizar contador de notificaciones no leídas
    updateUnreadNotificationsBadge();
  } catch (error) {
    console.error('Error al cargar notificaciones:', error);
  }
}

/**
 * Obtiene las notificaciones de un usuario
 * @function getUserNotifications
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {Array} Lista de notificaciones del usuario
 */
function getUserNotifications(userEmail) {
  try {
    if (!userEmail) return [];
    
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Buscar el registro de notificaciones del usuario
    const userNotificationRecord = notificaciones.find(n => n.usuario === userEmail);
    
    if (!userNotificationRecord) return [];
    
    return userNotificationRecord.notificaciones;
  } catch (error) {
    console.error('Error al obtener notificaciones del usuario:', error);
    return [];
  }
}

/**
 * Marca una notificación como leída
 * @function markNotificationAsRead
 * @param {string} notificationId - ID de la notificación
 */
function markNotificationAsRead(notificationId) {
  try {
    if (!notificationId) return;
    
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) return;
    
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Buscar el registro de notificaciones del usuario
    const userIndex = notificaciones.findIndex(n => n.usuario === currentUser.correo);
    
    if (userIndex === -1) return;
    
    // Buscar la notificación
    const notificationIndex = notificaciones[userIndex].notificaciones.findIndex(n => n.id === notificationId);
    
    if (notificationIndex === -1) return;
    
    // Marcar como leída
    notificaciones[userIndex].notificaciones[notificationIndex].leida = true;
    
    // Guardar cambios
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    
    // Actualizar interfaz
    const notificationItem = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
    if (notificationItem) {
      notificationItem.classList.remove('unread');
      const icon = notificationItem.querySelector('.mark-read-btn i');
      if (icon) {
        icon.className = 'fas fa-envelope-open';
      }
    }
    
    // Actualizar contador de notificaciones no leídas
    updateUnreadNotificationsBadge();
  } catch (error) {
    console.error('Error al marcar notificación como leída:', error);
  }
}

/**
 * Marca todas las notificaciones como leídas
 * @function markAllNotificationsAsRead
 */
function markAllNotificationsAsRead() {
  try {
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) return;
    
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Buscar el registro de notificaciones del usuario
    const userIndex = notificaciones.findIndex(n => n.usuario === currentUser.correo);
    
    if (userIndex === -1) return;
    
    // Marcar todas como leídas
    notificaciones[userIndex].notificaciones.forEach(n => {
      n.leida = true;
    });
    
    // Guardar cambios
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    
    // Actualizar interfaz
    document.querySelectorAll('.notification-item').forEach(item => {
      item.classList.remove('unread');
      const icon = item.querySelector('.mark-read-btn i');
      if (icon) {
        icon.className = 'fas fa-envelope-open';
      }
    });
    
    // Actualizar contador de notificaciones no leídas
    updateUnreadNotificationsBadge();
  } catch (error) {
    console.error('Error al marcar todas las notificaciones como leídas:', error);
  }
}

/**
 * Actualiza el contador de notificaciones no leídas
 * @function updateUnreadNotificationsBadge
 */
function updateUnreadNotificationsBadge() {
  try {
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) return;
    
    const unreadBadge = document.getElementById('unread-notifications-badge');
    if (!unreadBadge) return;
    
    // Obtener notificaciones no leídas
    const unreadCount = getUnreadNotificationsCount(currentUser.correo);
    
    if (unreadCount > 0) {
      unreadBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      unreadBadge.style.display = 'block';
    } else {
      unreadBadge.style.display = 'none';
    }
  } catch (error) {
    console.error('Error al actualizar el contador de notificaciones no leídas:', error);
  }
}

/**
 * Obtiene el número de notificaciones no leídas para un usuario
 * @function getUnreadNotificationsCount
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {number} Número de notificaciones no leídas
 */
function getUnreadNotificationsCount(userEmail) {
  try {
    if (!userEmail) return 0;
    
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Buscar el registro de notificaciones del usuario
    const userNotificationRecord = notificaciones.find(n => n.usuario === userEmail);
    
    if (!userNotificationRecord) return 0;
    
    // Contar notificaciones no leídas
    return userNotificationRecord.notificaciones.filter(n => !n.leida).length;
  } catch (error) {
    console.error('Error al contar notificaciones no leídas:', error);
    return 0;
  }
}

/**
 * Añade una nueva notificación para un usuario
 * @function agregarNotificacion
 * @param {string} userEmail - Correo electrónico del usuario
 * @param {string} mensaje - Mensaje de la notificación
 * @returns {Object} Resultado de la operación
 */
function agregarNotificacion(userEmail, mensaje) {
  try {
    if (!userEmail || !mensaje) {
      return {
        success: false,
        message: 'Se requiere un correo electrónico y un mensaje'
      };
    }
    
    const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
    
    // Buscar el registro de notificaciones del usuario
    const userIndex = notificaciones.findIndex(n => n.usuario === userEmail);
    
    // Crear nueva notificación
    const newNotification = {
      id: Date.now().toString(),
      mensaje,
      fecha: new Date().toISOString(),
      leida: false
    };
    
    if (userIndex === -1) {
      // Crear nuevo registro para el usuario
      notificaciones.push({
        usuario: userEmail,
        notificaciones: [newNotification]
      });
    } else {
      // Añadir notificación al registro existente
      notificaciones[userIndex].notificaciones.push(newNotification);
    }
    
    // Guardar cambios
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    
    // Actualizar interfaz si el usuario actual es el destinatario
    const currentUser = obtenerUsuarioActual();
    if (currentUser && currentUser.correo === userEmail) {
      loadNotifications();
      updateUnreadNotificationsBadge();
    }
    
    return {
      success: true,
      message: 'Notificación añadida exitosamente',
      notification: newNotification
    };
  } catch (error) {
    console.error('Error al añadir notificación:', error);
    return {
      success: false,
      message: 'Error al añadir la notificación'
    };
  }
}