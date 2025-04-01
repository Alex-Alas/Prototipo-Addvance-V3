/**
 * Empleado Navigation Functionality
 * Handles the navigation between different sections in the Empleado UI
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize empleado navigation
  initializeEmpleadoNavigation();
  // Initialize journey tabs navigation
  initializeJourneyTabs();
});

// Function to initialize empleado navigation
function initializeEmpleadoNavigation() {
  // Get menu option elements
  const perfilOption = document.getElementById('empleadoPerfilOption');
  const journeyOption = document.getElementById('empleadoJourneyOption');
  const rankingOption = document.getElementById('empleadoRankingOption');
  
  // Get section elements
  const perfilSection = document.getElementById('empleadoPerfilSection');
  const journeySection = document.getElementById('empleadoJourneySection');
  const rankingSection = document.getElementById('empleadoRankingSection');
  
  // Function to show a section and hide others
  function showSection(sectionToShow) {
    // Hide all sections first
    perfilSection.style.display = 'none';
    journeySection.style.display = 'none';
    rankingSection.style.display = 'none';
    
    // Show the selected section
    sectionToShow.style.display = 'block';
    
    // Remove active class from all menu options
    perfilOption.classList.remove('active');
    journeyOption.classList.remove('active');
    rankingOption.classList.remove('active');
  }
  
  // Add click event listeners to menu options
  if (perfilOption) {
    perfilOption.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(perfilSection);
      perfilOption.classList.add('active');
    });
  }
  
  if (journeyOption) {
    journeyOption.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(journeySection);
      journeyOption.classList.add('active');
    });
  }
  
  if (rankingOption) {
    rankingOption.addEventListener('click', function(e) {
      e.preventDefault();
      showSection(rankingSection);
      rankingOption.classList.add('active');
    });
  }
  
  // Show journey section by default
  showSection(journeySection);
  journeyOption.classList.add('active');
}

// Function to initialize journey tabs navigation
function initializeJourneyTabs() {
  // Get journey tab elements
  const searchTab = document.getElementById('empleadoSearchTab');
  const acquiredTab = document.getElementById('empleadoAcquiredTab');
  
  // Get journey view elements
  const searchView = document.getElementById('empleadoSearchView');
  const acquiredView = document.getElementById('empleadoAcquiredView');
  
  // Function to show a journey view and hide the other
  function showJourneyView(viewToShow, activeTab) {
    // Hide all views first
    searchView.style.display = 'none';
    acquiredView.style.display = 'none';
    
    // Show the selected view
    viewToShow.style.display = 'block';
    
    // Remove active class from all tabs
    searchTab.classList.remove('active');
    acquiredTab.classList.remove('active');
    
    // Add active class to the selected tab
    activeTab.classList.add('active');
  }
  
  // Add click event listeners to journey tabs
  if (searchTab) {
    searchTab.addEventListener('click', function(e) {
      e.preventDefault();
      showJourneyView(searchView, searchTab);
    });
  }
  
  if (acquiredTab) {
    acquiredTab.addEventListener('click', function(e) {
      e.preventDefault();
      showJourneyView(acquiredView, acquiredTab);
    });
  }
  
  // Initialize lesson and quiz functionality
  initializeLessonAndQuizFunctionality();
}

// Function to initialize lesson and quiz functionality
function initializeLessonAndQuizFunctionality() {
  // Get modal elements
  const lessonModal = document.getElementById('lessonModal');
  const quizModal = document.getElementById('quizModal');
  
  // Get lesson buttons
  const lessonButtons = document.querySelectorAll('.lesson-card:not(.quiz-card) .start-lesson-btn');
  const quizButtons = document.querySelectorAll('.quiz-card .start-lesson-btn');
  
  // Get close buttons
  const closeLessonBtn = document.getElementById('closeLessonBtn');
  const closeQuizBtn = document.getElementById('closeQuizBtn');
  
  // Add click event listeners to lesson buttons
  lessonButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Show lesson modal
      lessonModal.style.display = 'flex';
      
      // Get lesson title from parent card
      const lessonTitle = this.closest('.lesson-card').querySelector('h4').textContent;
      document.getElementById('lessonTitle').textContent = 'Lección: ' + lessonTitle;
      
      // Reset lesson progress
      document.querySelector('.lesson-progress-fill').style.width = '0%';
      document.getElementById('currentLevel').textContent = '1';
      
      // Hide complete button and enable/disable navigation buttons
      document.getElementById('completeLessonBtn').style.display = 'none';
      document.getElementById('prevLevelBtn').disabled = true;
      document.getElementById('nextLevelBtn').disabled = false;
    });
  });
  
  // Add click event listeners to quiz buttons
  quizButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Show quiz modal
      quizModal.style.display = 'flex';
      
      // Get module number from parent card
      const moduleNumber = this.closest('.quiz-card').dataset.module;
      document.getElementById('quizTitle').textContent = 'Cuestionario: Módulo ' + moduleNumber;
      
      // Generate sample quiz questions (in a real app, these would come from a database)
      const quizQuestionsContainer = document.getElementById('quizQuestions');
      quizQuestionsContainer.innerHTML = '';
      
      // Add sample questions
      for (let i = 1; i <= 3; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
          <p>Pregunta ${i}: ¿Esta es una pregunta de ejemplo para el módulo ${moduleNumber}?</p>
          <div class="quiz-options">
            <label><input type="radio" name="q${i}" value="a"> Opción A</label>
            <label><input type="radio" name="q${i}" value="b"> Opción B</label>
            <label><input type="radio" name="q${i}" value="c"> Opción C</label>
          </div>
        `;
        quizQuestionsContainer.appendChild(questionDiv);
      }
    });
  });
  
  // Add click event listeners to close buttons
  if (closeLessonBtn) {
    closeLessonBtn.addEventListener('click', function() {
      lessonModal.style.display = 'none';
    });
  }
  
  if (closeQuizBtn) {
    closeQuizBtn.addEventListener('click', function() {
      quizModal.style.display = 'none';
    });
  }
  
  // Add click event listener to submit quiz button
  const submitQuizBtn = document.getElementById('submitQuizBtn');
  if (submitQuizBtn) {
    submitQuizBtn.addEventListener('click', function() {
      alert('¡Cuestionario enviado con éxito!');
      quizModal.style.display = 'none';
    });
  }
  
  // Add click event listeners to lesson navigation buttons
  const prevLevelBtn = document.getElementById('prevLevelBtn');
  const nextLevelBtn = document.getElementById('nextLevelBtn');
  const completeLessonBtn = document.getElementById('completeLessonBtn');
  
  let currentLevel = 1;
  const totalLevels = 4; // Assuming 4 levels per lesson
  
  if (prevLevelBtn) {
    prevLevelBtn.addEventListener('click', function() {
      if (currentLevel > 1) {
        currentLevel--;
        updateLessonProgress();
      }
    });
  }
  
  if (nextLevelBtn) {
    nextLevelBtn.addEventListener('click', function() {
      if (currentLevel < totalLevels) {
        currentLevel++;
        updateLessonProgress();
      }
    });
  }
  
  if (completeLessonBtn) {
    completeLessonBtn.addEventListener('click', function() {
      alert('¡Lección completada con éxito!');
      lessonModal.style.display = 'none';
      
      // Update module progress
      const moduleProgress = document.querySelector('.module-progress-fill');
      moduleProgress.style.width = '100%';
    });
  }
  
  // Function to update lesson progress
  function updateLessonProgress() {
    // Update level indicator
    document.getElementById('currentLevel').textContent = currentLevel;
    
    // Update progress bar
    const progressPercentage = ((currentLevel - 1) / (totalLevels - 1)) * 100;
    document.querySelector('.lesson-progress-fill').style.width = progressPercentage + '%';
    
    // Update lesson content
    const lessonContent = document.getElementById('lessonContent');
    lessonContent.innerHTML = `<div class="lesson-level">
      <h4>Nivel ${currentLevel}</h4>
      <p>Este es el contenido de ejemplo para el nivel ${currentLevel} de la lección.</p>
      <p>En una aplicación real, aquí habría contenido educativo interactivo.</p>
    </div>`;
    
    // Enable/disable navigation buttons
    prevLevelBtn.disabled = (currentLevel === 1);
    nextLevelBtn.disabled = (currentLevel === totalLevels);
    
    // Show/hide complete button
    completeLessonBtn.style.display = (currentLevel === totalLevels) ? 'block' : 'none';
  }
}