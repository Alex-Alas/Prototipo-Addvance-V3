/**
 * Connection Management System
 * Handles tracking and managing connections between Empresa and Proveedor users
 * @module connections
 * @description Sistema que gestiona las conexiones entre usuarios de la plataforma Addvance
 * @requires localStorage
 */

/**
 * Inicializa el almacenamiento de conexiones en localStorage si no existe
 * @function initializeConnections
 * @returns {void}
 */
function initializeConnections() {
  try {
    if (!localStorage.getItem('connections')) {
      localStorage.setItem('connections', JSON.stringify([]));
      console.log('Sistema de conexiones inicializado correctamente');
    }
  } catch (error) {
    console.error('Error al inicializar el sistema de conexiones:', error);
  }
}

/**
 * Crea una nueva conexión entre dos usuarios
 * @function createConnection
 * @param {string} userEmail1 - Correo electrónico del primer usuario
 * @param {string} userEmail2 - Correo electrónico del segundo usuario
 * @returns {Object} Resultado de la operación con estado y mensaje
 */
function createConnection(userEmail1, userEmail2) {
  try {
    // Validar parámetros
    if (!userEmail1 || !userEmail2) {
      return {
        success: false,
        message: 'Se requieren dos correos electrónicos válidos'
      };
    }
    
    if (userEmail1 === userEmail2) {
      return {
        success: false,
        message: 'No se puede crear una conexión con uno mismo'
      };
    }
    
    const connections = JSON.parse(localStorage.getItem('connections')) || [];
    
    // Verificar si la conexión ya existe
    const connectionExists = connections.some(conn =>
      (conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
      (conn.user1 === userEmail2 && conn.user2 === userEmail1)
    );
    
    if (connectionExists) {
      return {
        success: false,
        message: 'La conexión ya existe'
      };
    }
    
    // Crear nueva conexión
    const newConnection = {
      user1: userEmail1,
      user2: userEmail2,
      timestamp: new Date().toISOString(),
      status: 'active'
    };
    
    connections.push(newConnection);
    localStorage.setItem('connections', JSON.stringify(connections));
    
    // Crear notificación para el usuario 2
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user1 = usuarios.find(u => u.correo === userEmail1);
      if (user1) {
        agregarNotificacion(userEmail2, `${user1.nombre} se ha conectado contigo`);
      }
    } catch (notifError) {
      console.warn('No se pudo crear la notificación de conexión:', notifError);
    }
    
    return {
      success: true,
      message: 'Conexión creada exitosamente',
      connection: newConnection
    };
  } catch (error) {
    console.error('Error al crear conexión:', error);
    return {
      success: false,
      message: 'Error al crear la conexión'
    };
  }
}

/**
 * Obtiene todas las conexiones de un usuario específico
 * @function getUserConnections
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {Array} Lista de conexiones del usuario
 */
function getUserConnections(userEmail) {
  try {
    if (!userEmail) {
      console.error('Se requiere un correo electrónico válido');
      return [];
    }
    
    const connections = JSON.parse(localStorage.getItem('connections')) || [];
    const userConnections = connections.filter(conn =>
      (conn.user1 === userEmail || conn.user2 === userEmail) && 
      (!conn.status || conn.status === 'active')
    );
    
    return userConnections;
  } catch (error) {
    console.error('Error al obtener conexiones del usuario:', error);
    return [];
  }
}

/**
 * Obtiene los detalles de los usuarios conectados con un usuario específico
 * @function getConnectedUsersDetails
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {Array} Lista de detalles de usuarios conectados
 */
function getConnectedUsersDetails(userEmail) {
  try {
    if (!userEmail) {
      console.error('Se requiere un correo electrónico válido');
      return [];
    }
    
    const connections = getUserConnections(userEmail);
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    return connections.map(conn => {
      const connectedUserEmail = conn.user1 === userEmail ? conn.user2 : conn.user1;
      const userDetails = usuarios.find(u => u.correo === connectedUserEmail);
      
      if (!userDetails) return null;
      
      // Obtener datos adicionales según el tipo de perfil
      let additionalData = {};
      
      if (userDetails.tipoPerfil === 'empresa') {
        additionalData = {
          industria: userDetails.datosAdicionales?.sector || 'No especificada',
          tamano: userDetails.datosAdicionales?.tamano || 'No especificado'
        };
      } else if (userDetails.tipoPerfil === 'proveedor') {
        additionalData = {
          especialidad: userDetails.datosAdicionales?.especialidad || 'No especificada',
          servicios: userDetails.datosAdicionales?.servicios || 'No especificados'
        };
      } else if (userDetails.tipoPerfil === 'empleado') {
        additionalData = {
          cargo: userDetails.datosAdicionales?.cargo || 'No especificado',
          departamento: userDetails.datosAdicionales?.departamento || 'No especificado'
        };
      }
      
      // Retornar detalles necesarios
      return {
        nombre: userDetails.nombre,
        correo: userDetails.correo,
        telefono: userDetails.datosAdicionales?.contacto?.telefono || 
                 userDetails.datosAdicionales?.telefono || 
                 'No especificado',
        tipoPerfil: userDetails.tipoPerfil,
        timestamp: conn.timestamp,
        ...additionalData
      };
    }).filter(Boolean); // Eliminar entradas nulas
  } catch (error) {
    console.error('Error al obtener detalles de usuarios conectados:', error);
    return [];
  }
}

/**
 * Elimina una conexión entre dos usuarios
 * @function removeConnection
 * @param {string} userEmail1 - Correo electrónico del primer usuario
 * @param {string} userEmail2 - Correo electrónico del segundo usuario
 * @returns {Object} Resultado de la operación con estado y mensaje
 */
function removeConnection(userEmail1, userEmail2) {
  try {
    // Validar parámetros
    if (!userEmail1 || !userEmail2) {
      return {
        success: false,
        message: 'Se requieren dos correos electrónicos válidos'
      };
    }
    
    const connections = JSON.parse(localStorage.getItem('connections')) || [];
    
    // Verificar si la conexión existe
    const connectionExists = connections.some(conn =>
      (conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
      (conn.user1 === userEmail2 && conn.user2 === userEmail1)
    );
    
    if (!connectionExists) {
      return {
        success: false,
        message: 'La conexión no existe'
      };
    }
    
    // Opción 1: Eliminar físicamente la conexión
    const updatedConnections = connections.filter(conn =>
      !((conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
      (conn.user1 === userEmail2 && conn.user2 === userEmail1))
    );
    
    // Opción 2: Marcar como inactiva (soft delete)
    // const updatedConnections = connections.map(conn => {
    //   if ((conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
    //       (conn.user1 === userEmail2 && conn.user2 === userEmail1)) {
    //     return { ...conn, status: 'inactive' };
    //   }
    //   return conn;
    // });
    
    localStorage.setItem('connections', JSON.stringify(updatedConnections));
    
    // Crear notificación para el usuario 2
    try {
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const user1 = usuarios.find(u => u.correo === userEmail1);
      if (user1) {
        agregarNotificacion(userEmail2, `${user1.nombre} ha eliminado su conexión contigo`);
      }
    } catch (notifError) {
      console.warn('No se pudo crear la notificación de desconexión:', notifError);
    }
    
    return {
      success: true,
      message: 'Conexión eliminada exitosamente'
    };
  } catch (error) {
    console.error('Error al eliminar conexión:', error);
    return {
      success: false,
      message: 'Error al eliminar la conexión'
    };
  }
}

/**
 * Verifica si existe una conexión entre dos usuarios
 * @function connectionExists
 * @param {string} userEmail1 - Correo electrónico del primer usuario
 * @param {string} userEmail2 - Correo electrónico del segundo usuario
 * @returns {boolean} True si la conexión existe, false en caso contrario
 */
function connectionExists(userEmail1, userEmail2) {
  try {
    if (!userEmail1 || !userEmail2) return false;
    
    const connections = JSON.parse(localStorage.getItem('connections')) || [];
    
    return connections.some(conn =>
      ((conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
       (conn.user1 === userEmail2 && conn.user2 === userEmail1)) &&
      (!conn.status || conn.status === 'active')
    );
  } catch (error) {
    console.error('Error al verificar existencia de conexión:', error);
    return false;
  }
}

/**
 * Obtiene el número total de conexiones de un usuario
 * @function getConnectionCount
 * @param {string} userEmail - Correo electrónico del usuario
 * @returns {number} Número de conexiones
 */
function getConnectionCount(userEmail) {
  try {
    if (!userEmail) return 0;
    
    const connections = getUserConnections(userEmail);
    return connections.length;
  } catch (error) {
    console.error('Error al contar conexiones:', error);
    return 0;
  }
}

// Inicializar conexiones cuando se carga el módulo
initializeConnections();