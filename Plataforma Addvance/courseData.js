// Course Data Structure
const courseData = {
    courses: [
        {
            id: "PC101",
            title: "Introducción a Pronto Cash",
            estimatedTime: "3 semanas",
            description: "Curso fundamental sobre Pronto Cash y sus beneficios para la gestión financiera empresarial.",
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
                                question: "¿Qué tipo de reportes ofrece Pronto Cash?",
                                options: [
                                    "Reportes de redes sociales",
                                    "Reportes personalizables",
                                    "Reportes de tráfico web",
                                    "Reportes de marketing"
                                ],
                                correctAnswer: 1
                            },
                            {
                                id: "Q1.4",
                                question: "¿Qué sistema de alertas tiene Pronto Cash?",
                                options: [
                                    "Alertas de redes sociales",
                                    "Alertas de tráfico web",
                                    "Alertas automáticas",
                                    "Alertas de marketing"
                                ],
                                correctAnswer: 2
                            },
                            {
                                id: "Q1.5",
                                question: "¿Qué permite la gestión de múltiples cuentas?",
                                options: [
                                    "Gestionar varias redes sociales",
                                    "Gestionar varias cuentas bancarias",
                                    "Gestionar varios sitios web",
                                    "Gestionar varios perfiles de usuario"
                                ],
                                correctAnswer: 1
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
                                question: "¿Qué es ÁbacoPay?",
                                options: [
                                    "Un sistema de gestión de inventario",
                                    "Una plataforma de procesamiento de pagos",
                                    "Un software de contabilidad",
                                    "Una aplicación de mensajería"
                                ],
                                correctAnswer: 1
                            }
                            // ... más preguntas similares
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
                                question: "¿Qué es CashX?",
                                options: [
                                    "Un sistema de gestión de inventario",
                                    "Una herramienta de gestión financiera",
                                    "Un software de contabilidad",
                                    "Una aplicación de mensajería"
                                ],
                                correctAnswer: 1
                            }
                            // ... más preguntas similares
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
                    }
                    // ... más preguntas similares
                ]
            }
        }
        // Más cursos pueden ser agregados aquí siguiendo la misma estructura
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

// Exportar el objeto courseData y las funciones de utilidad
export { courseData, getCourseById, getModuleById, getLessonById }; 