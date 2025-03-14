/**
 * NAVIGATION PROJECT - Main JavaScript
 * This file contains all interactive functionality for the multi-user platform
 * including menu handling, section display, carousel functionality, and 
 * user-specific interfaces for empresa, empleado, and proveedor profiles.
 */

// Menu visibility handling - Hide menu on scroll down, show on scroll up
let lastScrollTop = 0;
const menu = document.getElementById('empresaMenu');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    menu.classList.add('hidden');
  } else {
    menu.classList.remove('hidden');
  }
  lastScrollTop = scrollTop;
});

// Section visibility handling - Shows one section at a time
function showSection(sectionId) {
  const sections = ['networkSection', 'profileSection', 'rankingsSection', 'journeySection'];
  sections.forEach(section => {
    document.getElementById(section).style.display = 'none';
  });
  document.getElementById(sectionId).style.display = 'block';
}

/**
 * Creates carousel items for different user types
 * @param {string} prefix - Text prefix for carousel items
 * @param {string} swiperClass - CSS class of the swiper container
 * @param {number} count - Number of carousel items to generate
 */
function createCarouselItems(prefix, swiperClass, count = 8) {
  const swiperWrapper = document.querySelector(`.${swiperClass} .swiper-wrapper`);
  if (!swiperWrapper) return; // Skip if wrapper doesn't exist
  
  // Clear existing slides if any
  swiperWrapper.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const industry = getRandomIndustry();
    const status = getRandomStatus();
    const location = getRandomLocation();
    const companyName = getCompanyName(prefix, i);
    
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <div class="card-content">
        <div class="card-image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M12 8v8" />
            <path d="M8 12h8" />
          </svg>
        </div>
        <div class="card-text">${companyName}</div>
      </div>
      <div class="enterprise-data">
        <h4>${companyName}</h4>
        <p>Industry: ${industry}</p>
        <p>Status: ${status}</p>
        <p>Score: ${Math.floor(Math.random() * 100)}</p>
        <p>Location: ${location}</p>
        <p>Founded: ${2000 + Math.floor(Math.random() * 23)}</p>
        <p>Employees: ${50 + Math.floor(Math.random() * 950)}</p>
        <button class="connect-btn">Connect</button>
      </div>
    `;
    swiperWrapper.appendChild(slide);
    
    // Add click event listener to the slide
    slide.addEventListener('click', function() {
      // Show enterprise data on click
      const enterpriseData = this.querySelector('.enterprise-data');
      if (enterpriseData) {
        enterpriseData.style.opacity = '1';
      }
    });
  }
}

/**
 * Initializes all carousel swipers with standard configuration
 * Configures and creates carousels for empresa, proveedor, and similar entities
 */
function initializeAllSwipers() {
  // Define swiper config once
  const swiperConfig = {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      968: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 3,
      },
    }
  };
  
  // Make swiperConfig globally accessible
  window.swiperConfig = swiperConfig;
  
  // Initialize empresa swipers
  if (document.querySelector('.empresasSwiper')) {
    createCarouselItems('Empresa', 'empresasSwiper');
    new Swiper('.empresasSwiper', swiperConfig);
  }
  
  if (document.querySelector('.proveedoresSwiper')) {
    createCarouselItems('Proveedor', 'proveedoresSwiper');
    new Swiper('.proveedoresSwiper', swiperConfig);
  }
  
  if (document.querySelector('.similaresSwiper')) {
    createCarouselItems('Similar', 'similaresSwiper');
    new Swiper('.similaresSwiper', swiperConfig);
  }
  
  // Initialize proveedor swipers
  if (document.querySelector('.proveedorClientesSwiper')) {
    createCarouselItems('Cliente', 'proveedorClientesSwiper');
    new Swiper('.proveedorClientesSwiper', swiperConfig);
  }
  
  if (document.querySelector('.proveedorPotencialesSwiper')) {
    createCarouselItems('Potencial', 'proveedorPotencialesSwiper');
    new Swiper('.proveedorPotencialesSwiper', swiperConfig);
  }
}

// Initial page setup - empresa user selection
document.getElementById('empresaBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'none';
  document.getElementById('empresaMenu').style.display = 'flex';
  document.getElementById('networkOption').click();
  initializeAllSwipers(); // Reinitialize swipers
});

// Menu option selection - Navigation between different sections
const menuOptions = ['perfil', 'network', 'rankings', 'journey'];
menuOptions.forEach(option => {
  document.getElementById(`${option}Option`).addEventListener('click', () => {
    menuOptions.forEach(opt => {
      document.getElementById(`${opt}Option`).classList.remove('selected');
    });
    document.getElementById(`${option}Option`).classList.add('selected');
    
    if (option === 'network') {
      showSection('networkSection');
    } else if (option === 'perfil') {
      showSection('profileSection');
    } else if (option === 'rankings') {
      showSection('rankingsSection');
    } else if (option === 'journey') {
      showSection('journeySection');
    }
  });
});

/**
 * Helper functions for generating random data for demonstration
 * @returns {string} Random industry name
 */
function getRandomIndustry() {
  const industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Energy', 'Retail', 'Agriculture', 'Construction', 'Education', 'Telecommunications', 'Automotive', 'Pharmaceutical'];
  return industries[Math.floor(Math.random() * industries.length)];
}

function getRandomStatus() {
  const statuses = ['Active', 'New', 'Potential', 'Premier Partner', 'VIP Client', 'Strategic Partner', 'Growing', 'Established'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

function getRandomLocation() {
  const locations = ['San Francisco', 'New York', 'London', 'Tokyo', 'Berlin', 'Mexico City', 'São Paulo', 'Madrid', 'Buenos Aires', 'Bogotá', 'Lima', 'Santiago', 'Panama City', 'Monterrey', 'Medellín'];
  return locations[Math.floor(Math.random() * locations.length)];
}

/**
 * Get random company name based on industry
 * @param {string} prefix - Type prefix (Empresa, Proveedor, etc.)
 * @param {number} index - Index number
 * @returns {string} Company name
 */
function getCompanyName(prefix, index) {
  const empresaNames = [
    'TechSolutions', 'GlobalFinance', 'MediHealth', 'PowerManufacturing', 
    'GreenEnergy', 'RetailTrends', 'AgriTech', 'BuilderPro', 
    'EduSystems', 'ConnectTel', 'AutoInnovate', 'PharmaPlus'
  ];
  
  const proveedorNames = [
    'SupplyTech', 'LogisticsPro', 'MaterialsSource', 'ITServices', 
    'ConsultingGroup', 'SecuritySystems', 'CloudSolutions', 'MarketingExperts',
    'HRServices', 'EnergySuppliers', 'DataAnalytics', 'MaintenancePro'
  ];
  
  if (prefix === 'Empresa') {
    return empresaNames[index % empresaNames.length] + ' ' + (Math.floor(index / empresaNames.length) + 1);
  } else if (prefix === 'Proveedor') {
    return proveedorNames[index % proveedorNames.length] + ' ' + (Math.floor(index / proveedorNames.length) + 1);
  } else if (prefix === 'Similar') {
    return empresaNames[(index + 3) % empresaNames.length] + ' ' + (Math.floor((index + 3) / empresaNames.length) + 1);
  } else if (prefix === 'Cliente') {
    return empresaNames[(index + 6) % empresaNames.length] + ' ' + (Math.floor((index + 6) / empresaNames.length) + 1);
  } else if (prefix === 'Potencial') {
    return empresaNames[(index + 9) % empresaNames.length] + ' ' + (Math.floor((index + 9) / empresaNames.length) + 1);
  }
  
  return prefix + ' ' + index;
}

// Logout functionality - Returns to user selection screen
document.getElementById('logoutBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'block';
  document.getElementById('empresaMenu').style.display = 'none';
  document.getElementById('networkSection').style.display = 'none';
  document.getElementById('profileSection').style.display = 'none';
  document.getElementById('rankingsSection').style.display = 'none';
  document.getElementById('journeySection').style.display = 'none';
});

/**
 * Creates a list of employees for the profile section
 * Generates employee cards with random scores
 */
function createEmployeeList() {
  const employeesList = document.querySelector('.employees-list');
  for (let i = 1; i <= 11; i++) {
    const li = document.createElement('li');
    li.className = 'employee-card';
    li.innerHTML = `
      <div class="employee-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="5"/>
          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/>
        </svg>
      </div>
      <div class="employee-info">
        <div>Empleado ${i}</div>
        <div>Puntaje: ${Math.floor(Math.random() * 100)}</div>
      </div>
    `;
    employeesList.appendChild(li);
  }
}

// Rankings functionality - Different views based on category selection
const rankingCategories = {
  'todas': 'Empresa',
  'industria': 'Industria',
  'rubro': 'Rubro',
  'departamento': 'Departamento',
  'municipio': 'Municipio'
};

/**
 * Updates rankings list based on selected category
 * @param {string} category - Selected ranking category
 */
function updateRankingsList(category) {
  const list = document.querySelector('.rankings-list');
  list.innerHTML = '';
  
  for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');
    li.className = 'ranking-item';
    li.innerHTML = `
      <div class="ranking-number">${i}</div>
      <div class="ranking-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      </div>
      <div class="ranking-info">
        <div class="ranking-name">${rankingCategories[category]} ${i}</div>
        <div class="ranking-score">Puntaje: ${Math.floor(Math.random() * 100)}</div>
      </div>
    `;
    list.appendChild(li);
  }
}

// Journey section functionality - Handles journey view options
document.getElementById('journeyOption').addEventListener('click', () => {
  menuOptions.forEach(opt => {
    document.getElementById(`${opt}Option`).classList.remove('selected');
  });
  document.getElementById('journeyOption').classList.add('selected');
  showSection('journeySection');
});

// Journey submenu handling - Switches between search and acquired views
const journeyViews = ['search', 'acquired'];
journeyViews.forEach(view => {
  document.getElementById(`${view}Tab`).addEventListener('click', () => {
    journeyViews.forEach(v => {
      document.getElementById(`${v}Tab`).classList.remove('active');
      document.getElementById(`${v}View`).style.display = 'none';
    });
    document.getElementById(`${view}Tab`).classList.add('active');
    document.getElementById(`${view}View`).style.display = 'block';
  });
});

// Journey card expansion - Toggle expanded view for journey details
document.querySelectorAll('.journey-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('expanded');
    // Add slight delay for better neumorphic visual experience
    setTimeout(() => {
      if (card.classList.contains('expanded')) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  });
});

// Enable the employee button
document.getElementById('empleadoBtn').disabled = false;

// Employee page layout
document.getElementById('empleadoBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'none';
  document.getElementById('empleadoMenu').style.display = 'flex';
  document.getElementById('empleadoPerfilOption').click(); // Default to profile view
});

// Employee menu option selection
const empleadoMenuOptions = ['empleadoPerfil', 'empleadoJourney', 'empleadoRanking'];
empleadoMenuOptions.forEach(option => {
  document.getElementById(`${option}Option`).addEventListener('click', () => {
    empleadoMenuOptions.forEach(opt => {
      document.getElementById(`${opt}Option`).classList.remove('selected');
    });
    document.getElementById(`${option}Option`).classList.add('selected');
    
    if (option === 'empleadoPerfil') {
      hideAllEmpleadoSections();
      document.getElementById('empleadoPerfilSection').style.display = 'block';
    } else if (option === 'empleadoJourney') {
      hideAllEmpleadoSections();
      document.getElementById('empleadoJourneySection').style.display = 'block';
    } else if (option === 'empleadoRanking') {
      hideAllEmpleadoSections();
      document.getElementById('empleadoRankingSection').style.display = 'block';
      updateEmpleadoRankingsList('empleados');
    }
  });
});

/**
 * Hides all employee sections for clean transitions
 */
function hideAllEmpleadoSections() {
  document.getElementById('empleadoPerfilSection').style.display = 'none';
  document.getElementById('empleadoJourneySection').style.display = 'none';
  document.getElementById('empleadoRankingSection').style.display = 'none';
}

// Employee Journey tabs
document.getElementById('empleadoSearchTab').addEventListener('click', () => {
  document.getElementById('empleadoAcquiredTab').classList.remove('active');
  document.getElementById('empleadoSearchTab').classList.add('active');
  document.getElementById('empleadoSearchView').style.display = 'block';
  document.getElementById('empleadoAcquiredView').style.display = 'none';
});

document.getElementById('empleadoAcquiredTab').addEventListener('click', () => {
  document.getElementById('empleadoSearchTab').classList.remove('active');
  document.getElementById('empleadoAcquiredTab').classList.add('active');
  document.getElementById('empleadoSearchView').style.display = 'none';
  document.getElementById('empleadoAcquiredView').style.display = 'block';
});

// Datos simulados de los cuestionarios (hardcodeados)
const quizData = {
  1: [
    {
      question: "¿Cuál de los siguientes literales es una ventaja de usar Pronto Cash?",
      options: [
        "Facilidad en la producción de bienes",
        "Mejora la interacción con el cliente",
        "Permite mantener mayor liquidez",
        "Facilita el proceso de préstamos de banco"
      ],
      correct: "Permite mantener mayor liquidez"
    },
    {
      question: "¿Cuál es la ventaja que ofrece Pronto Cash con respecto a la cadena de suministro?",
      options: [
        "Mayor integración de componentes electrónicos",
        "Anticipo de renuncia de empleados",
        "Ofrece una tasa de interés baja",
        "Evita interrupciones de operaciones"
      ],
      correct: "Evita interrupciones de operaciones"
    },
    {
      question: "Pronto Cash ayuda a las empresas a mantener sus relaciones comerciales",
      options: [
        "Verdadero",
        "Falso"
      ],
      correct: "Verdadero"
    }
  ],
  2: [
    {
      question: "¿Qué hace ÁbacoPay?",
      options: [
        "Adelanta los fondos necesarios",
        "Mejora la cadena de suministro",
        "Permite mantener mayor liquidez",
        "Permite una mejor relación con los empleados"
      ],
      correct: "Permite mantener mayor liquidez"
    },
    {
      question: "¿De qué manera se realizan los procesos en ÁbacoPay?",
      options: [
        "100% digital",
        "100% presencial",
        "50% presencial y 50% digital",
        "25% presencial y 75% digital"
      ],
      correct: "100% digital"
    },
    {
      question: "¿En qué momento reciben el pago los proveedores si se usa ÁbacoPay?",
      options: [
        "Después de 10 días hábiles",
        "Al instante",
        "Después de llenar un formulario",
        "Hasta que la empresa decida pagar"
      ],
      correct: "Al instante"
    },
    {
      question: "Selecciona los conceptos claves mencionados en este modulo",
      options: [
        "Flujo de caja y gestión de crédito",
        "Interés compuesto e interés simple",
        "Préstamos hipotecarios",
        "Innovación y reinversión"
      ],
      correct: "Flujo de caja y gestión de crédito"
    },
    {
      question: "ÁbacoPay permite extender los plazos de pago",
      options: [
        "Verdadero",
        "Falso"
      ],
      correct: "Verdadero"
    }
  ],
  3: [
    {
      question: "¿Qué son las cuentas por cobrar?",
      options: [
        "Son inmuebles que la empresa posee",
        "Son prestamos que la empresa ha realizado en todo su tiempo funcionando",
        "Son los importes que la empresa tiene derecho a recibir por operaciones comerciales",
        "Son cuentas con fondos extra"
      ],
      correct: "Son los importes que la empresa tiene derecho a recibir por operaciones comerciales"
    },
    {
      question: "Señala cuál es el objetivo principal de CashX",
      options: [
        "Lograr que los empleados trabajen más",
        "Mantener un flujo de caja estable",
        "Obtener mayor comisión por venta",
        "Recibir menos dinero"
      ],
      correct: "Mantener un flujo de caja estable"
    },
    {
      question: "CashX funciona de manera 100% digital",
      options: [
        "Verdadero",
        "Falso"
      ],
      correct: "Verdadero"
    },
    {
      question: "¿Qué información se sube una vez se está registrado en CashX?",
      options: [
        "Crédito fiscal y factura electrónica",
        "Documentación sobre nuestras cuentas por cobrar",
        "DUI del representante",
        "NIT de la empresa"
      ],
      correct: "Documentación sobre nuestras cuentas por cobrar"
    },
    {
      question: "¿De qué manera mejora CashX los procesos de las PYMEs?",
      options: [
        "Reduce los impuestos a pagar de las empresas",
        "Permite cobrar mayor comisión por transacción",
        "Mejora la relación con los empleados",
        "Permite la inversión y evita la interrupción de operaciones"
      ],
      correct: "Permite la inversión y evita la interrupción de operaciones"
    }
  ]
};

// Función para mostrar el cuestionario
function showQuiz(moduleId) {
  if (!moduleId) {
    console.error('Error: moduleId indefinido');
    return;
  }
  
  const modal = document.getElementById('quizModal');
  const quizTitle = document.getElementById('quizTitle');
  const quizQuestions = document.getElementById('quizQuestions');
  
  if (!modal || !quizTitle || !quizQuestions) {
    console.error('Error: Elementos del modal no encontrados', {modal, quizTitle, quizQuestions});
    return;
  }
  
  // Asegurar que quizData existe
  if (!quizData) {
    console.error('Error: quizData no está definido');
    quizQuestions.innerHTML = '<p>Error al cargar las preguntas. Por favor, recarga la página.</p>';
    modal.style.display = 'flex';
    return;
  }
  
  quizTitle.textContent = `Cuestionario Módulo ${moduleId}`;
  quizQuestions.innerHTML = '';

  const questions = quizData[moduleId] || [];
  if (questions.length === 0) {
    quizQuestions.innerHTML = '<p>No hay preguntas disponibles para este módulo.</p>';
  } else {
    try {
      questions.forEach((q, index) => {
        if (!q || !q.question || !Array.isArray(q.options)) {
          console.error(`Error: Pregunta ${index} mal formateada`, q);
          return;
        }
        
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        let optionsHtml = '';
        q.options.forEach((opt) => {
          if (opt) {
            optionsHtml += `
              <label>
                <input type="radio" name="q${index}" value="${opt}">
                ${opt}
              </label>
            `;
          }
        });
        
        questionDiv.innerHTML = `
          <p>${index + 1}. ${q.question}</p>
          ${optionsHtml}
        `;
        
        quizQuestions.appendChild(questionDiv);
      });
    } catch (error) {
      console.error('Error al generar preguntas:', error);
      quizQuestions.innerHTML = '<p>Error al generar las preguntas. Por favor, intenta de nuevo.</p>';
    }
  }

  modal.style.display = 'flex';
}

// Sistema mejorado para módulos y cuestionarios
// Reemplaza todo el código relacionado con Journeys

// Variables globales para el sistema de journeys y cuestionarios
window.journeySystem = {
  currentQuizCard: null,
  currentModuleContent: null,
  initialized: false
};

/**
 * Inicializa el sistema de módulos y cuestionarios en la sección de Journey del empleado
 * Permite ver todos los módulos pero bloquea los cuestionarios secuencialmente
 */
function initializeJourneySystem() {
  // Evitar inicialización múltiple
  if (window.journeySystem && window.journeySystem.initialized) {
    console.log('El sistema ya está inicializado');
    
    // Aún así, verificamos que todos los módulos estén visibles
    const moduleContents = document.querySelectorAll('.module-content');
    moduleContents.forEach(content => {
      content.style.display = 'block';
    });
    
    return;
  }
  
  console.log('Inicializando sistema de journeys...');
  
  // Paso 1: Identificar todos los elementos necesarios
  const moduleUnits = document.querySelectorAll('.module-unit');
  const moduleContents = document.querySelectorAll('.module-content');
  const quizCards = document.querySelectorAll('.quiz-card');
  
  // SOLUCIÓN CRÍTICA: Asegurar que todos los módulos estén visibles
  console.log(`Total de módulos encontrados: ${moduleContents.length}`);
  moduleContents.forEach((content, index) => {
    // Eliminar cualquier estilo que pueda ocultar el módulo
    content.style.display = 'block';
    // Inicialmente ocultar todos excepto el primero para mostrarlos mediante clics
    if (index !== 0) {
      content.classList.remove('active');
    } else {
      content.classList.add('active');
    }
    console.log(`Módulo ${index + 1} configurado para ser visible`);
  });
  
  // Paso 2: Hacer visibles todos los módulos
  moduleUnits.forEach((unit, index) => {
    // Eliminar clase "locked" para hacer visible el módulo
    unit.classList.remove('locked');
    console.log(`Módulo ${index + 1} desbloqueado`);
    
    // Agregar evento de clic para mostrar el contenido de ese módulo
    unit.addEventListener('click', function() {
      // Ocultar todos los contenidos
      moduleContents.forEach(content => content.classList.remove('active'));
      
      // Mostrar el contenido del módulo seleccionado
      if (moduleContents[index]) {
        moduleContents[index].classList.add('active');
        moduleContents[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Paso 3: Configurar el estado inicial de los cuestionarios
  if (quizCards.length > 0) {
    // Desbloquear solo el primer cuestionario
    quizCards[0].classList.remove('locked');
    
    // Bloquear todos los demás quizzes
    for (let i = 1; i < quizCards.length; i++) {
      const card = quizCards[i];
      card.classList.add('locked');
      
      // Actualizar apariencia de cuestionario bloqueado
      const startBtn = card.querySelector('.start-lesson-btn');
      if (startBtn) {
        startBtn.textContent = '🔒 Bloqueado';
        startBtn.disabled = true;
      }
    }
  }
  
  // Paso 4: Mostrar el primer módulo por defecto (pero todos deben ser visibles)
  if (moduleContents.length > 0) {
    moduleContents[0].classList.add('active');
  }
  
  // Paso 5: Configurar eventos para los cuestionarios
  configureQuizCardEvents();
  
  // Paso 6: Inicializar barras de progreso
  moduleContents.forEach(moduleContent => {
    updateModuleProgress(moduleContent);
  });
  
  // Verificación adicional para módulos
  console.log("Verificando módulos después de inicialización:");
  document.querySelectorAll('.module-unit').forEach((unit, i) => {
    console.log(`Módulo ${i + 1} - Clases: ${unit.className}`);
  });
  
  // Marcar como inicializado
  window.journeySystem = window.journeySystem || {};
  window.journeySystem.initialized = true;
  window.journeySystem.currentQuizCard = null;
  window.journeySystem.currentModuleContent = null;
  
  console.log('Sistema de journeys inicializado correctamente');
}

/**
 * Configura los eventos para todas las tarjetas de cuestionarios
 */
function configureQuizCardEvents() {
  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(card => {
    // Limpiar event listeners previos (si hay)
    const newCard = card.cloneNode(true);
    card.parentNode.replaceChild(newCard, card);
    
    // Agregar nuevo event listener
    newCard.addEventListener('click', function(e) {
      e.preventDefault();
      
      // No permitir interacción con cuestionarios bloqueados
      if (this.classList.contains('locked')) {
        alert('Este cuestionario está bloqueado. Primero debes completar el cuestionario anterior.');
        return;
      }
      
      const moduleId = this.getAttribute('data-module');
      if (!moduleId) {
        console.error('Error: No se encontró el atributo data-module');
        return;
      }
      
      // Guardar referencias para uso posterior
      window.journeySystem.currentQuizCard = this;
      window.journeySystem.currentModuleContent = this.closest('.module-content');
      
      // Mostrar el cuestionario
      showQuiz(moduleId);
    });
  });
  
  // Configurar botones del modal de cuestionario
  const submitBtn = document.getElementById('submitQuizBtn');
  if (submitBtn) {
    // Limpiar event listeners previos
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    
    // Agregar nuevo event listener
    newSubmitBtn.addEventListener('click', function() {
      if (!window.journeySystem.currentQuizCard) {
        console.error('Error: No hay cuestionario activo');
        return;
      }
      
      const moduleId = window.journeySystem.currentQuizCard.getAttribute('data-module');
      if (!moduleId) {
        console.error('Error: No se encontró el ID del módulo');
        return;
      }
      
      submitQuiz(
        window.journeySystem.currentQuizCard,
        window.journeySystem.currentModuleContent,
        moduleId
      );
    });
  }
  
  const closeBtn = document.getElementById('closeQuizBtn');
  if (closeBtn) {
    // Limpiar event listeners previos
    const newCloseBtn = closeBtn.cloneNode(true);
    closeBtn.parentNode.replaceChild(newCloseBtn, closeBtn);
    
    // Agregar nuevo event listener
    newCloseBtn.addEventListener('click', function() {
      const modal = document.getElementById('quizModal');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }
}

/**
 * Actualiza la barra de progreso de un módulo
 * @param {HTMLElement} moduleContent - El contenedor del módulo
 */
function updateModuleProgress(moduleContent) {
  if (!moduleContent) return;
  
  const totalCards = moduleContent.querySelectorAll('.lesson-card').length || 0;
  const completedCards = moduleContent.querySelectorAll('.lesson-card.completed').length || 0;
  
  if (totalCards > 0) {
    const percentage = (completedCards / totalCards) * 100;
    const progressBar = moduleContent.querySelector('.module-progress-fill');
    
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
  }
}

/**
 * Desbloquea el siguiente cuestionario después de completar el actual
 * @param {HTMLElement} currentQuizCard - El cuestionario actual que se completó
 */
function unlockNextQuiz(currentQuizCard) {
  if (!currentQuizCard) return;
  
  // Obtener todos los cuestionarios
  const allQuizCards = Array.from(document.querySelectorAll('.quiz-card'));
  const currentIndex = allQuizCards.indexOf(currentQuizCard);
  
  // Si existe un siguiente cuestionario, desbloquearlo
  if (currentIndex !== -1 && currentIndex < allQuizCards.length - 1) {
    const nextQuiz = allQuizCards[currentIndex + 1];
    
    if (nextQuiz) {
      nextQuiz.classList.remove('locked');
      
      const startButton = nextQuiz.querySelector('.start-lesson-btn');
      if (startButton) {
        startButton.textContent = 'Iniciar ❓';
        startButton.disabled = false;
      }
      
      console.log('Cuestionario desbloqueado: ' + (currentIndex + 2));
    }
  }
}

/**
 * Procesa las respuestas del cuestionario y actualiza el estado
 */
function submitQuiz(quizCard, moduleContent, moduleId) {
  if (!quizCard || !moduleContent || !moduleId) {
    console.error('Error: Parámetros insuficientes para submitQuiz');
    return;
  }
  
  const questions = quizData[moduleId];
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    console.error('Error: No hay preguntas disponibles para este módulo');
    return;
  }
  
  // Verificar que todas las preguntas han sido respondidas
  const allAnswered = questions.every((_, index) => {
    return document.querySelector(`input[name="q${index}"]:checked`);
  });
  
  if (!allAnswered) {
    alert('Por favor, responde todas las preguntas antes de enviar.');
    return;
  }
  
  // Contar respuestas correctas
  let correctAnswers = 0;
  document.querySelectorAll('.quiz-question').forEach((qDiv, index) => {
    const selected = qDiv.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === questions[index].correct) {
      correctAnswers++;
    }
  });
  
  // Comprobar si todas las respuestas son correctas
  if (correctAnswers === questions.length) {
    // Marcar cuestionario como completado
    quizCard.classList.add('completed');
    quizCard.classList.remove('locked');
    
    const startButton = quizCard.querySelector('.start-lesson-btn');
    if (startButton) {
      startButton.textContent = 'Repasar ✓';
    }
    
    // Desbloquear siguiente cuestionario
    unlockNextQuiz(quizCard);
    
    // Actualizar barra de progreso del módulo
    updateModuleProgress(moduleContent);
    
    alert('¡Excelente! Has completado correctamente este cuestionario.');
  } else {
    alert(`Obtuviste ${correctAnswers}/${questions.length} correctas. Revisa tus errores e intenta de nuevo.`);
  }
  
  // Cerrar modal
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Agregar estilos dinámicos para los cuestionarios
function addJourneyStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .quiz-card.locked {
      opacity: 0.7;
      position: relative;
    }
    
    .quiz-card.locked::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 1;
      border-radius: 10px;
    }
    
    .quiz-card.locked .start-lesson-btn {
      position: relative;
      z-index: 2;
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .quiz-card.completed {
      border: 2px solid #4CAF50;
      background-color: rgba(76, 175, 80, 0.1);
    }
    
    .lesson-card:not(.quiz-card) {
      cursor: pointer;
    }
    
    .lesson-card:not(.quiz-card).completed {
      border: 2px solid #4CAF50;
      background-color: rgba(76, 175, 80, 0.1);
    }
  `;
  document.head.appendChild(style);
}

// Inicializar el sistema cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Agregar estilos para los cuestionarios
  addJourneyStyles();
  
  // Agregar estilo específico para hacer visibles todos los módulos
  const moduleVisibilityStyle = document.createElement('style');
  moduleVisibilityStyle.textContent = `
    /* Asegurar que todos los módulos son visibles */
    .module-content {
      display: block !important;
      margin-bottom: 30px;
    }
    
    /* Solo el módulo activo muestra su contenido */
    .module-content:not(.active) {
      display: block !important;
    }
    
    /* Mejorar visualización de módulos */
    .module-unit {
      opacity: 1 !important;
    }
  `;
  document.head.appendChild(moduleVisibilityStyle);
  
  // Configurar tabs para la sección de Journey de empleados
  const empleadoAcquiredTab = document.getElementById('empleadoAcquiredTab');
  const empleadoSearchTab = document.getElementById('empleadoSearchTab');
  
  if (empleadoAcquiredTab) {
    empleadoAcquiredTab.addEventListener('click', function() {
      // Actualizar UI
      if (empleadoSearchTab) empleadoSearchTab.classList.remove('active');
      empleadoAcquiredTab.classList.add('active');
      
      // Mostrar vista "Mis Journeys" y ocultar "Búsqueda"
      const searchView = document.getElementById('empleadoSearchView');
      const acquiredView = document.getElementById('empleadoAcquiredView');
      
      if (searchView) searchView.style.display = 'none';
      if (acquiredView) acquiredView.style.display = 'block';
      
      // SOLUCIÓN ADICIONAL: Asegurar visibilidad de todos los módulos
      setTimeout(function() {
        // Hacer visibles todos los módulos directamente
        const moduleContents = document.querySelectorAll('.module-content');
        moduleContents.forEach((content, index) => {
          // Forzar visibilidad
          content.style.display = 'block';
          console.log(`Módulo ${index + 1} forzado a ser visible`);
        });
        
        // Inicializar el sistema después
        initializeJourneySystem();
      }, 100);
    });
  }
  
  if (empleadoSearchTab) {
    empleadoSearchTab.addEventListener('click', function() {
      // Actualizar UI
      if (empleadoAcquiredTab) empleadoAcquiredTab.classList.remove('active');
      empleadoSearchTab.classList.add('active');
      
      // Mostrar vista "Búsqueda" y ocultar "Mis Journeys"
      const searchView = document.getElementById('empleadoSearchView');
      const acquiredView = document.getElementById('empleadoAcquiredView');
      
      if (searchView) searchView.style.display = 'block';
      if (acquiredView) acquiredView.style.display = 'none';
    });
  }
  
  // Configurar lecciones normales (no cuestionarios)
  const normalLessons = document.querySelectorAll('.lesson-card:not(.quiz-card)');
  normalLessons.forEach(lesson => {
    // Limpiar event listeners previos
    const newLesson = lesson.cloneNode(true);
    lesson.parentNode.replaceChild(newLesson, lesson);
    
    // Agregar nuevo event listener
    newLesson.addEventListener('click', function() {
      if (!this.classList.contains('completed')) {
        this.classList.add('completed');
        
        // Actualizar barra de progreso del módulo
        const moduleContent = this.closest('.module-content');
        if (moduleContent) {
          updateModuleProgress(moduleContent);
        }
      }
    });
  });
  
  // Inicializar el sistema cuando se selecciona la pestaña de Journey
  const empleadoJourneyOption = document.getElementById('empleadoJourneyOption');
  if (empleadoJourneyOption) {
    empleadoJourneyOption.addEventListener('click', function() {
      // Ejecutar con un breve retraso para permitir actualización del DOM
      setTimeout(function() {
        // Si el tab "Mis Journeys" está activo, inicializar
        const acquiredTab = document.getElementById('empleadoAcquiredTab');
        if (acquiredTab && acquiredTab.classList.contains('active')) {
          initializeJourneySystem();
        }
      }, 200);
    });
  }
});

/**
 * Updates employee rankings list based on selected category
 * @param {string} category - Selected ranking category
 */
function updateEmpleadoRankingsList(category) {
  const list = document.getElementById('empleadoRankingsList');
  list.innerHTML = '';
  
  const rankingTexts = {
    'empleados': 'Empleado',
    'departamento': 'Departamento',
    'empresa': 'Empresa'
  };
  
  for (let i = 1; i <= 10; i++) {
    const li = document.createElement('li');
    li.className = 'ranking-item';
    li.innerHTML = `
      <div class="ranking-number">${i}</div>
      <div class="ranking-image">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="8" r="5"/>
          <path d="M3 21v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2"/>
        </svg>
      </div>
      <div class="ranking-info">
        <div class="ranking-name">${rankingTexts[category]} ${i}</div>
        <div class="ranking-score">Puntaje: ${Math.floor(Math.random() * 100)}</div>
      </div>
    `;
    list.appendChild(li);
  }
}

// Set up employee rankings submenu event delegation
document.querySelector('#empleadoRankingSection .rankings-submenu').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    document.querySelectorAll('#empleadoRankingSection .rankings-submenu button').forEach(btn => 
      btn.classList.remove('active'));
    e.target.classList.add('active');
    updateEmpleadoRankingsList(e.target.dataset.category);
  }
});

// Employee logout
document.getElementById('empleadoLogoutBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'block';
  document.getElementById('empleadoMenu').style.display = 'none';
  hideAllEmpleadoSections();
});

// Enable the proveedor button
document.getElementById('proveedorBtn').disabled = false;

// Proveedor page layout
document.getElementById('proveedorBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'none';
  document.getElementById('proveedorMenu').style.display = 'flex';
  document.getElementById('proveedorNetworkOption').click(); // Default selection
  initializeAllSwipers(); // Reinitialize swipers
});

// Proveedor menu option selection
const proveedorMenuOptions = ['proveedorPerfil', 'proveedorNetwork'];
proveedorMenuOptions.forEach(option => {
  document.getElementById(`${option}Option`).addEventListener('click', () => {
    proveedorMenuOptions.forEach(opt => {
      document.getElementById(`${opt}Option`).classList.remove('selected');
    });
    document.getElementById(`${option}Option`).classList.add('selected');
    
    if (option === 'proveedorPerfil') {
      hideAllProveedorSections();
      document.getElementById('proveedorPerfilSection').style.display = 'block';
    } else if (option === 'proveedorNetwork') {
      hideAllProveedorSections();
      document.getElementById('proveedorNetworkSection').style.display = 'block';
      initializeAllSwipers(); // Reinitialize swipers when network tab is clicked
    }
  });
});

/**
 * Hides all proveedor sections for clean transitions
 */
function hideAllProveedorSections() {
  document.getElementById('proveedorPerfilSection').style.display = 'none';
  document.getElementById('proveedorNetworkSection').style.display = 'none';
}

// Proveedor logout
document.getElementById('proveedorLogoutBtn').addEventListener('click', () => {
  document.querySelector('.selection-box').style.display = 'block';
  document.getElementById('proveedorMenu').style.display = 'none';
  hideAllProveedorSections();
});

// Handle profile card flip
const moreInfoButtons = document.querySelectorAll('.more-info-btn');
moreInfoButtons.forEach(button => {
  button.addEventListener('click', function() {
    const card = this.closest('.profile-card');
    card.classList.toggle('flipped');
  });
});

/**
 * Add scroll animations to various page elements
 * Shows elements with fade-in effect as they enter the viewport
 */
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.swiper-slide, .profile-box, .employee-card, .ranking-item, .journey-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementPosition < windowHeight - 50) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

// Set initial state for animation
document.querySelectorAll('.swiper-slide, .profile-box, .employee-card, .ranking-item, .journey-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
});

// Run animations on load and scroll
animateOnScroll();
window.addEventListener('scroll', animateOnScroll);

// Setup rankings submenu
const rankingsSubmenu = document.querySelector('.rankings-submenu');
if (rankingsSubmenu) {
  rankingsSubmenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      rankingsSubmenu.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      updateRankingsList(e.target.dataset.category);
    }
  });
  
  // Set default rankings view
  const defaultRankingsButton = document.querySelector('[data-category="todas"]');
  if (defaultRankingsButton) {
    defaultRankingsButton.classList.add('active');
    updateRankingsList('todas');
  }
}

// Initialize employee journey
document.getElementById('empleadoSearchTab').addEventListener('click', () => {
  document.getElementById('empleadoAcquiredTab').classList.remove('active');
  document.getElementById('empleadoSearchTab').classList.add('active');
  document.getElementById('empleadoSearchView').style.display = 'block';
  document.getElementById('empleadoAcquiredView').style.display = 'none';
});

document.getElementById('empleadoAcquiredTab').addEventListener('click', () => {
  document.getElementById('empleadoSearchTab').classList.remove('active');
  document.getElementById('empleadoAcquiredTab').classList.add('active');
  document.getElementById('empleadoSearchView').style.display = 'none';
  document.getElementById('empleadoAcquiredView').style.display = 'block';
});

// Set up Duolingo-style module clicks
document.addEventListener('DOMContentLoaded', function() {
  // Estas funciones ahora están dentro de initializeJourneyModules()
  // El código aquí podría generar conflictos, así que lo comento
  
  /*
  const moduleUnits = document.querySelectorAll('.module-unit');
  const moduleContents = document.querySelectorAll('.module-content');
    
  if (moduleContents.length > 0) {
    moduleContents[0].classList.add('active');
  }

  moduleUnits.forEach((unit, index) => {
    if (!unit.classList.contains('locked')) {
      unit.addEventListener('click', function() {
        // Hide all module contents
        moduleContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Show selected module content
        if (moduleContents[index]) {
          moduleContents[index].classList.add('active');
          
          // Scroll to module content
          moduleContents[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    }
  });
  */

  // Lesson cards click - Manejar las tarjetas de lección normales
  const lessonCards = document.querySelectorAll('.lesson-card:not(.quiz-card)');
  if (lessonCards.length > 0) {
    lessonCards.forEach(card => {
      if (card) { // Verificar que la tarjeta existe
        card.addEventListener('click', function() {
          if (!this || !this.classList) {
            console.error('Error: La tarjeta de lección no está definida correctamente');
            return;
          }
          
          if (!this.classList.contains('completed')) {
            this.classList.remove('in-progress');
            this.classList.add('completed');
            
            // Buscar el módulo padre y verificar que existe
            const moduleContent = this.closest('.module-content');
            if (!moduleContent) {
              console.error('Error: No se pudo encontrar el módulo padre');
              return;
            }
            
            // Actualizar el progreso del módulo
            updateModuleProgress(moduleContent);
          }
        });
      }
    });
  }
});

// Inicializar la vista de empleado Journey cuando se selecciona la pestaña
document.addEventListener('DOMContentLoaded', function() {
  const empleadoJourneyOption = document.getElementById('empleadoJourneyOption');
  if (empleadoJourneyOption) {
    empleadoJourneyOption.addEventListener('click', function() {
      // Ejecutar después de un breve retraso para asegurar que DOM esté actualizado
      setTimeout(function() {
        // Si la pestaña "Mis Journeys" está activa, inicializar los módulos
        if (document.getElementById('empleadoAcquiredTab').classList.contains('active')) {
          initializeJourneySystem();
        }
      }, 100);
    });
  }
  
  // Verificar el estado de guardado de progreso si se implementa en el futuro
  window.addEventListener('beforeunload', function() {
    // Aquí se podría implementar guardado de progreso
    // Por ahora, solo registramos en consola
    console.log('El progreso no se guardará entre sesiones en esta versión');
  });
});

/**
 * Document ready event handler - Sets up initial page state and event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
  // Set default selected option
  document.getElementById('networkOption').classList.add('selected');
  
  // Initialize all swipers
  initializeAllSwipers();
  
  createEmployeeList();
});

// Inicialización global segura para las variables de la ventana
window.currentQuizCard = null;
window.currentModuleContent = null;

// Añadir funciones adicionales CSS para cuestionarios bloqueados
document.addEventListener('DOMContentLoaded', function() {
  // Crear estilo dinámico para cuestionarios bloqueados
  const style = document.createElement('style');
  style.textContent = `
    .quiz-card.locked {
      opacity: 0.7;
      position: relative;
    }
    
    .quiz-card.locked::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 1;
      border-radius: 10px;
    }
    
    .quiz-card.locked .start-lesson-btn {
      position: relative;
      z-index: 2;
      background-color: #ccc;
      cursor: not-allowed;
    }
    
    .quiz-card.completed {
      border: 2px solid #4CAF50;
      background-color: rgba(76, 175, 80, 0.1);
    }
  `;
  document.head.appendChild(style);
  
  // Añadir manejador de eventos empleadoAcquiredTab para reinicializar los módulos
  const empleadoAcquiredTab = document.getElementById('empleadoAcquiredTab');
  if (empleadoAcquiredTab) {
    empleadoAcquiredTab.addEventListener('click', function() {
      // Esperar a que el DOM se actualice antes de inicializar módulos
      setTimeout(initializeJourneySystem, 100);
    });
  }
  
  // Asegurar que el módulo más reciente esté en la vista al cargar la página
  const refreshJourneyView = () => {
    const activeModule = document.querySelector('.module-content.active');
    if (activeModule) {
      activeModule.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Ejecutar después de que todo esté cargado
  setTimeout(refreshJourneyView, 500);
});

// Mejorar el evento para el cierre del modal de cuestionario
document.addEventListener('DOMContentLoaded', function() {
  const closeQuizBtn = document.getElementById('closeQuizBtn');
  if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', function() {
      const quizModal = document.getElementById('quizModal');
      if (quizModal) {
        quizModal.style.display = 'none';
        
        // Actualizar progreso después de cerrar el modal
        if (window.currentModuleContent) {
          updateModuleProgress(window.currentModuleContent);
        }
      }
    });
  }
}); 