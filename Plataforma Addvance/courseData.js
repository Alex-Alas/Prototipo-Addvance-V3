// Estructura de datos para gestionar cursos, empresas, empleados y su progreso

// Base de datos simulada de cursos disponibles
const coursesDatabase = [
  {
    id: 'curso1',
    title: 'Herramientas de Abaco',
    description: 'Aprende a usar las herramientas de Abaco para mejorar tu flujo de caja',
    detailedDescription: 'Abaco es una fintech salvadoreña que ofrece soluciones financieras para las micro, pequeñas y medianas empresas. Sus herramientas ayudan en gran medida a manejar mejor el flujo de caja de tu empresa y tener un control de tus finanzas. Descubre cómo puedes usarlas de manera efectiva e integrarlas en tu negocio.',
    duration: '4 semanas',
    level: 'Básico',
    minParticipants: 3,
    price: '$$$',
    providerId: 'socio-ejemplo',
    providerName: 'Proveedor Ejemplo',
    providerDescription: 'Especialista en capacitación sobre herramientas financieras',
            modules: [
                {
        id: 'modulo1-1',
        title: 'Módulo 1: Introducción a Pronto Cash',
        description: 'Este módulo cubre los fundamentos de Pronto Cash y sus beneficios.',
                    lessons: [
                        {
            id: 'leccion1-1-1',
            title: 'Lección 1',
            description: 'Introducción a ProntoCash',
            content: 'Contenido detallado de la lección'
                        }
                    ],
                    quiz: {
          id: 'quiz1-1',
          title: 'Cuestionario Módulo 1',
                        questions: [
                            {
              question: "¿Qué es ProntoCash?",
                                options: [
          "Una plataforma de crédito tradicional",
          "Una solución de financiamiento para empresas",
          "Un servicio de cambio de divisas",
          "Una aplicación para transferencias personales"
                                ],
                                correctAnswer: 1
                            },
                            {
              question: "¿Qué beneficio principal ofrece ProntoCash a las empresas?",
                                options: [
          "Reducción de impuestos",
          "Acceso a capital de trabajo",
          "Contratación de personal",
          "Marketing digital"
                                ],
                                correctAnswer: 1
                            }
                            ,
                            {
              question: "¿Cómo funciona ProntoCash?",
                                options: [
          "A través de préstamos bancarios tradicionales",
          "Mediante financiamiento de facturas por cobrar",
          "Con microcréditos personales",
          "Por medio de inversiones en bolsa"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                },
                {
        id: 'modulo1-2',
        title: 'Módulo 2: ÁbacoPay',
        description: 'Aprende sobre ÁbacoPay y sus procesos.',
                    lessons: [
                        {
            id: 'leccion1-2-1',
            title: 'Lección 1',
            description: '¿Qué es ÁbacoPay?',
            content: 'Contenido detallado de la lección'
                        }
                    ],
                    quiz: {
          id: 'quiz1-2',
          title: 'Cuestionario Módulo 2',
                        questions: [
                            {
              question: "¿Qué es ÁbacoPay?",
                                options: [
                "Una red social",
                "Una plataforma de pagos",
                "Un sistema de mensajería",
                "Una red de transporte"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                },
                {
        id: 'modulo1-3',
        title: 'Módulo 3: CashX',
        description: 'Explora cómo CashX mejora el flujo de caja.',
                    lessons: [
                        {
            id: 'leccion1-3-1',
            title: 'Lección 1',
            description: 'Introducción a CashX',
            content: 'Contenido detallado de la lección'
                        }
                    ],
                    quiz: {
          id: 'quiz1-3',
          title: 'Cuestionario Módulo 3',
                        questions: [
                            {
              question: "¿Qué es CashX?",
                                options: [
                "Una red social",
                "Una plataforma de pagos",
                "Una herramienta de gestión de efectivo",
                "Una red de transporte"
                                ],
                                correctAnswer: 2
            }
          ]
        }
      }
    ]
  },
  {
    id: 'curso2',
    title: 'Cultura digital',
    description: 'Conviertete en un lider e integra la cultura digital en tu empresa para mejorar la aceptación de herramientas digitales',
    detailedDescription: 'No todas las empresas son inguales, y por ende su cultura también es diferente. ',
    duration: '6 semanas',
    level: 'Intermedio',
    minParticipants: 3,
    price: '$$$',
    providerId: 'socio-ejemplo',
    providerName: 'Proveedor Ejemplo',
    providerDescription: 'Especialista en capacitación sobre transformación digital',
            modules: [
                {
        id: 'modulo2-1',
        title: 'Módulo 1: Fundamentos de Liderazgo',
        description: 'Este módulo cubre los fundamentos del liderazgo efectivo.',
                    lessons: [
                        {
            id: 'leccion2-1-1',
            title: 'Lección 1',
            description: 'Principios básicos de liderazgo',
            content: 'Contenido detallado de la lección'
                        }
                    ],
                    quiz: {
          id: 'quiz2-1',
          title: 'Cuestionario Módulo 1',
                        questions: [
                            {
              question: "¿Cuál es una característica clave de un buen líder?",
                                options: [
                "Autoritarismo",
                "Comunicación efectiva",
                "Evitar delegación",
                "Trabajar de forma aislada"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ]
  },
  {
    id: 'curso3',
    title: 'Transformación Digital para Empresas',
    description: 'Aprende a implementar tecnologías digitales en tu empresa para mejorar la eficiencia',
    detailedDescription: 'Este curso está diseñado para ayudar a las empresas a adaptarse al mundo digital con estrategias prácticas y herramientas efectivas.',
    duration: '8 semanas',
    level: 'Intermedio',
    minParticipants: 5,
    price: '$$$$',
    providerId: 'socio-tecnologia',
    providerName: 'TechLearn Empresarial',
    providerDescription: 'Especialistas en capacitación tecnológica para empresas en crecimiento',
    modules: []
  },
  {
    id: 'curso4',
    title: 'Ciberseguridad para Negocios',
    description: 'Protege tu empresa contra amenazas cibernéticas actuales',
    detailedDescription: 'Aprende las mejores prácticas de seguridad informática para proteger la información sensible de tu empresa.',
    duration: '6 semanas',
    level: 'Avanzado',
    minParticipants: 3,
    price: '$$$$$',
    providerId: 'socio-tecnologia',
    providerName: 'TechLearn Empresarial',
    providerDescription: 'Especialistas en capacitación tecnológica para empresas en crecimiento',
    modules: []
  },
  {
    id: 'curso5',
    title: 'Liderazgo Efectivo',
    description: 'Desarrolla habilidades de liderazgo para motivar y dirigir equipos de alto rendimiento',
    detailedDescription: 'Este curso te proporcionará las herramientas necesarias para convertirte en un líder inspirador y efectivo.',
    duration: '10 semanas',
    level: 'Básico',
    minParticipants: 5,
    price: '$$$$',
    providerId: 'socio-liderazgo',
    providerName: 'Liderazgo Empresarial SV',
    providerDescription: 'Potenciamos el liderazgo en todos los niveles de su organización',
    modules: []
  },
  {
    id: 'curso6',
    title: 'Gestión de Equipos Remotos',
    description: 'Aprende a liderar equipos distribuidos geográficamente de forma efectiva',
    detailedDescription: 'El trabajo remoto presenta desafíos únicos para los líderes. Este curso te enseña a superarlos.',
    duration: '4 semanas',
    level: 'Intermedio',
    minParticipants: 4,
    price: '$$$',
    providerId: 'socio-liderazgo',
    providerName: 'Liderazgo Empresarial SV',
    providerDescription: 'Potenciamos el liderazgo en todos los niveles de su organización',
    modules: []
  }
];

// Empresas y sus cursos adquiridos
const companiesData = {
  'empresa-ejemplo': {
    id: 'empresa-ejemplo',
    name: 'Empresa cliente',
    employees: ['empleado-ejemplo', 'empleado2'],
    acquiredCourses: [
      {
        courseId: 'curso1',
        purchaseDate: '15-03-2023',
        assignedEmployees: ['empleado-ejemplo'],
        status: 'En progreso',
        deadlineToSchedule: '30-06-2023',
        scheduleOptions: [
          { time: 'Mañana 9:00 AM', selected: false },
          { time: 'Tarde 2:00 PM', selected: false }
        ]
      }
    ],
    achievements: [
      {
        id: 'logro-empresa-1',
        title: 'Logro 1',
        description: 'Completó su primer curso',
        date: '10-02-2023'
      },
      {
        id: 'logro-empresa-2',
        title: 'Logro 2',
        description: 'Alcanzó 5 empleados capacitados',
        date: '15-03-2023'
      }
    ]
  },
  'empresa2': {
    id: 'empresa2',
    name: 'Empresa Innovadora S.A.',
    employees: ['empleado3', 'empleado4'],
    acquiredCourses: [
      {
        courseId: 'curso2',
        purchaseDate: '20-03-2023',
        assignedEmployees: ['empleado3', 'empleado4'],
        status: 'En progreso',
        deadlineToSchedule: '30-06-2023',
        scheduleOptions: [
          { time: 'Mañana 10:00 AM', selected: false },
          { time: 'Tarde 3:00 PM', selected: false }
        ]
      }
    ],
    achievements: [
      {
        id: 'logro-empresa2-1',
        title: 'Innovación Tecnológica',
        description: 'Implementó nuevas tecnologías en su proceso',
        date: '05-01-2023'
      },
      {
        id: 'logro-empresa2-2',
        title: 'Alto Rendimiento',
        description: 'Mejoró la productividad en un 30%',
        date: '12-03-2023'
      },
      {
        id: 'logro-empresa2-3',
        title: 'Sostenibilidad',
        description: 'Reducción de huella de carbono',
        date: '30-04-2023'
      }
    ]
  },
  'empresa3': {
    id: 'empresa3',
    name: 'Tecnología Avanzada',
    employees: ['empleado5', 'empleado6'],
    acquiredCourses: [],
    achievements: [
      {
        id: 'logro-empresa3-1',
        title: 'Líder en Industria',
        description: 'Reconocimiento como líder en su industria',
        date: '15-02-2023'
      },
      {
        id: 'logro-empresa3-2',
        title: 'Internacionalización',
        description: 'Expansión a mercados internacionales',
        date: '22-03-2023'
      }
    ]
  }
};

// Datos de empleados con su progreso en cursos
const employeesData = {
  'empleado-ejemplo': {
    id: 'empleado-ejemplo',
    name: 'Perfil de Empleado',
    position: 'Desarrollador Senior',
    companyId: 'empresa-ejemplo',
    courseProgress: {
      'curso1': {
        status: 'En progreso',
        modules: {
          'modulo1-1': {
            status: 'En progreso',
            progress: 50,
            lessons: {
              'leccion1-1-1': {
                completed: true,
                completionDate: '20-03-2023'
              }
            },
            quiz: {
              completed: false,
              score: null,
              lastAttempt: null
            }
          },
          'modulo1-2': {
            status: 'No iniciado',
            progress: 0,
            lessons: {
              'leccion1-2-1': {
                completed: false,
                completionDate: null
              }
            },
            quiz: {
              completed: false,
              score: null,
              lastAttempt: null
            }
          },
          'modulo1-3': {
            status: 'No iniciado',
            progress: 0,
            lessons: {
              'leccion1-3-1': {
                completed: false,
                completionDate: null
              }
            },
                    quiz: {
              completed: false,
              score: null,
              lastAttempt: null
            }
          }
        },
        overallProgress: 25 // 0-100%
      }
    },
    personalAchievements: [
      {
        id: 'logro-personal-1',
        title: 'Logro 1',
        description: 'Completó su primera lección',
        date: '20-03-2023'
      },
      {
        id: 'logro-personal-2',
        title: 'Logro 2',
        description: 'Obtuvo calificación perfecta en quiz',
        date: '21-03-2023'
      },
      {
        id: 'logro-personal-3',
        title: 'Logro 3',
        description: 'Completó 3 cursos en un mes',
        date: '30-03-2023'
      }
    ],
    completedCourses: [
      {
        courseId: 'curso1',
        title: 'Curso 1',
        completionDate: '15-02-2023'
      },
      {
        courseId: 'curso2',
        title: 'Curso 2',
        completionDate: '10-03-2023'
      }
    ]
  }
};

// Logros globales del sistema que pueden obtener las empresas
const globalAchievements = [
  {
    id: 'global-achievement-1',
    title: 'Transformación Digital',
    description: 'Implementó procesos de transformación digital',
    icon: 'fa-laptop-code',
    companies: ['empresa-ejemplo', 'empresa2']
  },
  {
    id: 'global-achievement-2',
    title: 'Sostenibilidad Ecológica',
    description: 'Logró reducir su huella ambiental significativamente',
    icon: 'fa-leaf',
    companies: ['empresa2', 'empresa3']
  },
  {
    id: 'global-achievement-3',
    title: 'Excelencia en Servicio',
    description: 'Reconocimiento por la calidad de servicio al cliente',
    icon: 'fa-award',
    companies: ['empresa-ejemplo', 'empresa3']
  },
  {
    id: 'global-achievement-4',
    title: 'Innovación Disruptiva',
    description: 'Creó productos o servicios revolucionarios para su industria',
    icon: 'fa-lightbulb',
    companies: ['empresa2']
  },
  {
    id: 'global-achievement-5',
    title: 'Desarrollo de Talento',
    description: 'Implementó programas destacados de capacitación interna',
    icon: 'fa-users',
    companies: ['empresa-ejemplo']
  }
];

// Datos de proveedores (socios)
const providersData = {
  'socio-ejemplo': {
    id: 'socio-ejemplo',
    name: 'Proveedor Ejemplo',
    description: 'Especialista en capacitación sobre herramientas financieras y transformación digital',
    businessType: 'Consultoría Educativa',
    location: 'San Salvador, El Salvador',
    industry: 'Educación Corporativa',
    contactInfo: {
      email: 'contacto@proveedor-ejemplo.com',
      phone: '+503 2222-3333',
      website: 'www.proveedor-ejemplo.com'
    },
    offeredCourses: ['curso1', 'curso2'],
    currentClients: ['empresa-ejemplo'],
    ratings: 4.8
  },
  'socio-tecnologia': {
    id: 'socio-tecnologia',
    name: 'TechLearn Empresarial',
    description: 'Especialistas en capacitación tecnológica para empresas en crecimiento',
    businessType: 'Tecnología Educativa',
    location: 'Santa Tecla, La Libertad',
    industry: 'Tecnología',
    contactInfo: {
      email: 'info@techlearn.com',
      phone: '+503 2222-4444',
      website: 'www.techlearn.com'
    },
    offeredCourses: ['curso3', 'curso4'],
    currentClients: ['empresa2'],
    ratings: 4.6
  },
  'socio-liderazgo': {
    id: 'socio-liderazgo',
    name: 'Liderazgo Empresarial SV',
    description: 'Potenciamos el liderazgo en todos los niveles de su organización',
    businessType: 'Desarrollo de Talento',
    location: 'San Salvador, El Salvador',
    industry: 'Desarrollo Organizacional',
    contactInfo: {
      email: 'contacto@liderazgosv.com',
      phone: '+503 2222-5555',
      website: 'www.liderazgosv.com'
    },
    offeredCourses: ['curso5', 'curso6'],
    currentClients: ['empresa3'],
    ratings: 4.9
  }
};

// Banco de preguntas para pruebas finales de los cursos
const finalTestsDatabase = {
  'curso1': {
    id: 'finalTest-curso1',
    title: 'Prueba Final: Herramientas de Abaco',
    description: 'Evalúa tu conocimiento general sobre todas las herramientas de Abaco',
    questions: [
      {
        question: "¿Cuál es el principal objetivo de las herramientas de Abaco?",
        options: [
          "Realizar marketing digital",
          "Mejorar el flujo de caja y la gestión financiera",
          "Desarrollar páginas web",
          "Administrar recursos humanos"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Qué es ProntoCash?",
        options: [
          "Una plataforma de crédito tradicional",
          "Una solución de financiamiento para empresas",
          "Un servicio de cambio de divisas",
          "Una aplicación para transferencias personales"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Qué beneficio principal ofrece ProntoCash a las empresas?",
        options: [
          "Reducción de impuestos",
          "Acceso a capital de trabajo",
          "Contratación de personal",
          "Marketing digital"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Cómo funciona ProntoCash?",
        options: [
          "A través de préstamos bancarios tradicionales",
          "Mediante financiamiento de facturas por cobrar",
          "Con microcréditos personales",
          "Por medio de inversiones en bolsa"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Qué es ÁbacoPay?",
        options: [
          "Una red social",
          "Una plataforma de pagos",
          "Un sistema de mensajería",
          "Una red de transporte"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Qué ventaja principal ofrece ÁbacoPay a las empresas?",
        options: [
          "Reducción de costos en transacciones",
          "Aumento de seguridad en pagos",
          "Automatización de cobros recurrentes",
          "Todas las anteriores"
        ],
        correctAnswer: 3
      },
      {
        question: "¿Qué es CashX?",
        options: [
          "Una red social",
          "Una plataforma de pagos",
          "Una herramienta de gestión de efectivo",
          "Una red de transporte"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Cómo ayuda CashX a las empresas?",
        options: [
          "Mejorando la previsión de flujo de caja",
          "Automatizando los informes financieros",
          "Optimizando la gestión de inventario",
          "Las opciones A y B son correctas"
        ],
        correctAnswer: 3
      },
      {
        question: "¿Quién puede utilizar las herramientas de Abaco?",
        options: [
          "Solo grandes empresas",
          "Solo micro y pequeñas empresas",
          "Empresas de todos los tamaños",
          "Solo empresas tecnológicas"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Qué se necesita para implementar las herramientas de Abaco?",
        options: [
          "Un equipo de TI especializado",
          "Grandes inversiones en infraestructura",
          "Una cuenta bancaria y acceso a internet",
          "Cambiar todo el sistema contable de la empresa"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Cuál de las siguientes NO es una herramienta de Abaco?",
        options: [
          "ProntoCash",
          "ÁbacoPay",
          "CashX",
          "AbacoHR"
        ],
        correctAnswer: 3
      },
      {
        question: "¿En qué país se originó Abaco?",
        options: [
          "México",
          "Colombia",
          "El Salvador",
          "Panamá"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Qué tipo de empresas se benefician más de las herramientas de Abaco?",
        options: [
          "Empresas con problemas de flujo de caja",
          "Empresas con altos volúmenes de transacciones",
          "Empresas que necesitan financiamiento rápido",
          "Todas las anteriores"
        ],
        correctAnswer: 3
      },
      {
        question: "¿Qué reportes proporciona CashX?",
        options: [
          "Solo reportes de ventas",
          "Solo reportes de gastos",
          "Reportes integrales de flujo de caja",
          "Reportes de recursos humanos"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Cómo se integra ÁbacoPay con otros sistemas?",
        options: [
          "No es compatible con otros sistemas",
          "A través de APIs y conexiones directas",
          "Solo mediante actualizaciones manuales",
          "Únicamente con sistemas desarrollados por Abaco"
        ],
        correctAnswer: 1
      }
    ]
  },
  'curso2': {
    id: 'finalTest-curso2',
    title: 'Prueba Final: Cultura Digital',
    description: 'Evalúa tu comprensión sobre la implementación de cultura digital en empresas',
    questions: [
      {
        question: "¿Qué es la cultura digital en una empresa?",
        options: [
          "El uso obligatorio de tecnología",
          "La presencia en redes sociales",
          "Un conjunto de valores, prácticas y expectativas sobre cómo funciona la tecnología",
          "Tener un sitio web corporativo"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Cuál es una característica clave de un buen líder en la transformación digital?",
        options: [
          "Autoritarismo",
          "Comunicación efectiva",
          "Evitar delegación",
          "Trabajar de forma aislada"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Por qué es importante la cultura digital en las empresas actuales?",
        options: [
          "Porque está de moda",
          "Porque facilita la adaptación al cambio y la innovación",
          "Porque reduce la necesidad de empleados",
          "Porque elimina la jerarquía organizacional"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Cuál es el primer paso para implementar una cultura digital?",
        options: [
          "Comprar la última tecnología",
          "Contratar expertos en tecnología",
          "Evaluar las necesidades y objetivos de la organización",
          "Crear perfiles en todas las redes sociales"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Qué barreras suelen existir para la adopción de cultura digital?",
        options: [
          "Resistencia al cambio",
          "Falta de habilidades digitales",
          "Ausencia de liderazgo comprometido",
          "Todas las anteriores"
        ],
        correctAnswer: 3
      },
      {
        question: "¿Cómo afecta la cultura digital a la comunicación interna?",
        options: [
          "La elimina completamente",
          "La centraliza solo en los gerentes",
          "La hace más fluida, transparente y colaborativa",
          "La reduce significativamente"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Qué papel juegan los líderes en la transformación cultural digital?",
        options: [
          "No tienen impacto, es responsabilidad del departamento de TI",
          "Son fundamentales, deben modelar el comportamiento esperado",
          "Solo deben financiar las iniciativas tecnológicas",
          "Deben mantenerse al margen del proceso"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Cómo se mide el éxito de una cultura digital?",
        options: [
          "Por la cantidad de herramientas tecnológicas implementadas",
          "Por el nivel de satisfacción de los clientes internos y externos",
          "Por la reducción de personal",
          "Por el aumento en ventas únicamente"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Qué metodologías favorecen una cultura digital?",
        options: [
          "Metodologías ágiles y Design Thinking",
          "Gestión tradicional de proyectos",
          "Metodologías que eviten la experimentación",
          "Estructuras jerárquicas rígidas"
        ],
        correctAnswer: 0
      },
      {
        question: "¿Qué habilidades son esenciales para los empleados en una cultura digital?",
        options: [
          "Solo habilidades técnicas",
          "Adaptabilidad, aprendizaje continuo y colaboración",
          "Memorización de procesos",
          "Especialización extrema en una sola área"
        ],
        correctAnswer: 1
      },
      {
        question: "¿Cómo afecta la cultura digital a la estructura organizacional?",
        options: [
          "No la afecta en absoluto",
          "La vuelve más jerárquica",
          "Tiende a hacerla más plana y colaborativa",
          "Elimina todos los niveles de mando"
        ],
        correctAnswer: 2
      },
      {
        question: "¿Qué implica la mentalidad digital?",
        options: [
          "Usar teléfonos inteligentes todo el tiempo",
          "Abrazar el cambio y la innovación continua",
          "Eliminar todo proceso analógico",
          "Trabajar exclusivamente de forma remota"
        ],
        correctAnswer: 1
      }
    ]
  }
};

/**
 * Obtiene las preguntas de la prueba final de un curso
 * @param {string} courseId - ID del curso
 * @returns {Object|null} - Datos de la prueba final o null si no existe
 */
function getFinalTestById(courseId) {
  return finalTestsDatabase[courseId] || null;
}

// Exponer objetos y funciones para su uso en el código
window.coursesDatabase = coursesDatabase;
window.companiesData = companiesData;
window.employeesData = employeesData;
window.globalAchievements = globalAchievements;
window.providersData = providersData;

// Funciones auxiliares para gestionar datos (simulando operaciones con base de datos)

// Función para obtener los cursos adquiridos por una empresa
function getCompanyAcquiredCourses(companyId) {
  const company = companiesData[companyId];
  if (!company) return [];
  
  return company.acquiredCourses.map(acquiredCourse => {
    const courseData = coursesDatabase.find(course => course.id === acquiredCourse.courseId);
    return {
      ...courseData,
      ...acquiredCourse
    };
  });
}

// Función para obtener los cursos disponibles para un empleado (adquiridos por su empresa)
function getEmployeeAvailableCourses(employeeId) {
  const employee = employeesData[employeeId];
  if (!employee) return [];
  
  const company = companiesData[employee.companyId];
  if (!company) return [];
  
  return company.acquiredCourses
    .filter(course => course.assignedEmployees.includes(employeeId))
    .map(acquiredCourse => {
      const courseData = coursesDatabase.find(course => course.id === acquiredCourse.courseId);
      const employeeProgress = employee.courseProgress[acquiredCourse.courseId] || { 
        status: 'No iniciado',
        overallProgress: 0 
      };
      
      return {
        ...courseData,
        ...acquiredCourse,
        progress: employeeProgress
      };
    });
}

// Función para actualizar el progreso de un empleado en un curso
function updateEmployeeCourseProgress(employeeId, courseId, moduleId, lessonId, completed = false, quizCompleted = false, quizScore = null) {
  const employee = employeesData[employeeId];
  if (!employee) return false;
  
  // Asegurarse que exista la estructura de datos
  if (!employee.courseProgress[courseId]) {
    employee.courseProgress[courseId] = {
      status: 'En progreso',
      modules: {},
      overallProgress: 0
    };
  }
  
  // Asegurarse que exista la estructura para el módulo
  if (!employee.courseProgress[courseId].modules[moduleId]) {
    employee.courseProgress[courseId].modules[moduleId] = {
      status: 'En progreso',
      progress: 0,
      lessons: {},
      quiz: {
        completed: false,
        score: null,
        lastAttempt: null
      }
    };
  }
  
  // Actualizar progreso de lección
  if (lessonId) {
    if (!employee.courseProgress[courseId].modules[moduleId].lessons[lessonId]) {
      employee.courseProgress[courseId].modules[moduleId].lessons[lessonId] = {
        completed: false,
        completionDate: null
      };
    }
    
    if (completed) {
      employee.courseProgress[courseId].modules[moduleId].lessons[lessonId].completed = true;
      employee.courseProgress[courseId].modules[moduleId].lessons[lessonId].completionDate = new Date().toLocaleDateString('es-ES');
    }
  }
  
  // Actualizar progreso de quiz
  if (quizCompleted) {
    employee.courseProgress[courseId].modules[moduleId].quiz.completed = true;
    employee.courseProgress[courseId].modules[moduleId].quiz.score = quizScore;
    employee.courseProgress[courseId].modules[moduleId].quiz.lastAttempt = new Date().toLocaleDateString('es-ES');
  }
  
  // Recalcular progreso del módulo
  const module = employee.courseProgress[courseId].modules[moduleId];
  const courseData = coursesDatabase.find(course => course.id === courseId);
  const moduleData = courseData.modules.find(mod => mod.id === moduleId);
  
  if (moduleData) {
    let completedItems = 0;
    const totalItems = moduleData.lessons.length + 1; // lecciones + quiz
    
    // Contar lecciones completadas
    for (const lesson of moduleData.lessons) {
      if (module.lessons[lesson.id]?.completed) {
        completedItems++;
      }
    }
    
    // Sumar quiz si está completo
    if (module.quiz.completed) {
      completedItems++;
    }
    
    module.progress = Math.round((completedItems / totalItems) * 100);
    
    // Actualizar estado del módulo
    if (module.progress === 0) {
      module.status = 'No iniciado';
    } else if (module.progress === 100) {
      module.status = 'Completado';
    } else {
      module.status = 'En progreso';
    }
  }
  
  // Recalcular progreso general del curso
  const courseProg = employee.courseProgress[courseId];
  if (courseData) {
    let totalProgress = 0;
    const moduleCount = courseData.modules.length;
    
    for (const mod of courseData.modules) {
      if (courseProg.modules[mod.id]) {
        totalProgress += courseProg.modules[mod.id].progress;
      }
    }
    
    courseProg.overallProgress = Math.round(totalProgress / moduleCount);
    
    // Actualizar estado del curso
    if (courseProg.overallProgress === 0) {
      courseProg.status = 'No iniciado';
    } else if (courseProg.overallProgress === 100) {
      courseProg.status = 'Completado';
    } else {
      courseProg.status = 'En progreso';
    }
  }
  
  return true;
}

// Función para obtener el progreso de todos los empleados en un curso específico para una empresa
function getCompanyCourseEmployeeProgress(companyId, courseId) {
  const company = companiesData[companyId];
  if (!company) return [];
  
  const acquiredCourse = company.acquiredCourses.find(course => course.courseId === courseId);
  if (!acquiredCourse) return [];
  
  return acquiredCourse.assignedEmployees.map(employeeId => {
    const employee = employeesData[employeeId];
    if (!employee) return null;
    
    const progress = employee.courseProgress[courseId] || { 
      status: 'No iniciado', 
      overallProgress: 0,
      modules: {}
    };
    
    return {
      employeeId,
      name: employee.name,
      position: employee.position,
      progress
    };
  }).filter(Boolean); // Eliminar valores nulos
}

// Función para obtener todos los logros de todas las empresas
function getAllCompanyAchievements() {
  const allAchievements = [];
  
  for (const companyId in companiesData) {
    const company = companiesData[companyId];
    
    for (const achievement of company.achievements) {
      allAchievements.push({
        ...achievement,
        companyName: company.name,
        companyId
      });
    }
  }
  
  // Ordenar por fecha más reciente
  allAchievements.sort((a, b) => {
    const dateA = new Date(a.date.split('-').reverse().join('-'));
    const dateB = new Date(b.date.split('-').reverse().join('-'));
    return dateB - dateA;
  });
  
  return allAchievements;
}

// Función para obtener logros globales y las empresas que los tienen
function getGlobalAchievementsWithCompanies() {
  return globalAchievements.map(achievement => {
    const companiesWithAchievement = achievement.companies.map(companyId => {
      const company = companiesData[companyId];
      return company ? { id: companyId, name: company.name } : null;
    }).filter(Boolean);
    
    return {
      ...achievement,
      companies: companiesWithAchievement
    };
  });
}

// Función para obtener todas las empresas que no son clientes actuales de un proveedor
function getPotentialClientsForProvider(providerId) {
  const provider = providersData[providerId];
  if (!provider) return [];
  
  const currentClientIds = provider.currentClients || [];
  const potentialClients = [];
  
  for (const companyId in companiesData) {
    if (!currentClientIds.includes(companyId)) {
      potentialClients.push({
        id: companyId,
        ...companiesData[companyId]
      });
    }
  }
  
  return potentialClients;
}

// Función para obtener los cursos ofrecidos por un proveedor específico
function getCoursesByProvider(providerId) {
  if (!providerId) return [];
  
  return coursesDatabase.filter(course => course.providerId === providerId);
}

// Función para obtener empresas clientes de un proveedor
function getProviderCurrentClients(providerId) {
  const provider = providersData[providerId];
  if (!provider || !provider.currentClients) return [];
  
  return provider.currentClients.map(clientId => {
    const clientData = companiesData[clientId];
    if (!clientData) return null;
    
    // Obtener los cursos adquiridos por esta empresa que son de este proveedor
    const acquiredProviderCourses = clientData.acquiredCourses
      .filter(course => {
        const courseData = coursesDatabase.find(c => c.id === course.courseId);
        return courseData && courseData.providerId === providerId;
      })
      .map(course => {
        const courseData = coursesDatabase.find(c => c.id === course.courseId);
        return {
          id: course.courseId,
          title: courseData ? courseData.title : 'Curso desconocido',
          purchaseDate: course.purchaseDate
        };
      });
    
    return {
      id: clientId,
      name: clientData.name,
      acquiredCourses: acquiredProviderCourses,
      // Otros datos relevantes
    };
  }).filter(Boolean); // Eliminar valores nulos
}

/**
 * Obtiene los proveedores de los cursos adquiridos por una empresa
 * @param {string} companyId - ID de la empresa
 * @returns {Array} - Array de proveedores con sus cursos
 */
function getCompanyProviders(companyId) {
  console.log(`Obteniendo proveedores para la empresa ${companyId}`);
  const company = companiesData[companyId];
  if (!company || !company.acquiredCourses || company.acquiredCourses.length === 0) {
    console.log('La empresa no tiene cursos adquiridos');
    return [];
  }
  
  // Crear un mapa de proveedores para evitar duplicados
  const providersMap = new Map();
  
  // Extraer los IDs de proveedores de los cursos adquiridos
  company.acquiredCourses.forEach(course => {
    const courseData = coursesDatabase.find(c => c.id === course.courseId);
    if (courseData && courseData.providerId) {
      console.log(`Curso ${course.courseId} proporcionado por ${courseData.providerId}`);
      
      if (!providersMap.has(courseData.providerId)) {
        const providerData = providersData[courseData.providerId] || {
          id: courseData.providerId,
          name: courseData.providerName || 'Proveedor sin nombre',
          description: courseData.providerDescription || 'Sin descripción'
        };
        
        providersMap.set(courseData.providerId, {
          ...providerData,
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
  
  const providers = Array.from(providersMap.values());
  console.log(`Se encontraron ${providers.length} proveedores para la empresa ${companyId}`, providers);
  return providers;
}

/**
 * Obtiene los proveedores disponibles que no han sido adquiridos por una empresa
 * @param {string} companyId - ID de la empresa
 * @returns {Array} - Array de proveedores disponibles
 */
function getAvailableProvidersForCompany(companyId) {
  console.log(`Obteniendo proveedores recomendados para la empresa ${companyId}`);
  const company = companiesData[companyId];
  if (!company) return [];
  
  // Obtener ids de proveedores con cursos ya adquiridos
  const acquiredProviderIds = new Set();
  
  if (company.acquiredCourses && company.acquiredCourses.length > 0) {
    company.acquiredCourses.forEach(course => {
      const courseData = coursesDatabase.find(c => c.id === course.courseId);
      if (courseData && courseData.providerId) {
        acquiredProviderIds.add(courseData.providerId);
      }
    });
  }
  
  console.log(`Proveedores actuales de la empresa: ${Array.from(acquiredProviderIds).join(', ')}`);
  
  // Obtener todos los proveedores disponibles que no han sido adquiridos
  const allProviders = new Map();
  
  // Primero, añadir todos los proveedores del objeto providersData
  Object.values(providersData).forEach(provider => {
    if (!acquiredProviderIds.has(provider.id)) {
      allProviders.set(provider.id, {
        ...provider,
        courses: []
      });
    }
  });
  
  // Luego, buscar en los cursos para asegurarnos de no perder ninguno
  coursesDatabase.forEach(course => {
    if (course.providerId && !acquiredProviderIds.has(course.providerId)) {
      if (!allProviders.has(course.providerId)) {
        allProviders.set(course.providerId, {
          id: course.providerId,
          name: course.providerName || 'Proveedor sin nombre',
          description: course.providerDescription || 'Sin descripción',
          courses: []
        });
      }
      
      const provider = allProviders.get(course.providerId);
      if (!provider.courses.some(c => c.id === course.id)) {
        provider.courses.push({
          id: course.id,
          title: course.title,
          description: course.description
        });
      }
    }
  });
  
  const providers = Array.from(allProviders.values());
  console.log(`Se encontraron ${providers.length} proveedores recomendados para la empresa ${companyId}`);
  return providers;
}

// Exponer funciones para su uso en el código
window.courseManager = {
  getCompanyAcquiredCourses,
  getEmployeeAvailableCourses,
  updateEmployeeCourseProgress,
  getCompanyCourseEmployeeProgress,
  getAllCompanyAchievements,
  getGlobalAchievementsWithCompanies,
  getPotentialClientsForProvider,
  getCoursesByProvider,
  getProviderCurrentClients,
  getCompanyProviders,
  getAvailableProvidersForCompany
};

// Exponer la función getFinalTestById
window.getFinalTestById = getFinalTestById;
