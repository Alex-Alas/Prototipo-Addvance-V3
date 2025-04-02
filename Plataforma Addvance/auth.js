/**
 * Authentication and User Management System
 * Handles user registration, login, and data storage using localStorage
 */

// Function to generate a unique 5-character code
function generarCodigoUnico() {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let codigo;
  let esUnico = false;
  
  while (!esUnico) {
    codigo = '';
    for (let i = 0; i < 5; i++) {
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    // Check if code is unique among empresa users
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    esUnico = !usuarios.some(usuario => 
      usuario.tipoPerfil === 'empresa' && 
      usuario.datosAdicionales.codigoUnico === codigo
    );
  }
  
  return codigo;
}

// Initialize localStorage if it doesn't exist
function initializeLocalStorage() {
  // Verificar si existen los usuarios de ejemplo
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const tieneUsuariosEjemplo = usuarios.some(u => 
    u.correo === "empresa@ejemplo.com" || 
    u.correo === "proveedor@ejemplo.com" || 
    u.correo === "empleado@ejemplo.com"
  );
  
  // Si no existen los usuarios de ejemplo, cargarlos
  if (!tieneUsuariosEjemplo) {
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify([]));
    }
    cargarUsuariosEjemplo();
  }
  
  if (!localStorage.getItem('notificaciones')) {
    localStorage.setItem('notificaciones', JSON.stringify([]));
  }
  if (!localStorage.getItem('mensajes')) {
    localStorage.setItem('mensajes', JSON.stringify([]));
  }
}

// Cargar usuarios de ejemplo para facilitar pruebas
function cargarUsuariosEjemplo() {
  // Usuario de tipo empresa
  const empresaEjemplo = {
    nombre: "Empresa ABC",
    correo: "empresa@ejemplo.com",
    contrasena: "empresa123",
    tipoPerfil: "empresa",
    datosAdicionales: {
      nit: "1234-567890-123-4",
      anoFundacion: "2010",
      sector: "tecnologia",
      tamano: "mediana",
      contacto: {
        nombre: "Juan Pérez",
        cargo: "Gerente General",
        telefono: "2222-3333"
      },
      direccion: "Calle Principal #123, San Salvador",
      sitioWeb: "www.empresaabc.com",
      descripcion: "Empresa dedicada al desarrollo de soluciones tecnológicas",
      intereses: "Innovación, Transformación digital",
      codigoUnico: "ABC12"
    },
    primerInicio: false,
    fechaRegistro: new Date().toISOString()
  };
  
  // Usuario de tipo proveedor
  const proveedorEjemplo = {
    nombre: "Consultores XYZ",
    correo: "proveedor@ejemplo.com",
    contrasena: "proveedor123",
    tipoPerfil: "proveedor",
    datosAdicionales: {
      nit: "9876-543210-987-6",
      tipo: "consultoria",
      especialidad: "Desarrollo web y móvil",
      tamano: "pequena",
      contacto: {
        nombre: "María Rodríguez",
        cargo: "Directora de Proyectos",
        telefono: "7777-8888"
      },
      direccion: "Avenida Central #456, San Salvador",
      sitioWeb: "www.consultoresxyz.com",
      servicios: "Desarrollo de aplicaciones, consultoría tecnológica, capacitaciones",
      experiencia: "Más de 10 años en el mercado tecnológico",
      clientes: "Empresas nacionales e internacionales",
      codigoUnico: null
    },
    primerInicio: false,
    fechaRegistro: new Date().toISOString()
  };
  
  // Usuario de tipo empleado
  const empleadoEjemplo = {
    nombre: "Carlos Gómez",
    correo: "empleado@ejemplo.com",
    contrasena: "empleado123",
    tipoPerfil: "empleado",
    datosAdicionales: {
      codigoEmpresa: "ABC12",
      cargo: "Desarrollador Senior",
      departamento: "Tecnología",
      telefono: "6666-5555",
      habilidades: "JavaScript, React, Node.js",
      biografia: "Desarrollador con 5 años de experiencia en aplicaciones web",
      codigoUnico: null,
      cursosAsignados: [] // Array para almacenar IDs de cursos asignados
    },
    primerInicio: false,
    fechaRegistro: new Date().toISOString()
  };
  
  // Obtener usuarios actuales
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Eliminar usuarios de ejemplo existentes para evitar duplicados
  const usuariosFiltrados = usuarios.filter(u => 
    u.correo !== "empresa@ejemplo.com" && 
    u.correo !== "proveedor@ejemplo.com" && 
    u.correo !== "empleado@ejemplo.com"
  );
  
  // Agregar los usuarios de ejemplo
  usuariosFiltrados.push(empresaEjemplo, proveedorEjemplo, empleadoEjemplo);
  localStorage.setItem('usuarios', JSON.stringify(usuariosFiltrados));
  
  // Inicializar notificaciones para los usuarios de ejemplo
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  
  // Eliminar notificaciones de usuarios de ejemplo existentes
  const notificacionesFiltradas = notificaciones.filter(n => 
    n.usuario !== "empresa@ejemplo.com" && 
    n.usuario !== "proveedor@ejemplo.com" && 
    n.usuario !== "empleado@ejemplo.com"
  );
  
  // Notificaciones para empresa
  notificacionesFiltradas.push({
    usuario: empresaEjemplo.correo,
    notificaciones: [{
      mensaje: `Bienvenido a Addvance, ${empresaEjemplo.nombre}!`,
      leida: true,
      fecha: new Date().toISOString()
    }]
  });
  
  // Notificaciones para proveedor
  notificacionesFiltradas.push({
    usuario: proveedorEjemplo.correo,
    notificaciones: [{
      mensaje: `Bienvenido a Addvance, ${proveedorEjemplo.nombre}!`,
      leida: true,
      fecha: new Date().toISOString()
    }]
  });
  
  // Notificaciones para empleado
  notificacionesFiltradas.push({
    usuario: empleadoEjemplo.correo,
    notificaciones: [{
      mensaje: `Bienvenido a Addvance, ${empleadoEjemplo.nombre}!`,
      leida: true,
      fecha: new Date().toISOString()
    }]
  });
  
  localStorage.setItem('notificaciones', JSON.stringify(notificacionesFiltradas));
  
  console.log('Usuarios de ejemplo cargados correctamente');
}

// Register a new user
function registrarUsuario(nombre, correo, contrasena, tipoPerfil, descripcion = '') {
  // Get existing users
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Check if email already exists
  const usuarioExistente = usuarios.find(usuario => usuario.correo === correo);
  if (usuarioExistente) {
    return {
      exito: false,
      mensaje: 'El correo ya está registrado'
    };
  }
  
  // Parse additional data if it's in JSON format
  let datosAdicionales = {};
  try {
    if (descripcion && descripcion.startsWith('{')) {
      datosAdicionales = JSON.parse(descripcion);
    }
  } catch (e) {
    // If parsing fails, use description as is
    datosAdicionales = { descripcionGeneral: descripcion };
  }
  
  // Create new user object
  const nuevoUsuario = {
    nombre,
    correo,
    contrasena, // Note: In a real app, this should be hashed
    tipoPerfil,
    datosAdicionales: {
      ...datosAdicionales,
      codigoUnico: tipoPerfil === 'empresa' ? generarCodigoUnico() : null,
      // Add cursosAsignados array for employees
      ...(tipoPerfil === 'empleado' ? { cursosAsignados: [] } : {})
    },
    primerInicio: true,
    fechaRegistro: new Date().toISOString()
  };
  
  // Add to users array and save
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
  // Initialize notifications for the user
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  notificaciones.push({
    usuario: correo,
    notificaciones: [{
      mensaje: `Bienvenido a Addvance, ${nombre}!`,
      leida: false,
      fecha: new Date().toISOString()
    }]
  });
  localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
  
  return {
    exito: true,
    mensaje: 'Usuario registrado exitosamente',
    usuario: nuevoUsuario
  };
}

// Login user
function iniciarSesion(correo, contrasena) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Find user with matching credentials
  const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);
  
  if (!usuario) {
    return {
      exito: false,
      mensaje: 'Credenciales incorrectas'
    };
  }
  
  // Set current user in session
  sessionStorage.setItem('usuarioActual', JSON.stringify(usuario));
  
  // Check if it's first login
  const esPrimerInicio = usuario.primerInicio;
  
  // If it's first login, update the flag
  if (esPrimerInicio) {
    const usuariosActualizados = usuarios.map(u => {
      if (u.correo === correo) {
        return { ...u, primerInicio: false };
      }
      return u;
    });
    
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  }
  
  return {
    exito: true,
    mensaje: 'Inicio de sesión exitoso',
    usuario,
    esPrimerInicio
  };
}

// Logout user
function cerrarSesion() {
  sessionStorage.removeItem('usuarioActual');
  return {
    exito: true,
    mensaje: 'Sesión cerrada exitosamente'
  };
}

// Get current logged in user
function obtenerUsuarioActual() {
  const usuarioActual = sessionStorage.getItem('usuarioActual');
  return usuarioActual ? JSON.parse(usuarioActual) : null;
}

// Get all users (for networking)
function obtenerUsuarios() {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  // Return users without passwords for security
  return usuarios.map(({ contrasena, ...resto }) => resto);
}

// Get employees by company code
function obtenerEmpleadosPorCodigoEmpresa(codigoEmpresa) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  // Filter employees that belong to the specified company
  const empleados = usuarios.filter(usuario => 
    usuario.tipoPerfil === 'empleado' && 
    usuario.datosAdicionales && 
    usuario.datosAdicionales.codigoEmpresa === codigoEmpresa
  );
  
  // Return employees without passwords for security
  return empleados.map(({ contrasena, ...resto }) => resto);
}

// Assign a course to an employee
function asignarCursoAEmpleado(empleadoId, cursoId) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  let actualizado = false;
  
  const usuariosActualizados = usuarios.map(usuario => {
    if (usuario.correo === empleadoId && usuario.tipoPerfil === 'empleado') {
      // Initialize cursosAsignados array if it doesn't exist
      if (!usuario.datosAdicionales.cursosAsignados) {
        usuario.datosAdicionales.cursosAsignados = [];
      }
      
      // Check if course is already assigned
      if (!usuario.datosAdicionales.cursosAsignados.includes(cursoId)) {
        usuario.datosAdicionales.cursosAsignados.push(cursoId);
        actualizado = true;
      }
    }
    return usuario;
  });
  
  if (actualizado) {
    localStorage.setItem('usuarios', JSON.stringify(usuariosActualizados));
  }
  
  return actualizado;
}

// Get courses assigned to an employee
function obtenerCursosAsignadosAEmpleado(empleadoId) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const empleado = usuarios.find(u => u.correo === empleadoId && u.tipoPerfil === 'empleado');
  
  if (empleado && empleado.datosAdicionales && empleado.datosAdicionales.cursosAsignados) {
    return empleado.datosAdicionales.cursosAsignados;
  }
  
  return [];
}

// Check if an employee is assigned to a course
function empleadoTieneCursoAsignado(empleadoId, cursoId) {
  const cursosAsignados = obtenerCursosAsignadosAEmpleado(empleadoId);
  return cursosAsignados.includes(cursoId);
}

// Get user notifications
function obtenerNotificaciones(correoUsuario) {
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  const userNotifications = notificaciones.find(n => n.usuario === correoUsuario);
  return userNotifications ? userNotifications.notificaciones : [];
}

// Add notification
function agregarNotificacion(correoUsuario, mensaje) {
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  const userIndex = notificaciones.findIndex(n => n.usuario === correoUsuario);
  
  const nuevaNotificacion = {
    mensaje,
    leida: false,
    fecha: new Date().toISOString()
  };
  
  if (userIndex >= 0) {
    notificaciones[userIndex].notificaciones.push(nuevaNotificacion);
  } else {
    notificaciones.push({
      usuario: correoUsuario,
      notificaciones: [nuevaNotificacion]
    });
  }
  
  localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
  return nuevaNotificacion;
}

// Mark notification as read
function marcarNotificacionComoLeida(correoUsuario, index) {
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  const userIndex = notificaciones.findIndex(n => n.usuario === correoUsuario);
  
  if (userIndex >= 0 && notificaciones[userIndex].notificaciones[index]) {
    notificaciones[userIndex].notificaciones[index].leida = true;
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    return true;
  }
  
  return false;
}

// Delete notification
function eliminarNotificacion(correoUsuario, index) {
  const notificaciones = JSON.parse(localStorage.getItem('notificaciones')) || [];
  const userIndex = notificaciones.findIndex(n => n.usuario === correoUsuario);
  
  if (userIndex >= 0 && notificaciones[userIndex].notificaciones[index]) {
    notificaciones[userIndex].notificaciones.splice(index, 1);
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));
    return true;
  }
  
  return false;
}

// Send message
function enviarMensaje(correoRemitente, correoDestinatario, mensaje) {
  const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
  
  const nuevoMensaje = {
    de: correoRemitente,
    para: correoDestinatario,
    mensaje,
    fecha: new Date().toISOString()
  };
  
  mensajes.push(nuevoMensaje);
  localStorage.setItem('mensajes', JSON.stringify(mensajes));
  
  // Add notification for recipient
  const remitente = JSON.parse(localStorage.getItem('usuarios')).find(u => u.correo === correoRemitente);
  agregarNotificacion(correoDestinatario, `Nuevo mensaje de ${remitente.nombre}`);
  
  return nuevoMensaje;
}

// Get messages between two users
function obtenerMensajes(correoUsuario1, correoUsuario2) {
  const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
  
  return mensajes.filter(m => 
    (m.de === correoUsuario1 && m.para === correoUsuario2) || 
    (m.de === correoUsuario2 && m.para === correoUsuario1)
  ).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

// Get all conversations for a user
function obtenerConversaciones(correoUsuario) {
  const mensajes = JSON.parse(localStorage.getItem('mensajes')) || [];
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Get all unique users this user has conversed with
  const conversaciones = new Set();
  mensajes.forEach(m => {
    if (m.de === correoUsuario) {
      conversaciones.add(m.para);
    } else if (m.para === correoUsuario) {
      conversaciones.add(m.de);
    }
  });
  
  // Get user details for each conversation
  return Array.from(conversaciones).map(correo => {
    const usuario = usuarios.find(u => u.correo === correo);
    const mensajesConversacion = obtenerMensajes(correoUsuario, correo);
    const ultimoMensaje = mensajesConversacion[mensajesConversacion.length - 1];
    
    return {
      correo,
      nombre: usuario ? usuario.nombre : 'Usuario desconocido',
      tipoPerfil: usuario ? usuario.tipoPerfil : '',
      ultimoMensaje: ultimoMensaje ? ultimoMensaje.mensaje : '',
      fechaUltimoMensaje: ultimoMensaje ? ultimoMensaje.fecha : ''
    };
  }).sort((a, b) => new Date(b.fechaUltimoMensaje) - new Date(a.fechaUltimoMensaje));
}

// Initialize localStorage when the script loads
initializeLocalStorage();