/**
 * Menu Component System
 * A modular approach to handle menu creation and management
 */

class MenuSystem {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      collapsed: false,
      defaultSection: null,
      ...options
    };
    this.menuItems = [];
    this.sections = {};
    this.init();
  }
  
  init() {
    // Create base menu structure
    this.container.innerHTML = `
      <button class="menu-toggle" id="${this.container.id}Toggle">
        <i class="fas fa-chevron-right"></i>
      </button>
      <div class="menu-options">
        <div class="menu-section-label">MENÚ</div>
        <div id="${this.container.id}Items" class="menu-items-container"></div>
        <div class="menu-footer">
          <button class="logout-button">
            <i class="fas fa-sign-out-alt"></i>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    `;
    
    // Setup toggle functionality
    this.setupToggle();
    
    // Setup logout
    this.setupLogout();
  }
  
  addMenuItem(id, icon, label, sectionId, isDefault = false) {
    const itemsContainer = document.getElementById(`${this.container.id}Items`);
    const menuItem = document.createElement('button');
    menuItem.id = id;
    menuItem.className = 'menu-option';
    if (isDefault || (this.options.defaultSection && this.options.defaultSection === sectionId)) {
      menuItem.classList.add('active');
    }
    
    menuItem.innerHTML = `
      <i class="fas ${icon}"></i>
      <span>${label}</span>
    `;
    
    itemsContainer.appendChild(menuItem);
    
    // Store reference to menu item and section
    this.menuItems.push({
      id,
      element: menuItem,
      sectionId
    });
    
    // Add click event
    menuItem.addEventListener('click', () => this.showSection(sectionId));
    
    return this;
  }
  
  registerSection(sectionId, initCallback = null) {
    this.sections[sectionId] = {
      id: sectionId,
      element: document.getElementById(sectionId),
      initCallback
    };
    
    return this;
  }
  
  showSection(sectionId) {
    // Hide all sections
    Object.values(this.sections).forEach(section => {
      if (section.element) {
        section.element.style.display = 'none';
      }
    });
    
    // Show selected section
    const section = this.sections[sectionId];
    if (section && section.element) {
      section.element.style.display = 'block';
      
      // Call init callback if exists
      if (section.initCallback && typeof section.initCallback === 'function') {
        section.initCallback();
      }
    }
    
    // Update active menu item
    this.menuItems.forEach(item => {
      item.element.classList.remove('active');
      if (item.sectionId === sectionId) {
        item.element.classList.add('active');
      }
    });
  }
  
  setupToggle() {
    const toggleBtn = document.getElementById(`${this.container.id}Toggle`);
    toggleBtn.addEventListener('click', () => {
      this.container.classList.toggle('collapsed');
    });
    
    // Set initial state
    if (this.options.collapsed) {
      this.container.classList.add('collapsed');
    }
  }
  
  setupLogout() {
    const logoutBtn = this.container.querySelector('.logout-button');
    logoutBtn.addEventListener('click', () => {
      if (typeof cerrarSesion === 'function') {
        cerrarSesion();
      } else {
        sessionStorage.removeItem('usuarioActual');
      }
      window.location.href = 'auth.html';
    });
  }
  
  // Initialize with default section if specified
  start() {
    if (this.options.defaultSection) {
      this.showSection(this.options.defaultSection);
    } else if (this.menuItems.length > 0) {
      this.showSection(this.menuItems[0].sectionId);
    }
    return this;
  }
}