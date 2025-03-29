/**
 * Connection Management System
 * Handles tracking and managing connections between Empresa and Proveedor users
 */

// Initialize connections in localStorage if they don't exist
function initializeConnections() {
  if (!localStorage.getItem('connections')) {
    localStorage.setItem('connections', JSON.stringify([]));
  }
}

// Create a new connection between two users
function createConnection(userEmail1, userEmail2) {
  const connections = JSON.parse(localStorage.getItem('connections')) || [];
  
  // Check if connection already exists
  const connectionExists = connections.some(conn =>
    (conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
    (conn.user1 === userEmail2 && conn.user2 === userEmail1)
  );
  
  if (connectionExists) {
    return {
      success: false,
      message: 'Connection already exists'
    };
  }
  
  // Create new connection
  const newConnection = {
    user1: userEmail1,
    user2: userEmail2,
    timestamp: new Date().toISOString()
  };
  
  connections.push(newConnection);
  localStorage.setItem('connections', JSON.stringify(connections));
  
  return {
    success: true,
    message: 'Connection created successfully',
    connection: newConnection
  };
}

// Get all connections for a specific user
function getUserConnections(userEmail) {
  const connections = JSON.parse(localStorage.getItem('connections')) || [];
  const userConnections = connections.filter(conn =>
    conn.user1 === userEmail || conn.user2 === userEmail
  );
  
  return userConnections;
}

// Get connected users' details
function getConnectedUsersDetails(userEmail) {
  const connections = getUserConnections(userEmail);
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  return connections.map(conn => {
    const connectedUserEmail = conn.user1 === userEmail ? conn.user2 : conn.user1;
    const userDetails = usuarios.find(u => u.correo === connectedUserEmail);
    
    if (!userDetails) return null;
    
    // Return only necessary details
    return {
      nombre: userDetails.nombre,
      correo: userDetails.correo,
      industria: userDetails.datosAdicionales?.industria || 'No especificada',
      telefono: userDetails.datosAdicionales?.telefono || 'No especificado',
      tipoPerfil: userDetails.tipoPerfil,
      timestamp: conn.timestamp
    };
  }).filter(Boolean); // Remove null entries
}

// Remove a connection between two users
function removeConnection(userEmail1, userEmail2) {
  const connections = JSON.parse(localStorage.getItem('connections')) || [];
  
  const updatedConnections = connections.filter(conn =>
    !((conn.user1 === userEmail1 && conn.user2 === userEmail2) ||
    (conn.user1 === userEmail2 && conn.user2 === userEmail1))
  );
  
  localStorage.setItem('connections', JSON.stringify(updatedConnections));
  
  return {
    success: true,
    message: 'Connection removed successfully'
  };
}

// Initialize connections when the module loads
initializeConnections();