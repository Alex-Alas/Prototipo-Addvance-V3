/**
 * Integración del Sistema de Cursos con la Interfaz de Usuario
 * 
 * Este archivo proporciona funciones para integrar el sistema de cursos
 * con la interfaz de usuario, permitiendo mostrar cursos, módulos,
 * lecciones y cuestionarios en la UI.
 */

import CourseSystem from './courseSystem.js';
import { getQuizById, getLessonById } from '../courseData.js';

class CourseUIIntegration {
    constructor() {
        this.courseSystem = new CourseSystem();
        this.currentUser = this.getCurrentUser();
        this.initializeEventListeners();
    }

    /**
     * Obtiene el usuario actual del sistema
     * @returns {Object|null} Usuario actual o null si no hay sesión
     */
    getCurrentUser() {
        // Intentar obtener el usuario de la sesión
        try {
            return JSON.parse(localStorage.getItem('currentUser')) || null;
        } catch (e) {
            console.error('Error al obtener el usuario actual:', e);
            return null;
        }
    }

    /**
     * Inicializa los event listeners para la interfaz de usuario
     */
    initializeEventListeners() {
        // Inicializar tabs de búsqueda y cursos adquiridos
        this.initializeTabs();

        // Inicializar eventos para tarjetas de cursos
        this.initializeCourseCards();

        // Inicializar eventos para cuestionarios
        this.initializeQuizEvents();

        // Inicializar eventos para lecciones
        this.initializeLessonEvents();
    }

    /**
     * Inicializa las pestañas de búsqueda y cursos adquiridos
     */
    initializeTabs() {
        // Seleccionar elementos según el tipo de usuario
        const searchTabId = this.currentUser?.tipoPerfil === 'empleado' ? 'empleadoSearchTab' : 'searchTab';
        const acquiredTabId = this.currentUser?.tipoPerfil === 'empleado' ? 'empleadoAcquiredTab' : 'acquiredTab';
        const searchViewId = this.currentUser?.tipoPerfil === 'empleado' ? 'empleadoSearchView' : 'searchView';
        const acquiredViewId = this.currentUser?.tipoPerfil === 'empleado' ? 'empleadoAcquiredView' : 'acquiredView';

        const searchTab = document.getElementById(searchTabId);
        const acquiredTab = document.getElementById(acquiredTabId);
        const searchView = document.getElementById(searchViewId);
        const acquiredView = document.getElementById(acquiredViewId);

        if (searchTab && acquiredTab && searchView && acquiredView) {
            // Configurar evento para pestaña de búsqueda
            searchTab.addEventListener('click', () => {
                searchTab.classList.add('active');
                acquiredTab.classList.remove('active');
                searchView.style.display = 'block';
                acquiredView.style.display = 'none';
            });

            // Configurar evento para pestaña de cursos adquiridos
            acquiredTab.addEventListener('click', () => {
                searchTab.classList.remove('active');
                acquiredTab.classList.add('active');
                searchView.style.display = 'none';
                acquiredView.style.display = 'block';

                // Cargar cursos adquiridos
                this.loadAcquiredCourses();
            });
        }
    }

    /**
     * Inicializa los eventos para las tarjetas de cursos
     */
    initializeCourseCards() {
        // Configurar eventos para botones de compra/inscripción
        const purchaseButtons = document.querySelectorAll('.purchase-btn');
        purchaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCoursePurchase(e);
            });
        });
    }

    /**
     * Maneja la compra o inscripción a un curso
     * @param {Event} event - Evento del botón
     */
    handleCoursePurchase(event) {
        // Verificar si el usuario está autenticado
        if (!this.currentUser) {
            alert('Debes iniciar sesión para adquirir un curso.');
            return;
        }

        const button = event.currentTarget;
        const courseCard = button.closest('.curso-card');
        const courseTitle = courseCard.querySelector('h3').textContent;
        const courseId = courseCard.dataset.courseId || 'PC101'; // Usar ID por defecto si no está definido

        // Comportamiento según el tipo de usuario
        if (this.currentUser.tipoPerfil === 'empresa') {
            // Las empresas pueden comprar cursos
            const confirmed = confirm(`¿Estás seguro de que deseas adquirir el curso "${courseTitle}"?`);
            if (confirmed) {
                const result = this.courseSystem.purchaseCourse(this.currentUser.correo, courseId);
                alert(result.message);

                // Si la compra fue exitosa, actualizar la vista
                if (result.success) {
                    // Cambiar a la pestaña de cursos adquiridos
                    const acquiredTab = document.getElementById('acquiredTab');
                    if (acquiredTab) {
                        acquiredTab.click();
                    }
                }
            }
        } else if (this.currentUser.tipoPerfil === 'empleado') {
            // Los empleados solo pueden ver los cursos asignados
            alert('Los cursos deben ser asignados por tu empresa. Consulta con tu administrador.');
        }
    }

    /**
     * Carga los cursos adquiridos según el tipo de usuario
     */
    loadAcquiredCourses() {
        if (!this.currentUser) return;

        const acquiredViewId = this.currentUser.tipoPerfil === 'empleado' ? 'empleadoAcquiredView' : 'acquiredView';
        const acquiredView = document.getElementById(acquiredViewId);
        if (!acquiredView) return;

        // Obtener cursos según el tipo de usuario
        let courses = [];
        if (this.currentUser.tipoPerfil === 'empresa') {
            courses = this.courseSystem.getCompanyCourses(this.currentUser.correo);
        } else if (this.currentUser.tipoPerfil === 'empleado') {
            courses = this.courseSystem.getEmployeeCourses(this.currentUser.correo);
        }

        // Si no hay cursos, mostrar mensaje
        if (courses.length === 0) {
            this.showEmptyCoursesMessage(acquiredView);
            return;
        }

        // Mostrar los cursos adquiridos
        this.renderAcquiredCourses(acquiredView, courses);
    }

    /**
     * Muestra un mensaje cuando no hay cursos adquiridos
     * @param {HTMLElement} container - Contenedor donde mostrar el mensaje
     */
    showEmptyCoursesMessage(container) {
        const moduleContainer = container.querySelector('.module-content') || container;
        moduleContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book"></i>
                <p>Aún no tienes cursos ${this.currentUser.tipoPerfil === 'empresa' ? 'adquiridos' : 'asignados'}.</p>
                <p>${this.currentUser.tipoPerfil === 'empresa' ? 'Explora nuestro catálogo y adquiere tu primer curso.' : 'Contacta a tu empresa para que te asigne cursos.'}</p>
            </div>
        `;
    }

    /**
     * Renderiza los cursos adquiridos en la interfaz
     * @param {HTMLElement} container - Contenedor donde mostrar los cursos
     * @param {Array} courses - Lista de cursos adquiridos
     */
    renderAcquiredCourses(container, courses) {
        // Para empleados, mostrar los módulos de los cursos asignados
        if (this.currentUser.tipoPerfil === 'empleado') {
            // Limpiar el contenedor
            container.innerHTML = `<h2 style="margin-bottom: 20px;">Mi Progreso de Aprendizaje</h2>`;

            // Crear contenedor para los módulos si no existe
            courses.forEach(courseAssignment => {
                const course = courseAssignment.courseDetails;
                if (!course) return;

                // Renderizar cada módulo del curso
                course.modules.forEach((module, index) => {
                    this.renderModuleContent(container, course.id, module, index + 1);
                });
            });
        } else if (this.currentUser.tipoPerfil === 'empresa') {
            // Para empresas, mostrar la lista de cursos adquiridos con opciones de gestión
            const cursoGrid = container.querySelector('.curso-grid');
            if (!cursoGrid) return;

            cursoGrid.innerHTML = courses.map(purchasedCourse => {
                const course = this.courseSystem.getCourse(purchasedCourse.courseId);
                if (!course) return '';

                return `
                    <div class="curso-card" data-course-id="${course.id}">
                        <h3>${course.title}</h3>
                        <p>Estado: ${purchasedCourse.status}</p>
                        <p class="deadline">Fecha límite: ${new Date(purchasedCourse.deadlineToSchedule).toLocaleDateString()}</p>
                        <div class="curso-details">
                            <h4>Empleados asignados</h4>
                            <div class="assigned-employees">
                                ${purchasedCourse.assignedEmployees.length > 0 ?
                                    `<ul>${purchasedCourse.assignedEmployees.map(email => `<li>${email}</li>`).join('')}</ul>` :
                                    '<p>No hay empleados asignados</p>'
                                }
                            </div>
                            <div class="course-actions">
                                <button class="assign-btn" data-course-id="${course.id}">Asignar empleados</button>
                                <button class="view-progress-btn" data-course-id="${course.id}">Ver progreso</button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            // Configurar eventos para los botones de asignación y progreso
            this.setupCourseManagementEvents();
        }
    }

    /**
     * Renderiza el contenido de un módulo en la interfaz
     * @param {HTMLElement} container - Contenedor donde mostrar el módulo
     * @param {string} courseId - ID del curso
     * @param {Object} module - Datos del módulo
     * @param {number} moduleNumber - Número del módulo
     */
    renderModuleContent(container, courseId, module, moduleNumber) {
        // Crear el elemento del módulo
        const moduleElement = document.createElement('div');
        moduleElement.className = 'module-content';
        moduleElement.dataset.moduleId = module.id;
        moduleElement.dataset.courseId = courseId;

        // Obtener el progreso del módulo
        const progress = this.getModuleProgress(courseId, module.id);

        // Crear el contenido del módulo
        moduleElement.innerHTML = `
            <div class="module-unit-expanded">
                <div class="module-icon">📘</div>
                <div>
                    <h3>${module.title}</h3>
                    <div class="module-progress-bar">
                        <div class="module-progress-fill" style="width: ${progress}%;"></div>
                    </div>
                </div>
            </div>
            <p>${module.description}</p>
            <div class="lessons-grid">
                ${this.renderLessons(courseId, module)}
                ${this.renderQuiz(courseId, module, moduleNumber)}
            </div>
        `;

        // Agregar el módulo al contenedor
        container.appendChild(moduleElement);
    }

    /**
     * Renderiza las lecciones de un módulo
     * @param {string} courseId - ID del curso
     * @param {Object} module - Datos del módulo
     * @returns {string} HTML de las lecciones
     */
    renderLessons(courseId, module) {
        return module.lessons.map(lesson => `
            <div class="lesson-card" data-lesson-id="${lesson.id}" data-module-id="${module.id}" data-course-id="${courseId}">
                <div class="lesson-icon">🔠</div>
                <h4>${lesson.title}</h4>
                <p>${lesson.pages[0]?.content.substring(0, 50)}...</p>
                <button class="start-lesson-btn">Iniciar</button>
            </div>
        `).join('');
    }

    /**
     * Renderiza el cuestionario de un módulo
     * @param {string} courseId - ID del curso
     * @param {Object} module - Datos del módulo
     * @param {number} moduleNumber - Número del módulo
     * @returns {string} HTML del cuestionario
     */
    renderQuiz(courseId, module, moduleNumber) {
        return `
            <div class="lesson-card quiz-card" data-module="${moduleNumber}" data-module-id="${module.id}" data-course-id="${courseId}">
                <div class="lesson-icon">❓</div>
                <h4>${module.quiz.title}</h4>
                <p>Evalúa tu conocimiento</p>
                <button class="start-lesson-btn">Iniciar ❓</button>
            </div>
        `;
    }

    /**
     * Obtiene el progreso de un módulo
     * @param {string} courseId - ID del curso
     * @param {string} moduleId - ID del módulo
     * @returns {number} Porcentaje de progreso
     */
    getModuleProgress(courseId, moduleId) {
        if (!this.currentUser) return 0;

        // Obtener el progreso del curso para el usuario actual
        const progress = this.courseSystem.getEmployeeCourseProgress(this.currentUser.correo, courseId);
        if (!progress) return 0;

        // Verificar si el módulo está completado
        return progress.completedModules.includes(moduleId) ? 100 : 0;
    }

    /**
     * Configura los eventos para la gestión de cursos (para empresas)
     */
    setupCourseManagementEvents() {
        // Configurar eventos para botones de asignación
        const assignButtons = document.querySelectorAll('.assign-btn');
        assignButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const courseId = e.currentTarget.dataset.courseId;
                this.showAssignEmployeeModal(courseId);
            });
        });

        // Configurar eventos para botones de progreso
        const progressButtons = document.querySelectorAll('.view-progress-btn');
        progressButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const courseId = e.currentTarget.dataset.courseId;
                this.showCourseProgressModal(courseId);
            });
        });
    }

    /**
     * Muestra un modal para asignar empleados a un curso
     * @param {string} courseId - ID del curso
     */
    showAssignEmployeeModal(courseId) {
        // Implementación simplificada - en una versión real se mostraría un modal con lista de empleados
        const employeeEmail = prompt('Ingresa el correo del empleado a asignar:');
        if (employeeEmail) {
            const result = this.courseSystem.assignCourseToEmployee(this.currentUser.correo, courseId, employeeEmail);
            alert(result.message);

            // Actualizar la vista si la asignación fue exitosa
            if (result.success) {
                this.loadAcquiredCourses();
            }
        }
    }

    /**
     * Muestra un modal con el progreso de los empleados en un curso
     * @param {string} courseId - ID del curso
     */
    showCourseProgressModal(courseId) {
        // Implementación simplificada - en una versión real se mostraría un modal con el progreso detallado
        alert('Funcionalidad de visualización de progreso en desarrollo.');
    }

    /**
     * Inicializa los eventos para los cuestionarios
     */
    initializeQuizEvents() {
        // Configurar evento para mostrar cuestionario cuando se hace clic en una tarjeta de quiz
        document.addEventListener('click', (e) => {
            const quizCard = e.target.closest('.quiz-card');
            if (quizCard && (e.target.classList.contains('start-lesson-btn') || e.target === quizCard)) {
                const moduleNumber = quizCard.dataset.module;
                const moduleId = quizCard.dataset.moduleId;
                const courseId = quizCard.dataset.courseId;

                // Guardar referencias para usar después
                window.journeySystem = window.journeySystem || {};
                window.journeySystem.currentQuizCard = quizCard;
                window.journeySystem.currentModuleContent = quizCard.closest('.module-content');

                // Mostrar el cuestionario
                this.showQuiz(moduleNumber, moduleId, courseId);
            }
        });

        // Configurar evento para el botón de enviar cuestionario
        const submitQuizBtn = document.getElementById('submitQuizBtn');
        if (submitQuizBtn) {
            submitQuizBtn.addEventListener('click', () => {
                this.evaluateQuiz();
            });
        }

        // Configurar evento para el botón de cerrar cuestionario
        const closeQuizBtn = document.getElementById('closeQuizBtn');
        if (closeQuizBtn) {
            closeQuizBtn.addEventListener('click', () => {
                document.getElementById('quizModal').style.display = 'none';
            });
        }
    }

    /**
     * Inicializa los eventos para las lecciones
     */
    initializeLessonEvents() {
        // Configurar evento para mostrar lección cuando se hace clic en una tarjeta de lección
        document.addEventListener('click', (e) => {
            const lessonCard = e.target.closest('.lesson-card:not(.quiz-card)');
            if (lessonCard && (e.target.classList.contains('start-lesson-btn') || e.target === lessonCard)) {
                const lessonId = lessonCard.dataset.lessonId;
                const moduleId = lessonCard.dataset.moduleId;
                const courseId = lessonCard.dataset.courseId;

                // Mostrar la lección
                this.showLesson(courseId, moduleId, lessonId);
            }
        });

        // Configurar eventos para los botones de navegación de lección
        const prevLevelBtn = document.getElementById('prevLevelBtn');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const completeLessonBtn = document.getElementById('completeLessonBtn');
        const closeLessonBtn = document.getElementById('closeLessonBtn');

        if (prevLevelBtn) {
            prevLevelBtn.addEventListener('click', () => {
                this.navigateLesson('prev');
            });
        }

        if (nextLevelBtn) {
            nextLevelBtn.addEventListener('click', () => {
                this.navigateLesson('next');
            });
        }

        if (completeLessonBtn) {
            completeLessonBtn.addEventListener('click', () => {
                this.completeLesson();
            });
        }

        if (closeLessonBtn) {
            closeLessonBtn.addEventListener('click', () => {
                document.getElementById('lessonModal').style.display = 'none';
            });
        }
    }

    /**
     * Muestra un cuestionario
     * @param {string} moduleNumber - Número del módulo
     * @param {string} moduleId - ID del módulo
     * @param {string} courseId - ID del curso
     */
    showQuiz(moduleNumber, moduleId, courseId) {
        const quizModal = document.getElementById('quizModal');
        const quizTitle = document.getElementById('quizTitle');
        const quizQuestions = document.getElementById('quizQuestions');

        if (!quizModal || !quizTitle || !quizQuestions) return;

        // Obtener el cuestionario del módulo
        const quiz = getQuizById(courseId, moduleId);
        if (!quiz) {
            console.error(`No se encontró el cuestionario para el módulo ${moduleId} del curso ${courseId}`);
            return;
        }

        // Establecer el título del cuestionario
        quizTitle.textContent = quiz.title;

        // Limpiar preguntas anteriores
        quizQuestions.innerHTML = '';

        // Generar preguntas
        quiz.questions.forEach((question, qIndex) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';

            // Añadir el texto de la pregunta
            const questionText = document.createElement('p');
            questionText.textContent = question.question;
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
                radioInput.dataset.correctAnswer = question.correctAnswer;

                // Manejar el evento de cambio para aplicar estilos
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

        // Guardar referencia al cuestionario actual
        this.currentQuiz = {
            courseId,
            moduleId,
            moduleNumber,
            quiz
        };

        // Mostrar el modal del cuestionario
        quizModal.style.display = 'flex';
    }

    /**
     * Evalúa las respuestas del cuestionario
     */
    evaluateQuiz() {
        if (!this.currentQuiz) return;

        const quizQuestions = document.querySelectorAll('.quiz-question');
        let correctAnswers = 0;
        let totalQuestions = quizQuestions.length;
        let allAnswered = true;

        // Verificar cada respuesta
        quizQuestions.forEach((questionDiv, qIndex) => {
            const selectedOption = questionDiv.querySelector(`input[name="question_${qIndex}"]:checked`);

            // Verificar si la pregunta fue respondida
            if (!selectedOption) {
                allAnswered = false;
                questionDiv.classList.add('unanswered');
                return;
            }

            questionDiv.classList.remove('unanswered');
            const selectedIndex = parseInt(selectedOption.value);
            const correctAnswer = parseInt(selectedOption.dataset.correctAnswer);

            // Verificar si la respuesta es correcta
            if (selectedIndex === correctAnswer) {
                correctAnswers++;
            }
        });

        // Si no todas las preguntas fueron respondidas, mostrar mensaje
        if (!allAnswered) {
            alert('Por favor responde todas las preguntas antes de enviar.');
            return;
        }

        // Calcular puntaje como porcentaje
        const score = Math.round((correctAnswers / totalQuestions) * 100);

        // Mostrar resultado
        alert(`Has obtenido ${score}% (${correctAnswers} de ${totalQuestions} respuestas correctas)`);

        // Cerrar modal
        document.getElementById('quizModal').style.display = 'none';

        // Actualizar progreso del módulo si se aprueba (70% o más)
        if (score >= 70) {
            // Marcar el cuestionario como completado
            if (window.journeySystem?.currentQuizCard) {
                const quizCard = window.journeySystem.currentQuizCard;
                quizCard.classList.add('completed');
                quizCard.querySelector('.start-lesson-btn').textContent = '✓ Completado';

                // Actualizar barra de progreso del módulo
                if (window.journeySystem?.currentModuleContent) {
                    this.updateModuleProgress(window.journeySystem.currentModuleContent);
                }

                // Actualizar progreso en el sistema
                if (this.currentUser) {
                    this.courseSystem.updateEmployeeProgress(
                        this.currentUser.correo,
                        this.currentQuiz.courseId,
                        this.getModuleProgressPercentage(window.journeySystem.currentModuleContent),
                        this.currentQuiz.moduleId
                    );
                }
            }
        }

        // Limpiar referencia al cuestionario actual
        this.currentQuiz = null;
    }

    /**
     * Muestra una lección