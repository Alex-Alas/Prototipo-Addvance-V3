/**
 * Script para crear usuarios de ejemplo en el sistema
 * Este script crea tres usuarios de prueba: empresa, proveedor y empleado
 */

// Función para crear usuarios de ejemplo
function crearUsuariosEjemplo() {
  // Limpiar localStorage para evitar duplicados
  localStorage.removeItem('usuarios');
  localStorage.removeItem('notificaciones');
  localStorage.removeItem('mensajes');
  
  // Inicializar localStorage
  initializeLocalStorage();
  
  // Crear usuarios de ejemplo
  const usuarios = [
    {
      nombre: 'Empresa ABC',
      correo: 'empresa@ejemplo.com',
      contrasena: 'empresa123',
      tipoPerfil: 'empresa',
      descripcion: 'Empresa dedicada a servicios tecnológicos'
    },
    {
      nombre: 'Proveedor XYZ',
      correo: 'proveedor@ejemplo.com',
      contrasena: 'proveedor123',
      tipoPerfil: 'proveedor',
      descripcion: 'Proveedor de servicios de capacitación'
    },
    {
      nombre: 'Juan Pérez',
      correo: 'empleado@ejemplo.com',
      contrasena: 'empleado123',
      tipoPerfil: 'empleado',
      descripcion: 'Empleado del departamento de TI'
    }
  ];
  
  // Registrar cada usuario
  const resultados = [];
  usuarios.forEach(usuario => {
    const resultado = registrarUsuario(
      usuario.nombre,
      usuario.correo,
      usuario.contrasena,
      usuario.tipoPerfil,
      usuario.descripcion
    );
    
    resultados.push({
      usuario,
      resultado
    });
  });
  
  return resultados;
}

// Función para verificar si un usuario puede iniciar sesión
function verificarInicioSesion(correo, contrasena) {
  return iniciarSesion(correo, contrasena);
}

// Función para obtener todos los usuarios registrados
function obtenerTodosLosUsuarios() {
  return JSON.parse(localStorage.getItem('usuarios')) || [];
}