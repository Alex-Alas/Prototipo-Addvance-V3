/**
 * Curso Progress Tracker
 * Manages the progress tracking for courses in the Empresa view
 */

const CursoProgressTracker = {
  /**
   * Initialize the progress tracker
   */
  init() {
    console.log('CursoProgressTracker initialized');
    this.updateAllCourseProgress();
    this.setupEventListeners();
  },

  /**
   * Set up event listeners for progress updates
   */
  setupEventListeners() {
    // Listen for module completion events
    document.addEventListener('moduleCompleted', (event) => {
      const { employeeId, courseId } = event.detail;
      this.updateCourseProgress(courseId);
      this.updateEmployeeProgressInTable(employeeId, courseId);
    });

    // Listen for quiz completion events
    document.addEventListener('quizCompleted', (event) => {
      const { employeeId, courseId } = event.detail;
      this.updateCourseProgress(courseId);
      this.updateEmployeeProgressInTable(employeeId, courseId);
    });

    // Listen for final test completion events
    document.addEventListener('finalTestCompleted', (event) => {
      const { employeeId, courseId } = event.detail;
      this.updateCourseProgress(courseId);
      this.updateEmployeeProgressInTable(employeeId, courseId);
    });

    // Listen for employee assignment events
    document.addEventListener('employeeAssigned', (event) => {
      const { courseId, employeeId } = event.detail;
      this.updateCourseProgress(courseId);
      this.updateEmployeeProgressInTable(employeeId, courseId);
    });
    
    // Listen for course start events
    document.addEventListener('courseStarted', (event) => {
      const { employeeId, courseId } = event.detail;
      this.updateEmployeeStatusInTable(employeeId, courseId, 'Activo');
    });
    
    // Listen for course completion events
    document.addEventListener('courseCompleted', (event) => {
      const { employeeId, courseId } = event.detail;
      this.updateEmployeeStatusInTable(employeeId, courseId, 'Completado');
    });
  },

  /**
   * Update progress for all acquired courses
   */
  updateAllCourseProgress() {
    const courseCards = document.querySelectorAll('.curso-adquirido-empresa');
    courseCards.forEach(card => {
      const courseId = card.getAttribute('data-course-id');
      if (courseId) {
        this.updateCourseProgress(courseId, card);
      }
    });
  },

  /**
   * Update progress for a specific course
   * @param {string} courseId - The ID of the course to update
   * @param {HTMLElement} [courseCard] - Optional course card element (will be found if not provided)
   */
  updateCourseProgress(courseId, courseCard) {
    // Find the course card if not provided
    if (!courseCard) {
      courseCard = document.querySelector(`.curso-adquirido-empresa[data-course-id="${courseId}"]`);
      if (!courseCard) return;
    }

    // Get course data
    const course = this.getCourseById(courseId);
    if (!course) return;

    // Get assigned employees for this course
    const assignedEmployees = this.getAssignedEmployees(courseId);
    if (!assignedEmployees || assignedEmployees.length === 0) {
      this.updateProgressDisplay(courseCard, 0, 0);
      return;
    }

    // Calculate total possible points
    const complecionDeCurso = course.complecionDeCurso || this.calculateComplecionDeCurso(course);
    const totalPoints = complecionDeCurso * assignedEmployees.length;

    // Calculate sum of completed points
    const sumPoints = this.calculateSumPoints(courseId, assignedEmployees);

    // Update the progress display
    this.updateProgressDisplay(courseCard, sumPoints, totalPoints);
  },

  /**
   * Get course data by ID
   * @param {string} courseId - The ID of the course
   * @returns {Object|null} - The course data or null if not found
   */
  getCourseById(courseId) {
    if (!window.coursesDatabase) return null;
    return window.coursesDatabase.find(course => course.id === courseId) || null;
  },

  /**
   * Calculate complecionDeCurso value for a course if not already defined
   * @param {Object} course - The course data
   * @returns {number} - The complecionDeCurso value
   */
  calculateComplecionDeCurso(course) {
    // Number of modules + 1 for final test
    return (course.modules ? course.modules.length : 0) + 1;
  },

  /**
   * Get assigned employees for a course
   * @param {string} courseId - The ID of the course
   * @returns {Array} - Array of assigned employee IDs
   */
  getAssignedEmployees(courseId) {
    // Get current company ID
    const currentUser = this.getCurrentUser();
    const companyId = currentUser ? currentUser.correo : 'empresa-ejemplo';

    // Check company data
    if (window.companiesData && window.companiesData[companyId]) {
      const acquiredCourse = window.companiesData[companyId].acquiredCourses.find(c => c.courseId === courseId);
      if (acquiredCourse && acquiredCourse.assignedEmployees) {
        return acquiredCourse.assignedEmployees;
      }
    }

    // Check localStorage for assignments
    const assignments = JSON.parse(localStorage.getItem('employee_course_assignments') || '{}');
    const assignedEmployees = [];

    // Collect all employees assigned to this course
    Object.keys(assignments).forEach(employeeId => {
      const employeeAssignments = assignments[employeeId] || [];
      if (employeeAssignments.some(a => a.courseId === courseId)) {
        assignedEmployees.push(employeeId);
      }
    });

    return assignedEmployees;
  },

  /**
   * Calculate sum of completed points for a course
   * @param {string} courseId - The ID of the course
   * @param {Array} assignedEmployees - Array of assigned employee IDs
   * @returns {number} - The sum of completed points
   */
  calculateSumPoints(courseId, assignedEmployees) {
    let sumPoints = 0;

    // Check each employee's progress
    assignedEmployees.forEach(employeeId => {
      // Check if employee data exists
      if (window.employeesData && window.employeesData[employeeId]) {
        const employeeProgress = window.employeesData[employeeId].courseProgress[courseId];
        if (employeeProgress) {
          // Count completed modules
          Object.values(employeeProgress.modules || {}).forEach(moduleProgress => {
            if (moduleProgress.status === 'Completado') {
              sumPoints++;
            }
          });

          // Check if final test is completed
          if (employeeProgress.finalTest && employeeProgress.finalTest.completed) {
            sumPoints++;
          }
        }
      }

      // Check localStorage for progress
      const progressData = JSON.parse(localStorage.getItem(`employee_progress_${employeeId}`) || '{}');
      const courseProgress = progressData[courseId] || {};

      // Count completed modules from localStorage
      if (courseProgress.completedModules) {
        sumPoints += courseProgress.completedModules.length;
      }

      // Check if final test is completed in localStorage
      if (courseProgress.finalTestCompleted) {
        sumPoints++;
      }
    });

    return sumPoints;
  },

  /**
   * Update the progress display in the course card
   * @param {HTMLElement} courseCard - The course card element
   * @param {number} sumPoints - The sum of completed points
   * @param {number} totalPoints - The total possible points
   */
  /**
   * Update the employee progress in the assignment table
   * @param {string} employeeId - The ID of the employee
   * @param {string} courseId - The ID of the course
   */
  updateEmployeeProgressInTable(employeeId, courseId) {
    // Find all course cards with this course ID
    const courseCards = document.querySelectorAll(`.curso-adquirido-empresa[data-course-id="${courseId}"]`);
    
    courseCards.forEach(courseCard => {
      // Find the employee row in the table
      const employeeRows = courseCard.querySelectorAll('.employee-row');
      let employeeRow = null;
      
      // Find the row for this employee
      for (let i = 0; i < employeeRows.length; i++) {
        const employeeName = employeeRows[i].querySelector('td:first-child').textContent;
        const employeeData = this.getEmployeeDataById(employeeId);
        
        if (employeeData && employeeName === employeeData.nombre) {
          employeeRow = employeeRows[i];
          break;
        }
      }
      
      if (!employeeRow) return;
      
      // Get the progress percentage
      const progress = this.getEmployeeProgress(employeeId, courseId);
      
      // Update the progress bar
      const progressBar = employeeRow.querySelector('.progress');
      const progressText = employeeRow.querySelector('.progress-text');
      
      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }
      
      if (progressText) {
        progressText.textContent = `${progress}%`;
      }
      
      // Update status based on progress
      if (progress === 100) {
        this.updateEmployeeStatusInTable(employeeId, courseId, 'Completado');
      }
    });
  },
  
  /**
   * Update the employee status in the assignment table
   * @param {string} employeeId - The ID of the employee
   * @param {string} courseId - The ID of the course
   * @param {string} status - The new status ('Inactivo', 'Activo', 'Completado')
   */
  updateEmployeeStatusInTable(employeeId, courseId, status) {
    // Find all course cards with this course ID
    const courseCards = document.querySelectorAll(`.curso-adquirido-empresa[data-course-id="${courseId}"]`);
    
    courseCards.forEach(courseCard => {
      // Find the employee row in the table
      const employeeRows = courseCard.querySelectorAll('.employee-row');
      let employeeRow = null;
      
      // Find the row for this employee
      for (let i = 0; i < employeeRows.length; i++) {
        const employeeName = employeeRows[i].querySelector('td:first-child').textContent;
        const employeeData = this.getEmployeeDataById(employeeId);
        
        if (employeeData && employeeName === employeeData.nombre) {
          employeeRow = employeeRows[i];
          break;
        }
      }
      
      if (!employeeRow) return;
      
      // Update the status cell
      const statusCell = employeeRow.querySelector('td:last-child');
      if (statusCell) {
        statusCell.textContent = status;
        
        // Add status-specific styling
        statusCell.className = '';
        if (status === 'Activo') {
          statusCell.classList.add('status-active');
        } else if (status === 'Completado') {
          statusCell.classList.add('status-completed');
        } else {
          statusCell.classList.add('status-inactive');
        }
      }
    });
  },
  
  /**
   * Get employee data by ID
   * @param {string} employeeId - The ID of the employee
   * @returns {Object|null} - The employee data or null if not found
   */
  getEmployeeDataById(employeeId) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.find(u => u.correo === employeeId && u.tipoPerfil === 'empleado') || null;
  },
  
  /**
   * Get employee progress for a course
   * @param {string} employeeId - The ID of the employee
   * @param {string} courseId - The ID of the course
   * @returns {number} - The progress percentage (0-100)
   */
  getEmployeeProgress(employeeId, courseId) {
    // Check localStorage for progress
    const progressData = JSON.parse(localStorage.getItem(`employee_progress_${employeeId}`) || '{}');
    const courseProgress = progressData[courseId] || {};
    
    if (courseProgress.progress !== undefined) {
      return courseProgress.progress;
    }
    
    // Check employee assignments
    const employeeAssignments = JSON.parse(localStorage.getItem('employeeAssignments') || '{}');
    if (employeeAssignments[employeeId]) {
      const assignment = employeeAssignments[employeeId].find(a => a.courseId === courseId);
      if (assignment && assignment.progress !== undefined) {
        return assignment.progress;
      }
    }
    
    // Check employee course progress
    const employeeProgress = JSON.parse(localStorage.getItem('employee_course_progress')) || {};
    if (employeeProgress[employeeId] && employeeProgress[employeeId][courseId]) {
      return employeeProgress[employeeId][courseId].progress || 0;
    }
    
    return 0;
  },
  
  updateProgressDisplay(courseCard, sumPoints, totalPoints) {
    const progressBar = courseCard.querySelector('.progress');
    const progressText = courseCard.querySelector('.progress-text');

    if (progressBar && progressText) {
      // Calculate percentage (avoid division by zero)
      const percentage = totalPoints > 0 ? (sumPoints / totalPoints) * 100 : 0;
      
      // Update progress bar width
      progressBar.style.width = `${percentage}%`;
      
      // Update progress text
      progressText.textContent = `${sumPoints}/${totalPoints}`;

      // Add color classes based on progress
      progressBar.className = 'progress';
      if (percentage >= 100) {
        progressBar.classList.add('progress-complete');
      } else if (percentage >= 50) {
        progressBar.classList.add('progress-good');
      } else if (percentage >= 25) {
        progressBar.classList.add('progress-medium');
      } else {
        progressBar.classList.add('progress-low');
      }
    }
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
  }
};

// Initialize the progress tracker when the document is ready
document.addEventListener('DOMContentLoaded', () => {
  CursoProgressTracker.init();
});