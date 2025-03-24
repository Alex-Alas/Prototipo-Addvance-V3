/**
 * Aqui estaran todas las funciones y variables que se encuentran relacionadas con el usuario
 * Estas seran heredadas por UsuarioEmpresa, UsuarioEmpleado y UsuarioSocio
 */
//Tipos de usuario



//Hacer la clase abstracta Usuario
class Usuario{
    //VARIABLES
        #usuarioCodigo;
        #usuarioTipo;
        #usuarioNombre;
        #usuarioContrasena;
        #usuarioEmail;
        #usuarioTelefono;
        #usuarioDepartamento;
        #usuarioMunicipio;

    //METODOS
    constructor(tipo, nombre, contrasena, email='-', telefono='-',departamento='-', municipio='-'){
        contadorUsuarios++;
        this.usuarioCodigo = tipo+contadorUsuarios;
        this.usuarioTipo = tipo;
        this.usuarioNombre = nombre;
        this.usuarioContrasena = contrasena;
        this.usuarioEmail = email;
        this.usuarioTelefono = telefono;
        this.usuarioDepartamento = departamento;
        this.usuarioMunicipio = municipio;
    }
    //Getters
    get usuarioCodigo(){
        return this.#usuarioCodigo;
    }
}
