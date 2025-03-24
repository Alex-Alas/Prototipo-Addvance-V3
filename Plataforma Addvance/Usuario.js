/**
 * Aqui estaran todas las funciones y variables que se encuentran relacionadas con el usuario
 * Estas seran heredadas por UsuarioEmpresa, UsuarioEmpleado y UsuarioSocio
 */

//VARIABLES
let usuarioCodigo;
let tipoUsuario;
let usuarioNombre;
let usuarioContrasena;
let usuarioEmail;
let usuarioTelefono;
let contadorUsuarios = 0
//FUNCIONES
    //Constructor
    function Usuario(tipo, nombre, contrasena, email){
        contadorUsuarios++;
        this.usuarioCodigo = tipo+contadorUsuarios;
        this.tipoUsuario = tipo;
        this.usuarioNombre = nombre;
        this.usuarioContrasena = contrasena;
        this.usuarioEmail = email;
        this.usuarioTelefono = '-';
    }

    //Getters