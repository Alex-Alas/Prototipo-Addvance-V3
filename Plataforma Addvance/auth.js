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
  if (!localStorage.getItem('usuarios')) {
    localStorage.setItem('usuarios', JSON.stringify([]));
  }
  if (!localStorage.getItem('notificaciones')) {
    localStorage.setItem('notificaciones', JSON.stringify([]));
  }
  if (!localStorage.getItem('mensajes')) {
    localStorage.setItem('mensajes', JSON.stringify([]));
  }
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
      codigoUnico: tipoPerfil === 'empresa' ? generarCodigoUnico() : null
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