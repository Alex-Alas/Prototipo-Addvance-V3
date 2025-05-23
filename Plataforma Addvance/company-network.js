/**
 * CompanyNetworkManager
 * Gestiona las conexiones entre empresas y proveedores
 */

const CompanyNetworkManager = {
  /**
   * Inicializar el gestor de red de empresas
   * @param {string} companyId - ID de la empresa actual
   */
  init(companyId) {
    this.currentCompanyId = companyId || 'empresa-ejemplo';
    
    console.log("CompanyNetworkManager inicializado para la empresa:", this.currentCompanyId);
    console.log("coursesDatabase disponible:", !!window.coursesDatabase);
    console.log("companiesData disponible:", !!window.companiesData);
    console.log("providersData disponible:", !!window.providersData);
    console.log("courseManager disponible:", !!window.courseManager);
    
    // Verificar que existan los datos necesarios
    if (!window.coursesDatabase || !window.companiesData || !window.providersData) {
      console.error("Faltan datos necesarios para inicializar el gestor de red");
      return;
    }
    
    // Para propósitos de demostración, asegurar que el proveedor ejemplo esté siempre disponible
    // Esto es temporal y solo para asegurar que se muestre el proveedor ejemplo en el networking
    if (!window.coursesDatabase.some(c => c.providerId === 'socio-ejemplo')) {
      console.warn("No se encontraron cursos con providerId 'socio-ejemplo'");
      
      // Verificar que el curso1 tenga providerId
      const curso1 = window.coursesDatabase.find(c => c.id === 'curso1');
      if (curso1 && !curso1.providerId) {
        console.log("Asignando providerId 'socio-ejemplo' a curso1");
        curso1.providerId = 'socio-ejemplo';
        curso1.providerName = window.providersData['socio-ejemplo'].name;
        curso1.providerDescription = window.providersData['socio-ejemplo'].description;
      }
    }
    
    // Inicializar interfaces de red
    this.initCurrentProvidersGrid();
    this.initRecommendedProvidersGrid();
  },
  
  /**
   * Inicializar la cuadrícula de proveedores actuales
   * (aquellos de los que ya se ha adquirido al menos un curso)
   */
  initCurrentProvidersGrid() {
    const providersGrid = document.getElementById('empresasGrid');
    if (!providersGrid) {
      console.error("No se encontró el contenedor empresasGrid");
      return;
    }
    
    // Limpiar contenido existente
    providersGrid.innerHTML = '';
    
    // Verificar disponibilidad de datos y funciones
    if (!window.courseManager || !window.courseManager.getCompanyProviders) {
      console.error("No se pudo acceder a courseManager.getCompanyProviders");
      
      // Solución alternativa si courseManager no está disponible
      if (window.providersData && window.coursesDatabase && window.companiesData) {
        const currentProviders = this.getProvidersManually();
        
        if (currentProviders.length > 0) {
          // Generar tarjetas de proveedores
          currentProviders.forEach(provider => {
            const providerCard = this.createProviderCard(provider, true);
            providersGrid.appendChild(providerCard);
          });
          return;
        }
      }
      
      providersGrid.innerHTML = '<p class="no-providers-message">Error al cargar los proveedores. Por favor, recargue la página.</p>';
      return;
    }
    
    // Obtener proveedores actuales (con cursos adquiridos)
    const currentProviders = window.courseManager.getCompanyProviders(this.currentCompanyId);
    console.log("Proveedores actuales:", currentProviders);
    
    // Mostrar mensaje si no hay proveedores
    if (!currentProviders || currentProviders.length === 0) {
      // Para propósitos de demostración, mostrar el proveedor ejemplo directamente
      const socioEjemplo = window.providersData['socio-ejemplo'];
      if (socioEjemplo) {
        console.log("Mostrando proveedor ejemplo por defecto");
        const providerWithCourses = {
          ...socioEjemplo,
          courses: window.coursesDatabase
            .filter(course => course.providerId === 'socio-ejemplo')
            .map(course => ({
              id: course.id,
              title: course.title,
              description: course.description,
              purchaseDate: '15-03-2023'
            }))
        };
        
        const providerCard = this.createProviderCard(providerWithCourses, true);
        providersGrid.appendChild(providerCard);
      } else {
        providersGrid.innerHTML = '<p class="no-providers-message">Aún no tienes proveedores. Adquiere cursos para establecer conexiones.</p>';
      }
      return;
    }
    
    // Generar tarjetas de proveedores
    currentProviders.forEach(provider => {
      const providerCard = this.createProviderCard(provider, true);
      providersGrid.appendChild(providerCard);
    });
  },
  
  /**
   * Obtener proveedores manualmente (solución alternativa)
   * @returns {Array} Lista de proveedores
   */
  getProvidersManually() {
    const company = window.companiesData[this.currentCompanyId];
    if (!company || !company.acquiredCourses || company.acquiredCourses.length === 0) {
      console.log("La empresa no tiene cursos adquiridos");
      
      // Para demostración, devolver el proveedor ejemplo
      const socioEjemplo = window.providersData['socio-ejemplo'];
      if (socioEjemplo) {
        return [{
          ...socioEjemplo,
          courses: window.coursesDatabase
            .filter(course => course.providerId === 'socio-ejemplo')
            .map(course => ({
              id: course.id,
              title: course.title,
              description: course.description,
              purchaseDate: '15-03-2023'
            }))
        }];
      }
      
      return [];
    }
    
    // Obtener los proveedores de los cursos adquiridos
    const providerIds = new Set();
    const providers = [];
    
    company.acquiredCourses.forEach(course => {
      const courseData = window.coursesDatabase.find(c => c.id === course.courseId);
      if (courseData && courseData.providerId && !providerIds.has(courseData.providerId)) {
        providerIds.add(courseData.providerId);
        
        const providerData = window.providersData[courseData.providerId] || {
          id: courseData.providerId,
          name: courseData.providerName || "Proveedor Desconocido",
          description: courseData.providerDescription || "Sin descripción"
        };
        
        const providerCourses = company.acquiredCourses
          .filter(c => {
            const cd = window.coursesDatabase.find(cdb => cdb.id === c.courseId);
            return cd && cd.providerId === courseData.providerId;
          })
          .map(c => {
            const cd = window.coursesDatabase.find(cdb => cdb.id === c.courseId);
            return {
              id: c.courseId,
              title: cd.title,
              description: cd.description,
              purchaseDate: c.purchaseDate
            };
          });
        
        providers.push({
          ...providerData,
          courses: providerCourses
        });
      }
    });
    
    return providers;
  },
  
  /**
   * Inicializar la cuadrícula de proveedores recomendados
   * (aquellos de los que no se ha adquirido ningún curso)
   */
  initRecommendedProvidersGrid() {
    const recommendedGrid = document.getElementById('proveedoresGrid');
    if (!recommendedGrid) {
      console.error("No se encontró el contenedor proveedoresGrid");
      return;
    }
    
    // Limpiar contenido existente
    recommendedGrid.innerHTML = '';
    
    // Verificar disponibilidad de datos y funciones
    if (!window.courseManager || !window.courseManager.getAvailableProvidersForCompany) {
      console.error("No se pudo acceder a courseManager.getAvailableProvidersForCompany");
      
      // Solución alternativa si courseManager no está disponible
      if (window.providersData) {
        const currentProviders = this.getProvidersManually();
        const currentProviderIds = currentProviders.map(p => p.id);
        
        const recommendedProviders = Object.values(window.providersData)
          .filter(provider => !currentProviderIds.includes(provider.id))
          .map(provider => ({
            ...provider,
            courses: window.coursesDatabase
              .filter(course => course.providerId === provider.id)
              .map(course => ({
                id: course.id,
                title: course.title,
                description: course.description
              }))
          }));
        
        if (recommendedProviders.length > 0) {
          // Generar tarjetas de proveedores recomendados
          recommendedProviders.forEach(provider => {
            const providerCard = this.createProviderCard(provider, false);
            recommendedGrid.appendChild(providerCard);
          });
          return;
        }
      }
      
      recommendedGrid.innerHTML = '<p class="no-providers-message">No se pudieron cargar los proveedores recomendados.</p>';
      return;
    }
    
    // Obtener proveedores recomendados
    const recommendedProviders = window.courseManager.getAvailableProvidersForCompany(this.currentCompanyId);
    console.log("Proveedores recomendados:", recommendedProviders);
    
    // Mostrar mensaje si no hay proveedores recomendados
    if (!recommendedProviders || recommendedProviders.length === 0) {
      // Mostrar los otros proveedores para demostración
      const otherProviders = Object.values(window.providersData)
        .filter(provider => provider.id !== 'socio-ejemplo')
        .map(provider => ({
          ...provider,
          courses: window.coursesDatabase
            .filter(course => course.providerId === provider.id)
            .map(course => ({
              id: course.id,
              title: course.title,
              description: course.description
            }))
        }));
      
      if (otherProviders.length > 0) {
        otherProviders.forEach(provider => {
          const providerCard = this.createProviderCard(provider, false);
          recommendedGrid.appendChild(providerCard);
        });
      } else {
        recommendedGrid.innerHTML = '<p class="no-providers-message">No hay proveedores recomendados disponibles.</p>';
      }
      return;
    }
    
    // Generar tarjetas de proveedores recomendados
    recommendedProviders.forEach(provider => {
      const providerCard = this.createProviderCard(provider, false);
      recommendedGrid.appendChild(providerCard);
    });
  },
  
  /**
   * Crear tarjeta de proveedor
   * @param {Object} provider - Datos del proveedor
   * @param {boolean} isCurrentProvider - Indica si es un proveedor actual
   * @returns {HTMLElement} Elemento de tarjeta de proveedor
   */
  createProviderCard(provider, isCurrentProvider) {
    const card = document.createElement('div');
    card.className = 'network-profile-card';
    card.dataset.providerId = provider.id;
    
    // Determinar contenido específico según si es proveedor actual o recomendado
    let coursesInfo = '';
    if (isCurrentProvider && provider.courses && provider.courses.length > 0) {
      coursesInfo = `
        <div class="client-courses">
          <h4>Cursos adquiridos:</h4>
          <ul>
            ${provider.courses.map(course => 
              `<li>${course.title} <span class="purchase-date">(${course.purchaseDate || 'Fecha no disponible'})</span></li>`
            ).join('')}
          </ul>
        </div>
      `;
    } else if (!isCurrentProvider && provider.courses) {
      coursesInfo = `
        <div class="provider-info">
          <h4>Ofrece ${provider.courses.length} curso${provider.courses.length !== 1 ? 's' : ''}</h4>
          <p class="provider-description">${provider.description}</p>
        </div>
      `;
    }
    
    const actionButton = isCurrentProvider
      ? `<button class="contact-provider-btn" data-provider-id="${provider.id}">
          <i class="fas fa-envelope"></i> Contactar
        </button>`
      : `<button class="view-provider-btn" data-provider-id="${provider.id}">
          <i class="fas fa-book"></i> Ver cursos
        </button>`;
    
    card.innerHTML = `
      <div class="profile-avatar">
        <i class="fas fa-briefcase"></i>
      </div>
      <div class="profile-info">
        <h3 class="profile-name">${provider.name}</h3>
        <div class="provider-metadata">
          <span><i class="fas fa-tag"></i> ${provider.id}</span>
        </div>
        ${coursesInfo}
        <div class="provider-actions">
          ${actionButton}
          <button class="view-profile-btn" data-provider-id="${provider.id}">
            <i class="fas fa-user"></i> Ver perfil
          </button>
        </div>
      </div>
    `;
    
    // Añadir eventos a los botones
    card.querySelector('.view-profile-btn').addEventListener('click', () => {
      this.viewProviderProfile(provider.id);
    });
    
    if (isCurrentProvider) {
      card.querySelector('.contact-provider-btn').addEventListener('click', () => {
        this.contactProvider(provider.id);
      });
    } else {
      card.querySelector('.view-provider-btn').addEventListener('click', () => {
        this.viewProviderCourses(provider.id);
      });
    }
    
    return card;
  },
  
  /**
   * Ver perfil de proveedor
   * @param {string} providerId - ID del proveedor
   */
  viewProviderProfile(providerId) {
    console.log(`Ver perfil del proveedor: ${providerId}`);
    // Implementación real: Abrir modal con detalles del perfil
    this.showProviderProfileModal(providerId);
  },
  
  /**
   * Mostrar modal con el perfil del proveedor
   * @param {string} providerId - ID del proveedor
   */
  showProviderProfileModal(providerId) {
    // Buscar los cursos del proveedor para obtener su información
    const providerCourses = window.coursesDatabase.filter(c => c.providerId === providerId);
    
    if (providerCourses.length === 0) {
      alert('No se encontró información para este proveedor.');
      return;
    }
    
    // Obtener información del proveedor del primer curso (asumiendo que es consistente)
    const providerInfo = {
      id: providerId,
      name: providerCourses[0].providerName || 'Proveedor Sin Nombre',
      description: providerCourses[0].providerDescription || 'Sin descripción',
      courses: providerCourses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description
      }))
    };
    
    // Crear el modal
    let modal = document.getElementById('providerProfileModal');
    
    // Si el modal no existe, crearlo
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'providerProfileModal';
      modal.className = 'provider-profile-modal';
      document.body.appendChild(modal);
    }
    
    // Generar contenido del modal
    modal.innerHTML = `
      <div class="provider-profile-content">
        <button class="close-modal-btn">&times;</button>
        <h2>${providerInfo.name}</h2>
        <div class="provider-details">
          <p>${providerInfo.description}</p>
        </div>
        <div class="provider-contact">
          <h3><i class="fas fa-envelope"></i> Contacto</h3>
          <p>Para obtener más información sobre los cursos ofrecidos por este proveedor, contáctenos.</p>
        </div>
        <div class="provider-courses">
          <h3><i class="fas fa-book"></i> Cursos disponibles</h3>
          <ul>
            ${providerInfo.courses.map(course => 
              `<li>${course.title} - ${course.description}</li>`
            ).join('')}
          </ul>
        </div>
        <div class="provider-actions">
          <button class="contact-provider-btn" data-provider-id="${providerId}">
            <i class="fas fa-envelope"></i> Contactar proveedor
          </button>
        </div>
      </div>
    `;
    
    // Mostrar el modal
    modal.style.display = 'flex';
    
    // Configurar el botón de cierre
    const closeBtn = modal.querySelector('.close-modal-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }
    
    // Configurar el botón de contacto
    const contactBtn = modal.querySelector('.contact-provider-btn');
    if (contactBtn) {
      contactBtn.addEventListener('click', () => {
        this.contactProvider(providerId);
        modal.style.display = 'none';
      });
    }
    
    // Cerrar al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  },
  
  /**
   * Contactar a un proveedor
   * @param {string} providerId - ID del proveedor
   */
  contactProvider(providerId) {
    console.log(`Contactar al proveedor: ${providerId}`);
    // Implementación real: Abrir interfaz de mensajería
    const messagingOption = document.getElementById('empresaMessagingOption');
    if (messagingOption) {
      messagingOption.click();
      
      // Simulación: seleccionar al proveedor en la lista de contactos
      setTimeout(() => {
        alert(`Funcionalidad: Contactar a ${providerId} mediante el sistema de mensajería`);
      }, 300);
    } else {
      alert(`Funcionalidad: Contactar a ${providerId} mediante el sistema de mensajería`);
    }
  },
  
  /**
   * Ver cursos de un proveedor
   * @param {string} providerId - ID del proveedor
   */
  viewProviderCourses(providerId) {
    console.log(`Ver cursos del proveedor: ${providerId}`);
    
    // Cambiar a la sección de cursos
    const cursoOption = document.getElementById('cursoOption');
    if (cursoOption) {
      cursoOption.click();
      
      // Simulación: filtrar cursos por proveedor
      setTimeout(() => {
        // En una implementación real, esto realmente filtraría los cursos
        alert(`Funcionalidad: Mostrando cursos filtrados del proveedor ${providerId}`);
      }, 300);
    } else {
      // Alternativa: mostrar modal con cursos
      this.showProviderProfileModal(providerId);
    }
  }
};

// Inicializar cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de empresa
  const networkSection = document.getElementById('networkSection');
  const empresasGrid = document.getElementById('empresasGrid');
  const proveedoresGrid = document.getElementById('proveedoresGrid');
  
  if (networkSection && empresasGrid && proveedoresGrid) {
    // Obtener ID de la empresa actual (en una implementación real, se obtendría de la sesión)
    const currentUser = window.obtenerUsuarioActual ? window.obtenerUsuarioActual() : null;
    const companyId = currentUser && currentUser.tipoPerfil === 'empresa' 
      ? currentUser.id || currentUser.correo 
      : 'empresa-ejemplo';
    
    // Inicializar el gestor de red
    CompanyNetworkManager.init(companyId);
  }
});
