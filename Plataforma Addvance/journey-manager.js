// Journey Manager Module
const JourneyManager = {
    init() {
        this.searchTab = document.getElementById('empleadoSearchTab');
        this.acquiredTab = document.getElementById('empleadoAcquiredTab');
        this.searchView = document.getElementById('empleadoSearchView');
        this.acquiredView = document.getElementById('empleadoAcquiredView');
        
        // Make sure the Journey section is visible
        const journeySection = document.getElementById('empleadoJourneySection');
        if (journeySection) {
            journeySection.style.display = 'block';
        }
        
        // Initialize tabs
        this.initializeTabs();
        
        // Initialize lesson and quiz functionality
        this.initializeLessonsAndQuizzes();
    },

    initializeTabs() {
        if (this.searchTab && this.acquiredTab && this.searchView && this.acquiredView) {
            // Set search tab as active by default
            this.searchTab.classList.add('active');
            this.acquiredTab.classList.remove('active');
            this.searchView.style.display = 'block';
            this.acquiredView.style.display = 'none';

            // Add click handlers
            this.searchTab.addEventListener('click', () => this.switchTab('search'));
            this.acquiredTab.addEventListener('click', () => this.switchTab('acquired'));
        }
    },

    switchTab(tab) {
        if (tab === 'search') {
            this.searchTab.classList.add('active');
            this.acquiredTab.classList.remove('active');
            this.searchView.style.display = 'block';
            this.acquiredView.style.display = 'none';
        } else {
            this.acquiredTab.classList.add('active');
            this.searchTab.classList.remove('active');
            this.acquiredView.style.display = 'block';
            this.searchView.style.display = 'none';
        }
    },

    initializeLessonsAndQuizzes() {
        // Lesson content
        this.lessonContent = {
            1: {
                title: "Introducción a Pronto Cash",
                levels: [
                    {
                        title: "¿Qué es ProntoCash?",
                        content: "ProntoCash es una solución financiera que permite a las empresas optimizar su flujo de caja..."
                    },
                    {
                        title: "Beneficios de ProntoCash",
                        content: "Los principales beneficios incluyen: mejora en la gestión de efectivo, reducción de costos..."
                    },
                    {
                        title: "Cómo funciona ProntoCash",
                        content: "El proceso es simple: 1. Registro, 2. Evaluación, 3. Aprobación, 4. Desembolso..."
                    }
                ]
            },
            2: {
                title: "ÁbacoPay",
                levels: [
                    {
                        title: "Introducción a ÁbacoPay",
                        content: "ÁbacoPay es una plataforma de pagos que facilita las transacciones entre empresas..."
                    },
                    {
                        title: "Características principales",
                        content: "Características clave: pagos instantáneos, seguimiento en tiempo real, seguridad..."
                    }
                ]
            },
            3: {
                title: "CashX",
                levels: [
                    {
                        title: "¿Qué es CashX?",
                        content: "CashX es una herramienta avanzada de gestión de efectivo que ayuda a las empresas..."
                    },
                    {
                        title: "Funcionalidades principales",
                        content: "Incluye: análisis predictivo, automatización de pagos, reportes detallados..."
                    }
                ]
            }
        };

        // Quiz questions
        this.quizQuestions = {
            1: [
                {
                    question: "¿Qué es ProntoCash?",
                    options: [
                        "Una plataforma de redes sociales",
                        "Una solución financiera para empresas",
                        "Un sistema de mensajería",
                        "Una red de transporte"
                    ],
                    correct: 1
                },
                {
                    question: "¿Cuál es el primer paso en el proceso de ProntoCash?",
                    options: [
                        "Desembolso",
                        "Registro",
                        "Evaluación",
                        "Aprobación"
                    ],
                    correct: 1
                }
            ],
            2: [
                {
                    question: "¿Qué es ÁbacoPay?",
                    options: [
                        "Una red social",
                        "Una plataforma de pagos",
                        "Un sistema de mensajería",
                        "Una red de transporte"
                    ],
                    correct: 1
                }
            ],
            3: [
                {
                    question: "¿Qué es CashX?",
                    options: [
                        "Una red social",
                        "Una plataforma de pagos",
                        "Una herramienta de gestión de efectivo",
                        "Una red de transporte"
                    ],
                    correct: 2
                }
            ]
        };

        // Initialize lesson and quiz buttons
        this.lessonButtons = document.querySelectorAll('.start-lesson-btn:not(.quiz-card .start-lesson-btn)');
        this.quizButtons = document.querySelectorAll('.quiz-card .start-lesson-btn');
        
        // Initialize modals
        this.lessonModal = document.getElementById('lessonModal');
        this.quizModal = document.getElementById('quizModal');
        
        // Add event listeners
        this.lessonButtons.forEach(button => {
            button.addEventListener('click', () => this.startLesson(button));
        });

        this.quizButtons.forEach(button => {
            button.addEventListener('click', () => this.startQuiz(button));
        });

        // Initialize modal controls
        this.initializeModalControls();
    },

    startLesson(button) {
        const moduleNumber = button.closest('.module-content').querySelector('.module-unit-expanded h3').textContent.match(/\d+/)[0];
        this.currentLesson = this.lessonContent[moduleNumber];
        this.currentLevel = 0;
        this.showLessonModal(moduleNumber);
    },

    startQuiz(button) {
        const moduleNumber = button.closest('.quiz-card').dataset.module;
        this.currentQuiz = this.quizQuestions[moduleNumber];
        this.showQuizModal(moduleNumber);
    },

    showLessonModal(moduleNumber) {
        const title = document.getElementById('lessonTitle');
        title.textContent = `Lección: ${this.currentLesson.title}`;
        this.updateLessonContent();
        this.lessonModal.style.display = 'block';
    },

    updateLessonContent() {
        const content = document.getElementById('lessonContent');
        const level = this.currentLesson.levels[this.currentLevel];
        content.innerHTML = `
            <h4>${level.title}</h4>
            <p>${level.content}</p>
        `;
        
        const prevLevelBtn = document.getElementById('prevLevelBtn');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const completeLessonBtn = document.getElementById('completeLessonBtn');
        
        prevLevelBtn.disabled = this.currentLevel === 0;
        completeLessonBtn.style.display = this.currentLevel === this.currentLesson.levels.length - 1 ? 'block' : 'none';
    },

    showQuizModal(moduleNumber) {
        const title = document.getElementById('quizTitle');
        title.textContent = `Cuestionario: Módulo ${moduleNumber}`;
        const questionsContainer = document.getElementById('quizQuestions');
        questionsContainer.innerHTML = this.currentQuiz.map((q, i) => `
            <div class="quiz-question">
                <p>${i + 1}. ${q.question}</p>
                ${q.options.map((opt, j) => `
                    <label>
                        <input type="radio" name="q${i}" value="${j}">
                        ${opt}
                    </label>
                `).join('')}
            </div>
        `).join('');
        this.quizModal.style.display = 'block';
    },

    initializeModalControls() {
        // Close buttons
        document.getElementById('closeLessonBtn').addEventListener('click', () => {
            this.lessonModal.style.display = 'none';
            this.currentLesson = null;
            this.currentLevel = 0;
        });

        document.getElementById('closeQuizBtn').addEventListener('click', () => {
            this.quizModal.style.display = 'none';
            this.currentQuiz = null;
        });

        // Navigation buttons
        document.getElementById('nextLevelBtn').addEventListener('click', () => {
            if (this.currentLevel < this.currentLesson.levels.length - 1) {
                this.currentLevel++;
                this.updateLessonContent();
            } else {
                document.getElementById('completeLessonBtn').style.display = 'block';
            }
        });

        document.getElementById('prevLevelBtn').addEventListener('click', () => {
            if (this.currentLevel > 0) {
                this.currentLevel--;
                this.updateLessonContent();
            }
        });

        // Complete lesson button
        document.getElementById('completeLessonBtn').addEventListener('click', () => {
            const moduleContent = document.getElementById('completeLessonBtn').closest('.module-content');
            const progressBar = moduleContent.querySelector('.module-progress-fill');
            progressBar.style.width = '100%';
            this.lessonModal.style.display = 'none';
            this.currentLesson = null;
            this.currentLevel = 0;
        });

        // Submit quiz button
        document.getElementById('submitQuizBtn').addEventListener('click', () => {
            this.quizModal.style.display = 'none';
            this.currentQuiz = null;
        });
    }
};

// Initialize the Journey Manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    JourneyManager.init();
}); 