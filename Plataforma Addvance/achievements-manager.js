/**
 * Achievements Manager
 * Gestiona los logros de empresas y su visualización en la plataforma
 */

// Objeto principal para la gestión de logros
const AchievementsManager = {
  /**
   * Inicializar el gestor de logros
   * @param {string} companyId - ID de la empresa actual
   */
  init(companyId) {
    this.currentCompanyId = companyId || 'empresa-ejemplo';
    this.loadAchievements();
    
    console.log("AchievementsManager inicializado para la empresa:", this.currentCompanyId);
  },

  /**
   * Cargar todos los logros (propios, de otras empresas y globales)
   */
  loadAchievements() {
    if (!window.companiesData || !window.globalAchievements) {
      console.error("Los datos de logros no están disponibles. Asegúrate de cargar courseData.js primero.");
      return;
    }

    this.loadCompanyAchievements();
    this.loadOtherCompaniesAchievements();
    this.loadGlobalAchievements();
  },

  /**
   * Cargar los logros de la empresa actual
   */
  loadCompanyAchievements() {
    const achievementsFeed = document.getElementById('achievementsFeed');
    if (!achievementsFeed) return;

    const company = window.companiesData[this.currentCompanyId];
    if (!company) return;

    // Limpiar contenido existente
    achievementsFeed.innerHTML = '';

    // Actualizar contadores
    const achievementsCount = document.getElementById('achievementsCount');
    if (achievementsCount) {
      achievementsCount.textContent = company.achievements.length;
    }
    
    // Calcular puntos totales (1 punto por logro)
    const totalPoints = document.getElementById('totalPoints');
    if (totalPoints) {
      totalPoints.textContent = company.achievements.length;
    }

    // Generar HTML para cada logro
    company.achievements.forEach(achievement => {
      const achievementCard = this.createAchievementCard(achievement, company.name);
      achievementsFeed.appendChild(achievementCard);
    });
  },

  /**
   * Cargar logros de otras empresas
   */
  loadOtherCompaniesAchievements() {
    const otherAchievementsContainer = document.getElementById('otherCompaniesAchievements');
    if (!otherAchievementsContainer) return;

    // Limpiar contenido existente
    otherAchievementsContainer.innerHTML = '';

    // Obtener todos los logros de empresas, excepto de la empresa actual
    const allAchievements = window.courseManager.getAllCompanyAchievements();
    const otherAchievements = allAchievements.filter(a => a.companyId !== this.currentCompanyId);

    // Mostrar mensaje si no hay logros de otras empresas
    if (otherAchievements.length === 0) {
      otherAchievementsContainer.innerHTML = '<p class="no-achievements">No hay logros de otras empresas para mostrar.</p>';
      return;
    }

    // Generar HTML para cada logro
    otherAchievements.forEach(achievement => {
      const achievementCard = this.createAchievementCard(achievement, achievement.companyName);
      otherAchievementsContainer.appendChild(achievementCard);
    });
  },

  /**
   * Cargar logros globales del sistema
   */
  loadGlobalAchievements() {
    const globalAchievementsList = document.getElementById('globalAchievementsList');
    if (!globalAchievementsList) return;

    // Limpiar contenido existente
    globalAchievementsList.innerHTML = '';

    // Obtener logros globales con sus empresas
    const globalAchievements = window.courseManager.getGlobalAchievementsWithCompanies();

    // Mostrar mensaje si no hay logros globales
    if (globalAchievements.length === 0) {
      globalAchievementsList.innerHTML = '<p class="no-achievements">No hay logros globales para mostrar.</p>';
      return;
    }

    // Generar HTML para cada logro global
    globalAchievements.forEach(achievement => {
      const globalAchievementCard = this.createGlobalAchievementCard(achievement);
      globalAchievementsList.appendChild(globalAchievementCard);
    });
  },

  /**
   * Crear una tarjeta de logro
   * @param {Object} achievement - Datos del logro
   * @param {string} companyName - Nombre de la empresa
   * @returns {HTMLElement} Elemento de tarjeta de logro
   */
  createAchievementCard(achievement, companyName) {
    const card = document.createElement('div');
    card.className = 'achievement-card';
    
    const icon = achievement.icon || 'fa-trophy';
    
    card.innerHTML = `
      <div class="achievement-icon">
        <i class="fas ${icon}"></i>
      </div>
      <div class="achievement-content">
        <h3>${achievement.title}</h3>
        <p>${achievement.description}</p>
        <div class="achievement-meta">
          <span class="achievement-company">${companyName}</span>
          <span class="achievement-date">${achievement.date}</span>
        </div>
      </div>
    `;
    
    return card;
  },

  /**
   * Crear una tarjeta de logro global
   * @param {Object} globalAchievement - Datos del logro global
   * @returns {HTMLElement} Elemento de tarjeta de logro global
   */
  createGlobalAchievementCard(globalAchievement) {
    const card = document.createElement('div');
    card.className = 'global-achievement-card';
    
    // Obtener nombres de empresas que tienen este logro
    const companyNames = globalAchievement.companies.map(company => company.name).join(', ');
    
    card.innerHTML = `
      <div class="achievement-icon">
        <i class="fas ${globalAchievement.icon}"></i>
      </div>
      <div class="achievement-content">
        <h3>${globalAchievement.title}</h3>
        <p>${globalAchievement.description}</p>
        <div class="achievement-companies">
          <p><strong>Empresas:</strong> ${companyNames}</p>
        </div>
      </div>
    `;
    
    return card;
  }
};

// Inicializar cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en la página de empresa
  const achievementsSection = document.getElementById('achievementsSection');
  if (achievementsSection) {
    // Inicializar con la empresa ejemplo o la empresa actual del usuario
    // En una implementación real, obtendríamos el ID de la empresa desde la sesión del usuario
    AchievementsManager.init('empresa-ejemplo');
  }
  
  // Agregar evento para mostrar sección de logros
  const achievementsOption = document.getElementById('achievementsOption');
  if (achievementsOption) {
    achievementsOption.addEventListener('click', function() {
      // Ocultar todas las secciones
      const sections = document.querySelectorAll('.container > div');
      sections.forEach(section => {
        section.style.display = 'none';
      });
      
      // Mostrar sección de logros
      if (achievementsSection) {
        achievementsSection.style.display = 'block';
        
        // Actualizar datos de logros
        AchievementsManager.loadAchievements();
      }
    });
  }
});