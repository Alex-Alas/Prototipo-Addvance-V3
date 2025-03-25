/**
 * Aqui estaran todas las funciones y variables que se encuentran relacionadas con el usuario
 * Estas seran heredadas por UsuarioEmpresa, UsuarioEmpleado y UsuarioSocio
 */
//Tipos de usuario
const tiposUsuario = Object.freeze({
    EMPRESA: 'Empresa',
    EMPLEADO: 'Empleado',
    SOCIO: 'Socio'
});


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
        this.usuarioCodigo = contadorUsuarios.toString() + Math.floor(Math.random() * 100).toString();
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
    get usuarioTipo(){
        return this.#usuarioTipo;
    }
    get usuarioNombre(){
        return this.#usuarioNombre;
    }
    get usuarioContrasena(){
        return this.#usuarioContrasena;
    }
    get usuarioEmail(){
        return this.#usuarioEmail;
    }
    get usuarioTelefono(){
        return this.#usuarioTelefono;
    }
    get usuarioDepartamento(){
        return this.#usuarioDepartamento;
    }
    get usuarioMunicipio(){
        return this.#usuarioMunicipio;
    }

    //Setters
    set usuarioNombre(nombre){
        this.#usuarioNombre = nombre;
    }
    set usuarioContrasena(contrasena){
        this.#usuarioContrasena = contrasena;
    }
    set usuarioEmail(email){
        this.#usuarioEmail = email;
    }
    set usuarioTelefono(telefono){
        this.#usuarioTelefono = telefono;
    }
    set usuarioDepartamento(departamento){
        this.#usuarioDepartamento = departamento;
    }
    set usuarioMunicipio(municipio){
        this.#usuarioMunicipio = municipio;
    }
}
