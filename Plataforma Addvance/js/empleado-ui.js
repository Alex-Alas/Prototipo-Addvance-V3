// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get current user
  const usuarioActual = obtenerUsuarioActual();
  if (!usuarioActual) {
    window.location.href = 'auth.html';
    return;
  }
  
  // Initialize menu system
  const empleadoMenu = new MenuSystem('empleadoMenu', {
    defaultSection: 'journeySection'
  });
  
  // Add menu items
  empleadoMenu
    .addMenuItem('empleadoPerfilOption', 'fa-user', 'Perfil', 'perfilSection')
    .addMenuItem('empleadoJourneyOption', 'fa-road', 'Journey', 'journeySection', true)
    .addMenuItem('empleadoRankingOption', 'fa-trophy', 'Ranking', 'rankingSection')
    .addMenuItem('empleadoMensajesOption', 'fa-envelope', 'Mensajes', 'mensajesSection');
  
  // Register sections with initialization callbacks
  empleadoMenu
    .registerSection('perfilSection', initPerfilSection)
    .registerSection('journeySection', initJourneySection)
    .registerSection('rankingSection', initRankingSection)
    .registerSection('mensajesSection', initMensajesSection);
  
  // Start the menu system
  empleadoMenu.start();
  
  // Section initialization functions
  function initPerfilSection() {
    console.log('Initializing perfil section');
    // Load user profile data
    cargarDatosPerfil(usuarioActual);
  }
  
  function initJourneySection() {
    console.log('Initializing journey section');
    // Load journey data
    cargarJourney(usuarioActual);
  }
  
  function initRankingSection() {
    console.log('Initializing ranking section');
    // Load ranking data
    cargarRanking();
  }
  
  function initMensajesSection() {
    console.log('Initializing mensajes section');
    // Load messages
    cargarMensajes(usuarioActual.correo);
  }
});