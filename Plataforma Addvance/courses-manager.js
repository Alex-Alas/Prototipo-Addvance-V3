/**
 * Courses Manager
 * Gestiona los cursos, su asignación a empleados y el seguimiento del progreso
 */

// Objeto principal para la gestión de cursos
const CoursesManager = {
  /**
   * Inicializar el gestor de cursos
   * @param {string} userId - ID del usuario actual
   * @param {string} userType - Tipo de usuario ('empleado' o 'empresa')
   */
  init(userId, userType) {
    this.currentUserId = userId || 'empleado-ejemplo';
    this.userType = userType || 'empleado';
    
    // Inicializar la interfaz según el tipo de usuario
    if (this.userType === 'empleado') {
      this.initEmployeeView();
    } else if (this.userType === 'empresa') {
      this.initCompanyView();
    }
    
    console.log(`CoursesManager inicializado para ${this.userType}: ${this.currentUserId}`);
  },
  
  /**
   * Inicializar vista para empleados
   */
  initEmployeeView() {
    // Verificar que el elemento de cursos exista
    const coursesList = document.getElementById('employeeCoursesList');
    if (!coursesList) {
      console.error('No se encontró el contenedor para los cursos de empleado');
      return;
    }
    
    // Cargar los cursos disponibles para el empleado
    this.loadEmployeeAvailableCourses(coursesList);
    
    // Configurar eventos para módulos, lecciones y quizzes
    this.setupEmployeeCourseEvents();
  },
  
  /**
   * Inicializar vista para empresas
   */
  initCompanyView() {
    // Verificar que el elemento de cursos exista
    const coursesList = document.getElementById('companyAcquiredCoursesList');
    if (!coursesList) {
      console.error('No se encontró el contenedor para los cursos de empresa');
      return;
    }
    
    // Cargar los cursos adquiridos por la empresa con progreso de empleados
    this.loadCompanyAcquiredCourses(coursesList);
  },
  
  /**
   * Cargar cursos disponibles para un empleado
   * @param {HTMLElement} container - Contenedor donde cargar los cursos
   */
  loadEmployeeAvailableCourses(container) {
    // Verificar que los datos estén disponibles
    if (!window.courseManager || !window.employeesData) {
      console.error('Los datos de cursos no están disponibles');
      return;
    }
    
    // Obtener cursos disponibles para el empleado
    const courses = window.courseManager.getEmployeeAvailableCourses(this.currentUserId);
    
    // Verificar si hay cursos
    if (courses.length === 0) {
      container.innerHTML = `
        <div class="no-courses-message">
          <i class="fas fa-info-circle"></i>
          <p>No tienes cursos asignados actualmente. Tu empresa necesita adquirir cursos y asignártelos.</p>
        </div>
      `;
      return;
    }
    
    // Crear HTML para cada curso
    container.innerHTML = '';
    
    for (const course of courses) {
      const courseDiv = document.createElement('div');
      courseDiv.className = 'employee-course-item';
      courseDiv.dataset.courseId = course.id;
      
      // Estructurar el HTML del curso con sus módulos
      courseDiv.innerHTML = `
        <div class="course-header">
          <h3>${course.title}</h3>
          <div class="course-status ${this.getStatusClass(course.progress.status)}">
            ${course.progress.status}
          </div>
        </div>
        <div class="course-progress-bar">
          <div class="course-progress-fill" style="width: ${course.progress.overallProgress}%"></div>
        </div>
        <div class="course-progress-text">
          Progreso total: ${course.progress.overallProgress}%
        </div>
        <div class="course-modules">
          ${this.createModulesHTML(course)}
        </div>
      `;
      
      container.appendChild(courseDiv);
    }
  },
  
  /**
   * Cargar cursos adquiridos por una empresa con progreso de empleados
   * @param {HTMLElement} container - Contenedor donde cargar los cursos
   */
  loadCompanyAcquiredCourses(container) {
    // Verificar que los datos estén disponibles
    if (!window.courseManager || !window.companiesData) {
      console.error('Los datos de cursos no están disponibles');
      return;
    }
    
    // Obtener cursos adquiridos por la empresa
    const courses = window.courseManager.getCompanyAcquiredCourses(this.currentUserId);
    
    // Verificar si hay cursos
    if (courses.length === 0) {
      container.innerHTML = `
        <div class="no-courses-message">
          <i class="fas fa-info-circle"></i>
          <p>No has adquirido cursos todavía. Explora la sección de búsqueda para encontrar cursos disponibles.</p>
        </div>
      `;
      return;
    }
    
    // Crear HTML para cada curso
    container.innerHTML = '';
    
    for (const course of courses) {
      const courseDiv = document.createElement('div');
      courseDiv.className = 'curso-card';
      courseDiv.dataset.courseId = course.id;
      
      // Obtener el progreso de los empleados en este curso
      const employeesProgress = window.courseManager.getCompanyCourseEmployeeProgress(this.currentUserId, course.id);
      
      // Estructurar el HTML del curso con el progreso de los empleados
      courseDiv.innerHTML = `
        <h3>${course.title}</h3>
        <p>Estado: ${course.status}</p>
        <p class="deadline">Fecha límite para agendar: ${course.deadlineToSchedule}</p>
        <select class="schedule-dropdown">
          <option>Seleccionar horario para workshop</option>
          ${course.scheduleOptions.map(option => 
            `<option ${option.selected ? 'selected' : ''}>${option.time}</option>`
          ).join('')}
        </select>
        <div class="curso-details">
          <h4>Progreso de los empleados</h4>
          ${this.createEmployeeProgressHTML(employeesProgress)}
        </div>
      `;
      
      container.appendChild(courseDiv);
    }
  },
  
  /**
   * Generar HTML para los módulos de un curso
   * @param {Object} course - Datos del curso
   * @returns {string} HTML generado para los módulos
   */
  createModulesHTML(course) {
    if (!course.modules || course.modules.length === 0) {
      return '<p>Este curso no tiene módulos definidos.</p>';
    }
    
    return course.modules.map(module => {
      // Obtener datos de progreso del módulo
      const moduleProgress = course.progress.modules[module.id] || {
        status: 'No iniciado',
        progress: 0,
        lessons: {},
        quiz: { completed: false }
      };
      
      return `
        <div class="module-content" data-module-id="${module.id}">
          <div class="module-unit-expanded">
            <div class="module-icon">📘</div>
            <div>
              <h3>${module.title}</h3>
              <div class="module-progress-bar">
                <div class="module-progress-fill" style="width: ${moduleProgress.progress}%;"></div>
              </div>
            </div>
          </div>
          <p>${module.description}</p>
          
          <div class="lessons-grid">
            ${this.createLessonsHTML(module, moduleProgress)}
            ${this.createQuizHTML(module, moduleProgress)}
          </div>
        </div>
      `;
    }).join('');
  },
  
  /**
   * Generar HTML para las lecciones de un módulo
   * @param {Object} module - Datos del módulo
   * @param {Object} moduleProgress - Datos de progreso del módulo
   * @returns {string} HTML generado para las lecciones
   */
  createLessonsHTML(module, moduleProgress) {
    if (!module.lessons || module.lessons.length === 0) {
      return '';
    }
    
    return module.lessons.map(lesson => {
      const lessonProgress = moduleProgress.lessons[lesson.id] || { completed: false };
      const completedClass = lessonProgress.completed ? 'lesson-completed' : '';
      
      return `
        <div class="lesson-card ${completedClass}" data-lesson-id="${lesson.id}">
          <div class="lesson-icon">🔠</div>
          <h4>${lesson.title}</h4>
          <p>${lesson.description}</p>
          <button class="start-lesson-btn" data-module-id="${module.id}" data-lesson-id="${lesson.id}">
            ${lessonProgress.completed ? 'Completado ✓' : 'Iniciar'}
          </button>
        </div>
      `;
    }).join('');
  },
  
  /**
   * Generar HTML para el quiz de un módulo
   * @param {Object} module - Datos del módulo
   * @param {Object} moduleProgress - Datos de progreso del módulo
   * @returns {string} HTML generado para el quiz
   */
  createQuizHTML(module, moduleProgress) {
    if (!module.quiz) {
      return '';
    }
    
    const quizProgress = moduleProgress.quiz || { completed: false };
    const completedClass = quizProgress.completed ? 'quiz-completed' : '';
    const score = quizProgress.score ? `<span class="quiz-score">Puntuación: ${quizProgress.score}%</span>` : '';
    
    return `
      <div class="lesson-card quiz-card ${completedClass}" data-module="${module.id}">
        <div class="lesson-icon">❓</div>
        <h4>${module.quiz.title}</h4>
        <p>Evalúa tu conocimiento</p>
        ${score}
        <button class="start-lesson-btn" data-module-id="${module.id}" data-quiz-id="${module.quiz.id}">
          ${quizProgress.completed ? 'Completado ✓' : 'Iniciar ❓'}
        </button>
      </div>
    `;
  },
  
  /**
   * Generar HTML para el progreso de los empleados en un curso
   * @param {Array} employeesProgress - Array con el progreso de los empleados
   * @returns {string} HTML generado para la tabla de progreso
   */
  createEmployeeProgressHTML(employeesProgress) {
    if (employeesProgress.length === 0) {
      return '<p>No hay empleados asignados a este curso.</p>';
    }
    
    return `
      <table class="participants-table">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Progreso</th>
            <th>Estado</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          ${employeesProgress.map(employee => `
            <tr>
              <td>${employee.name}</td>
              <td>
                <div class="employee-progress-bar">
                  <div class="employee-progress-fill" style="width: ${employee.progress.overallProgress}%"></div>
                </div>
                <span>${employee.progress.overallProgress}%</span>
              </td>
              <td>${employee.progress.status}</td>
              <td>
                <button class="view-details-btn" data-employee-id="${employee.employeeId}">
                  <i class="fas fa-info-circle"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },
  
  /**
   * Configurar eventos para los elementos del curso de empleado
   */
  setupEmployeeCourseEvents() {
    // Al cargar la página, agregar event listeners para lecciones y quizzes
    document.addEventListener('DOMContentLoaded', () => {
      this.setupLessonButtonEvents();
      this.setupQuizButtonEvents();
      
      // Configurar eventos de cierre de modales
      const closeLessonBtn = document.getElementById('closeLessonBtn');
      const closeQuizBtn = document.getElementById('closeQuizBtn');
      
      if (closeLessonBtn) {
        closeLessonBtn.addEventListener('click', () => {
          document.getElementById('lessonModal').style.display = 'none';
        });
      }
      
      if (closeQuizBtn) {
        closeQuizBtn.addEventListener('click', () => {
          document.getElementById('quizModal').style.display = 'none';
        });
      }
      
      // Configurar evento para completar lección
      const completeLessonBtn = document.getElementById('completeLessonBtn');
      if (completeLessonBtn) {
        completeLessonBtn.addEventListener('click', this.handleLessonCompletion.bind(this));
      }
      
      // Configurar evento para enviar quiz
      const submitQuizBtn = document.getElementById('submitQuizBtn');
      if (submitQuizBtn) {
        submitQuizBtn.addEventListener('click', this.handleQuizSubmission.bind(this));
      }
    });
  },
  
  /**
   * Configurar eventos para los botones de lecciones
   */
  setupLessonButtonEvents() {
    document.addEventListener('click', (event) => {
      if (!event.target.matches('.start-lesson-btn')) return;
      if (event.target.closest('.quiz-card')) return; // Ignorar botones de quiz
      
      const moduleId = event.target.dataset.moduleId;
      const lessonId = event.target.dataset.lessonId;
      
      if (moduleId && lessonId) {
        this.showLesson(moduleId, lessonId);
      }
    });
  },
  
  /**
   * Configurar eventos para los botones de quiz
   */
  setupQuizButtonEvents() {
    document.addEventListener('click', (event) => {
      if (!event.target.matches('.quiz-card .start-lesson-btn')) return;
      
      const moduleId = event.target.dataset.moduleId;
      const quizId = event.target.dataset.quizId;
      
      if (moduleId && quizId) {
        this.showQuiz(moduleId, quizId);
      }
    });
  },
  
  /**
   * Mostrar el contenido de una lección
   * @param {string} moduleId - ID del módulo
   * @param {string} lessonId - ID de la lección
   */
  showLesson(moduleId, lessonId) {
    // Buscar datos del curso y la lección
    const course = this.findCourseByModuleId(moduleId);
    if (!course) return;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    
    // Configurar el modal de lección
    const lessonModal = document.getElementById('lessonModal');
    if (!lessonModal) return;
    
    // Actualizar título
    const lessonTitle = document.getElementById('lessonTitle');
    if (lessonTitle) {
      lessonTitle.textContent = `Lección: ${lesson.title}`;
    }
    
    // Configurar contenido
    const lessonContent = document.getElementById('lessonContent');
    if (lessonContent) {
      lessonContent.innerHTML = `
        <div class="lesson-level">
          <h4>${lesson.title}</h4>
          <p>${lesson.content || 'Contenido no disponible para esta lección.'}</p>
        </div>
      `;
    }
    
    // Actualizar navegación
    const completeLessonBtn = document.getElementById('completeLessonBtn');
    if (completeLessonBtn) {
      completeLessonBtn.style.display = 'block';
      completeLessonBtn.dataset.moduleId = moduleId;
      completeLessonBtn.dataset.lessonId = lessonId;
    }
    
    const prevLevelBtn = document.getElementById('prevLevelBtn');
    if (prevLevelBtn) {
      prevLevelBtn.style.display = 'none';
    }
    
    const nextLevelBtn = document.getElementById('nextLevelBtn');
    if (nextLevelBtn) {
      nextLevelBtn.style.display = 'none';
    }
    
    // Mostrar el modal
    lessonModal.style.display = 'flex';
  },
  
  /**
   * Mostrar un quiz
   * @param {string} moduleId - ID del módulo
   * @param {string} quizId - ID del quiz
   */
  showQuiz(moduleId, quizId) {
    // Buscar datos del curso y el quiz
    const course = this.findCourseByModuleId(moduleId);
    if (!course) return;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return;
    
    const quiz = module.quiz;
    if (!quiz) return;
    
    // Configurar el modal de quiz
    const quizModal = document.getElementById('quizModal');
    if (!quizModal) return;
    
    // Actualizar título
    const quizTitle = document.getElementById('quizTitle');
    if (quizTitle) {
      quizTitle.textContent = quiz.title;
    }
    
    // Configurar preguntas
    const quizQuestions = document.getElementById('quizQuestions');
    if (quizQuestions) {
      quizQuestions.innerHTML = '';
      
      // Generar HTML para cada pregunta
      if (quiz.questions && quiz.questions.length > 0) {
        quiz.questions.forEach((question, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.className = 'quiz-question';
          
          questionDiv.innerHTML = `
            <p>${index + 1}. ${question.question}</p>
            <div class="quiz-options">
              ${question.options.map((option, optIndex) => `
                <label>
                  <input type="radio" name="q${index}" value="${optIndex}">
                  ${option}
                </label>
              `).join('')}
            </div>
          `;
          
          quizQuestions.appendChild(questionDiv);
        });
      } else {
        quizQuestions.innerHTML = '<p>No hay preguntas disponibles para este quiz.</p>';
      }
    }
    
    // Configurar botón de envío
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    if (submitQuizBtn) {
      submitQuizBtn.dataset.moduleId = moduleId;
      submitQuizBtn.dataset.quizId = quizId;
    }
    
    // Mostrar el modal
    quizModal.style.display = 'flex';
  },
  
  /**
   * Manejar la finalización de una lección
   * @param {Event} event - Evento de clic
   */
  handleLessonCompletion(event) {
    const moduleId = event.target.dataset.moduleId;
    const lessonId = event.target.dataset.lessonId;
    
    if (!moduleId || !lessonId) return;
    
    // Buscar datos del curso
    const course = this.findCourseByModuleId(moduleId);
    if (!course) return;
    
    // Actualizar progreso
    const updated = window.courseManager.updateEmployeeCourseProgress(
      this.currentUserId,
      course.id,
      moduleId,
      lessonId,
      true, // Lección completada
      false, // Quiz no afectado
      null // Sin puntuación de quiz
    );
    
    if (updated) {
      // Cerrar el modal
      const lessonModal = document.getElementById('lessonModal');
      if (lessonModal) {
        lessonModal.style.display = 'none';
      }
      
      // Actualizar la UI
      this.refreshEmployeeCoursesView();
    }
  },
  
  /**
   * Manejar el envío de un quiz
   * @param {Event} event - Evento de clic
   */
  handleQuizSubmission(event) {
    const moduleId = event.target.dataset.moduleId;
    const quizId = event.target.dataset.quizId;
    
    if (!moduleId || !quizId) return;
    
    // Buscar datos del curso y el quiz
    const course = this.findCourseByModuleId(moduleId);
    if (!course) return;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module || !module.quiz) return;
    
    // Recoger respuestas
    const answers = this.collectQuizAnswers(module.quiz.questions.length);
    
    // Calcular puntuación
    const score = this.calculateQuizScore(answers, module.quiz.questions);
    
    // Actualizar progreso
    const updated = window.courseManager.updateEmployeeCourseProgress(
      this.currentUserId,
      course.id,
      moduleId,
      null, // Sin lección específica
      false, // No afecta a lecciones
      true, // Quiz completado
      score // Puntuación obtenida
    );
    
    if (updated) {
      // Mostrar resultado
      alert(`¡Quiz completado! Tu puntuación es: ${score}%`);
      
      // Cerrar el modal
      const quizModal = document.getElementById('quizModal');
      if (quizModal) {
        quizModal.style.display = 'none';
      }
      
      // Actualizar la UI
      this.refreshEmployeeCoursesView();
    }
  },
  
  /**
   * Recoger respuestas del quiz
   * @param {number} questionCount - Número de preguntas
   * @returns {Array} Array con las respuestas seleccionadas
   */
  collectQuizAnswers(questionCount) {
    const answers = [];
    
    for (let i = 0; i < questionCount; i++) {
      const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
      answers.push(selectedOption ? parseInt(selectedOption.value) : -1);
    }
    
    return answers;
  },
  
  /**
   * Calcular puntuación del quiz
   * @param {Array} answers - Respuestas del usuario
   * @param {Array} questions - Preguntas del quiz
   * @returns {number} Puntuación (0-100)
   */
  calculateQuizScore(answers, questions) {
    let correctCount = 0;
    
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    
    return Math.round((correctCount / questions.length) * 100);
  },
  
  /**
   * Actualizar la vista de cursos del empleado
   */
  refreshEmployeeCoursesView() {
    const coursesList = document.getElementById('employeeCoursesList');
    if (coursesList) {
      this.loadEmployeeAvailableCourses(coursesList);
    }
  },
  
  /**
   * Encontrar un curso por ID de módulo
   * @param {string} moduleId - ID del módulo
   * @returns {Object|null} Datos del curso o null si no se encuentra
   */
  findCourseByModuleId(moduleId) {
    const courses = window.courseManager.getEmployeeAvailableCourses(this.currentUserId);
    
    for (const course of courses) {
      const module = course.modules.find(m => m.id === moduleId);
      if (module) {
        return course;
      }
    }
    
    return null;
  },
  
  /**
   * Obtener clase CSS según el estado
   * @param {string} status - Estado ('No iniciado', 'En progreso', 'Completado')
   * @returns {string} Nombre de clase CSS
   */
  getStatusClass(status) {
    switch (status) {
      case 'Completado':
        return 'status-completed';
      case 'En progreso':
        return 'status-in-progress';
      case 'No iniciado':
      default:
        return 'status-not-started';
    }
  },

  // Modificar la función que crea HTML para cursos en búsqueda
  createSearchCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'curso-card';
    card.dataset.courseId = course.id;
    
    // Añadir información del proveedor
    const providerInfo = course.providerId ? `
      <div class="provider-info">
        <h4>Proveedor:</h4>
        <p class="provider-name">${course.providerName || 'No especificado'}</p>
        <p class="provider-description">${course.providerDescription || ''}</p>
        <button class="view-provider-btn" data-provider-id="${course.providerId}">Ver perfil del proveedor</button>
      </div>
    ` : '';
    
    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="curso-details">
        <div class='curso-details-container'>
          <p>Duración: ${course.duration}</p>
        </div>
        <p>Nivel: ${course.level}</p>
        <p>Participantes: Mínimo ${course.minParticipants}</p>
        <p><b>Precio:</b> ${course.price}</p>
        <p>${course.detailedDescription}</p>
        ${providerInfo}
        <button class="purchase-btn">Comprar Curso</button>
      </div>
    `;
    
    // Añadir evento para ver perfil del proveedor
    const viewProviderBtn = card.querySelector('.view-provider-btn');
    if (viewProviderBtn) {
      viewProviderBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que se expanda la tarjeta
        this.viewProviderProfile(course.providerId);
      });
    }
    
    return card;
  },

  // Añadir método para ver perfil del proveedor
  viewProviderProfile(providerId) {
    console.log(`Ver perfil del proveedor: ${providerId}`);
    // Implementación real: Abrir modal con detalles del proveedor
    
    const provider = window.providersData[providerId];
    if (!provider) {
      alert('Información del proveedor no disponible');
      return;
    }
    
    // Crear y mostrar modal con información del proveedor
    const modal = document.createElement('div');
    modal.className = 'provider-profile-modal';
    
    modal.innerHTML = `
      <div class="provider-profile-content">
        <button class="close-modal-btn">&times;</button>
        <h2>${provider.name}</h2>
        <div class="provider-details">
          <p><strong>Tipo de negocio:</strong> ${provider.businessType}</p>
          <p><strong>Descripción:</strong> ${provider.description}</p>
          <div class="provider-contact">
            <h3>Información de contacto:</h3>
            <p><i class="fas fa-envelope"></i> ${provider.contactInfo.email}</p>
            <p><i class="fas fa-phone"></i> ${provider.contactInfo.phone}</p>
            <p><i class="fas fa-globe"></i> ${provider.contactInfo.website}</p>
          </div>
          <div class="provider-courses">
            <h3>Cursos ofrecidos:</h3>
            <ul>
              ${provider.offeredCourses.map(courseId => {
                const course = coursesDatabase.find(c => c.id === courseId);
                return course 
                  ? `<li>${course.title} - ${course.level}</li>` 
                  : '';
              }).join('')}
            </ul>
          </div>
        </div>
        <div class="provider-actions">
          <button class="contact-provider-btn">Contactar proveedor</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Añadir evento para cerrar el modal
    modal.querySelector('.close-modal-btn').addEventListener('click', () => {
      modal.remove();
    });
    
    // Añadir evento para contactar al proveedor
    modal.querySelector('.contact-provider-btn').addEventListener('click', () => {
      alert(`Funcionalidad: Contactar a ${provider.name} mediante el sistema de mensajería`);
      // Implementación real: Abrir interfaz de mensajería
    });
  }
};

// Inicializar cuando se carga el documento
document.addEventListener('DOMContentLoaded', function() {
  // Verificar si estamos en una página de empleado
  const employeeCoursesList = document.getElementById('employeeCoursesList');
  if (employeeCoursesList) {
    // Inicializar con el empleado ejemplo
    // En una implementación real, obtendríamos el ID del empleado desde la sesión del usuario
    CoursesManager.init('empleado-ejemplo', 'empleado');
  }
  
  // Verificar si estamos en una página de empresa
  const companyAcquiredCoursesList = document.getElementById('companyAcquiredCoursesList');
  if (companyAcquiredCoursesList) {
    // Inicializar con la empresa ejemplo
    // En una implementación real, obtendríamos el ID de la empresa desde la sesión del usuario
    CoursesManager.init('empresa-ejemplo', 'empresa');
  }
});

/**
 * Gestiona la interacción con proveedores y sus cursos
 */
window.courseManager = window.courseManager || {};

/**
 * Obtiene los proveedores de los cursos adquiridos por una empresa
 * @param {string} companyId - ID de la empresa
 * @returns {Array} - Array de proveedores con sus cursos
 */
window.courseManager.getCompanyProviders = function(companyId) {
  const company = window.companiesData[companyId];
  if (!company || !company.acquiredCourses || company.acquiredCourses.length === 0) {
    return [];
  }
  
  // Crear un mapa de proveedores para evitar duplicados
  const providersMap = new Map();
  
  // Extraer los IDs de proveedores de los cursos adquiridos
  company.acquiredCourses.forEach(course => {
    const courseData = window.coursesDatabase.find(c => c.id === course.courseId);
    if (courseData && courseData.providerId) {
      if (!providersMap.has(courseData.providerId)) {
        providersMap.set(courseData.providerId, {
          id: courseData.providerId,
          name: courseData.providerName || 'Proveedor sin nombre',
          description: courseData.providerDescription || 'Sin descripción',
          courses: []
        });
      }
      
      const provider = providersMap.get(courseData.providerId);
      provider.courses.push({
        id: courseData.id,
        title: courseData.title,
        description: courseData.description,
        purchaseDate: course.purchaseDate
      });
    }
  });
  
  // Convertir mapa a array
  return Array.from(providersMap.values());
};

/**
 * Obtiene los proveedores disponibles que no han sido adquiridos por una empresa
 * @param {string} companyId - ID de la empresa
 * @returns {Array} - Array de proveedores disponibles
 */
window.courseManager.getAvailableProvidersForCompany = function(companyId) {
  const company = window.companiesData[companyId];
  if (!company) return [];
  
  // Obtener ids de proveedores con cursos ya adquiridos
  const acquiredProviderIds = new Set();
  
  if (company.acquiredCourses && company.acquiredCourses.length > 0) {
    company.acquiredCourses.forEach(course => {
      const courseData = window.coursesDatabase.find(c => c.id === course.courseId);
      if (courseData && courseData.providerId) {
        acquiredProviderIds.add(courseData.providerId);
      }
    });
  }
  
  // Obtener todos los proveedores disponibles que no han sido adquiridos
  const providersMap = new Map();
  
  window.coursesDatabase.forEach(course => {
    if (course.providerId && !acquiredProviderIds.has(course.providerId) && !providersMap.has(course.providerId)) {
      providersMap.set(course.providerId, {
        id: course.providerId,
        name: course.providerName || 'Proveedor sin nombre',
        description: course.providerDescription || 'Sin descripción',
        courses: []
      });
    }
    
    if (course.providerId && !acquiredProviderIds.has(course.providerId)) {
      const provider = providersMap.get(course.providerId);
      
      if (provider && !provider.courses.some(c => c.id === course.id)) {
        provider.courses.push({
          id: course.id,
          title: course.title,
          description: course.description
        });
      }
    }
  });
  
  return Array.from(providersMap.values());
};

/**
 * Obtiene clientes actuales de un proveedor (empresas que han adquirido cursos)
 * @param {string} providerId - ID del proveedor
 * @returns {Array} - Array de clientes actuales
 */
window.courseManager.getProviderCurrentClients = function(providerId) {
  const clients = [];
  
  // Iterar sobre todas las empresas
  Object.values(window.companiesData).forEach(company => {
    if (company.acquiredCourses && company.acquiredCourses.length > 0) {
      // Filtrar cursos adquiridos para encontrar los de este proveedor
      const providerCourses = company.acquiredCourses.filter(course => {
        const courseData = window.coursesDatabase.find(c => c.id === course.courseId);
        return courseData && courseData.providerId === providerId;
      });
      
      // Si hay cursos de este proveedor, agregar a la empresa como cliente
      if (providerCourses.length > 0) {
        clients.push({
          id: company.id,
          name: company.name,
          acquiredCourses: providerCourses.map(course => {
            const courseData = window.coursesDatabase.find(c => c.id === course.courseId);
            return {
              id: course.courseId,
              title: courseData ? courseData.title : 'Curso desconocido',
              purchaseDate: course.purchaseDate
            };
          })
        });
      }
    }
  });
  
  return clients;
};

/**
 * Obtiene clientes potenciales para un proveedor (empresas que no han adquirido cursos)
 * @param {string} providerId - ID del proveedor
 * @returns {Array} - Array de clientes potenciales
 */
window.courseManager.getPotentialClientsForProvider = function(providerId) {
  const currentClients = window.courseManager.getProviderCurrentClients(providerId);
  const currentClientIds = currentClients.map(client => client.id);
  
  const potentialClients = [];
  
  // Iterar sobre todas las empresas
  Object.values(window.companiesData).forEach(company => {
    // Si no es un cliente actual, agregar como cliente potencial
    if (!currentClientIds.includes(company.id)) {
      potentialClients.push({
        id: company.id,
        name: company.name
      });
    }
  });
  
  return potentialClients;
}; 