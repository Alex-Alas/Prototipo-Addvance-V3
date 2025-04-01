/**
 * Profile Manager - Gestión de perfiles de usuario
 * Este archivo se encarga de mostrar la información del perfil de usuario
 * de manera ordenada y presentable en las interfaces internas.
 * @module profile-manager
 * @description Sistema de gestión de perfiles de usuario para la plataforma Addvance
 * @requires auth.js - Para obtener información del usuario actual
 * @requires localStorage - Para almacenar y recuperar datos de usuario
 */

/**
 * Inicializa el perfil de usuario en la interfaz cuando se carga la página
 */
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Cargar el perfil del usuario actual
    loadUserProfile();
    
    // Inicializar eventos de la tarjeta de perfil
    initializeProfileCard();
  } catch (error) {
    console.error('Error al inicializar el perfil de usuario:', error);
  }
});

/**
 * Carga y muestra la información del perfil del usuario actual
 * @function loadUserProfile
 * @returns {void}
 */
function loadUserProfile() {
  try {
    // Obtener el usuario actual desde la sesión
    const currentUser = obtenerUsuarioActual();
    if (!currentUser) {
      console.error('No hay usuario autenticado');
      return;
    }
    
    console.log('Cargando perfil para:', currentUser.tipoPerfil);
    
    // Actualizar la interfaz según el tipo de perfil
    switch(currentUser.tipoPerfil) {
      case 'empresa':
        updateEmpresaProfile(currentUser);
        break;
      case 'proveedor':
        updateProveedorProfile(currentUser);
        break;
      case 'empleado':
        updateEmpleadoProfile(currentUser);
        break;
      default:
        console.error('Tipo de perfil no reconocido:', currentUser.tipoPerfil);
    }
    
    // Actualizar conexiones si existe la sección de network
    if (document.getElementById('networkSection') || 
        document.getElementById('proveedorNetworkSection')) {
      updateUserConnections(currentUser);
    }
  } catch (error) {
    console.error('Error al cargar el perfil de usuario:', error);
  }
}

/**
 * Inicializa los eventos de la tarjeta de perfil (flip effect)
 * @function initializeProfileCard
 * @returns {void}
 */
function initializeProfileCard() {
  try {
    console.log('Inicializando tarjetas de perfil...');
    const profileCards = document.querySelectorAll('.profile-card');
    console.log(`Encontradas ${profileCards.length} tarjetas de perfil`);
    
    if (profileCards.length === 0) return;
    
    // Inicializar la funcionalidad de volteo
    initializeProfileCardFlip();
    
    console.log('Eventos de tarjetas de perfil inicializados correctamente');
  } catch (error) {
    console.error('Error al inicializar las tarjetas de perfil:', error);
  }
}

/**
 * Actualiza la interfaz de perfil para usuarios tipo Empresa
 * @param {Object} user - Datos del usuario empresa
 */
function updateEmpresaProfile(user) {
  // Verificar que estamos en la interfaz correcta
  if (!document.querySelector('.profile-section')) return;
  
  // Actualizar información básica (frente de la tarjeta)
  const profileFront = document.querySelector('.profile-card-front');
  if (profileFront) {
    // Actualizar nombre de la empresa
    const nameElement = profileFront.querySelector('h2');
    if (nameElement) nameElement.textContent = user.nombre;
    
    // Actualizar información de la empresa
    const infoElements = profileFront.querySelectorAll('.company-info');
    if (infoElements.length > 0) {
      // Mostrar sector si está disponible
      if (user.datosAdicionales && user.datosAdicionales.sector) {
        infoElements[0].textContent = `Sector: ${user.datosAdicionales.sector}`;
      }
      
      // Mostrar tamaño si está disponible
      if (user.datosAdicionales && user.datosAdicionales.tamano) {
        infoElements[1].textContent = `Tamaño: ${user.datosAdicionales.tamano}`;
      }
      
      // Mostrar código único
      const uniqueCodeElement = document.getElementById('uniqueCode');
      if (uniqueCodeElement && user.datosAdicionales && user.datosAdicionales.codigoUnico) {
        uniqueCodeElement.textContent = `Código único: ${user.datosAdicionales.codigoUnico}`;
      }
    }
  }
  
  // Actualizar información detallada (reverso de la tarjeta)
  const profileBack = document.querySelector('.profile-card-back');
  if (profileBack) {
    const additionalInfoElements = profileBack.querySelectorAll('.additional-info');
    if (additionalInfoElements.length > 0) {
      let infoIndex = 0;
      
      // Mostrar sector
      if (user.datosAdicionales && user.datosAdicionales.sector) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Sector: ${user.datosAdicionales.sector}`;
          infoIndex++;
        }
      }
      
      // Mostrar año de fundación
      if (user.datosAdicionales && user.datosAdicionales.anoFundacion) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Año de fundación: ${user.datosAdicionales.anoFundacion}`;
          infoIndex++;
        }
      }
      
      // Mostrar NIT
      if (user.datosAdicionales && user.datosAdicionales.nit) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `NIT: ${user.datosAdicionales.nit}`;
          infoIndex++;
        }
      }
      
      // Mostrar teléfono de contacto
      if (user.datosAdicionales && user.datosAdicionales.contacto && user.datosAdicionales.contacto.telefono) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Teléfono: ${user.datosAdicionales.contacto.telefono}`;
          infoIndex++;
        }
      }
      
      // Mostrar correo electrónico
      if (infoIndex < additionalInfoElements.length) {
        additionalInfoElements[infoIndex].innerHTML = `Email: <a href="mailto:${user.correo}">${user.correo}</a>`;
        infoIndex++;
      }
      
      // Mostrar dirección
      if (user.datosAdicionales && user.datosAdicionales.direccion) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Dirección: ${user.datosAdicionales.direccion}`;
          infoIndex++;
        }
      }
      
      // Mostrar sitio web
      if (user.datosAdicionales && user.datosAdicionales.sitioWeb) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].innerHTML = `Sitio web: <a href="${user.datosAdicionales.sitioWeb}" target="_blank">${user.datosAdicionales.sitioWeb}</a>`;
          infoIndex++;
        }
      }
      
      // Mostrar descripción
      if (user.datosAdicionales && user.datosAdicionales.descripcion) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Descripción: ${user.datosAdicionales.descripcion}`;
          infoIndex++;
        }
      }
      
      // Mostrar intereses
      if (user.datosAdicionales && user.datosAdicionales.intereses) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Intereses: ${user.datosAdicionales.intereses}`;
          infoIndex++;
        }
      }
      
      // Ocultar elementos no utilizados
      for (let i = infoIndex; i < additionalInfoElements.length; i++) {
        additionalInfoElements[i].style.display = 'none';
      }
    }
  }
  
  // Actualizar lista de empleados si existe
  updateEmployeesList(user);
}

/**
 * Actualiza la interfaz de perfil para usuarios tipo Proveedor
 * @param {Object} user - Datos del usuario proveedor
 */
function updateProveedorProfile(user) {
  // Verificar que estamos en la interfaz correcta
  if (!document.querySelector('#proveedorPerfilSection')) return;
  
  // Actualizar información básica (frente de la tarjeta)
  const profileFront = document.querySelector('#proveedorPerfilSection .profile-card-front');
  if (profileFront) {
    // Actualizar nombre del proveedor
    const nameElement = profileFront.querySelector('h2');
    if (nameElement) nameElement.textContent = user.nombre;
    
    // Actualizar información del proveedor
    const infoElements = profileFront.querySelectorAll('.company-info');
    if (infoElements.length > 0) {
      // Mostrar tipo si está disponible
      if (user.datosAdicionales && user.datosAdicionales.tipo) {
        infoElements[0].textContent = `Tipo: ${user.datosAdicionales.tipo}`;
      }
      
      // Mostrar especialidad si está disponible
      if (user.datosAdicionales && user.datosAdicionales.especialidad) {
        infoElements[1].textContent = `Especialidad: ${user.datosAdicionales.especialidad}`;
      }
      
      // Mostrar tamaño si está disponible
      if (user.datosAdicionales && user.datosAdicionales.tamano) {
        infoElements[2].textContent = `Tamaño: ${user.datosAdicionales.tamano}`;
      }
    }
  }
  
  // Actualizar información detallada (reverso de la tarjeta)
  const profileBack = document.querySelector('#proveedorPerfilSection .profile-card-back');
  if (profileBack) {
    const additionalInfoElements = profileBack.querySelectorAll('.additional-info');
    if (additionalInfoElements.length > 0) {
      let infoIndex = 0;
      
      // Mostrar NIT
      if (user.datosAdicionales && user.datosAdicionales.nit) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `NIT: ${user.datosAdicionales.nit}`;
          infoIndex++;
        }
      }
      
      // Mostrar teléfono de contacto
      if (user.datosAdicionales && user.datosAdicionales.contacto && user.datosAdicionales.contacto.telefono) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Teléfono: ${user.datosAdicionales.contacto.telefono}`;
          infoIndex++;
        }
      }
      
      // Mostrar correo electrónico
      if (infoIndex < additionalInfoElements.length) {
        additionalInfoElements[infoIndex].innerHTML = `Email: <a href="mailto:${user.correo}">${user.correo}</a>`;
        infoIndex++;
      }
      
      // Mostrar dirección
      if (user.datosAdicionales && user.datosAdicionales.direccion) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Dirección: ${user.datosAdicionales.direccion}`;
          infoIndex++;
        }
      }
      
      // Mostrar sitio web
      if (user.datosAdicionales && user.datosAdicionales.sitioWeb) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].innerHTML = `Sitio web: <a href="${user.datosAdicionales.sitioWeb}" target="_blank">${user.datosAdicionales.sitioWeb}</a>`;
          infoIndex++;
        }
      }
      
      // Mostrar servicios
      if (user.datosAdicionales && user.datosAdicionales.servicios) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Servicios: ${user.datosAdicionales.servicios}`;
          infoIndex++;
        }
      }
      
      // Mostrar experiencia
      if (user.datosAdicionales && user.datosAdicionales.experiencia) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Experiencia: ${user.datosAdicionales.experiencia}`;
          infoIndex++;
        }
      }
      
      // Mostrar clientes
      if (user.datosAdicionales && user.datosAdicionales.clientes) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Clientes: ${user.datosAdicionales.clientes}`;
          infoIndex++;
        }
      }
      
      // Ocultar elementos no utilizados
      for (let i = infoIndex; i < additionalInfoElements.length; i++) {
        additionalInfoElements[i].style.display = 'none';
      }
    }
  }
  
  // Actualizar tabla de servicios ofrecidos
  updateServiciosTable(user);
}

/**
 * Actualiza la interfaz de perfil para usuarios tipo Empleado
 * @param {Object} user - Datos del usuario empleado
 */
function updateEmpleadoProfile(user) {
  // Verificar que estamos en la interfaz correcta
  const profileSection = document.querySelector('.profile-section');
  if (!profileSection) return;
  
  // Actualizar información básica (frente de la tarjeta)
  const profileFront = document.querySelector('.profile-card-front');
  if (profileFront) {
    // Actualizar nombre del empleado
    const nameElement = profileFront.querySelector('h2');
    if (nameElement) nameElement.textContent = user.nombre;
    
    // Actualizar información del empleado
    const infoElements = profileFront.querySelectorAll('.company-info');
    if (infoElements.length > 0) {
      // Mostrar cargo si está disponible
      if (user.datosAdicionales && user.datosAdicionales.cargo) {
        infoElements[0].textContent = `Cargo: ${user.datosAdicionales.cargo}`;
      }
      
      // Mostrar departamento si está disponible
      if (user.datosAdicionales && user.datosAdicionales.departamento) {
        infoElements[1].textContent = `Departamento: ${user.datosAdicionales.departamento}`;
      }
      
      // Mostrar código de empresa
      if (user.datosAdicionales && user.datosAdicionales.codigoEmpresa) {
        infoElements[2].textContent = `Código de empresa: ${user.datosAdicionales.codigoEmpresa}`;
      }
    }
  }
  
  // Actualizar información detallada (reverso de la tarjeta)
  const profileBack = document.querySelector('.profile-card-back');
  if (profileBack) {
    const additionalInfoElements = profileBack.querySelectorAll('.additional-info');
    if (additionalInfoElements.length > 0) {
      let infoIndex = 0;
      
      // Mostrar cargo
      if (user.datosAdicionales && user.datosAdicionales.cargo) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Cargo: ${user.datosAdicionales.cargo}`;
          infoIndex++;
        }
      }
      
      // Mostrar departamento
      if (user.datosAdicionales && user.datosAdicionales.departamento) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Departamento: ${user.datosAdicionales.departamento}`;
          infoIndex++;
        }
      }
      
      // Mostrar teléfono
      if (user.datosAdicionales && user.datosAdicionales.telefono) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Teléfono: ${user.datosAdicionales.telefono}`;
          infoIndex++;
        }
      }
      
      // Mostrar correo electrónico
      if (infoIndex < additionalInfoElements.length) {
        additionalInfoElements[infoIndex].innerHTML = `Email: <a href="mailto:${user.correo}">${user.correo}</a>`;
        infoIndex++;
      }
      
      // Mostrar habilidades
      if (user.datosAdicionales && user.datosAdicionales.habilidades) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Habilidades: ${user.datosAdicionales.habilidades}`;
          infoIndex++;
        }
      }
      
      // Mostrar biografía
      if (user.datosAdicionales && user.datosAdicionales.biografia) {
        if (infoIndex < additionalInfoElements.length) {
          additionalInfoElements[infoIndex].textContent = `Biografía: ${user.datosAdicionales.biografia}`;
          infoIndex++;
        }
      }
      
      // Ocultar elementos no utilizados
      for (let i = infoIndex; i < additionalInfoElements.length; i++) {
        additionalInfoElements[i].style.display = 'none';
      }
    }
  }
  
  // Actualizar tabla de logros y certificados
  updateAchievementsTable(user);
}

/**
 * Actualiza la lista de empleados para usuarios tipo Empresa
 * @function updateEmployeesList
 * @param {Object} user - Datos del usuario empresa
 * @returns {void}
 */
function updateEmployeesList(user) {
  try {
    const employeesList = document.querySelector('.employees-list');
    if (!employeesList) return;
    
    // Verificar que el usuario tenga código único
    if (!user.datosAdicionales || !user.datosAdicionales.codigoUnico) {
      employeesList.innerHTML = '<li>No se puede cargar la lista de empleados</li>';
      return;
    }
    
    // Limpiar lista actual
    employeesList.innerHTML = '';
    
    // Obtener todos los usuarios
    const allUsers = obtenerUsuarios();
    
    // Filtrar empleados que pertenecen a esta empresa
    const employees = allUsers.filter(u => 
      u.tipoPerfil === 'empleado' && 
      u.datosAdicionales && 
      u.datosAdicionales.codigoEmpresa === user.datosAdicionales.codigoUnico
    );
    
    if (employees.length === 0) {
      employeesList.innerHTML = '<li>No hay empleados registrados</li>';
      return;
    }
    
    // Crear elementos de lista para cada empleado
    employees.forEach(employee => {
      const li = document.createElement('li');
      li.className = 'employee-item';
      li.innerHTML = `
        <div class="employee-name">${employee.nombre}</div>
        <div class="employee-position">${employee.datosAdicionales?.cargo || 'Sin cargo'}</div>
        <div class="employee-department">${employee.datosAdicionales?.departamento || 'Sin departamento'}</div>
      `;
      employeesList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al actualizar la lista de empleados:', error);
  }
}

/**
 * Actualiza la tabla de servicios ofrecidos para usuarios tipo Proveedor
 * @function updateServiciosTable
 * @param {Object} user - Datos del usuario proveedor
 * @returns {void}
 */
function updateServiciosTable(user) {
  try {
    const serviciosTable = document.querySelector('#proveedorPerfilSection .achievements-table');
    if (!serviciosTable) return;
    
    // Limpiar tabla actual
    serviciosTable.innerHTML = '';
    
    // Verificar si hay servicios disponibles
    if (!user.datosAdicionales || !user.datosAdicionales.servicios) {
      serviciosTable.innerHTML = '<tr><td>No hay servicios registrados</td><td>-</td></tr>';
      return;
    }
    
    // Dividir los servicios por comas y crear filas para cada uno
    const servicios = user.datosAdicionales.servicios.split(',');
    servicios.forEach(servicio => {
      if (!servicio.trim()) return; // Ignorar servicios vacíos
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${servicio.trim()}</td>
        <td>${user.datosAdicionales.especialidad || 'Especialidad general'}</td>
      `;
      serviciosTable.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al actualizar la tabla de servicios:', error);
  }
}

/**
 * Actualiza la tabla de logros y certificados para usuarios tipo Empleado
 * @param {Object} user - Datos del usuario empleado
 */
function updateAchievementsTable(user) {
  const achievementsTables = document.querySelectorAll('.achievements-table');
  if (achievementsTables.length === 0) return;
  
  // Limpiar tablas actuales
  achievementsTables.forEach(table => {
    table.innerHTML = '';
  });
  
  // Por ahora, mostrar información de ejemplo
  // En una implementación real, estos datos vendrían de la base de datos
  
  // Tabla de logros (primera tabla)
  if (achievementsTables[0]) {
    if (user.datosAdicionales && user.datosAdicionales.habilidades) {
      const habilidades = user.datosAdicionales.habilidades.split(',');
      habilidades.forEach(habilidad => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Competencia en ${habilidad.trim()}</td>
          <td>${new Date().toLocaleDateString()}</td>
        `;
        achievementsTables[0].appendChild(tr);
      });
    } else {
      achievementsTables[0].innerHTML = '<tr><td>No hay logros registrados</td><td>-</td></tr>';
    }
  }
  
  // Tabla de certificados (segunda tabla)
  if (achievementsTables[1]) {
    achievementsTables[1].innerHTML = '<tr><td>No hay certificados registrados</td><td>-</td></tr>';
  }
}

/**
 * Actualiza la interfaz de usuario para mostrar las conexiones del usuario actual
 * @function updateUserConnections
 * @param {Object} user - Datos del usuario actual
 * @returns {void}
 */
function updateUserConnections(user) {
  try {
    if (!user) {
      console.error('No se puede actualizar conexiones: usuario no proporcionado');
      return;
    }
    
    // Verificar si estamos en la sección de network
    const networkSection = document.getElementById('networkSection');
    const proveedorNetworkSection = document.getElementById('proveedorNetworkSection');
    
    if (!networkSection && !proveedorNetworkSection) return;
    
    // Obtener las conexiones del usuario
    const connectedUsers = getConnectedUsersDetails(user.correo);
    
    if (networkSection && user.tipoPerfil === 'empresa') {
      // Actualizar grid de proveedores para empresas
      const proveedoresGrid = document.getElementById('proveedoresGrid');
      if (proveedoresGrid) {
        updateNetworkGrid(proveedoresGrid, connectedUsers, 'proveedor');
      }
      
      // Actualizar grid de empresas para empresas
      const empresasGrid = document.getElementById('empresasGrid');
      if (empresasGrid) {
        updateNetworkGrid(empresasGrid, connectedUsers, 'empresa');
      }
    }
    
    if (proveedorNetworkSection && user.tipoPerfil === 'proveedor') {
      // Actualizar grid de clientes para proveedores
      const clientesGrid = document.getElementById('clientesGrid');
      if (clientesGrid) {
        updateNetworkGrid(clientesGrid, connectedUsers, 'empresa');
      }
      
      // Actualizar grid de potenciales para proveedores
      const potencialesGrid = document.getElementById('potencialesGrid');
      if (potencialesGrid) {
        // Aquí se podrían mostrar empresas no conectadas como potenciales
        // Por ahora, mostrar mensaje de que no hay potenciales
        if (potencialesGrid) {
          potencialesGrid.innerHTML = '<p>No hay clientes potenciales disponibles.</p>';
        }
      }
    }
  } catch (error) {
    console.error('Error al actualizar conexiones de usuario:', error);
  }
}

/**
 * Actualiza un grid de conexiones con los usuarios conectados
 * @function updateNetworkGrid
 * @param {HTMLElement} gridElement - Elemento HTML del grid
 * @param {Array} connectedUsers - Lista de usuarios conectados
 * @param {string} filterType - Tipo de perfil para filtrar (empresa, proveedor, empleado)
 * @returns {void}
 */
function updateNetworkGrid(gridElement, connectedUsers, filterType) {
  try {
    // Limpiar grid
    gridElement.innerHTML = '';
    
    // Filtrar usuarios por tipo
    const filteredUsers = connectedUsers.filter(user => user.tipoPerfil === filterType);
    
    if (filteredUsers.length === 0) {
      gridElement.innerHTML = '<p>No hay conexiones establecidas.</p>';
      return;
    }
    
    // Crear tarjetas para cada usuario conectado
    filteredUsers.forEach(user => {
      const card = document.createElement('div');
      card.className = 'network-profile-card';
      
      // Determinar qué información adicional mostrar según el tipo de perfil
      let additionalInfo = '';
      
      if (user.tipoPerfil === 'empresa') {
        additionalInfo = `
          <div class="profile-detail">Sector: ${user.industria || 'No especificado'}</div>
          <div class="profile-detail">Tamaño: ${user.tamano || 'No especificado'}</div>
        `;
      } else if (user.tipoPerfil === 'proveedor') {
        additionalInfo = `
          <div class="profile-detail">Especialidad: ${user.especialidad || 'No especificada'}</div>
          <div class="profile-detail">Servicios: ${user.servicios || 'No especificados'}</div>
        `;
      }
      
      card.innerHTML = `
        <div class="profile-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M12 7v10M7 12h10"/>
          </svg>
        </div>
        <div class="profile-info">
          <div class="profile-name">${user.nombre}</div>
          ${additionalInfo}
          <div class="profile-contact">
            <div>Email: ${user.correo}</div>
            <div>Teléfono: ${user.telefono}</div>
          </div>
        </div>
        <div class="profile-actions">
          <button class="message-btn" data-email="${user.correo}">Mensaje</button>
          <button class="disconnect-btn" data-email="${user.correo}">Desconectar</button>
        </div>
      `;
      
      gridElement.appendChild(card);
    });
    
    // Añadir eventos a los botones de mensaje y desconexión
    const messageButtons = gridElement.querySelectorAll('.message-btn');
    messageButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userEmail = e.target.dataset.email;
        // Aquí se podría abrir el modal de mensajes
        console.log('Abrir chat con:', userEmail);
      });
    });
    
    const disconnectButtons = gridElement.querySelectorAll('.disconnect-btn');
    disconnectButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userEmail = e.target.dataset.email;
        const currentUser = obtenerUsuarioActual();
        if (currentUser) {
          // Eliminar conexión
          const result = removeConnection(currentUser.correo, userEmail);
          if (result.success) {
            // Actualizar la interfaz
            updateUserConnections(currentUser);
          }
        }
      });
    });
  } catch (error) {
    console.error('Error al actualizar grid de conexiones:', error);
    gridElement.innerHTML = '<p>Error al cargar conexiones.</p>';
  }
}