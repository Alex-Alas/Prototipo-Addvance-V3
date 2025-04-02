/**
 * Curso Manager for Addvance Platform
 * Manages course purchases and related achievements
 */

class CursoManager {
  constructor(empresaEmail) {
    this.empresaEmail = empresaEmail;
    this.purchasedCourses = this.loadPurchasedCourses();
    this.initializeEventListeners();
  }

  loadPurchasedCourses() {
    return JSON.parse(localStorage.getItem(`purchased_courses_${this.empresaEmail}`)) || [];
  }

  savePurchasedCourses() {
    localStorage.setItem(`purchased_courses_${this.empresaEmail}`, JSON.stringify(this.purchasedCourses));
  }

  initializeEventListeners() {
    // Inicializar los botones de compra de cursos
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    purchaseButtons.forEach(button => {
      button.addEventListener('click', this.handleCoursePurchase.bind(this));
    });

    // Inicializar las pestañas de cursos
    const searchTab = document.getElementById('searchTab');
    const acquiredTab = document.getElementById('acquiredTab');
    const searchView = document.getElementById('searchView');
    const acquiredView = document.getElementById('acquiredView');

    if (searchTab && acquiredTab) {
      searchTab.addEventListener('click', () => {
        searchView.style.display = 'block';
        acquiredView.style.display = 'none';
        searchTab.classList.add('active');
        acquiredTab.classList.remove('active');
      });

      acquiredTab.addEventListener('click', () => {
        searchView.style.display = 'none';
        acquiredView.style.display = 'block';
        searchTab.classList.remove('active');
        acquiredTab.classList.add('active');
        this.updateAcquiredCoursesView();
      });
    }
  }

  handleCoursePurchase(event) {
    const button = event.currentTarget;
    const cursoCard = button.closest('.curso-card');
    const cursoTitle = cursoCard.querySelector('h3').textContent;
    
    // Verificar si el curso ya ha sido adquirido
    if (this.purchasedCourses.some(course => course.title === cursoTitle)) {
      alert(`Ya has adquirido el curso "${cursoTitle}".`);
      return;
    }

    // Simular proceso de compra
    const confirmed = confirm(`¿Estás seguro de que deseas adquirir el curso "${cursoTitle}"?`);
    
    if (confirmed) {
      // Crear objeto de curso adquirido
      const purchasedCourse = {
        id: 'C' + Date.now(),
        title: cursoTitle,
        purchaseDate: new Date().toISOString(),
        status: 'En progreso',
        participants: [],
        deadlineToSchedule: this.getDeadlineDate(30) // 30 días para agendar
      };

      // Añadir a la lista de cursos adquiridos
      this.purchasedCourses.unshift(purchasedCourse);
      this.savePurchasedCourses();

      // Disparar evento de compra de curso para el sistema de logros
      document.dispatchEvent(new CustomEvent('coursePurchased', {
        detail: {
          courseId: purchasedCourse.id,
          courseTitle: purchasedCourse.title,
          purchaseDate: purchasedCourse.purchaseDate
        }
      }));

      // Mostrar mensaje de éxito
      alert(`¡Has adquirido exitosamente el curso "${cursoTitle}"!`);
      
      // Cambiar a la pestaña de cursos adquiridos
      const acquiredTab = document.getElementById('acquiredTab');
      if (acquiredTab) {
        acquiredTab.click();
      }
    }
  }

  getDeadlineDate(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  updateAcquiredCoursesView() {
    const acquiredView = document.getElementById('acquiredView');
    if (!acquiredView) return;

    const cursoGrid = acquiredView.querySelector('.curso-grid');
    if (!cursoGrid) return;

    // Si no hay cursos adquiridos, mostrar mensaje
    if (this.purchasedCourses.length === 0) {
      cursoGrid.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-book"></i>
          <p>Aún no has adquirido ningún curso.</p>
          <p>Explora nuestro catálogo y adquiere tu primer curso.</p>
        </div>
      `;
      return;
    }

    // Mostrar cursos adquiridos
    cursoGrid.innerHTML = this.purchasedCourses.map(course => {
      // Formatear fecha límite para mostrar
      const deadlineDate = new Date(course.deadlineToSchedule);
      const formattedDeadline = deadlineDate.toLocaleDateString();

      return `
        <div class="curso-card" data-course-id="${course.id}">
          <h3>${course.title}</h3>
          <p>Estado: ${course.status}</p>
          <p class="deadline">Fecha límite para agendar: ${formattedDeadline}</p>
          <select class="schedule-dropdown">
            <option>Seleccionar horario para workshop</option>
            <option>Mañana 9:00 AM</option>
            <option>Tarde 2:00 PM</option>
          </select>
          <div class="curso-details">
            <table class="participants-table">
              <thead>
                <tr>
                  <th>Participante</th>
                  <th>Progreso</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                ${course.participants.length > 0 ? 
                  course.participants.map(participant => `
                    <tr>
                      <td>${participant.name}</td>
                      <td>${participant.progress}%</td>
                      <td>${participant.status}</td>
                    </tr>
                  `).join('') : 
                  `<tr><td colspan="3">No hay participantes registrados</td></tr>`
                }
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Inicializar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = obtenerUsuarioActual();
  if (currentUser && currentUser.tipoPerfil === 'empresa') {
    // Inicializar el gestor de cursos
    window.cursoManager = new CursoManager(currentUser.correo);
  }
});