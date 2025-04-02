/**
 * Continuación de la integración del Sistema de Cursos con la Interfaz de Usuario
 * Este archivo complementa course-ui-integration.js con funciones adicionales
 */

// Importar desde el archivo principal
import { CourseUIIntegration } from './course-ui-integration.js';

/**
 * Extiende la clase CourseUIIntegration con funciones adicionales
 */
class CourseUIIntegrationExtended extends CourseUIIntegration {
    /**
     * Muestra una lección
     * @param {string} courseId - ID del curso
     * @param {string} moduleId - ID del módulo
     * @param {string} lessonId - ID de la lección
     */
    showLesson(courseId, moduleId, lessonId) {
        const lessonModal = document.getElementById('lessonModal');
        const lessonTitle = document.getElementById('lessonTitle');
        const lessonContent = document.getElementById('lessonContent');
        const currentLevelSpan = document.getElementById('currentLevel');
        const totalLevelsSpan = document.getElementById('totalLevels');
        const progressFill = document.querySelector('.lesson-progress-fill');
        const prevLevelBtn = document.getElementById('prevLevelBtn');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const completeLessonBtn = document.getElementById('completeLessonBtn');

        if (!lessonModal || !lessonTitle || !lessonContent) return;

        // Obtener la lección
        const lesson = getLessonById(courseId, moduleId, lessonId);
        if (!lesson) {
            console.error(`No se encontró la lección ${lessonId} del módulo ${moduleId} del curso ${courseId}`);
            return;
        }

        // Establecer el título de la lección
        lessonTitle.textContent = `Lección: ${lesson.title}`;

        // Guardar referencia a la lección actual
        this.currentLesson = {
            courseId,
            moduleId,
            lessonId,
            lesson,
            currentPage: 0,
            totalPages: lesson.pages.length
        };

        // Actualizar información de nivel
        if (currentLevelSpan) currentLevelSpan.textContent = '1';
        if (totalLevelsSpan) totalLevelsSpan.textContent = lesson.pages.length.toString();
        if (progressFill) progressFill.style.width = `${(1 / lesson.pages.length) * 100}%`;

        // Configurar botones de navegación
        if (prevLevelBtn) prevLevelBtn.disabled = true;
        if (nextLevelBtn) nextLevelBtn.disabled = lesson.pages.length <= 1;
        if (completeLessonBtn) completeLessonBtn.style.display = 'none';

        // Mostrar la primera página
        this.showLessonPage(0);

        // Mostrar el modal de la lección
        lessonModal.style.display = 'flex';
    }

    /**
     * Muestra una página específica de la lección actual
     * @param {number} pageIndex - Índice de la página a mostrar
     */
    showLessonPage(pageIndex) {
        if (!this.currentLesson) return;

        const lessonContent = document.getElementById('lessonContent');
        if (!lessonContent) return;

        // Validar el índice de página
        if (pageIndex < 0 || pageIndex >= this.currentLesson.totalPages) return;

        // Actualizar página actual
        this.currentLesson.currentPage = pageIndex;

        // Obtener la página
        const page = this.currentLesson.lesson.pages[pageIndex];

        // Crear contenido según el tipo de página
        let pageContent = '';
        if (page.type === 'text') {
            pageContent = `<div class="lesson-page">${page.content}</div>`;
        } else if (page.type === 'list') {
            pageContent = `
                <div class="lesson-page">
                    <p>${page.content}</p>
                    <ul>
                        ${page.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Mostrar el contenido
        lessonContent.innerHTML = pageContent;

        // Actualizar barra de progreso
        const progressFill = document.querySelector('.lesson-progress-fill');
        const currentLevelSpan = document.getElementById('currentLevel');
        if (progressFill) {
            progressFill.style.width = `${((pageIndex + 1) / this.currentLesson.totalPages) * 100}%`;
        }
        if (currentLevelSpan) {
            currentLevelSpan.textContent = (pageIndex + 1).toString();
        }

        // Actualizar estado de los botones
        const prevLevelBtn = document.getElementById('prevLevelBtn');
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        const completeLessonBtn = document.getElementById('completeLessonBtn');

        if (prevLevelBtn) prevLevelBtn.disabled = pageIndex === 0;
        if (nextLevelBtn) nextLevelBtn.disabled = pageIndex === this.currentLesson.totalPages - 1;
        if (completeLessonBtn) {
            completeLessonBtn.style.display = pageIndex === this.currentLesson.totalPages - 1 ? 'block' : 'none';
        }
    }

    /**
     * Navega entre las páginas de la lección actual
     * @param {string} direction - Dirección de navegación ('prev' o 'next')
     */
    navigateLesson(direction) {
        if (!this.currentLesson) return;

        if (direction === 'prev' && this.currentLesson.currentPage > 0) {
            this.showLessonPage(this.currentLesson.currentPage - 1);
        } else if (direction === 'next' && this.currentLesson.currentPage < this.currentLesson.totalPages - 1) {
            this.showLessonPage(this.currentLesson.currentPage + 1);
        }
    }

    /**
     * Marca la lección actual como completada
     */
    completeLesson() {
        if (!this.currentLesson || !this.currentUser) return;

        // Cerrar el modal de la lección
        document.getElementById('lessonModal').style.display = 'none';

        // Buscar la tarjeta de la lección
        const lessonCard = document.querySelector(`.lesson-card[data-lesson-id="${this.currentLesson.lessonId}"][data-module-id="${this.currentLesson.moduleId}"][data-course-id="${this.currentLesson.courseId}"]`);
        if (lessonCard) {
            // Marcar como completada
            lessonCard.classList.add('completed');
            lessonCard.querySelector('.start-lesson-btn').textContent = '✓ Completado';

            // Actualizar barra de progreso del módulo
            const moduleContent = lessonCard.closest('.module-content');
            if (moduleContent) {
                this.updateModuleProgress(moduleContent);
            }

            // Actualizar progreso en el sistema
            this.courseSystem.updateEmployeeProgress(
                this.currentUser.correo,
                this.currentLesson.courseId,
                this.getModuleProgressPercentage(moduleContent),
                this.currentLesson.moduleId
            );
        }

        // Limpiar referencia a la lección actual
        this.currentLesson = null;
    }

    /**
     * Actualiza la barra de progreso de un módulo
     * @param {HTMLElement} moduleContent - Contenedor del módulo
     */
    updateModuleProgress(moduleContent) {
        if (!moduleContent) return;

        // Contar elementos completados (lecciones y cuestionarios)
        const totalElements = moduleContent.querySelectorAll('.lesson-card, .quiz-card').length;
        const completedElements = moduleContent.querySelectorAll('.lesson-card.completed, .quiz-card.completed').length;

        // Calcular porcentaje
        const progressPercentage = (completedElements / totalElements) * 100;

        // Actualizar barra de progreso
        const progressBar = moduleContent.querySelector('.module-progress-fill');
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
    }

    /**
     * Obtiene el porcentaje de progreso de un módulo
     * @param {HTMLElement} moduleContent - Contenedor del módulo
     * @returns {number} Porcentaje de progreso
     */
    getModuleProgressPercentage(moduleContent) {
        if (!moduleContent) return 0;

        const totalElements = moduleContent.querySelectorAll('.lesson-card, .quiz-card').length;
        const completedElements = moduleContent.querySelectorAll('.lesson-card.completed, .quiz-card.completed').length;

        return Math.round((completedElements / totalElements) * 100);
    }
}

// Exportar la clase extendida
export { CourseUIIntegrationExtended };

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear instancia de la clase extendida
    window.courseUIIntegration = new CourseUIIntegrationExtended();
});