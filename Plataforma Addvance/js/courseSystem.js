/**
 * Sistema de Gestión de Cursos para Plataforma Addvance
 * 
 * Este módulo implementa un sistema completo para:
 * 1. Almacenar información de cursos disponibles
 * 2. Permitir a empresas acceder a la información de cursos
 * 3. Gestionar la adquisición de cursos y asignación a empleados
 * 4. Controlar el acceso a cursos según el perfil de usuario
 */

// Importar datos de cursos y funciones de utilidad
import { courseData, getCourseById, getModuleById, getLessonById, getQuizById, getFinalTestById } from '../courseData.js';

class CourseSystem {
  constructor() {
    // Inicializar el sistema
    this.initializeStorage();
  }

  /**
   * Inicializa el almacenamiento local si no existe
   */
  initializeStorage() {
    // Verificar si existe el almacenamiento de cursos
    if (!localStorage.getItem('available_courses')) {
      localStorage.setItem('available_courses', JSON.stringify(courseData.courses));
    }

    // Verificar si existe el almacenamiento de cursos adquiridos por empresas
    if (!localStorage.getItem('company_courses')) {
      localStorage.setItem('company_courses', JSON.stringify({}));
    }

    // Verificar si existe el almacenamiento de asignaciones de cursos a empleados
    if (!localStorage.getItem('employee_course_assignments')) {
      localStorage.setItem('employee_course_assignments', JSON.stringify({}));
    }

    // Verificar si existe el almacenamiento de progreso de cursos por empleado
    if (!localStorage.getItem('employee_course_progress')) {
      localStorage.setItem('employee_course_progress', JSON.stringify({}));
    }
  }

  /**
   * Obtiene todos los cursos disponibles en el sistema
   * @returns {Array} Lista de cursos disponibles
   */
  getAllCourses() {
    return JSON.parse(localStorage.getItem('available_courses')) || [];
  }

  /**
   * Obtiene cursos filtrados por categoría
   * @param {string} category - Categoría para filtrar los cursos
   * @returns {Array} Lista de cursos filtrados
   */
  getCoursesByCategory(category) {
    const courses = this.getAllCourses();
    return category ? courses.filter(course => course.category === category) : courses;
  }

  /**
   * Obtiene un curso específico por su ID
   * @param {string} courseId - ID del curso a buscar
   * @returns {Object|null} Curso encontrado o null si no existe
   */
  getCourse(courseId) {
    const courses = this.getAllCourses();
    return courses.find(course => course.id === courseId) || null;
  }

  /**
   * Registra la adquisición de un curso por parte de una empresa
   * @param {string} companyEmail - Email de la empresa que adquiere el curso
   * @param {string} courseId - ID del curso adquirido
   * @returns {Object} Resultado de la operación
   */
  purchaseCourse(companyEmail, courseId) {
    // Verificar si el curso existe
    const course = this.getCourse(courseId);
    if (!course) {
      return {
        success: false,
        message: 'El curso no existe'
      };
    }

    // Obtener cursos adquiridos por empresas
    const companyCourses = JSON.parse(localStorage.getItem('company_courses')) || {};
    
    // Inicializar array para la empresa si no existe
    if (!companyCourses[companyEmail]) {
      companyCourses[companyEmail] = [];
    }

    // Verificar si la empresa ya adquirió este curso
    if (companyCourses[companyEmail].some(c => c.courseId === courseId)) {
      return {
        success: false,
        message: 'La empresa ya ha adquirido este curso'
      };
    }

    // Registrar la adquisición del curso
    const purchasedCourse = {
      courseId,
      purchaseDate: new Date().toISOString(),
      status: 'active',
      assignedEmployees: [],
      deadlineToSchedule: this.getDeadlineDate(30) // 30 días para agendar
    };

    companyCourses[companyEmail].push(purchasedCourse);
    localStorage.setItem('company_courses', JSON.stringify(companyCourses));

    // Disparar evento de compra de curso para el sistema de logros
    document.dispatchEvent(new CustomEvent('coursePurchased', {
      detail: {
        courseId,
        companyEmail,
        purchaseDate: purchasedCourse.purchaseDate
      }
    }));

    return {
      success: true,
      message: 'Curso adquirido exitosamente',
      purchasedCourse
    };
  }

  /**
   * Obtiene los cursos adquiridos por una empresa
   * @param {string} companyEmail - Email de la empresa
   * @returns {Array} Lista de cursos adquiridos
   */
  getCompanyCourses(companyEmail) {
    const companyCourses = JSON.parse(localStorage.getItem('company_courses')) || {};
    return companyCourses[companyEmail] || [];
  }

  /**
   * Asigna un curso adquirido a un empleado
   * @param {string} companyEmail - Email de la empresa
   * @param {string} courseId - ID del curso
   * @param {string} employeeEmail - Email del empleado
   * @returns {Object} Resultado de la operación
   */
  assignCourseToEmployee(companyEmail, courseId, employeeEmail) {
    // Verificar si la empresa ha adquirido el curso
    const companyCourses = JSON.parse(localStorage.getItem('company_courses')) || {};
    const companyCoursesArray = companyCourses[companyEmail] || [];
    const courseIndex = companyCoursesArray.findIndex(c => c.courseId === courseId);

    if (courseIndex === -1) {
      return {
        success: false,
        message: 'La empresa no ha adquirido este curso'
      };
    }

    // Verificar si el empleado ya está asignado
    if (companyCoursesArray[courseIndex].assignedEmployees.includes(employeeEmail)) {
      return {
        success: false,
        message: 'El empleado ya está asignado a este curso'
      };
    }

    // Asignar el empleado al curso
    companyCoursesArray[courseIndex].assignedEmployees.push(employeeEmail);
    localStorage.setItem('company_courses', JSON.stringify(companyCourses));

    // Inicializar el progreso del empleado en el curso
    const employeeProgress = JSON.parse(localStorage.getItem('employee_course_progress')) || {};
    if (!employeeProgress[employeeEmail]) {
      employeeProgress[employeeEmail] = {};
    }

    employeeProgress[employeeEmail][courseId] = {
      progress: 0,
      startDate: new Date().toISOString(),
      lastAccessDate: new Date().toISOString(),
      status: 'assigned',
      completedModules: [],
      currentModule: null
    };

    localStorage.setItem('employee_course_progress', JSON.stringify(employeeProgress));

    // Registrar la asignación en el sistema
    const assignments = JSON.parse(localStorage.getItem('employee_course_assignments')) || {};
    if (!assignments[employeeEmail]) {
      assignments[employeeEmail] = [];
    }

    assignments[employeeEmail].push({
      courseId,
      companyEmail,
      assignmentDate: new Date().toISOString(),
      status: 'assigned',
      started: false // Add started boolean property that's false by default
    });

    localStorage.setItem('employee_course_assignments', JSON.stringify(assignments));

    // Notificar al empleado
    const course = this.getCourse(courseId);
    if (course) {
      agregarNotificacion(employeeEmail, `Se te ha asignado el curso: ${course.title}`);
    }

    return {
      success: true,
      message: 'Curso asignado exitosamente al empleado'
    };
  }

  /**
   * Obtiene los cursos asignados a un empleado
   * @param {string} employeeEmail - Email del empleado
   * @returns {Array} Lista de cursos asignados
   */
  getEmployeeCourses(employeeEmail) {
    const assignments = JSON.parse(localStorage.getItem('employee_course_assignments')) || {};
    const employeeAssignments = assignments[employeeEmail] || [];
    
    // Obtener detalles completos de cada curso asignado
    return employeeAssignments.map(assignment => {
      const course = this.getCourse(assignment.courseId);
      const progress = this.getEmployeeCourseProgress(employeeEmail, assignment.courseId);
      
      return {
        ...assignment,
        courseDetails: course,
        progress
      };
    });
  }

  /**
   * Actualiza el progreso de un empleado en un curso
   * @param {string} employeeEmail - Email del empleado
   * @param {string} courseId - ID del curso
   * @param {number} progress - Porcentaje de progreso (0-100)
   * @param {string} moduleId - ID del módulo completado (opcional)
   * @returns {Object} Resultado de la operación
   */
  updateEmployeeProgress(employeeEmail, courseId, progress, moduleId = null) {
    const employeeProgress = JSON.parse(localStorage.getItem('employee_course_progress')) || {};
    
    // Verificar si el empleado tiene el curso asignado
    if (!employeeProgress[employeeEmail] || !employeeProgress[employeeEmail][courseId]) {
      return {
        success: false,
        message: 'El empleado no tiene este curso asignado'
      };
    }

    // Actualizar el progreso
    employeeProgress[employeeEmail][courseId].progress = progress;
    employeeProgress[employeeEmail][courseId].lastAccessDate = new Date().toISOString();
    
    // Si se completó un módulo, registrarlo
    if (moduleId && !employeeProgress[employeeEmail][courseId].completedModules.includes(moduleId)) {
      employeeProgress[employeeEmail][courseId].completedModules.push(moduleId);
    }

    // Si el progreso es 100%, marcar como completado
    if (progress >= 100) {
      employeeProgress[employeeEmail][courseId].status = 'completed';
      employeeProgress[employeeEmail][courseId].completionDate = new Date().toISOString();
      
      // Disparar evento de curso completado
      document.dispatchEvent(new CustomEvent('courseCompleted', {
        detail: {
          employeeEmail,
          courseId,
          completionDate: employeeProgress[employeeEmail][courseId].completionDate
        }
      }));
    }

    localStorage.setItem('employee_course_progress', JSON.stringify(employeeProgress));

    return {
      success: true,
      message: 'Progreso actualizado exitosamente'
    };
  }

  /**
   * Obtiene el progreso de un empleado en un curso específico
   * @param {string} employeeEmail - Email del empleado
   * @param {string} courseId - ID del curso
   * @returns {Object|null} Información de progreso o null si no existe
   */
  getEmployeeCourseProgress(employeeEmail, courseId) {
    const employeeProgress = JSON.parse(localStorage.getItem('employee_course_progress')) || {};
    return employeeProgress[employeeEmail] && employeeProgress[employeeEmail][courseId] 
      ? employeeProgress[employeeEmail][courseId] 
      : null;
  }

  /**
   * Verifica si un usuario tiene acceso a un curso específico
   * @param {Object} user - Objeto de usuario
   * @param {string} courseId - ID del curso
   * @returns {boolean} true si tiene acceso, false en caso contrario
   */
  hasAccessToCourse(user, courseId) {
    if (!user || !courseId) return false;

    // Si es administrador, tiene acceso a todos los cursos
    if (user.tipoPerfil === 'admin') return true;

    // Si es empresa, verificar si ha adquirido el curso
    if (user.tipoPerfil === 'empresa') {
      const companyCourses = this.getCompanyCourses(user.correo);
      return companyCourses.some(course => course.courseId === courseId);
    }

    // Si es empleado, verificar si tiene el curso asignado
    if (user.tipoPerfil === 'empleado') {
      const assignments = JSON.parse(localStorage.getItem('employee_course_assignments')) || {};
      const employeeAssignments = assignments[user.correo] || [];
      return employeeAssignments.some(assignment => assignment.courseId === courseId);
    }

    // Si es proveedor, verificar si es el creador del curso
    if (user.tipoPerfil === 'proveedor') {
      const course = this.getCourse(courseId);
      return course && course.providerEmail === user.correo;
    }

    return false;
  }

  /**
   * Obtiene una fecha límite a partir de la fecha actual
   * @param {number} daysFromNow - Número de días a partir de hoy
   * @returns {string} Fecha en formato ISO
   */
  getDeadlineDate(daysFromNow) {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString();
  }

  /**
   * Agrega un nuevo curso al sistema
   * @param {Object} courseData - Datos del nuevo curso
   * @returns {Object} Resultado de la operación
   */
  addCourse(courseData) {
    if (!courseData || !courseData.title || !courseData.description) {
      return {
        success: false,
        message: 'Datos del curso incompletos'
      };
    }

    // Generar ID único para el curso
    const courseId = 'C' + Date.now();
    const newCourse = {
      id: courseId,
      ...courseData,
      creationDate: new Date().toISOString()
    };

    // Agregar el curso a la lista de cursos disponibles
    const availableCourses = this.getAllCourses();
    availableCourses.push(newCourse);
    localStorage.setItem('available_courses', JSON.stringify(availableCourses));

    return {
      success: true,
      message: 'Curso agregado exitosamente',
      courseId
    };
  }
}

// Exportar la clase CourseSystem
export default CourseSystem;