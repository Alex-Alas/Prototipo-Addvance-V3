/**
 * Estructura de datos para los cursos de la plataforma Addvance
 * Este archivo contiene la información hardcodeada de los cursos disponibles
 * incluyendo sus módulos, lecciones y cuestionarios.
 */

const courseData = {
    courses: [
        {
            id: "PC101",
            title: "Introducción a Pronto Cash",
            category: "finanzas",
            level: "Básico",
            estimatedTime: "3 semanas",
            price: "$$$",
            description: "Curso fundamental sobre Pronto Cash y sus beneficios para la gestión financiera empresarial.",
            providerEmail: "abaco@example.com",
            creationDate: "2023-01-15T10:00:00Z",
            modules: [
                {
                    id: "M1",
                    title: "Módulo 1: Fundamentos de Pronto Cash",
                    description: "Este módulo cubre los conceptos básicos de Pronto Cash y su importancia en la gestión financiera.",
                    lessons: [
                        {
                            id: "L1",
                            title: "¿Qué es Pronto Cash?",
                            pages: [
                                {
                                    id: "P1",
                                    content: "Pronto Cash es una solución integral de gestión financiera que permite a las empresas optimizar su flujo de caja y tomar decisiones informadas.",
                                    type: "text"
                                },
                                {
                                    id: "P2",
                                    content: "Los principales beneficios incluyen:",
                                    type: "list",
                                    items: [
                                        "Optimización del flujo de caja",
                                        "Mejor gestión de pagos",
                                        "Análisis financiero en tiempo real",
                                        "Integración con sistemas existentes"
                                    ]
                                }
                            ]
                        },
                        {
                            id: "L2",
                            title: "Características Principales",
                            pages: [
                                {
                                    id: "P1",
                                    content: "Las características principales de Pronto Cash incluyen:",
                                    type: "list",
                                    items: [
                                        "Dashboard interactivo",
                                        "Reportes personalizables",
                                        "Alertas automáticas",
                                        "Gestión de múltiples cuentas"
                                    ]
                                }
                            ]
                        }
                    ],
                    quiz: {
                        id: "Q1",
                        title: "Cuestionario Módulo 1",
                        questions: [
                            {
                                id: "Q1.1",
                                question: "¿Qué es Pronto Cash?",
                                options: [
                                    "Un sistema de gestión de inventario",
                                    "Una solución integral de gestión financiera",
                                    "Un software de contabilidad básica",
                                    "Una aplicación de mensajería"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "Q1.2",
                                question: "¿Cuál es uno de los principales beneficios de Pronto Cash?",
                                options: [
                                    "Gestión de redes sociales",
                                    "Optimización del flujo de caja",
                                    "Edición de videos",
                                    "Gestión de proyectos"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "Q1.3",
                                question: "¿Cuál es la ventaja que ofrece Pronto Cash con respecto a la cadena de suministro?",
                                options: [
                                    "Mayor integración de componentes electrónicos",
                                    "Anticipo de renuncia de empleados",
                                    "Ofrece una tasa de interés baja",
                                    "Evita interrupciones de operaciones"
                                ],
                                correctAnswer: 3
                            }
                        ]
                    }
                },
                {
                    id: "M2",
                    title: "Módulo 2: ÁbacoPay",
                    description: "Aprende sobre ÁbacoPay y sus procesos de pago.",
                    lessons: [
                        {
                            id: "L1",
                            title: "Introducción a ÁbacoPay",
                            pages: [
                                {
                                    id: "P1",
                                    content: "ÁbacoPay es una plataforma de procesamiento de pagos que se integra perfectamente con Pronto Cash.",
                                    type: "text"
                                },
                                {
                                    id: "P2",
                                    content: "Características principales de ÁbacoPay:",
                                    type: "list",
                                    items: [
                                        "Procesamiento 100% digital",
                                        "Pagos instantáneos a proveedores",
                                        "Extensión de plazos de pago",
                                        "Gestión de flujo de caja y crédito"
                                    ]
                                }
                            ]
                        }
                    ],
                    quiz: {
                        id: "Q2",
                        title: "Cuestionario Módulo 2",
                        questions: [
                            {
                                id: "Q2.1",
                                question: "¿Qué hace ÁbacoPay?",
                                options: [
                                    "Adelanta los fondos necesarios",
                                    "Mejora la cadena de suministro",
                                    "Permite mantener mayor liquidez",
                                    "Permite una mejor relación con los empleados"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "Q2.2",
                                question: "¿De qué manera se realizan los procesos en ÁbacoPay?",
                                options: [
                                    "100% digital",
                                    "100% presencial",
                                    "50% presencial y 50% digital",
                                    "25% presencial y 75% digital"
                                ],
                                correctAnswer: 0
                            },
                            {
                                id: "Q2.3",
                                question: "¿En qué momento reciben el pago los proveedores si se usa ÁbacoPay?",
                                options: [
                                    "Después de 10 días hábiles",
                                    "Al instante",
                                    "Después de llenar un formulario",
                                    "Hasta que la empresa decida pagar"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                },
                {
                    id: "M3",
                    title: "Módulo 3: CashX",
                    description: "Explora las características avanzadas de CashX para la gestión financiera.",
                    lessons: [
                        {
                            id: "L1",
                            title: "Introducción a CashX",
                            pages: [
                                {
                                    id: "P1",
                                    content: "CashX es una herramienta avanzada que complementa Pronto Cash para la gestión financiera.",
                                    type: "text"
                                },
                                {
                                    id: "P2",
                                    content: "Beneficios principales de CashX:",
                                    type: "list",
                                    items: [
                                        "Mantiene un flujo de caja estable",
                                        "Funciona de manera 100% digital",
                                        "Permite la inversión y evita interrupciones",
                                        "Gestiona documentación de cuentas por cobrar"
                                    ]
                                }
                            ]
                        }
                    ],
                    quiz: {
                        id: "Q3",
                        title: "Cuestionario Módulo 3",
                        questions: [
                            {
                                id: "Q3.1",
                                question: "¿Qué son las cuentas por cobrar?",
                                options: [
                                    "Son inmuebles que la empresa posee",
                                    "Son prestamos que la empresa ha realizado en todo su tiempo funcionando",
                                    "Son los importes que la empresa tiene derecho a recibir por operaciones comerciales",
                                    "Son cuentas con fondos extra"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "Q3.2",
                                question: "Señala cuál es el objetivo principal de CashX",
                                options: [
                                    "Lograr que los empleados trabajen más",
                                    "Mantener un flujo de caja estable",
                                    "Obtener mayor comisión por venta",
                                    "Recibir menos dinero"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "Q3.3",
                                question: "¿Qué información se sube una vez se está registrado en CashX?",
                                options: [
                                    "Crédito fiscal y factura electrónica",
                                    "Documentación sobre nuestras cuentas por cobrar",
                                    "DUI del representante",
                                    "NIT de la empresa"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ],
            finalTest: {
                id: "FT1",
                title: "Examen Final - Pronto Cash",
                description: "Evalúa tu conocimiento completo sobre Pronto Cash y sus componentes.",
                questions: [
                    {
                        id: "FT1.1",
                        question: "¿Cuál es el propósito principal de Pronto Cash?",
                        options: [
                            "Gestionar redes sociales",
                            "Optimizar la gestión financiera",
                            "Editar videos",
                            "Gestionar proyectos"
                        ],
                        correctAnswer: 1
                    },
                    {
                        id: "FT1.2",
                        question: "¿Qué plataforma se integra con Pronto Cash para el procesamiento de pagos?",
                        options: [
                            "PayPal",
                            "Stripe",
                            "ÁbacoPay",
                            "CashX"
                        ],
                        correctAnswer: 2
                    },
                    {
                        id: "FT1.3",
                        question: "¿Qué herramienta complementa a Pronto Cash para la gestión financiera avanzada?",
                        options: [
                            "Excel",
                            "QuickBooks",
                            "ÁbacoPay",
                            "CashX"
                        ],
                        correctAnswer: 3
                    }
                ]
            }
        },
        {
            id: "AP102",
            title: "ÁbacoPay Avanzado",
            category: "finanzas",
            level: "Intermedio",
            estimatedTime: "4 semanas",
            price: "$$$",
            description: "Curso avanzado sobre ÁbacoPay y sus aplicaciones en la gestión financiera empresarial.",
            providerEmail: "abaco@example.com",
            creationDate: "2023-02-20T14:30:00Z",
            modules: [
                {
                    id: "M1",
                    title: "Módulo 1: Configuración Avanzada",
                    description: "Aprende a configurar ÁbacoPay para necesidades empresariales específicas.",
                    lessons: [
                        {
                            id: "L1",
                            title: "Configuración de Perfiles",
                            pages: [
                                {
                                    id: "P1",
                                    content: "En esta lección aprenderás a configurar perfiles de usuario y permisos en ÁbacoPay.",
                                    type: "text"
                                }
                            ]
                        }
                    ],
                    quiz: {
                        id: "Q1",
                        title: "Cuestionario Módulo 1",
                        questions: [
                            {
                                id: "Q1.1",
                                question: "¿Qué tipo de perfiles se pueden configurar en ÁbacoPay?",
                                options: [
                                    "Solo perfiles de administrador",
                                    "Perfiles de usuario, administrador y auditor",
                                    "Solo perfiles de usuario básico",
                                    "No se pueden configurar perfiles"
                                ],
                                correctAnswer: 1
                            }
                        ]
                    }
                }
            ]
        },
        {
            id: "CX103",
            title: "CashX para Empresas",
            category: "finanzas",
            level: "Avanzado",
            estimatedTime: "5 semanas",
            price: "$$$$",
            description: "Curso especializado en el uso de CashX para la gestión financiera de empresas medianas y grandes.",
            providerEmail: "abaco@example.com",
            creationDate: "2023-03-10T09:15:00Z",
            modules: [
                {
                    id: "M1",
                    title: "Módulo 1: Implementación de CashX",
                    description: "Aprende a implementar CashX en tu empresa de manera efectiva.",
                    lessons: [
                        {
                            id: "L1",
                            title: "Planificación de la Implementación",
                            pages: [
                                {
                                    id: "P1",
                                    content: "En esta lección aprenderás a planificar la implementación de CashX en tu empresa.",
                                    type: "text"
                                }
                            ]
                        }
                    ],
                    quiz: {
                        id: "Q1",
                        title: "Cuestionario Módulo 1",
                        questions: [
                            {
                                id: "Q1.1",
                                question: "¿Cuál es el primer paso para implementar CashX en una empresa?",
                                options: [
                                    "Instalar el software",
                                    "Capacitar al personal",
                                    "Realizar un análisis de necesidades",
                                    "Contratar consultores externos"
                                ],
                                correctAnswer: 2
                            }
                        ]
                    }
                }
            ]
        }
    ]
};

// Función para obtener un curso por ID
function getCourseById(courseId) {
    return courseData.courses.find(course => course.id === courseId);
}

// Función para obtener un módulo específico de un curso
function getModuleById(courseId, moduleId) {
    const course = getCourseById(courseId);
    if (!course) return null;
    return course.modules.find(module => module.id === moduleId);
}

// Función para obtener una lección específica de un módulo
function getLessonById(courseId, moduleId, lessonId) {
    const module = getModuleById(courseId, moduleId);
    if (!module) return null;
    return module.lessons.find(lesson => lesson.id === lessonId);
}

// Función para obtener un cuestionario específico de un módulo
function getQuizById(courseId, moduleId) {
    const module = getModuleById(courseId, moduleId);
    if (!module) return null;
    return module.quiz;
}

// Función para obtener el examen final de un curso
function getFinalTestById(courseId) {
    const course = getCourseById(courseId);
    if (!course) return null;
    return course.finalTest;
}

// Exportar el objeto courseData y las funciones de utilidad
export { courseData, getCourseById, getModuleById, getLessonById, getQuizById, getFinalTestById };