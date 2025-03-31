/**
 * Messaging System for Addvance Platform
 * Handles direct messaging between users
 * @module messaging
 * @description Sistema de mensajería directa entre usuarios de la plataforma Addvance
 * @requires auth.js - Para obtener información del usuario actual
 * @requires localStorage - Para almacenar y recuperar mensajes
 */

/**
 * Inicializa el sistema de mensajería cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', () => {
  try {
    // Verificar si el usuario está autenticado
    const currentUser = obtenerUsuarioActual();
    if (currentUser) {
      // Inicializar el almacenamiento de mensajes si no existe
      initializeMessagingStorage();
      // Añadir icono de mensajería al encabezado
      createMessagingIcon();
    }
  } catch (error) {
    console.error('Error al inicializar el sistema de mensajería:', error);
  }
});

/**
 * Inicializa el almacenamiento de mensajes en localStorage si no existe
 * @function initializeMessagingStorage
 */
function initializeMessagingStorage() {
  try {
    if (!localStorage.getItem('mensajes')) {
      localStorage.setItem('mensajes', JSON.stringify([]));
      console.log('Sistema de mensajería inicializado correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar el almacenamiento de mensajes:', error);
  }
}

/**
 * Crea el icono de mensajería en el encabezado
 * @function createMessagingIcon
 * @returns {void}
 */
function createMessagingIcon() {
  try {
    // Verificar si el icono de mensajería ya existe
    if (document.getElementById('messaging-icon')) return;
    
    // Obtener el contenedor del encabezado
    const headerContainer = document.querySelector('.header-container') || 
                            document.querySelector('.auth-buttons');
    
    if (!headerContainer) {
      console.warn('No se encontró el contenedor del encabezado');
      return;
    }
    
    // Crear contenedor de mensajería
    const messagingContainer = document.createElement('div');
    messagingContainer.className = 'messaging-container';
    
    // Crear icono de mensajería
    const messagingIcon = document.createElement('div');
    messagingIcon.id = 'messaging-icon';
    messagingIcon.className = 'messaging-icon';
    messagingIcon.innerHTML = `<i class="fas fa-envelope"></i>`;
    messagingIcon.setAttribute('title', 'Mensajes');
    messagingIcon.addEventListener('click', openMessagingModal);
    
    // Añadir contador de mensajes no leídos
    const unreadBadge = document.createElement('span');
    unreadBadge.id = 'unread-messages-badge';
    unreadBadge.className = 'unread-badge';
    unreadBadge.style.display = 'none';
    messagingIcon.appendChild(unreadBadge);
    
    // Añadir al contenedor
    messagingContainer.appendChild(messagingIcon);
    
    // Insertar antes del contenedor de notificaciones si existe
    const notificationContainer = document.querySelector('.notification-container');
    if (notificationContainer) {
      headerContainer.insertBefore(messagingContainer, notificationContainer);
    } else {
      // Insertar antes de los botones de autenticación si existen
      const authButtons = document.querySelector('.auth-buttons');
      if (authButtons) {
        headerContainer.insertBefore(messagingContainer, authButtons);
      } else {
        headerContainer.appendChild(messagingContainer);
      }
    }
    
    // Actualizar contador de mensajes no leídos
    updateUnreadMessagesBadge();
  } catch (error) {
    console.error('Error al crear el icono de mensajería:', error);
  }
}

/**
 * Actualiza el contador de mensajes no leídos
 * @function updateUnreadMessagesBadge
 */
function updateUnreadMessagesBadge() {
  try {
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) return;
    
    const unreadBadge = document.getElementById('unread-messages-badge');
    if (!unreadBadge) return;
    
    // Obtener mensajes no leídos
    const unreadCount = getUnreadMessagesCount(currentUser.correo);
    
    if (unreadCount > 0) {
      unreadBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
      unreadBadge.style.display = 'block';
    } else {
      unreadBadge.style.display = 'none';
    }
  } catch (error) {
    console.error('Error al actualizar el contador de mensajes no leídos:', error);
  }
}

/**
 * Obtiene el número de mensajes no leídos para un usuario
 * @function getUnreadMessagesCount
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {number} Número de mensajes no leídos
 */
function getUnreadMessagesCount(userEmail) {
  try {
    if (!userEmail) return 0;
    
    const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
    
    // Filtrar mensajes no leídos dirigidos al usuario
    const unreadMessages = mensajes.filter(msg => 
      msg.para === userEmail && 
      !msg.leido
    );
    
    return unreadMessages.length;
  } catch (error) {
    console.error('Error al contar mensajes no leídos:', error);
    return 0;
  }
}

// Open messaging modal
function openMessagingModal() {
  // Check if modal already exists
  let messagingModal = document.getElementById('messaging-modal');
  
  if (!messagingModal) {
    // Create modal
    messagingModal = document.createElement('div');
    messagingModal.id = 'messaging-modal';
    messagingModal.className = 'modal';
    messagingModal.innerHTML = `
      <div class="modal-content messaging-modal-content">
        <span class="close-modal">&times;</span>
        <h2>Mensajes</h2>
        
        <div class="messaging-container">
          <div class="conversations-list">
            <div class="search-container">
              <input type="text" id="conversation-search" placeholder="Buscar conversación...">
            </div>
            <div id="conversations-container"></div>
          </div>
          
          <div class="chat-container">
            <div class="chat-header">
              <h3 id="chat-recipient">Selecciona una conversación</h3>
            </div>
            <div id="chat-messages"></div>
            <div class="chat-input-container" id="chat-input-container" style="display: none;">
              <textarea id="message-input" placeholder="Escribe un mensaje..."></textarea>
              <button id="send-message-btn"><i class="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(messagingModal);
    
    // Add event listeners
    const closeBtn = messagingModal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
      messagingModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === messagingModal) {
        messagingModal.style.display = 'none';
      }
    });
    
    // Search functionality
    const searchInput = document.getElementById('conversation-search');
    searchInput.addEventListener('input', filterConversations);
    
    // Load conversations
    loadConversations();
  }
  
  // Show modal
  messagingModal.style.display = 'block';
}

// Load conversations for current user
function loadConversations() {
  const currentUser = obtenerUsuarioActual();
  if (!currentUser) return;
  
  const conversationsContainer = document.getElementById('conversations-container');
  if (!conversationsContainer) return;
  
  // Get conversations
  const conversations = obtenerConversaciones(currentUser.correo);
  
  // Clear container
  conversationsContainer.innerHTML = '';
  
  // If no conversations, show message
  if (conversations.length === 0) {
    conversationsContainer.innerHTML = `
      <div class="empty-conversations">
        <p>No tienes conversaciones</p>
        <button id="new-conversation-btn">Nueva conversación</button>
      </div>
    `;
    
    // Add event listener to new conversation button
    const newConversationBtn = document.getElementById('new-conversation-btn');
    if (newConversationBtn) {
      newConversationBtn.addEventListener('click', showNewConversationForm);
    }
    
    return;
  }
  
  // Add conversations to list
  conversations.forEach(conversation => {
    const conversationItem = document.createElement('div');
    conversationItem.className = 'conversation-item';
    conversationItem.dataset.email = conversation.correo;
    
    // Format date
    let dateDisplay = '';
    if (conversation.fechaUltimoMensaje) {
      const date = new Date(conversation.fechaUltimoMensaje);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === today.toDateString()) {
        // Today - show time
        dateDisplay = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      } else if (date.toDateString() === yesterday.toDateString()) {
        // Yesterday
        dateDisplay = 'Ayer';
      } else {
        // Other date
        dateDisplay = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      }
    }
    
    conversationItem.innerHTML = `
      <div class="conversation-avatar">
        <i class="fas ${conversation.tipoPerfil === 'empresa' ? 'fa-building' : conversation.tipoPerfil === 'proveedor' ? 'fa-truck' : 'fa-user'}"></i>
      </div>
      <div class="conversation-info">
        <div class="conversation-name">${conversation.nombre}</div>
        <div class="conversation-preview">${conversation.ultimoMensaje || 'Iniciar conversación'}</div>
      </div>
      <div class="conversation-time">${dateDisplay}</div>
    `;
    
    conversationItem.addEventListener('click', () => loadChat(conversation.correo, conversation.nombre, conversation.tipoPerfil));
    
    conversationsContainer.appendChild(conversationItem);
  });
  
  // Add new conversation button
  const newConversationBtn = document.createElement('button');
  newConversationBtn.id = 'new-conversation-btn';
  newConversationBtn.className = 'new-conversation-btn';
  newConversationBtn.innerHTML = '<i class="fas fa-plus"></i> Nueva conversación';
  newConversationBtn.addEventListener('click', showNewConversationForm);
  
  conversationsContainer.appendChild(newConversationBtn);
}

// Filter conversations based on search input
function filterConversations() {
  const searchInput = document.getElementById('conversation-search');
  const searchTerm = searchInput.value.toLowerCase();
  const conversationItems = document.querySelectorAll('.conversation-item');
  
  conversationItems.forEach(item => {
    const name = item.querySelector('.conversation-name').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Show form to start a new conversation
function showNewConversationForm() {
  const currentUser = obtenerUsuarioActual();
  if (!currentUser) return;
  
  // Get all users except current user
  const allUsers = obtenerUsuarios().filter(user => user.correo !== currentUser.correo);
  
  // Create form
  const conversationsContainer = document.getElementById('conversations-container');
  if (!conversationsContainer) return;
  
  conversationsContainer.innerHTML = `
    <div class="new-conversation-form">
      <h3>Nueva conversación</h3>
      <div class="search-container">
        <input type="text" id="user-search" placeholder="Buscar usuario...">
      </div>
      <div class="users-list">
        ${allUsers.map(user => `
          <div class="user-item" data-email="${user.correo}">
            <div class="user-avatar">
              <i class="fas ${user.tipoPerfil === 'empresa' ? 'fa-building' : user.tipoPerfil === 'proveedor' ? 'fa-truck' : 'fa-user'}"></i>
            </div>
            <div class="user-info">
              <div class="user-name">${user.nombre}</div>
              <div class="user-type">${user.tipoPerfil.charAt(0).toUpperCase() + user.tipoPerfil.slice(1)}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <button id="cancel-new-conversation">Cancelar</button>
    </div>
  `;
  
  // Add event listeners
  const userItems = document.querySelectorAll('.user-item');
  userItems.forEach(item => {
    item.addEventListener('click', () => {
      const email = item.dataset.email;
      const name = item.querySelector('.user-name').textContent;
      const type = item.querySelector('.user-type').textContent.toLowerCase();
      loadChat(email, name, type);
      loadConversations();
    });
  });
  
  const cancelBtn = document.getElementById('cancel-new-conversation');
  cancelBtn.addEventListener('click', loadConversations);
  
  // Search functionality
  const searchInput = document.getElementById('user-search');
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const userItems = document.querySelectorAll('.user-item');
    
    userItems.forEach(item => {
      const name = item.querySelector('.user-name').textContent.toLowerCase();
      if (name.includes(searchTerm)) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

// Load chat with selected user
function loadChat(recipientEmail, recipientName, recipientType) {
  const currentUser = obtenerUsuarioActual();
  if (!currentUser) return;
  
  // Update chat header
  const chatRecipient = document.getElementById('chat-recipient');
  if (chatRecipient) {
    chatRecipient.innerHTML = `
      <div class="chat-recipient-info">
        <i class="fas ${recipientType === 'empresa' ? 'fa-building' : recipientType === 'proveedor' ? 'fa-truck' : 'fa-user'}"></i>
        <span>${recipientName}</span>
      </div>
    `;
  }
  
  // Show chat input
  const chatInputContainer = document.getElementById('chat-input-container');
  if (chatInputContainer) {
    chatInputContainer.style.display = 'flex';
  }
  
  // Get messages
  const messages = obtenerMensajes(currentUser.correo, recipientEmail);
  
  // Display messages
  const chatMessages = document.getElementById('chat-messages');
  if (!chatMessages) return;
  
  chatMessages.innerHTML = '';
  
  if (messages.length === 0) {
    chatMessages.innerHTML = `
      <div class="empty-chat">
        <p>No hay mensajes. Envía el primer mensaje para iniciar la conversación.</p>
      </div>
    `;
  } else {
    messages.forEach(message => {
      const isCurrentUser = message.de === currentUser.correo;
      const messageItem = document.createElement('div');
      messageItem.className = `message-item ${isCurrentUser ? 'sent' : 'received'}`;
      
      // Format date
      const date = new Date(message.fecha);
      const formattedTime = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
      
      messageItem.innerHTML = `
        <div class="message-content">
          <p>${message.mensaje}</p>
          <span class="message-time">${formattedTime}</span>
        </div>
      `;
      
      chatMessages.appendChild(messageItem);
    });
  }
}
