/**
 * Assigned Courses Display
 * Handles the display of courses assigned to an employee in the 'Busqueda' tab
 */

const AssignedCoursesDisplay = {
  /**
   * Initialize the assigned courses display
   */
  init() {
    console.log('AssignedCoursesDisplay initialized');
    this.searchView = document.getElementById('empleadoSearchView');
    
    if (this.searchView) {
      // Create a container for assigned courses if it doesn't exist
      if (!document.getElementById('assignedCoursesContainer')) {
        const assignedCoursesContainer = document.createElement('div');
        assignedCoursesContainer.id = 'assignedCoursesContainer';
        assignedCoursesContainer.className = 'assigned-courses-container';
        
        // Add a heading for the assigned courses section
        const heading = document.createElement('h3');
        heading.textContent = 'Cursos Asignados';
        heading.className = 'assigned-courses-heading';
        
        // Insert the heading and container after the search bar
        const searchContainer = this.searchView.querySelector('.search-container');
        if (searchContainer) {
          searchContainer.after(heading);
          heading.after(assignedCoursesContainer);
        } else {
          // If search container not found, add at the beginning of search view
          this.searchView.prepend(heading);
          heading.after(assignedCoursesContainer);
        }
      }
      
      // Load and display assigned courses
      this.loadAssignedCourses();
    }
  },
  
  /**
   * Load assigned courses for the current employee
   */
  loadAssignedCourses() {
    const assignedCoursesContainer = document.getElementById('assignedCoursesContainer');
    if (!assignedCoursesContainer) return;
    
    // Clear existing content
    assignedCoursesContainer.innerHTML = '';
    
    // Get current user (employee) information
    const currentUser = this.getCurrentUser();
    const currentEmployeeId = currentUser ? currentUser.correo : 'empleado-ejemplo';
    
    // Get assigned courses from multiple sources to ensure data consistency
    let assignedCourseIds = [];
    
    // 1. Check employee_course_assignments
    const assignments = JSON.parse(localStorage.getItem('employee_course_assignments') || '{}');
    if (assignments[currentEmployeeId]) {
      assignedCourseIds = assignments[currentEmployeeId].map(a => a.courseId);
    }
    
    // 2. Check employee's data structure
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const employeeData = usuarios.find(u => u.correo === currentEmployeeId && u.tipoPerfil === 'empleado');
    if (employeeData && employeeData.datosAdicionales && employeeData.datosAdicionales.cursosAsignados) {
      // Merge with existing IDs (avoiding duplicates)
      employeeData.datosAdicionales.cursosAsignados.forEach(id => {
        if (!assignedCourseIds.includes(id)) {
          assignedCourseIds.push(id);
        }
      });
    }
    
    // 3. Check employeeAssignments
    const employeeAssignments = JSON.parse(localStorage.getItem('employeeAssignments') || '{}');
    if (employeeAssignments[currentEmployeeId]) {
      employeeAssignments[currentEmployeeId].forEach(assignment => {
        if (!assignedCourseIds.includes(assignment.courseId)) {
          assignedCourseIds.push(assignment.courseId);
        }
      });
    }
    
    // If no assigned courses found
    if (assignedCourseIds.length === 0) {
      assignedCoursesContainer.innerHTML = '<p class="no-courses-message">No tienes cursos asignados actualmente.</p>';
      return;
    }
    
    // Create a grid container for the courses
    const coursesGrid = document.createElement('div');
    coursesGrid.className = 'assigned-courses-grid';
    assignedCoursesContainer.appendChild(coursesGrid);
    
    // Display courses from IDs
    assignedCourseIds.forEach(courseId => {
      // Find course details from coursesDatabase
      const courseDetails = window.coursesDatabase?.find(c => c.id === courseId);
      if (!courseDetails) return;
      
      // Get progress information if available
      let progress = 0;
      if (employeeAssignments[currentEmployeeId]) {
        const assignment = employeeAssignments[currentEmployeeId].find(a => a.courseId === courseId);
        if (assignment) {
          progress = assignment.progress || 0;
        }
      }
      
      // Create course card
      const courseCard = document.createElement('div');
      courseCard.className = 'curso-visual-empleado';
      courseCard.dataset.courseId = courseId;
      
      courseCard.innerHTML = `
        <div class="curso-header">
          <h3>${courseDetails.title}</h3>
        </div>
        <div class="curso-time">
          <i class="fas fa-clock"></i>
          <span>Duración: ${courseDetails.duration}</span>
        </div>
        <div class="curso-summary">
          <p>${courseDetails.description}</p>
        </div>
        <button class="comenzar-curso-btn">Comenzar curso</button>
      `;
      
      coursesGrid.appendChild(courseCard);
      
      // Add event listener to the button
      const comenzarBtn = courseCard.querySelector('.comenzar-curso-btn');
      if (comenzarBtn) {
        comenzarBtn.addEventListener('click', () => {
          this.startCourse(courseId);
        });
      }
    });
  },
  
  /**
   * Start a course when the user clicks the 'Comenzar curso' button
   * @param {string} courseId - The ID of the course to start
   */
  startCourse(courseId) {
    // Get current user information
    const currentUser = this.getCurrentUser();
    const currentEmployeeId = currentUser ? currentUser.correo : 'empleado-ejemplo';
    
    // Get course details
    const courseDetails = window.coursesDatabase?.find(c => c.id === courseId);
    if (!courseDetails) {
      console.error('Course details not found for ID:', courseId);
      return;
    }
    
    // 1. Update course status to 'active' if not already
    const employeeAssignments = JSON.parse(localStorage.getItem('employeeAssignments') || '{}');
    if (!employeeAssignments[currentEmployeeId]) {
      employeeAssignments[currentEmployeeId] = [];
    }
    
    let assignmentIndex = employeeAssignments[currentEmployeeId].findIndex(a => a.courseId === courseId);
    if (assignmentIndex !== -1) {
      employeeAssignments[currentEmployeeId][assignmentIndex].status = 'active';
    } else {
      // Create a new assignment if it doesn't exist
      employeeAssignments[currentEmployeeId].push({
        courseId: courseId,
        status: 'active',
        progress: 0,
        startDate: new Date().toISOString(),
        lastAccessDate: new Date().toISOString()
      });
    }
    localStorage.setItem('employeeAssignments', JSON.stringify(employeeAssignments));
    
    // 2. Create or update the course in the 'Mis Cursos' tab
    this.createOrUpdateCourseInAcquiredTab(courseId, courseDetails);
    
    // 3. Switch to the 'Mis Cursos' tab
    const acquiredTab = document.getElementById('empleadoAcquiredTab');
    if (acquiredTab) {
      acquiredTab.click();
    }
    
    // 4. Dispatch course started event to notify other components
    document.dispatchEvent(new CustomEvent('courseStarted', {
      detail: {
        employeeId: currentEmployeeId,
        courseId: courseId
      }
    }));
  },
  
  /**
   * Get current user information
   * @returns {Object|null} - The current user data or null
   */
  getCurrentUser() {
    // Try to get from a global function if available
    if (typeof obtenerUsuarioActual === 'function') {
      return obtenerUsuarioActual();
    }

    // Try to get from localStorage
    const currentUserData = localStorage.getItem('currentUser');
    if (currentUserData) {
      try {
        return JSON.parse(currentUserData);
      } catch (e) {
        console.error('Error parsing current user data:', e);
      }
    }

    return null;
  },
  
  /**
   * Create or update a course card in the 'Mis Cursos' tab
   * @param {string} courseId - The ID of the course
   * @param {Object} courseDetails - The course details object
   */
  createOrUpdateCourseInAcquiredTab(courseId, courseDetails) {
    // Get the employee courses list container
    const employeeCoursesList = document.getElementById('employeeCoursesList');
    if (!employeeCoursesList) {
      console.error('Employee courses list container not found');
      return;
    }
    
    // Get current user information
    const currentUser = this.getCurrentUser();
    const currentEmployeeId = currentUser ? currentUser.correo : 'empleado-ejemplo';
    
    // Get progress information if available
    let progress = 0;
    const employeeAssignments = JSON.parse(localStorage.getItem('employeeAssignments') || '{}');
    if (employeeAssignments[currentEmployeeId]) {
      const assignment = employeeAssignments[currentEmployeeId].find(a => a.courseId === courseId);
      if (assignment) {
        progress = assignment.progress || 0;
      }
    }
    
    // Check if the course card already exists
    let courseCard = employeeCoursesList.querySelector(`.curso-empleado[data-course-id="${courseId}"]`);
    
    // If the course card doesn't exist, create it
    if (!courseCard) {
      // Remove 'no courses' message if it exists
      const noCoursesMessage = employeeCoursesList.querySelector('.no-courses-message');
      if (noCoursesMessage) {
        noCoursesMessage.remove();
      }
      
      // Create new course card
      courseCard = document.createElement('div');
      courseCard.className = 'curso-empleado';
      courseCard.dataset.courseId = courseId;
      employeeCoursesList.appendChild(courseCard);
    }
    
    // Update the course card content
    courseCard.innerHTML = `
      <div class="curso-empleado-card">
        <h3>${courseDetails.title}</h3>
        <p>Duración: ${courseDetails.duration}</p>
        <p>${courseDetails.description}</p>
        <div class="progress-bar">
          <div class="progress" style="width: ${progress}%"></div>
        </div>
        <p>${progress}% completado</p>
        <button class="continue-btn">Continuar curso</button>
      </div>
    `;
    
    // Add event listener to the continue button
    const continueBtn = courseCard.querySelector('.continue-btn');
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        // Handle continue course logic
        this.continueCourse(courseId);
      });
    }
  },
  
  /**
   * Continue a course when the user clicks the 'Continuar curso' button
   * @param {string} courseId - The ID of the course to continue
   */
  continueCourse(courseId) {
    // Get current user information
    const currentUser = this.getCurrentUser();
    const currentEmployeeId = currentUser ? currentUser.correo : 'empleado-ejemplo';
    
    // Update last access date
    const employeeAssignments = JSON.parse(localStorage.getItem('employeeAssignments') || '{}');
    if (employeeAssignments[currentEmployeeId]) {
      const assignmentIndex = employeeAssignments[currentEmployeeId].findIndex(a => a.courseId === courseId);
      if (assignmentIndex !== -1) {
        employeeAssignments[currentEmployeeId][assignmentIndex].lastAccessDate = new Date().toISOString();
        localStorage.setItem('employeeAssignments', JSON.stringify(employeeAssignments));
      }
    }
    
    // Dispatch course continued event
    document.dispatchEvent(new CustomEvent('courseContinued', {
      detail: {
        employeeId: currentEmployeeId,
        courseId: courseId
      }
    }));
    
    // TODO: Implement course content display logic
    console.log(`Continuing course ${courseId}`);
    alert('Funcionalidad en desarrollo: Visualización del contenido del curso');
  }
};

// Initialize the assigned courses display when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  AssignedCoursesDisplay.init();
});