/**
 * Provider Network Manager
 * Gestiona las conexiones entre proveedores y empresas
 */

const ProviderNetworkManager = {
  /**
   * Inicializar el gestor de red de proveedores
   * @param {string} providerId - ID del proveedor actual
   */
  init(providerId) {
    this.currentProviderId = providerId || 'socio-ejemplo';
    
    // Inicializar interfaces de red
    this.initCurrentClientsGrid();
    this.initPotentialClientsGrid();
    
    console.log("ProviderNetworkManager inicializado para el proveedor:", this.currentProviderId);
  },
  
  /**
   * Inicializar la cuadrícula de clientes actuales
   */
  initCurrentClientsGrid() {
    const clientesGrid = document.getElementById('clientesGrid');
    if (!clientesGrid) return;
    
    // Limpiar contenido existente
    clientesGrid.innerHTML = '';
    
    // Verificar disponibilidad de datos
    if (!window.courseManager || !window.providersData) {
      clientesGrid.innerHTML = '<p class="no-clients-message">No se pudieron cargar los datos de clientes.</p>';
      return;
    }
    
    // Obtener clientes actuales
    const currentClients = window.courseManager.getProviderCurrentClients(this.currentProviderId);
    
    // Mostrar mensaje si no hay clientes
    if (!currentClients || currentClients.length === 0) {
      clientesGrid.innerHTML = '<p class="no-clients-message">No tienes clientes actualmente.</p>';
      return;
    }
    
    // Generar tarjetas de clientes
    currentClients.forEach(client => {
      const clientCard = this.createClientCard(client, true);
      clientesGrid.appendChild(clientCard);
    });
  },
  
  /**
   * Inicializar la cuadrícula de clientes potenciales
   */
  initPotentialClientsGrid() {
    const potencialesGrid = document.getElementById('potencialesGrid');
    if (!potencialesGrid) return;
    
    // Limpiar contenido existente
    potencialesGrid.innerHTML = '';
    
    // Verificar disponibilidad de datos
    if (!window.courseManager || !window.providersData) {
      potencialesGrid.innerHTML = '<p class="no-clients-message">No se pudieron cargar los datos de clientes potenciales.</p>';
      return;
    }
    
    // Obtener clientes potenciales
    const potentialClients = window.courseManager.getPotentialClientsForProvider(this.currentProviderId);
    
    // Mostrar mensaje si no hay clientes potenciales
    if (!potentialClients || potentialClients.length === 0) {
      potencialesGrid.innerHTML = '<p class="no-clients-message">No hay clientes potenciales disponibles.</p>';
      return;
    }
    
    // Generar tarjetas de clientes potenciales
    potentialClients.forEach(client => {
      const clientCard = this.createClientCard(client, false);
      potencialesGrid.appendChild(clientCard);
    });
  },
  
  /**
   * Crear tarjeta de cliente
   * @param {Object} client - Datos del cliente
   * @param {boolean} isCurrentClient - Indica si es un cliente actual
   * @returns {HTMLElement} Elemento de tarjeta de cliente
   */
  createClientCard(client, isCurrentClient) {
    const card = document.createElement('div');
    card.className = 'network-profile-card';
    card.dataset.clientId = client.id;
    
    // Determinar contenido específico según si es cliente actual o potencial
    let coursesInfo = '';
    if (isCurrentClient && client.acquiredCourses && client.acquiredCourses.length > 0) {
      coursesInfo = `
        <div class="client-courses">
          <h4>Cursos adquiridos:</h4>
          <ul>
            ${client.acquiredCourses.map(course => 
              `<li>${course.title} <span class="purchase-date">(${course.purchaseDate})</span></li>`
            ).join('')}
          </ul>
        </div>
      `;
    }
    
    const actionButton = isCurrentClient
      ? `<button class="contact-client-btn" data-client-id="${client.id}">Contactar</button>`
      : `<button class="connect-client-btn" data-client-id="${client.id}">Conectar</button>`;
    
    card.innerHTML = `
      <div class="profile-avatar">
        <i class="fas fa-building"></i>
      </div>
      <div class="profile-info">
        <h3 class="profile-name">${client.name}</h3>
        <p class="profile-title">${client.id}</p>
        ${coursesInfo}
        <div class="client-actions">
          ${actionButton}
          <button class="view-profile-btn" data-client-id="${client.id}">Ver perfil</button>
        </div>
      </div>
    `;
    
    // Añadir eventos a los botones
    card.querySelector('.view-profile-btn').addEventListener('click', () => {
      this.viewClientProfile(client.id);
    });
    
    if (isCurrentClient) {
      card.querySelector('.contact-client-btn').addEventListener('click', () => {
        this.contactClient(client.id);
      });
    } else {
      card.querySelector('.connect-client-btn').addEventListener('click', () => {
        this.connectWithClient(client.id);
      });
    }
    
    return card;
  },
  
  /**
   * Ver perfil de cliente
   * @param {string} clientId - ID del cliente
   */
  viewClientProfile(clientId) {
    console.log(`Ver perfil del cliente: ${clientId}`);
    // Implementación real: Abrir modal con detalles del perfil
    alert(`Funcionalidad: Ver perfil completo de ${clientId}`);
  },
  
  /**
   * Contactar a un cliente actual
   * @param {string} clientId - ID del cliente
   */
  contactClient(clientId) {
    console.log(`Contactar al cliente actual: ${clientId}`);
    // Implementación real: Abrir interfaz de mensajería
    alert(`Funcionalidad: Contactar a ${clientId} mediante el sistema de mensajería`);
  },
  
  /**
   * Conectar con un cliente potencial
   * @param {string} clientId - ID del cliente potencial
   */
  connectWithClient(clientId) {
    console.log(`Conectando con cliente potencial: ${clientId}`);
    // Implementación real: Enviar solicitud de conexión
    alert(`Funcionalidad: Solicitud de conexión enviada a ${clientId}`);
    
    // Simulación de éxito (en una implementación real, esto sucedería después de que el cliente acepte)
    const connectBtn = document.querySelector(`.connect-client-btn[data-client-id="${clientId}"]`);
    if (connectBtn) {
      connectBtn.textContent = 'Solicitud enviada';
      connectBtn.disabled = true;
      connectBtn.classList.add('request-sent');
    }
  }
};

// Inicializar cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de socio/proveedor
  const socioNetworkSection = document.getElementById('socioNetworkSection');
  if (socioNetworkSection) {
    // Obtener ID del proveedor actual (en una implementación real, se obtendría de la sesión)
    const currentUser = obtenerUsuarioActual();
    const providerId = currentUser && currentUser.tipoPerfil === 'socio' 
      ? currentUser.id || currentUser.correo 
      : 'socio-ejemplo';
    
    // Inicializar el gestor de red
    ProviderNetworkManager.init(providerId);
  }
});

/**
 * Sistema de búsqueda avanzado para proveedores
 * @module ProviderSearchSystem
 */
const ProviderSearchSystem = {
  /**
   * Configuración del sistema de búsqueda
   * @private
   */
  _config: {
    debounceDelay: 300, // Retraso para la búsqueda en tiempo real (ms)
    minSearchLength: 2, // Longitud mínima para iniciar la búsqueda
    maxResults: 50, // Número máximo de resultados a mostrar
    searchFields: ['name', 'industry', 'location'] // Campos a buscar
  },

  /**
   * Estado actual del sistema de búsqueda
   * @private
   */
  _state: {
    lastQuery: '',
    searchTimeout: null,
    activeFilters: new Set(),
    searchResults: [],
    isLoading: false
  },

  /**
   * Inicializa el sistema de búsqueda
   * @public
   */
  init() {
    this._setupEventListeners();
    this._initializeSearchUI();
    this._setupSearchFeedback();
    console.log('Sistema de búsqueda inicializado');
  },

  /**
   * Configura los event listeners para el sistema de búsqueda
   * @private
   */
  _setupEventListeners() {
    const searchInput = document.getElementById('companySearchInput');
    const searchButton = document.getElementById('searchButton');

    if (searchInput) {
      // Implementar búsqueda en tiempo real con debounce
      searchInput.addEventListener('input', (e) => {
        this._handleSearchInput(e.target.value);
      });

      // Prevenir envío de formulario al presionar enter
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this._performSearch(e.target.value);
        }
      });
    }

    if (searchButton) {
      searchButton.addEventListener('click', () => {
        const query = searchInput ? searchInput.value : '';
        this._performSearch(query);
      });
    }
  },

  /**
   * Inicializa la interfaz de usuario del buscador
   * @private
   */
  _initializeSearchUI() {
    this._updateSearchResultsContainer(true);
    this._setupLoadingIndicator();
  },

  /**
   * Configura el indicador de carga
   * @private
   */
  _setupLoadingIndicator() {
    const searchContainer = document.querySelector('.search-bar-container');
    if (!searchContainer.querySelector('.search-loading')) {
      const loading = document.createElement('div');
      loading.className = 'search-loading';
      loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      searchContainer.appendChild(loading);
    }
  },

  /**
   * Maneja la entrada de texto en el buscador con debounce
   * @param {string} query - Texto de búsqueda
   * @private
   */
  _handleSearchInput(query) {
    // Limpiar timeout anterior
    if (this._state.searchTimeout) {
      clearTimeout(this._state.searchTimeout);
    }

    // Configurar nuevo timeout para debounce
    this._state.searchTimeout = setTimeout(() => {
      this._performSearch(query);
    }, this._config.debounceDelay);
  },

  /**
   * Realiza la búsqueda de empresas
   * @param {string} query - Texto de búsqueda
   * @private
   */
  _performSearch(query) {
    query = query.trim().toLowerCase();

    // Validar longitud mínima de búsqueda
    if (query.length < this._config.minSearchLength) {
      this._updateSearchResultsContainer(true);
      this._showSearchFeedback('Ingrese al menos 2 caracteres para buscar');
      return;
    }

    // Mostrar indicador de carga
    this._showLoading(true);

    // Obtener empresas del sistema
    const companies = this._getCompaniesData();
    
    // Filtrar empresas según los criterios de búsqueda
    const results = this._filterCompanies(companies, query);

    // Actualizar UI con resultados
    this._updateSearchResults(results, query);
  },

  /**
   * Filtra las empresas según los criterios de búsqueda
   * @param {Array} companies - Lista de empresas
   * @param {string} query - Texto de búsqueda
   * @returns {Array} - Empresas filtradas
   * @private
   */
  _filterCompanies(companies, query) {
    return companies.filter(company => {
      return this._config.searchFields.some(field => {
        const value = company[field]?.toLowerCase() || '';
        return value.includes(query);
      });
    }).slice(0, this._config.maxResults);
  },

  /**
   * Actualiza los resultados de búsqueda en la UI
   * @param {Array} results - Resultados de la búsqueda
   * @param {string} query - Texto de búsqueda
   * @private
   */
  _updateSearchResults(results, query) {
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const resultCount = document.getElementById('resultCount');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const standardNetworkView = document.getElementById('standardNetworkView');

    if (!searchResultsGrid || !resultCount || !searchResultsContainer || !standardNetworkView) {
      console.error('Elementos de UI no encontrados');
      return;
    }

    // Actualizar contador de resultados
    resultCount.textContent = `${results.length} ${results.length === 1 ? 'empresa encontrada' : 'empresas encontradas'}`;

    // Limpiar grid de resultados
    searchResultsGrid.innerHTML = '';

    if (results.length === 0) {
      searchResultsGrid.innerHTML = `
        <div class="no-results-message">
          <i class="fas fa-search"></i>
          <p>No se encontraron empresas que coincidan con "${this._sanitizeHTML(query)}"</p>
        </div>
      `;
    } else {
      // Generar tarjetas de resultados
      results.forEach(company => {
        const card = this._createCompanyCard(company);
        searchResultsGrid.appendChild(card);
      });
    }

    // Mostrar resultados y ocultar vista estándar
    searchResultsContainer.style.display = 'block';
    standardNetworkView.style.display = 'none';

    // Ocultar indicador de carga
    this._showLoading(false);
  },

  /**
   * Crea una tarjeta de empresa para los resultados
   * @param {Object} company - Datos de la empresa
   * @returns {HTMLElement} - Elemento de tarjeta
   * @private
   */
  _createCompanyCard(company) {
    const card = document.createElement('div');
    card.className = 'network-profile-card';
    card.innerHTML = `
      <div class="profile-avatar">
        <i class="fas fa-building"></i>
      </div>
      <div class="profile-info">
        <h3 class="profile-name">${this._sanitizeHTML(company.name)}</h3>
        <div class="company-metadata">
          ${company.industry ? `<span class="company-industry"><i class="fas fa-industry"></i> ${this._sanitizeHTML(company.industry)}</span>` : ''}
          ${company.size ? `<span class="company-size"><i class="fas fa-users"></i> ${this._sanitizeHTML(company.size)}</span>` : ''}
          ${company.location ? `<span class="company-location"><i class="fas fa-map-marker-alt"></i> ${this._sanitizeHTML(company.location)}</span>` : ''}
        </div>
        <div class="company-actions">
          <button class="view-company-btn" data-company-id="${company.id}">
            <i class="fas fa-info-circle"></i> Ver detalles
          </button>
          ${company.isClient ? 
            `<button class="contact-company-btn" data-company-id="${company.id}">
              <i class="fas fa-envelope"></i> Contactar
             </button>` :
            `<button class="connect-company-btn" data-company-id="${company.id}">
              <i class="fas fa-handshake"></i> Conectar
             </button>`
          }
        </div>
      </div>
    `;

    // Añadir event listeners a los botones
    this._setupCardButtons(card, company);

    return card;
  },

  /**
   * Configura los botones de la tarjeta de empresa
   * @param {HTMLElement} card - Elemento de tarjeta
   * @param {Object} company - Datos de la empresa
   * @private
   */
  _setupCardButtons(card, company) {
    const viewBtn = card.querySelector('.view-company-btn');
    const contactBtn = card.querySelector('.contact-company-btn');
    const connectBtn = card.querySelector('.connect-company-btn');

    if (viewBtn) {
      viewBtn.addEventListener('click', () => this._handleViewCompany(company));
    }

    if (contactBtn) {
      contactBtn.addEventListener('click', () => this._handleContactCompany(company));
    }

    if (connectBtn) {
      connectBtn.addEventListener('click', () => this._handleConnectCompany(company));
    }
  },

  /**
   * Sanitiza el HTML para prevenir XSS
   * @param {string} text - Texto a sanitizar
   * @returns {string} - Texto sanitizado
   * @private
   */
  _sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Configura el feedback visual de la búsqueda
   * @private
   */
  _setupSearchFeedback() {
    const searchContainer = document.querySelector('.search-bar-container');
    if (!searchContainer.querySelector('.search-feedback')) {
      const feedback = document.createElement('div');
      feedback.className = 'search-feedback';
      searchContainer.appendChild(feedback);
    }
  },

  /**
   * Muestra mensaje de feedback en la búsqueda
   * @param {string} message - Mensaje a mostrar
   * @private
   */
  _showSearchFeedback(message) {
    const feedback = document.querySelector('.search-feedback');
    if (feedback) {
      feedback.textContent = message;
      feedback.style.display = message ? 'block' : 'none';
    }
  },

  /**
   * Muestra/oculta el indicador de carga
   * @param {boolean} show - Indica si mostrar el indicador
   * @private
   */
  _showLoading(show) {
    const loading = document.querySelector('.search-loading');
    if (loading) {
      loading.style.display = show ? 'block' : 'none';
    }
  },

  /**
   * Actualiza la visibilidad del contenedor de resultados
   * @param {boolean} reset - Indica si se debe resetear la vista
   * @private
   */
  _updateSearchResultsContainer(reset = false) {
    const searchResultsContainer = document.getElementById('searchResultsContainer');
    const standardNetworkView = document.getElementById('standardNetworkView');

    if (searchResultsContainer && standardNetworkView) {
      searchResultsContainer.style.display = reset ? 'none' : 'block';
      standardNetworkView.style.display = reset ? 'block' : 'none';
    }
  }
};

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  ProviderSearchSystem.init();
}); 