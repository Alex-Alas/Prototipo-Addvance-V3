/**
 * Achievements Manager for Addvance Platform
 * Manages achievements and their display for company users
 */

const ACHIEVEMENT_TYPES = {
  PROFILE_COMPLETE: 'PROFILE_COMPLETE',
  FIRST_EMPLOYEE: 'FIRST_EMPLOYEE',
  EMPLOYEE_MILESTONE: 'EMPLOYEE_MILESTONE',
  FIRST_CONNECTION: 'FIRST_CONNECTION',
  CONNECTION_MILESTONE: 'CONNECTION_MILESTONE',
  MESSAGE_MILESTONE: 'MESSAGE_MILESTONE',
  PLATFORM_VETERAN: 'PLATFORM_VETERAN'
};

const ACHIEVEMENTS_CONFIG = {
  [ACHIEVEMENT_TYPES.PROFILE_COMPLETE]: {
    title: 'Perfil Empresarial Completo',
    description: 'Has completado toda la información de tu perfil empresarial',
    icon: 'fa-star',
    points: 100
  },
  [ACHIEVEMENT_TYPES.FIRST_EMPLOYEE]: {
    title: 'Primer Empleado Registrado',
    description: 'Has registrado tu primer empleado en la plataforma',
    icon: 'fa-user-plus',
    points: 50
  },
  [ACHIEVEMENT_TYPES.EMPLOYEE_MILESTONE]: {
    title: 'Equipo en Crecimiento',
    description: 'Has registrado 5 empleados en la plataforma',
    icon: 'fa-users',
    points: 200
  },
  [ACHIEVEMENT_TYPES.FIRST_CONNECTION]: {
    title: 'Primera Conexión Empresarial',
    description: 'Has establecido tu primera conexión con un proveedor',
    icon: 'fa-handshake',
    points: 75
  },
  [ACHIEVEMENT_TYPES.CONNECTION_MILESTONE]: {
    title: 'Red Empresarial',
    description: 'Has establecido conexión con 10 proveedores',
    icon: 'fa-network-wired',
    points: 300
  },
  [ACHIEVEMENT_TYPES.MESSAGE_MILESTONE]: {
    title: 'Comunicador Activo',
    description: 'Has enviado más de 50 mensajes en la plataforma',
    icon: 'fa-comments',
    points: 150
  },
  [ACHIEVEMENT_TYPES.PLATFORM_VETERAN]: {
    title: 'Veterano de Addvance',
    description: '6 meses siendo parte de la comunidad Addvance',
    icon: 'fa-medal',
    points: 500
  }
};

class AchievementsManager {
  constructor(empresaEmail) {
    this.empresaEmail = empresaEmail;
    this.achievements = this.loadAchievements();
    this.initializeEventListeners();
  }

  loadAchievements() {
    return JSON.parse(localStorage.getItem(`achievements_${this.empresaEmail}`)) || [];
  }

  saveAchievements() {
    localStorage.setItem(`achievements_${this.empresaEmail}`, JSON.stringify(this.achievements));
  }

  initializeEventListeners() {
    // Escuchar eventos relevantes para logros
    document.addEventListener('profileUpdated', this.checkProfileCompletion.bind(this));
    document.addEventListener('employeeAdded', this.checkEmployeeMilestones.bind(this));
    document.addEventListener('connectionCreated', this.checkConnectionMilestones.bind(this));
    document.addEventListener('messageSent', this.checkMessageMilestones.bind(this));
  }

  checkProfileCompletion(event) {
    const profileData = event.detail;
    const requiredFields = ['nombre', 'direccion', 'telefono', 'industria', 'descripcion'];
    const isComplete = requiredFields.every(field => profileData[field] && profileData[field].trim() !== '');
    
    if (isComplete && !this.hasAchievement(ACHIEVEMENT_TYPES.PROFILE_COMPLETE)) {
      this.addAchievement(ACHIEVEMENT_TYPES.PROFILE_COMPLETE);
    }
  }

  checkEmployeeMilestones(event) {
    const employeeCount = event.detail.count;
    
    if (employeeCount === 1 && !this.hasAchievement(ACHIEVEMENT_TYPES.FIRST_EMPLOYEE)) {
      this.addAchievement(ACHIEVEMENT_TYPES.FIRST_EMPLOYEE);
    }
    if (employeeCount >= 5 && !this.hasAchievement(ACHIEVEMENT_TYPES.EMPLOYEE_MILESTONE)) {
      this.addAchievement(ACHIEVEMENT_TYPES.EMPLOYEE_MILESTONE);
    }
  }

  checkConnectionMilestones(event) {
    const connectionCount = event.detail.count;
    
    if (connectionCount === 1 && !this.hasAchievement(ACHIEVEMENT_TYPES.FIRST_CONNECTION)) {
      this.addAchievement(ACHIEVEMENT_TYPES.FIRST_CONNECTION);
    }
    if (connectionCount >= 10 && !this.hasAchievement(ACHIEVEMENT_TYPES.CONNECTION_MILESTONE)) {
      this.addAchievement(ACHIEVEMENT_TYPES.CONNECTION_MILESTONE);
    }
  }

  checkMessageMilestones(event) {
    const messageCount = event.detail.count;
    
    if (messageCount >= 50 && !this.hasAchievement(ACHIEVEMENT_TYPES.MESSAGE_MILESTONE)) {
      this.addAchievement(ACHIEVEMENT_TYPES.MESSAGE_MILESTONE);
    }
  }

  addAchievement(achievementType) {
    const achievement = {
      type: achievementType,
      ...ACHIEVEMENTS_CONFIG[achievementType],
      dateEarned: new Date().toISOString(),
      id: crypto.randomUUID()
    };

    this.achievements.unshift(achievement);
    this.saveAchievements();
    this.notifyNewAchievement(achievement);
    this.updateAchievementsFeed();
  }

  hasAchievement(achievementType) {
    return this.achievements.some(a => a.type === achievementType);
  }

  notifyNewAchievement(achievement) {
    const notification = {
      title: '¡Nuevo Logro Desbloqueado!',
      message: achievement.description,
      icon: achievement.icon,
      points: achievement.points
    };
    
    agregarNotificacion(this.empresaEmail, JSON.stringify(notification));
  }

  updateAchievementsFeed() {
    const feedContainer = document.getElementById('achievementsFeed');
    if (!feedContainer) return;

    // Si no hay logros, mostrar ejemplos
    if (this.achievements.length === 0) {
      // Crear ejemplos de logros para mostrar en el feed
      const exampleAchievements = [
        {
          title: 'Perfil Empresarial Completo',
          description: 'Has completado toda la información de tu perfil empresarial',
          icon: 'fa-star',
          points: 100,
          dateEarned: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() // ~2 meses atrás
        },
        {
          title: 'Primer Empleado Registrado',
          description: 'Has registrado tu primer empleado en la plataforma',
          icon: 'fa-user-plus',
          points: 50,
          dateEarned: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString() // ~45 días atrás
        },
        {
          title: 'Primera Conexión Empresarial',
          description: 'Has establecido tu primera conexión con un proveedor',
          icon: 'fa-handshake',
          points: 75,
          dateEarned: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() // ~1 mes atrás
        },
        {
          title: 'Equipo en Crecimiento',
          description: 'Has registrado 5 empleados en la plataforma',
          icon: 'fa-users',
          points: 200,
          dateEarned: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // ~2 semanas atrás
        },
        {
          title: 'Comunicador Activo',
          description: 'Has enviado más de 50 mensajes en la plataforma',
          icon: 'fa-comments',
          points: 150,
          dateEarned: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // ~1 semana atrás
        }
      ];

      feedContainer.innerHTML = exampleAchievements.map(achievement => `
        <div class="achievement-card example-achievement">
          <div class="achievement-icon">
            <i class="fas ${achievement.icon}"></i>
          </div>
          <div class="achievement-content">
            <h3 class="achievement-title">${achievement.title}</h3>
            <p class="achievement-description">${achievement.description}</p>
            <span class="achievement-date">${new Date(achievement.dateEarned).toLocaleDateString()}</span>
          </div>
          <div class="achievement-points">
            ${achievement.points} pts
          </div>
        </div>
      `).join('');

      // Actualizar los contadores con los ejemplos
      const totalPoints = exampleAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
      const pointsElement = document.getElementById('totalPoints');
      if (pointsElement) {
        pointsElement.textContent = totalPoints;
      }

      const countElement = document.getElementById('achievementsCount');
      if (countElement) {
        countElement.textContent = exampleAchievements.length;
      }
      
      // Agregar una etiqueta que indique que son ejemplos
      feedContainer.insertAdjacentHTML('beforebegin', `
        <div class="example-notice">
          <i class="fas fa-info-circle"></i>
          Estos son ejemplos de logros que podrás desbloquear. ¡Completa acciones en la plataforma para ganar logros reales!
        </div>
      `);

      return;
    }

    // Código original para mostrar logros reales
    feedContainer.innerHTML = this.achievements.map(achievement => `
      <div class="achievement-card">
        <div class="achievement-icon">
          <i class="fas ${achievement.icon}"></i>
        </div>
        <div class="achievement-content">
          <h3 class="achievement-title">${achievement.title}</h3>
          <p class="achievement-description">${achievement.description}</p>
          <span class="achievement-date">${new Date(achievement.dateEarned).toLocaleDateString()}</span>
        </div>
        <div class="achievement-points">
          ${achievement.points} pts
        </div>
      </div>
    `).join('');

    this.updateTotalPoints();
    this.updateAchievementsCount();
  }

  updateTotalPoints() {
    const totalPoints = this.achievements.reduce((sum, achievement) => sum + achievement.points, 0);
    const pointsElement = document.getElementById('totalPoints');
    if (pointsElement) {
      pointsElement.textContent = totalPoints;
    }
  }

  updateAchievementsCount() {
    const countElement = document.getElementById('achievementsCount');
    if (countElement) {
      countElement.textContent = this.achievements.length;
    }
  }

  getTotalPoints() {
    return this.achievements.reduce((sum, achievement) => sum + achievement.points, 0);
  }
}

// Exportar para uso global
window.AchievementsManager = AchievementsManager;

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = obtenerUsuarioActual();
  if (currentUser && currentUser.tipoPerfil === 'empresa') {
    // Inicializar el gestor de logros
    const achievementsManager = new AchievementsManager(currentUser.correo);
    
    // Verificar logros iniciales
    checkAndAwardAchievements();
    
    // Actualizar el feed si la sección está visible
    const achievementsSection = document.getElementById('achievementsSection');
    if (achievementsSection && achievementsSection.style.display !== 'none') {
      achievementsManager.updateAchievementsFeed();
    }
  }
});

// Función para verificar y otorgar logros
function checkAndAwardAchievements() {
  const currentUser = obtenerUsuarioActual();
  if (!currentUser || currentUser.tipoPerfil !== 'empresa') return;
  
  const achievementsManager = new AchievementsManager(currentUser.correo);
  
  // Verificar logros basados en eventos
  document.dispatchEvent(new CustomEvent('profileUpdated', {
    detail: {
      nombre: currentUser.nombre,
      direccion: currentUser.direccion,
      telefono: currentUser.telefono,
      industria: currentUser.industria,
      descripcion: currentUser.descripcion
    }
  }));
  
  // Verificar logros de empleados
  const employees = obtenerEmpleados(currentUser.correo) || [];
  document.dispatchEvent(new CustomEvent('employeeAdded', {
    detail: { count: employees.length }
  }));
  
  // Verificar logros de conexiones
  const connections = obtenerConexiones(currentUser.correo) || [];
  document.dispatchEvent(new CustomEvent('connectionCreated', {
    detail: { count: connections.length }
  }));
  
  // Verificar logros de mensajes
  const messages = obtenerMensajes(currentUser.correo) || [];
  document.dispatchEvent(new CustomEvent('messageSent', {
    detail: { count: messages.length }
  }));
}

// Verificar logros después de acciones relevantes
document.addEventListener('profileUpdated', () => checkAndAwardAchievements());
document.addEventListener('employeeAdded', () => checkAndAwardAchievements());
document.addEventListener('connectionCreated', () => checkAndAwardAchievements());
document.addEventListener('messageSent', () => checkAndAwardAchievements());