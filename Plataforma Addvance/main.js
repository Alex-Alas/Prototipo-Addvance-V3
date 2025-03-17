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
  
  // Initialize empresa swipers if they exist
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
  
  // Initialize proveedor swipers if they exist
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

// Función para obtener preguntas según el módulo
function getQuestionsForModule(moduleId) {
  // Convertir a número
  const modId = parseInt(moduleId);
  
  console.log('Obteniendo preguntas para el módulo:', modId);
  
  // Preguntas para cada módulo
  const questions = {
    1: [
      {
        text: "¿Qué es ProntoCash?",
        options: [
          "Una plataforma de crédito tradicional",
          "Una solución de financiamiento para empresas",
          "Un servicio de cambio de divisas",
          "Una aplicación para transferencias personales"
        ],
        correctAnswer: 1 // Índice de la opción correcta (empezando en 0)
      },
      {
        text: "¿Qué beneficio principal ofrece ProntoCash a las empresas?",
        options: [
          "Reducción de impuestos",
          "Acceso a capital de trabajo",
          "Contratación de personal",
          "Marketing digital"
        ],
        correctAnswer: 1
      },
      {
        text: "¿Cómo funciona ProntoCash?",
        options: [
          "A través de préstamos bancarios tradicionales",
          "Mediante financiamiento de facturas por cobrar",
          "Con microcréditos personales",
          "Por medio de inversiones en bolsa"
        ],
        correctAnswer: 1
      }
    ],
    2: [
      {
        text: "¿Qué es ÁbacoPay?",
        options: [
          "Una herramienta de contabilidad tradicional",
          "Un sistema de gestión de inventario",
          "Una solución de pago y facturación electrónica",
          "Una aplicación para control de asistencia"
        ],
        correctAnswer: 2
      },
      {
        text: "¿Qué beneficio principal ofrece ÁbacoPay a las empresas?",
        options: [
          "Reducción de personal contable",
          "Simplificación de procesos de pago y facturación",
          "Aumento del número de clientes",
          "Mejora del clima laboral"
        ],
        correctAnswer: 1
      },
      {
        text: "¿Qué documentos se pueden gestionar con ÁbacoPay?",
        options: [
          "Solo facturas de venta",
          "Únicamente recibos de caja",
          "Documentación sobre nuestras cuentas por cobrar",
          "Facturas, recibos y documentos fiscales"
        ],
        correctAnswer: 3
      }
    ],
    3: [
      {
        text: "¿Qué es CashX?",
        options: [
          "Una plataforma de cambio de divisas",
          "Un servicio de préstamos personales",
          "Una solución para mejorar el flujo de caja",
          "Una aplicación de gestión de nómina"
        ],
        correctAnswer: 2
      },
      {
        text: "¿Qué información se sube una vez se está registrado en CashX?",
        options: [
          "Crédito fiscal y factura electrónica",
          "Documentación sobre nuestras cuentas por cobrar",
          "DUI del representante",
          "NIT de la empresa"
        ],
        correctAnswer: 1
      },
      {
        text: "¿De qué manera mejora CashX los procesos de las PYMEs?",
        options: [
          "Reduce los impuestos a pagar de las empresas",
          "Permite cobrar mayor comisión por transacción",
          "Mejora la relación con los empleados",
          "Permite la inversión y evita la interrupción de operaciones"
        ],
        correctAnswer: 3
      }
    ]
  };
  
  // Verificar si existe el módulo solicitado
  if (!questions[modId]) {
    console.error(`No se encontraron preguntas para el módulo ${modId}`);
    return [];
  }
  
  return questions[modId];
}

// Función para mostrar el cuestionario
function showQuiz(moduleId) {
  const quizModal = document.getElementById('quizModal');
  const quizTitle = document.getElementById('quizTitle');
  const quizQuestions = document.getElementById('quizQuestions');
  const submitBtn = document.getElementById('submitQuizBtn');
  const closeBtn = document.getElementById('closeQuizBtn');
  
  // Establecer el título del cuestionario según el módulo
  quizTitle.textContent = `Cuestionario: Módulo ${moduleId}`;
  
  // Limpiar preguntas anteriores
  quizQuestions.innerHTML = '';
  
  // Generar preguntas según el módulo
  const questions = getQuestionsForModule(moduleId);
  
  questions.forEach((question, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
    // Añadir el texto de la pregunta
    const questionText = document.createElement('p');
    questionText.textContent = question.text;
    questionDiv.appendChild(questionText);
    
    // Crear el contenedor para las opciones
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'quiz-options';
    
    // Generar opciones de respuesta
    question.options.forEach((option, oIndex) => {
      const radioId = `q${qIndex}_o${oIndex}`;
      
      // Crear input de tipo radio
      const radioInput = document.createElement('input');
      radioInput.type = 'radio';
      radioInput.name = `question_${qIndex}`;
      radioInput.id = radioId;
      radioInput.value = oIndex;
      
      // Manejar el evento de cambio para aplicar estilos a la opción seleccionada
      radioInput.addEventListener('change', function() {
        // Resetear todas las etiquetas de esta pregunta
        const allLabels = optionsDiv.querySelectorAll('label');
        allLabels.forEach(label => {
          label.classList.remove('selected');
        });
        
        // Aplicar clase a la etiqueta seleccionada
        if (this.checked) {
          document.querySelector(`label[for="${radioId}"]`).classList.add('selected');
        }
      });
      
      // Crear etiqueta para la opción
      const label = document.createElement('label');
      label.htmlFor = radioId;
      label.textContent = option;
      
      // Agregar los elementos al contenedor de opciones
      optionsDiv.appendChild(radioInput);
      optionsDiv.appendChild(label);
      optionsDiv.appendChild(document.createElement('br'));
    });
    
    questionDiv.appendChild(optionsDiv);
        quizQuestions.appendChild(questionDiv);
      });
  
  // Mostrar el modal del cuestionario
  quizModal.style.display = 'flex';
  
  // Manejar el envío del cuestionario
  submitBtn.onclick = function() {
    evaluateQuiz(questions, moduleId);
  };
  
  // Manejar el cierre del cuestionario
  closeBtn.onclick = function() {
    quizModal.style.display = 'none';
  };
}

// Función para evaluar el cuestionario
function evaluateQuiz(questions, moduleId) {
  const quizQuestions = document.getElementById('quizQuestions');
  const questionDivs = quizQuestions.querySelectorAll('.quiz-question');
  
  let correctAnswers = 0;
  let totalQuestions = questions.length;
  
  // Verificar cada respuesta
  questionDivs.forEach((questionDiv, qIndex) => {
    const selectedOption = questionDiv.querySelector(`input[name="question_${qIndex}"]:checked`);
    
    if (selectedOption) {
      const selectedIndex = parseInt(selectedOption.value);
      
      if (selectedIndex === questions[qIndex].correctAnswer) {
        correctAnswers++;
      }
    }
  });
  
  // Calcular puntaje como porcentaje
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  
  // Mostrar resultado
  alert(`Has obtenido ${score}% (${correctAnswers} de ${totalQuestions} respuestas correctas)`);
  
  // Cerrar modal
  document.getElementById('quizModal').style.display = 'none';
  
  // Actualizar progreso del módulo si se aprueba (70% o más)
  if (score >= 70) {
    // Marcar el cuestionario como completado si tenemos la referencia almacenada
    if (window.journeySystem.currentQuizCard) {
      const quizCard = window.journeySystem.currentQuizCard;
      quizCard.classList.add('completed');
      quizCard.querySelector('.start-lesson-btn').textContent = '✓ Completado';
      
      // Actualizar barra de progreso del módulo
      if (window.journeySystem.currentModuleContent) {
        updateModuleProgress(window.journeySystem.currentModuleContent);
      }
    } else {
      // Buscar el quiz-card correspondiente si no tenemos la referencia
      const quizCards = document.querySelectorAll(`.quiz-card[data-module="${moduleId}"]`);
      quizCards.forEach(quizCard => {
        quizCard.classList.add('completed');
        quizCard.querySelector('.start-lesson-btn').textContent = '✓ Completado';
        
        // Actualizar barra de progreso del módulo
        const moduleContent = quizCard.closest('.module-content');
        if (moduleContent) {
          updateModuleProgress(moduleContent);
        }
      });
    }
  }
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
  // Configurar eventos para las lecciones
  configureLessonCardEvents();
  
  // Configurar eventos para los cuestionarios
  configureQuizCardEvents();
  
  // Asegurar que todos los módulos estén visibles
  const moduleContents = document.querySelectorAll('.module-content');
  moduleContents.forEach(moduleContent => {
    moduleContent.style.display = 'block';
  });
  
  // Asegurarse de que esto esté al final para permitir eventos personalizados
  document.dispatchEvent(new CustomEvent('journeySystemInitialized'));
}

/**
 * Configura los eventos para todas las tarjetas de cuestionarios
 */
function configureQuizCardEvents() {
  // Seleccionar todos los botones de iniciar cuestionario
  const quizCards = document.querySelectorAll('.quiz-card');
  
  quizCards.forEach(quizCard => {
    const startButton = quizCard.querySelector('.start-lesson-btn');
    const moduleId = quizCard.getAttribute('data-module');
    
    // Remover eventos anteriores para evitar duplicados
    startButton.removeEventListener('click', quizButtonHandler);
    
    // Agregar el nuevo evento
    startButton.addEventListener('click', quizButtonHandler);
    
    function quizButtonHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('Iniciando cuestionario del módulo:', moduleId);
      
      // Guardar referencias para usar después
      window.journeySystem.currentQuizCard = quizCard;
      window.journeySystem.currentModuleContent = quizCard.closest('.module-content');
      
      // Mostrar el cuestionario
      showQuiz(moduleId);
      
      return false;
    }
  });
  
  console.log('Eventos de cuestionarios configurados en', quizCards.length, 'tarjetas');
}

/**
 * Actualiza la barra de progreso de un módulo
 * @param {HTMLElement} moduleContent - El contenedor del módulo
 */
function updateModuleProgress(moduleContent) {
  if (!moduleContent) {
    console.log('No se pudo actualizar el progreso: moduleContent es null');
    return;
  }
  
  console.log('Actualizando progreso del módulo');
  
  // Contar elementos completados (lecciones y cuestionarios)
  const totalElements = moduleContent.querySelectorAll('.lesson-card, .quiz-card').length;
  const completedElements = moduleContent.querySelectorAll('.lesson-card.completed, .quiz-card.completed').length;
  
  console.log(`Elementos completados: ${completedElements} de ${totalElements}`);
  
  // Calcular porcentaje
  const progressPercentage = (completedElements / totalElements) * 100;
  
  // Actualizar barra de progreso
  const progressBar = moduleContent.querySelector('.module-progress-fill');
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
    console.log(`Progreso actualizado: ${progressPercentage}%`);
  } else {
    console.log('No se encontró la barra de progreso');
  }
}

/**
 * Procesa las respuestas del cuestionario y actualiza el estado
 */
function submitQuiz(quizCard, moduleContent, moduleId) {
  const quizQuestions = document.querySelectorAll('.quiz-question');
  let allAnswered = true;
  let correctCount = 0;
  
  // Primero verificamos que todas las preguntas estén respondidas
  quizQuestions.forEach(question => {
    const radioButtons = question.querySelectorAll('input[type="radio"]');
    const answered = Array.from(radioButtons).some(radio => radio.checked);
    
    if (!answered) {
      allAnswered = false;
      // Destacamos las preguntas sin responder
      question.style.animation = 'shake 0.5s';
      setTimeout(() => {
        question.style.animation = '';
      }, 500);
    }
  });
  
  if (!allAnswered) {
    // Mostrar mensaje pidiendo que se responda todas las preguntas
    let resultDiv = document.querySelector('.quiz-result');
    if (!resultDiv) {
      resultDiv = document.createElement('div');
      resultDiv.className = 'quiz-result error';
      document.getElementById('quizQuestions').appendChild(resultDiv);
    }
    resultDiv.innerHTML = '<p>Por favor responde todas las preguntas antes de enviar.</p>';
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  
  // Procesar las respuestas
  quizQuestions.forEach(question => {
    const radioButtons = question.querySelectorAll('input[type="radio"]');
    const selectedAnswer = Array.from(radioButtons).find(radio => radio.checked);
    
    // En nuestro prototipo, consideramos la primera opción como correcta
    if (selectedAnswer && selectedAnswer === radioButtons[0]) {
      correctCount++;
      selectedAnswer.parentElement.classList.add('correct');
    } else if (selectedAnswer) {
      selectedAnswer.parentElement.classList.add('incorrect');
      // Destacar la respuesta correcta
      radioButtons[0].parentElement.classList.add('correct');
    }
    
    // Desactivar los controles después de enviar
    radioButtons.forEach(radio => {
      radio.disabled = true;
    });
  });
  
  // Calcular puntuación
  const scorePercentage = (correctCount / quizQuestions.length) * 100;
  const passed = scorePercentage >= 70; // Consideramos 70% como nota de aprobación
  
  // Mostrar resultado
  let resultDiv = document.querySelector('.quiz-result');
  if (!resultDiv) {
    resultDiv = document.createElement('div');
    resultDiv.className = `quiz-result ${passed ? 'success' : 'error'}`;
    document.getElementById('quizQuestions').appendChild(resultDiv);
  } else {
    resultDiv.className = `quiz-result ${passed ? 'success' : 'error'}`;
  }
  
  let resultMessage = '';
  if (passed) {
    resultMessage = `
      <p><strong>¡Felicidades!</strong> Has completado el cuestionario con éxito.</p>
      <p>Puntuación: ${correctCount}/${quizQuestions.length} (${scorePercentage.toFixed(0)}%)</p>
    `;
    
    // Marcar el cuestionario como completado
    quizCard.classList.add('completed');
    
    // Ocultar botón de enviar y cambiar el texto del botón de cerrar
    document.getElementById('submitQuizBtn').style.display = 'none';
    document.getElementById('closeQuizBtn').textContent = 'Continuar';
    
    // Actualizar barra de progreso del módulo
    updateModuleProgress(moduleContent);
    
    // NOTA: Se ha eliminado la creación de confeti para simplificar
  } else {
    resultMessage = `
      <p>Necesitas mejorar. Tu puntuación: ${correctCount}/${quizQuestions.length} (${scorePercentage.toFixed(0)}%)</p>
      <p>Requieres al menos 70% para aprobar. ¡Revisa el material e intenta nuevamente!</p>
    `;
  }
  
  resultDiv.innerHTML = resultMessage;
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Función para obtener un color aleatorio
function getRandomColor() {
  const colors = [
    '#ff9f43', '#ff6b6b', '#48dbfb', '#1dd1a1', '#f368e0', 
    '#00d2d3', '#feca57', '#5f27cd', '#c8d6e5', '#576574'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
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

// Función para manejar el botón de alternar entre lección y cuestionario
function setupToggleButtons() {
  const toggleBtn = document.getElementById('toggleLesson1');
  const lessonContainer = document.getElementById('lessonContainer1');
  const moduloContainer = document.getElementById('moduloContainer1');
  
  if (toggleBtn && lessonContainer && moduloContainer) {
    toggleBtn.addEventListener('click', function() {
      // Si la lección está oculta, mostrarla
      if (lessonContainer.style.display === 'none') {
        lessonContainer.style.display = 'grid';
        moduloContainer.style.display = 'none';
        toggleBtn.textContent = 'Ver cuestionario';
      } else {
        // Si la lección está visible, ocultarla
        lessonContainer.style.display = 'none';
        moduloContainer.style.display = 'block';
        toggleBtn.textContent = 'Ver lección';
      }
    });
  }
}

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando sistema de lecciones y cuestionarios...');
  
  // Configurar las lecciones al cargar la página
  configureLessonCardEvents();
  
  // Inicializar el sistema de journeys
  initializeJourneySystem();
  
  // Configurar el modal de lección
  initializeLessonModal();
  
  // Asegurar que todos los módulos estén visibles
  const moduleContents = document.querySelectorAll('.module-content');
  moduleContents.forEach(moduleContent => {
    moduleContent.style.display = 'block';
  });
  
  // También reinicializar cuando se cambie a la vista de journeys adquiridos
  const empleadoAcquiredTab = document.getElementById('empleadoAcquiredTab');
  if (empleadoAcquiredTab) {
    empleadoAcquiredTab.addEventListener('click', function() {
      console.log('Cambiando a vista de journeys adquiridos...');
      setTimeout(() => {
        configureLessonCardEvents();
        initializeModuleRequirements();
      }, 100);
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
  
  // Asegurarnos de volver a configurar los eventos cuando se haga visible la sección empleadoAcquiredView
  const empleadoJourneyOption = document.getElementById('empleadoJourneyOption');
  if (empleadoJourneyOption) {
    empleadoJourneyOption.addEventListener('click', function() {
      console.log('Navegando a sección journey...');
      setTimeout(() => {
        configureLessonCardEvents();
        configureQuizCardEvents();
      }, 100);
    });
  }
});

// Initialize the journey system
document.addEventListener('DOMContentLoaded', function() {
  // Set default selected option
  document.getElementById('networkOption').classList.add('selected');
  
  // Initialize all swipers for carousel functionality
  initializeAllSwipers();
  
  // Create employee list
  createEmployeeList();
  
  // Set up journey functionality
  configureLessonCardEvents();
  configureQuizCardEvents();
  initializeJourneySystem();
  initializeLessonModal();
  
  // Make sure modules are visible
  const moduleContents = document.querySelectorAll('.module-content');
  moduleContents.forEach(moduleContent => {
    moduleContent.style.display = 'block';
  });
});

/**
 * Creates network profile grid from carousel data
 * @param {string} type - Company type (Empresa, Proveedor, etc.)
 * @param {string} gridId - ID of the grid container
 * @param {number} count - Number of profiles to generate
 */
function createNetworkProfiles(type, gridId, count = 8) {
  const gridContainer = document.getElementById(gridId);
  if (!gridContainer) return;
  
  // Clear existing profiles
  gridContainer.innerHTML = '';
  
  for (let i = 1; i <= count; i++) {
    const industry = getRandomIndustry();
    const status = getRandomStatus();
    const location = getRandomLocation();
    const companyName = getCompanyName(type, i);
    
    const profileCard = document.createElement('div');
    profileCard.className = 'network-profile-card';
    profileCard.innerHTML = `
      <div class="profile-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      </div>
      <div class="profile-info">
        <div class="profile-name">${companyName}</div>
        <div class="profile-title">Industry: ${industry}</div>
        <div class="profile-description">Status: ${status}</div>
        <div class="profile-description">Location: ${location}</div>
      </div>
    `;
    
    gridContainer.appendChild(profileCard);
    
    // Add click event to show more details
    profileCard.addEventListener('click', function() {
      alert(`Connecting with ${companyName}\nIndustry: ${industry}\nLocation: ${location}\nStatus: ${status}`);
    });
  }
}

// Initialize network grids when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Other initialization code...
  
  // Create network grids
  document.getElementById('networkOption').addEventListener('click', () => {
    createNetworkProfiles('Empresa', 'empresasGrid');
    createNetworkProfiles('Proveedor', 'proveedoresGrid');
    createNetworkProfiles('Similar', 'similaresGrid');
  });
  
  document.getElementById('proveedorNetworkOption').addEventListener('click', () => {
    createNetworkProfiles('Cliente', 'clientesGrid');
    createNetworkProfiles('Potencial', 'potencialesGrid');
  });
});

// Reset quiz system to ensure it works
document.getElementById('quizModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

document.getElementById('lessonModal').addEventListener('click', function(e) {
  if (e.target === this) {
    this.style.display = 'none';
  }
});

// Trigger initialization of quizzes when journey tab is clicked
document.getElementById('empleadoJourneyOption').addEventListener('click', function() {
  setTimeout(function() {
    configureLessonCardEvents();
    configureQuizCardEvents();
    initializeJourneySystem();
  }, 100);
});

// ... existing code ...

/**
 * Configura los eventos para todas las tarjetas de lección
 */
function configureLessonCardEvents() {
  // Seleccionar todos los botones de iniciar lección (excluyendo los de cuestionario)
  const lessonStartButtons = document.querySelectorAll('.lesson-card:not(.quiz-card) .start-lesson-btn');
  
  // Agregar evento a cada botón
  lessonStartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Obtener la tarjeta de lección
      const lessonCard = this.closest('.lesson-card');
      
      // Mostrar la lección
      console.log('Iniciando lección');
      showLesson(lessonCard);
      
      return false;
    });
  });
  
  console.log('Eventos de lecciones configurados:', lessonStartButtons.length);
}

/**
 * Muestra la lección seleccionada
 * @param {HTMLElement} lessonCard - La tarjeta de lección
 */
function showLesson(lessonCard) {
  const lessonModal = document.getElementById('lessonModal');
  const lessonTitle = document.getElementById('lessonTitle');
  const lessonContent = document.getElementById('lessonContent');
  const currentLevelSpan = document.getElementById('currentLevel');
  const totalLevelsSpan = document.getElementById('totalLevels');
  const progressFill = document.querySelector('.lesson-progress-fill');
  
  // Determinar a qué módulo pertenece esta lección
  const moduleContent = lessonCard.closest('.module-content');
  const moduleTitle = moduleContent.querySelector('h3').textContent;
  
  // Almacenar referencias para usar al completar
  window.currentLessonCard = lessonCard;
  window.currentModuleContent = moduleContent;
  
  // Configurar título
  lessonTitle.textContent = `Lección: ${moduleTitle}`;
  
  // Limpiar contenido anterior
  lessonContent.innerHTML = '';
  
  // Crear niveles de la lección (contenido)
  const totalLevels = 4;
  
  // Según el título del módulo, añadir clases para estilos específicos
  let moduleClass = '';
  if (moduleTitle.includes('Pronto Cash')) {
    moduleClass = 'pronto-cash';
  } else if (moduleTitle.includes('ÁbacoPay')) {
    moduleClass = 'abaco-pay';
  } else if (moduleTitle.includes('CashX')) {
    moduleClass = 'cash-x';
  }
  
  // Aplicar clase al modal
  lessonModal.querySelector('.lesson-modal-content').className = `lesson-modal-content ${moduleClass}`;
  
  // Generar contenido según el módulo
  createLessonLevels(moduleTitle, lessonContent);
  
  // Actualizar el contador de niveles
  totalLevelsSpan.textContent = totalLevels;
  currentLevelSpan.textContent = '1';
  progressFill.style.width = '0%';
  
  // Mostrar el modal
  lessonModal.style.display = 'flex';
  
  // Restablecer la navegación
  const prevLevelBtn = document.getElementById('prevLevelBtn');
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const completeLessonBtn = document.getElementById('completeLessonBtn');
  
  prevLevelBtn.disabled = true;
  nextLevelBtn.style.display = 'block';
  completeLessonBtn.style.display = 'none';
  
  // Activar solo el primer nivel
  const levels = lessonContent.querySelectorAll('.level');
  levels.forEach((level, index) => {
    if (index === 0) {
      level.classList.add('active');
    } else {
      level.classList.add('next');
    }
  });
}

// Al iniciar el sistema, bloquear los cuestionarios hasta que se completen las lecciones
function initializeModuleRequirements() {
  // No bloquear los cuestionarios inicialmente
  // Esto permite que los usuarios accedan a las lecciones y cuestionarios libremente
  console.log('Inicializando requisitos de módulos - no bloqueando cuestionarios');
}

// Inicializar todo al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Inicializando sistema de lecciones y cuestionarios...');
  
  // Inicializar las variables globales del sistema
  window.journeySystem = {
    currentQuizCard: null,
    currentModuleContent: null,
    initialized: false
  };
  
  // Configurar las lecciones y cuestionarios inmediatamente
  configureLessonCardEvents();
  configureQuizCardEvents();
  
  // Inicializar el sistema de journeys
  initializeJourneySystem();
  
  // Configurar el modal de lección
  initializeLessonModal();
  
  // Asegurar que todos los módulos estén visibles
  const moduleContents = document.querySelectorAll('.module-content');
  moduleContents.forEach(moduleContent => {
    moduleContent.style.display = 'block';
  });
  
  // También reinicializar cuando se cambie a la vista de journeys adquiridos
  const empleadoAcquiredTab = document.getElementById('empleadoAcquiredTab');
  if (empleadoAcquiredTab) {
    empleadoAcquiredTab.addEventListener('click', function() {
      console.log('Cambiando a vista de journeys adquiridos...');
      setTimeout(() => {
        configureLessonCardEvents();
        configureQuizCardEvents();
        initializeModuleRequirements();
      }, 100);
    });
  }
  
  // Asegurarnos de volver a configurar los eventos cuando se haga visible la sección empleadoAcquiredView
  const empleadoJourneyOption = document.getElementById('empleadoJourneyOption');
  if (empleadoJourneyOption) {
    empleadoJourneyOption.addEventListener('click', function() {
      console.log('Navegando a sección journey...');
      setTimeout(() => {
        configureLessonCardEvents();
        configureQuizCardEvents();
      }, 100);
    });
  }
});

// Inicializar el modal de lección
function initializeLessonModal() {
  const lessonModal = document.getElementById('lessonModal');
  const closeLessonBtn = document.getElementById('closeLessonBtn');
  const prevLevelBtn = document.getElementById('prevLevelBtn');
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const completeLessonBtn = document.getElementById('completeLessonBtn');
  const lessonContent = document.getElementById('lessonContent');
  const currentLevelSpan = document.getElementById('currentLevel');
  const totalLevelsSpan = document.getElementById('totalLevels');
  const progressFill = document.querySelector('.lesson-progress-fill');
  
  let currentLevel = 1;
  let totalLevels = 4;
  
  // Cerrar la lección
  closeLessonBtn.addEventListener('click', () => {
    lessonModal.style.display = 'none';
    // Reiniciar la lección al cerrar
    currentLevel = 1;
    updateLessonView();
  });
  
  // Botón para ir al nivel anterior
  prevLevelBtn.addEventListener('click', () => {
    if (currentLevel > 1) {
      currentLevel--;
      updateLessonView();
    }
  });
  
  // Botón para ir al siguiente nivel - Corregido para no saltarse niveles
  nextLevelBtn.addEventListener('click', () => {
    if (currentLevel < totalLevels) {
      currentLevel++;
      updateLessonView();
    }
  });
  
  // Función para actualizar la vista de la lección según el nivel actual
  function updateLessonView() {
    // Actualizar indicador de progreso
    currentLevelSpan.textContent = currentLevel;
    const progressPercentage = (currentLevel - 1) / (totalLevels - 1) * 100;
    progressFill.style.width = `${progressPercentage}%`;
    
    // Activar/desactivar botones de navegación
    prevLevelBtn.disabled = currentLevel === 1;
    
    // Mostrar u ocultar botones según el nivel
    if (currentLevel === totalLevels) {
      nextLevelBtn.style.display = 'none';
      completeLessonBtn.style.display = 'block';
    } else {
      nextLevelBtn.style.display = 'block';
      completeLessonBtn.style.display = 'none';
    }
    
    // Mostrar el nivel actual y ocultar los demás
    const levels = lessonContent.querySelectorAll('.level');
    levels.forEach((level, index) => {
      if (index + 1 === currentLevel) {
        level.classList.add('active');
        level.classList.remove('prev', 'next');
      } else if (index + 1 < currentLevel) {
        level.classList.add('prev');
        level.classList.remove('active', 'next');
      } else {
        level.classList.add('next');
        level.classList.remove('active', 'prev');
      }
    });
  }
  
  // Botón para completar la lección
  completeLessonBtn.addEventListener('click', () => {
    // Marcar la lección como completada
    if (window.currentLessonCard) {
      // Añadir clase para estilo visual
      window.currentLessonCard.classList.add('completed');
      
      // Actualizar texto del botón
      const lessonButton = window.currentLessonCard.querySelector('.start-lesson-btn');
      if (lessonButton) {
        lessonButton.textContent = '✓ Completado';
      }
      
      // Actualizar la barra de progreso del módulo
      if (window.currentModuleContent) {
        updateModuleProgress(window.currentModuleContent);
      } else {
        // Intenta encontrar el módulo al que pertenece
        const moduleContent = window.currentLessonCard.closest('.module-content');
        if (moduleContent) {
          updateModuleProgress(moduleContent);
        }
      }
    } else {
      console.log('No se pudo determinar qué lección se completó');
    }
    
    // Mostrar mensaje de éxito
    alert('¡Lección completada con éxito!');
    
    // Cerrar el modal
    lessonModal.style.display = 'none';
    
    // Reiniciar la lección al completarla
    currentLevel = 1;
    updateLessonView();
  });
}

// Función para asegurar que el botón de iniciar cuestionario funcione
function forceEnableQuizButtons() {
  // Aplicar directamente a todos los botones de cuestionario
  const quizButtons = document.querySelectorAll('.quiz-card .start-lesson-btn');
  
  console.log('Forzando habilitación de', quizButtons.length, 'botones de cuestionario');
  
  quizButtons.forEach(button => {
    // Asegurar que no está deshabilitado
    button.disabled = false;
    
    // Remover clases que puedan bloquear o afectar interacción
    const quizCard = button.closest('.quiz-card');
    if (quizCard) {
      quizCard.classList.remove('locked');
    }
    
    // Volver a aplicar estilo del botón
    button.style.backgroundColor = '';
    button.style.cursor = 'pointer';
  });
}

// Hacer que esto se ejecute al cargar y al cambiar de pestaña
document.addEventListener('DOMContentLoaded', function() {
  // Configuración inicial ya existente
  
  // Agregar la habilitación forzada de botones de cuestionario
  setTimeout(forceEnableQuizButtons, 500);
  
  // También al cambiar a la vista de journeys adquiridos
  const empleadoAcquiredTab = document.getElementById('empleadoAcquiredTab');
  if (empleadoAcquiredTab) {
    empleadoAcquiredTab.addEventListener('click', function() {
      setTimeout(forceEnableQuizButtons, 500);
    });
  }
});

// Función para crear niveles de lección según el módulo
function createLessonLevels(moduleTitle, lessonContainer) {
  let lessonData = [];
  
  // Determinar qué contenido mostrar según el módulo
  if (moduleTitle.includes('Pronto Cash')) {
    lessonData = [
      {
        title: "¿Qué es ProntoCash?",
        content: `<p>ProntoCash es una solución financiera diseñada específicamente para pequeñas y medianas empresas (PYMES) que buscan mejorar su flujo de efectivo. Esta herramienta permite a las empresas acceder a financiamiento inmediato basado en sus facturas pendientes de cobro.</p>
                <p>A diferencia de los préstamos tradicionales, ProntoCash utiliza el modelo de factoraje financiero, permitiendo a las empresas convertir sus cuentas por cobrar en efectivo disponible sin incrementar su deuda.</p>`
      },
      {
        title: "¿Cómo funciona ProntoCash?",
        content: `<p>El proceso de ProntoCash es simple y eficiente:</p>
                <p>1. <strong>Carga de Facturas</strong>: La empresa sube sus facturas pendientes de cobro a la plataforma.</p>
                <p>2. <strong>Verificación</strong>: El sistema verifica la validez de las facturas y evalúa el riesgo.</p>
                <p>3. <strong>Oferta de Financiamiento</strong>: Se genera una oferta con el porcentaje de adelanto y la comisión aplicable.</p>
                <p>4. <strong>Desembolso</strong>: Una vez aceptada la oferta, el dinero se transfiere a la cuenta bancaria de la empresa en menos de 24 horas.</p>
                <p>5. <strong>Gestión de Cobro</strong>: ProntoCash se encarga del seguimiento y cobro de las facturas.</p>`
      },
      {
        title: "Beneficios de ProntoCash",
        content: `<p>Al utilizar ProntoCash, las empresas obtienen:</p>
                <p>• <strong>Liquidez Inmediata</strong>: Acceso a capital de trabajo sin esperar los plazos de pago habituales.</p>
                <p>• <strong>Sin Deuda</strong>: No se registra como un préstamo en los estados financieros.</p>
                <p>• <strong>Proceso Digital</strong>: Toda la operación se realiza en línea, sin papeleo.</p>
                <p>• <strong>Flexibilidad</strong>: Se puede utilizar según las necesidades, sin montos mínimos.</p>
                <p>• <strong>Mejora de Indicadores Financieros</strong>: Optimiza el ciclo de conversión de efectivo.</p>`
      },
      {
        title: "Requisitos y Proceso de Registro",
        content: `<p>Para acceder a ProntoCash, una empresa necesita:</p>
                <p>• Estar legalmente constituida.</p>
                <p>• Tener al menos 6 meses de operación.</p>
                <p>• Facturar a otras empresas (B2B).</p>
                <p>• Presentar documentos básicos de la empresa.</p>
                <p>El proceso de registro toma menos de 30 minutos y la aprobación de la cuenta se realiza en 24-48 horas.</p>`
      }
    ];
  } else if (moduleTitle.includes('ÁbacoPay')) {
    lessonData = [
      {
        title: "¿Qué es ÁbacoPay?",
        content: `<p>ÁbacoPay es una solución integral de pagos y facturación electrónica diseñada específicamente para pequeñas y medianas empresas en Latinoamérica.</p>
                <p>Esta plataforma permite emitir y recibir facturas electrónicas, gestionar pagos a proveedores, y simplificar la conciliación bancaria, todo desde una única interfaz digital.</p>`
      },
      {
        title: "Funcionalidades principales",
        content: `<p>ÁbacoPay ofrece múltiples herramientas:</p>
                <p>• <strong>Facturación Electrónica</strong>: Emisión de facturas que cumplen con requisitos fiscales.</p>
                <p>• <strong>Gestión de Pagos</strong>: Programación y ejecución de pagos a proveedores.</p>
                <p>• <strong>Conciliación Automática</strong>: Matching entre facturas y pagos.</p>
                <p>• <strong>Reportes Financieros</strong>: Visualización de flujos de caja y proyecciones.</p>
                <p>• <strong>Integración Bancaria</strong>: Conexión con múltiples bancos locales.</p>`
      },
      {
        title: "Beneficios para tu empresa",
        content: `<p>Implementar ÁbacoPay proporciona ventajas significativas:</p>
                <p>• <strong>Ahorro de Tiempo</strong>: Automatización de tareas administrativas repetitivas.</p>
                <p>• <strong>Reducción de Errores</strong>: Minimiza errores humanos en facturación y pagos.</p>
                <p>• <strong>Cumplimiento Fiscal</strong>: Garantiza el cumplimiento de normativas locales.</p>
                <p>• <strong>Visibilidad Financiera</strong>: Proporciona panorama claro de cuentas por pagar y cobrar.</p>
                <p>• <strong>Acceso Remoto</strong>: Gestión desde cualquier dispositivo con internet.</p>`
      },
      {
        title: "Implementación y Soporte",
        content: `<p>El proceso de adopción de ÁbacoPay es sencillo:</p>
                <p>• <strong>Onboarding</strong>: Configuración inicial en menos de 24 horas.</p>
                <p>• <strong>Capacitación</strong>: Entrenamiento para el equipo administrativo.</p>
                <p>• <strong>Migración de Datos</strong>: Importación de catálogos de clientes y proveedores.</p>
                <p>• <strong>Soporte Continuo</strong>: Asistencia técnica por múltiples canales.</p>
                <p>• <strong>Actualizaciones</strong>: Mejoras constantes sin costo adicional.</p>`
      }
    ];
  } else if (moduleTitle.includes('CashX')) {
    lessonData = [
      {
        title: "¿Qué es CashX?",
        content: `<p>CashX es una plataforma innovadora que permite a las empresas optimizar su flujo de efectivo mediante la monetización temprana de sus cuentas por cobrar.</p>
                <p>A diferencia de soluciones tradicionales, CashX utiliza tecnología blockchain y algoritmos predictivos para ofrecer tasas competitivas y procesos automatizados.</p>`
      },
      {
        title: "Cómo funciona CashX",
        content: `<p>El proceso de CashX se basa en estos pasos:</p>
                <p>1. <strong>Registro y Verificación</strong>: Proceso digital KYC/KYB para empresas.</p>
                <p>2. <strong>Carga de Documentos</strong>: Subir facturas y documentos de cuentas por cobrar.</p>
                <p>3. <strong>Evaluación Instantánea</strong>: Algoritmos evalúan el riesgo y generan oferta.</p>
                <p>4. <strong>Financiamiento</strong>: Recepción de fondos en menos de 24 horas.</p>
                <p>5. <strong>Gestión Automatizada</strong>: Seguimiento de pagos y conciliaciones.</p>`
      },
      {
        title: "Ventajas de CashX",
        content: `<p>CashX ofrece beneficios específicos:</p>
                <p>• <strong>Tasas Competitivas</strong>: Menores comisiones que factoraje tradicional.</p>
                <p>• <strong>Procesos 100% Digitales</strong>: Sin necesidad de visitas o papeleo físico.</p>
                <p>• <strong>Decisiones Rápidas</strong>: Aprobación en minutos, no días.</p>
                <p>• <strong>Sin Volúmenes Mínimos</strong>: Accesible para empresas de cualquier tamaño.</p>
                <p>• <strong>Integración con ERP</strong>: Conexión directa con sistemas de gestión.</p>`
      },
      {
        title: "Casos de uso y aplicaciones",
        content: `<p>CashX se utiliza efectivamente en diversos escenarios:</p>
                <p>• <strong>Expansión de Operaciones</strong>: Financiamiento para crecimiento sin endeudamiento.</p>
                <p>• <strong>Gestión de Estacionalidad</strong>: Estabilización de flujo en temporadas bajas.</p>
                <p>• <strong>Aprovechamiento de Oportunidades</strong>: Acceso rápido a capital para nuevos proyectos.</p>
                <p>• <strong>Mejora de Indicadores Financieros</strong>: Optimización del ciclo de conversión de efectivo.</p>
                <p>• <strong>Pago a Proveedores</strong>: Mantenimiento de la cadena de suministro.</p>`
      }
    ];
  } else {
    // Contenido genérico por si el módulo no coincide con ninguno conocido
    lessonData = [
      {
        title: "Introducción",
        content: "<p>Contenido introductorio del módulo.</p>"
      },
      {
        title: "Conceptos básicos",
        content: "<p>Explicación de conceptos fundamentales.</p>"
      },
      {
        title: "Aplicaciones prácticas",
        content: "<p>Casos de uso y ejemplos prácticos.</p>"
      },
      {
        title: "Resumen y conclusiones",
        content: "<p>Resumen de los puntos clave y siguientes pasos.</p>"
      }
    ];
  }
  
  // Crear y añadir los niveles al contenedor
  lessonData.forEach((level, index) => {
    const levelDiv = document.createElement('div');
    levelDiv.className = 'level';
    levelDiv.id = `level-${index + 1}`;
    
    const levelTitle = document.createElement('h5');
    const levelIcon = document.createElement('span');
    levelIcon.className = 'level-icon';
    levelIcon.textContent = '📝 ';
    
    levelTitle.appendChild(levelIcon);
    levelTitle.appendChild(document.createTextNode(level.title));
    
    const levelContent = document.createElement('div');
    levelContent.className = 'level-content';
    levelContent.innerHTML = level.content;
    
    levelDiv.appendChild(levelTitle);
    levelDiv.appendChild(levelContent);
    
    lessonContainer.appendChild(levelDiv);
  });
}