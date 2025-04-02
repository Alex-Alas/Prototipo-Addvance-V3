/**
 * Páginas Data Module
 * 
 * Este archivo contiene los datos de las páginas de lecciones para los cursos.
 * Cada página está asociada a un curso, módulo y lección específicos.
 * Las páginas contienen un encabezado y un cuerpo de texto.
 */

// Base de datos de páginas organizadas por curso, módulo y lección
const paginasDatabase = {
  // Curso 1: Herramientas de Abaco
  'curso1': {
    // Módulo 1: Introducción a Pronto Cash
    'modulo1-1': {
      // Lección 1: Introducción a ProntoCash
      'leccion1-1-1': [
        {
          id: 'pagina1-1-1-1',
          header: '¿Qué es ProntoCash?',
          body: `
            <div class="pagina-content">
              <p>ProntoCash es una solución financiera diseñada específicamente para pequeñas y medianas empresas (PYMES) que buscan mejorar su flujo de efectivo. Esta herramienta permite a las empresas acceder a financiamiento inmediato basado en sus facturas pendientes de cobro.</p>
              <p>A diferencia de los préstamos tradicionales, ProntoCash utiliza el modelo de factoraje financiero, permitiendo a las empresas convertir sus cuentas por cobrar en efectivo disponible sin incrementar su deuda.</p>
            </div>
          `
        },
        {
          id: 'pagina1-1-1-2',
          header: 'Beneficios de ProntoCash',
          body: `
            <div class="pagina-content">
              <p>Implementar ProntoCash en tu empresa trae numerosos beneficios:</p>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <h4>Liquidez Inmediata</h4>
                  <p>Acceso a capital de trabajo sin esperar los plazos de pago habituales.</p>
                </div>
                <div class="benefit-item">
                  <h4>Sin endeudamiento</h4>
                  <p>No se registra como un préstamo en los estados financieros, por lo que no afecta tu capacidad de endeudamiento.</p>
                </div>
                <div class="benefit-item">
                  <h4>Proceso digitalizado</h4>
                  <p>Toda la operación se realiza en línea, sin papeleo.</p>
                </div>
                <div class="benefit-item">
                  <h4>Flexibilidad</h4>
                  <p>Se puede utilizar según las necesidades, sin montos mínimos.</p>
                </div>
                <div class="benefit-item">
                  <h4>Mejora de Indicadores Financieros</h4>
                  <p>Optimiza el ciclo de conversión de efectivo.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina1-1-1-3',
          header: 'Cómo funciona ProntoCash',
          body: `
            <div class="pagina-content">
              <p>El proceso de ProntoCash se desarrolla en 5 sencillos pasos:</p>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Registro</h4>
                    <p>Crea tu cuenta en la plataforma ProntoCash y completa la información de tu empresa.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Carga de facturas</h4>
                    <p>Sube las facturas por cobrar que deseas adelantar, con toda la documentación necesaria.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Evaluación</h4>
                    <p>Nuestro sistema analiza automáticamente la solicitud y determina las condiciones para la oferta de financiamiento.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>Desembolso</h4>
                    <p>Una vez aprobada y aceptada la oferta, recibes el dinero en tu cuenta bancaria en menos de 24 horas.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h4>Gestión de Cobro</h4>
                    <p>ProntoCash se encarga del seguimiento y cobro de las facturas.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
            id: 'pagina1-1-1-4',
            header: 'Requisitos y Proceso de Registro',
            body: `
              <div class="pagina-content">
                <p>Para acceder a ProntoCash, una empresa necesita:</p>
                <p>• Estar legalmente constituida.</p>
                <p>• Tener al menos 6 meses de operación.</p>
                <p>• Facturar a otras empresas (B2B).</p>
                <p>• Presentar documentos básicos de la empresa.</p>
                <p>El proceso de registro toma menos de 30 minutos y la aprobación de la cuenta se realiza en 24-48 horas.</p>
              </div>
            `
        }        
      ]
    },
    // Módulo 2: AbacoPay
    'modulo1-2': {
      // Lección 1: ¿Qué es AbacoPay?
      'leccion1-2-1': [
        {
          id: 'pagina1-2-1-1',
          header: '¿Qué es ÁbacoPay?',
          body: `
            <div class="pagina-content">
              <p>ÁbacoPay es una solución integral de pagos y facturación electrónica diseñada específicamente para pequeñas y medianas empresas en Latinoamérica.</p>
                <p>Esta plataforma permite emitir y recibir facturas electrónicas, gestionar pagos a proveedores, y simplificar la conciliación bancaria, todo desde una única interfaz digital.</p>
            </div>
          `
        },
        {
          id: 'pagina1-2-1-2',
          header: 'Funcionalidades principales',
          body: `
            <div class="pagina-content">
              <p>AbacoPay ofrece un conjunto completo de herramientas para la gestión de pagos:</p>
              <div class="features-container">
                <div class="feature">
                  <h4>Facturación Electrónica</h4>
                  <p>Emisión de facturas que cumplen con requisitos fiscales.</p>
                </div>
                <div class="feature">
                  <h4>Gestión de Pagos</h4>
                  <p>Programación y ejecución de pagos a proveedores.</p>
                </div>
                <div class="feature">
                  <h4>Conciliación Automática</h4>
                  <p>Matching entre facturas y pagos.</p>
                </div>
                <div class="feature">
                  <h4>Reportes Financieros</h4>
                  <p>Visualización de flujos de caja y proyecciones.</p>
                </div>
                <div class="feature">
                  <h4>Integración Bancaria</h4>
                  <p>Conexión con múltiples bancos locales.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina1-2-1-3',
          header: 'Beneficios para tu empresas',
          body: `
            <div class="pagina-content">
              <p>Implementar ÁbacoPay proporciona ventajas significativas:</p>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <h4>Ahorro de Tiempo</h4>
                  <p>Automatización de tareas administrativas repetitivas.</p>
                </div>
                <div class="benefit-item">
                  <h4>Reducción de Errores</h4>
                  <p>Minimiza errores humanos en facturación y pagos.</p>
                </div>
                <div class="benefit-item">
                  <h4>Cumplimiento Fiscal</h4>
                  <p>Garantiza el cumplimiento de normativas locales.</p>
                </div>
                <div class="benefit-item">
                  <h4>Visibilidad Financiera</h4>
                  <p>Proporciona panorama claro de cuentas por pagar y cobrar.</p>
                </div>
                <div class="benefit-item">
                  <h4>Acceso Remoto</h4>
                  <p>Gestión desde cualquier dispositivo con internet.</p>
                </div>
              </div>
            </div>
              `
        },
        {
          id: 'pagina1-2-1-4',
          header: 'Implementación y Soporte',
          body: `
            <div class="pagina-content">
              <p>El proceso de adopción de ÁbacoPay es sencillo:</p>
                <p>• <strong>Onboarding</strong>: Configuración inicial en menos de 24 horas.</p>
                <p>• <strong>Capacitación</strong>: Entrenamiento para el equipo administrativo.</p>
                <p>• <strong>Migración de Datos</strong>: Importación de catálogos de clientes y proveedores.</p>
                <p>• <strong>Soporte Continuo</strong>: Asistencia técnica por múltiples canales.</p>
                <p>• <strong>Actualizaciones</strong>: Mejoras constantes sin costo adicional.</p>
            </div>
            `
        }      
      ]
    },
    // Módulo 3: CashX
    'modulo1-3': {
      // Lección 1: Introducción a CashX
      'leccion1-3-1': [
        {
          id: 'pagina1-3-1-1',
          header: '¿Qué es CashX?',
          body: `
            <div class="pagina-content">
              <p>CashX es una plataforma innovadora que permite a las empresas optimizar su flujo de efectivo mediante la monetización temprana de sus cuentas por cobrar.</p>
                <p>A diferencia de soluciones tradicionales, CashX utiliza tecnología blockchain y algoritmos predictivos para ofrecer tasas competitivas y procesos automatizados.</p>
            </div>
          `
        },
        {
          id: 'pagina1-3-1-2',
          header: 'Beneficios de CashX',
          body: `
            <div class="pagina-content">
              <p>Implementar CashX en tu empresa proporciona importantes beneficios:</p>
              <div class="benefits-grid">
                <div class="benefit-item">
                  <h4>Tasas Competitivas</h4>
                  <p>Menores comisiones que factoraje tradicional.</p>
                </div>
                <div class="benefit-item">
                  <h4>Procesos 100% Digitales</h4>
                  <p>Sin necesidad de visitas o papeleo físico.</p>
                </div>
                <div class="benefit-item">
                  <h4>Decisiones Rápidas</h4>
                  <p>Aprobación en minutos, no días.</p>
                </div>
                <div class="benefit-item">
                  <h4>Sin Volúmenes Mínimos</h4>
                  <p>Accesible para empresas de cualquier tamaño.</p>
                </div>
                <div class="benefit-item">
                  <h4>Integración con ERP</h4>
                  <p>Conexión directa con sistemas de gestión.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina1-3-1-3',
          header: 'Cómo funciona CashX',
          body: `
            <div class="pagina-content">
              <p>El proceso de ProntoCash se desarrolla en 5 sencillos pasos:</p>
              <div class="process-steps">
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <h4>Registro y Verificación</h4>
                    <p>Proceso digital KYC/KYB para empresas.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <h4>Carga de Documentos</h4>
                    <p>Sube tus facturas y documentos de cuentas por cobrar.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <h4>Evaluación de Crédito</h4>
                    <p>Nuestro sistema evalúa tu solicitud y determina la tasa de interés.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">4</div>
                  <div class="step-content">
                    <h4>Financiamiento</h4>
                    <p>Recibe tus fondos en menos de 24 horas.</p>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">5</div>
                  <div class="step-content">
                    <h4>Gestión Automatizada</h4>
                    <p>Seguimiento de pagos y conciliaciones.</p>
                  </div>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina1-3-1-4',
          header: 'Casos de uso y aplicaciones',
          body: `
            <div class="pagina-content">
              <p>CashX se utiliza efectivamente en diversos escenarios:</p>
                <p>• <strong>Expansión de Operaciones</strong>: Financiamiento para crecimiento sin endeudamiento.</p>
                <p>• <strong>Gestión de Estacionalidad</strong>: Estabilización de flujo en temporadas bajas.</p>
                <p>• <strong>Aprovechamiento de Oportunidades</strong>: Acceso rápido a capital para nuevos proyectos.</p>
                <p>• <strong>Mejora de Indicadores Financieros</strong>: Optimización del ciclo de conversión de efectivo.</p>
                <p>• <strong>Pago a Proveedores</strong>: Mantenimiento de la cadena de suministro.</p>
            </div>
            `
        }
      ]
    }
  },
  // Curso 2: Cultura digital
  'curso2': {
    // Módulo 1: Fundamentos de Liderazgo
    'modulo2-1': {
      // Lección 1: Principios básicos de liderazgo
      'leccion2-1-1': [
        {
          id: 'pagina2-1-1-1',
          header: 'Fundamentos del liderazgo moderno',
          body: `
            <div class="pagina-content">
              <p>El liderazgo en la era digital va más allá de la simple dirección de equipos. Se trata de inspirar, guiar y empoderar a las personas en un entorno cada vez más tecnológico y cambiante.</p>
              <p>Los principios fundamentales del liderazgo moderno incluyen:</p>
              <ul>
                <li>Comunicación efectiva y transparente</li>
                <li>Adaptabilidad ante entornos cambiantes</li>
                <li>Mentalidad de crecimiento continuo</li>
                <li>Toma de decisiones basada en datos</li>
                <li>Empatía y comprensión de las necesidades del equipo</li>
              </ul>
            </div>
          `
        },
        {
          id: 'pagina2-1-1-2',
          header: 'Tipos de liderazgo en entornos digitales',
          body: `
            <div class="pagina-content">
              <p>Existen diferentes estilos de liderazgo que pueden ser efectivos según el contexto y la cultura organizacional:</p>
              <div class="leadership-types">
                <div class="leadership-type">
                  <h4>Liderazgo transformacional</h4>
                  <p>Inspira cambios positivos en los seguidores, centrándose en transformar a otros para ayudarse mutuamente y cuidar de los demás.</p>
                </div>
                <div class="leadership-type">
                  <h4>Liderazgo democrático</h4>
                  <p>Involucra a los miembros del equipo en el proceso de toma de decisiones, fomentando la colaboración y el compromiso.</p>
                </div>
                <div class="leadership-type">
                  <h4>Liderazgo adaptativo</h4>
                  <p>Se ajusta rápidamente a las circunstancias cambiantes, ideal para entornos digitales en constante evolución.</p>
                </div>
                <div class="leadership-type">
                  <h4>Liderazgo servidor</h4>
                  <p>Prioriza las necesidades de los demás, enfocándose en el crecimiento y bienestar del equipo y las comunidades.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina2-1-1-3',
          header: 'Habilidades esenciales del líder digital',
          body: `
            <div class="pagina-content">
              <p>Para liderar eficazmente en la era digital, es necesario desarrollar un conjunto específico de habilidades:</p>
              <div class="skills-container">
                <div class="skill">
                  <h4>Alfabetización digital</h4>
                  <p>Comprender las tecnologías emergentes y su impacto en el negocio.</p>
                </div>
                <div class="skill">
                  <h4>Gestión del cambio</h4>
                  <p>Facilitar la adaptación a nuevas herramientas y procesos digitales.</p>
                </div>
                <div class="skill">
                  <h4>Pensamiento estratégico</h4>
                  <p>Visualizar el futuro digital de la organización y planificar en consecuencia.</p>
                </div>
                <div class="skill">
                  <h4>Colaboración virtual</h4>
                  <p>Fomentar la productividad y cohesión en equipos remotos o híbridos.</p>
                </div>
                <div class="skill">
                  <h4>Agilidad mental</h4>
                  <p>Adaptarse rápidamente a nuevos escenarios y tomar decisiones informadas bajo presión.</p>
                </div>
              </div>
            </div>
          `
        },
        {
          id: 'pagina2-1-1-4',
          header: 'El rol del líder en la transformación digital',
          body: `
            <div class="pagina-content">
              <p>Los líderes juegan un papel crucial en el proceso de transformación digital de cualquier organización:</p>
              <div class="role-description">
                <h4>Visión y dirección</h4>
                <p>Establecer una visión clara de la transformación digital y comunicarla efectivamente a todos los niveles.</p>
                
                <h4>Gestión del cambio cultural</h4>
                <p>Promover una cultura que valore la innovación, el aprendizaje continuo y la adaptabilidad.</p>
                
                <h4>Asignación de recursos</h4>
                <p>Garantizar que se destinan los recursos necesarios para la capacitación y herramientas digitales.</p>
                
                <h4>Ejemplo y modelado</h4>
                <p>Demostrar personalmente las actitudes y comportamientos que definen la mentalidad digital.</p>
                
                <h4>Eliminación de obstáculos</h4>
                <p>Identificar y abordar las barreras que impiden la adopción de nuevas tecnologías y procesos.</p>
              </div>
            </div>
          `
        }
      ]
    }
  }
};

/**
 * Obtiene todas las páginas asociadas a una lección específica
 * 
 * @param {string} courseId - ID del curso
 * @param {string} moduleId - ID del módulo
 * @param {string} lessonId - ID de la lección
 * @returns {Array|null} - Array de páginas o null si no se encuentra
 */
function getPaginasByLesson(courseId, moduleId, lessonId) {
  try {
    if (paginasDatabase[courseId] && 
        paginasDatabase[courseId][moduleId] && 
        paginasDatabase[courseId][moduleId][lessonId]) {
      return paginasDatabase[courseId][moduleId][lessonId];
    }
    return null;
  } catch (error) {
    console.error('Error al obtener páginas:', error);
    return null;
  }
}

/**
 * Obtiene una página específica por su ID
 * 
 * @param {string} courseId - ID del curso
 * @param {string} moduleId - ID del módulo
 * @param {string} lessonId - ID de la lección
 * @param {string} paginaId - ID de la página
 * @returns {Object|null} - Objeto de la página o null si no se encuentra
 */
function getPaginaById(courseId, moduleId, lessonId, paginaId) {
  try {
    const paginas = getPaginasByLesson(courseId, moduleId, lessonId);
    if (paginas) {
      return paginas.find(pagina => pagina.id === paginaId) || null;
    }
    return null;
  } catch (error) {
    console.error('Error al obtener página por ID:', error);
    return null;
  }
}

/**
 * Obtiene una página específica por su índice en la lección
 * 
 * @param {string} courseId - ID del curso
 * @param {string} moduleId - ID del módulo
 * @param {string} lessonId - ID de la lección
 * @param {number} index - Índice de la página (basado en 0)
 * @returns {Object|null} - Objeto de la página o null si no se encuentra
 */
function getPaginaByIndex(courseId, moduleId, lessonId, index) {
  try {
    const paginas = getPaginasByLesson(courseId, moduleId, lessonId);
    if (paginas && index >= 0 && index < paginas.length) {
      return paginas[index];
    }
    return null;
  } catch (error) {
    console.error('Error al obtener página por índice:', error);
    return null;
  }
}

/**
 * Obtiene el número total de páginas en una lección
 * 
 * @param {string} courseId - ID del curso
 * @param {string} moduleId - ID del módulo
 * @param {string} lessonId - ID de la lección
 * @returns {number} - Número de páginas o 0 si no se encuentra la lección
 */
function getTotalPaginas(courseId, moduleId, lessonId) {
  try {
    const paginas = getPaginasByLesson(courseId, moduleId, lessonId);
    return paginas ? paginas.length : 0;
  } catch (error) {
    console.error('Error al obtener total de páginas:', error);
    return 0;
  }
}

// Exportar las funciones para uso en otros archivos
window.paginasManager = {
  getPaginasByLesson,
  getPaginaById,
  getPaginaByIndex,
  getTotalPaginas
};

// Exportar la base de datos para acceso directo si es necesario
window.paginasDatabase = paginasDatabase; 