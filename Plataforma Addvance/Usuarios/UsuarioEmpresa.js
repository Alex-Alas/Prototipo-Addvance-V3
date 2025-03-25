/**
 * Aqui estaran todas las funciones y variables que se encuentran relacionadas con el usuario empresa
 */

//Crear clase UsuarioEmpresa
class UsuarioEmpresa extends Usuario{
    //ATRIBUTOS
    #todasEmpresas = new Map();
    #usuarioCodigo;
    #empresaCodigo;
    #empresaSector;
    #empresaIndustria;
    #empresaRubro;
    #empresaPuntaje;
    #empresaNivel;
    #empresaLogros = new Array();
    #empresaJourneys = new Array();
    #empresaCertificados = new Array();
    #contadorEmpresas = 0;
    

    //METODOS
    constructor(nombre, contrasena, email='-', 
        telefono='-',departamento='-', municipio='-', 
        sector='-', industria = '-', rubro = '-' ){
        super(tiposUsuario.EMPRESA, nombre, 
            contrasena, email, telefono, departamento, 
            municipio);
        this.#contadorEmpresas++;
        this.#empresaCodigo = this.#usuarioCodigo +
         this.#contadorEmpresas.toString();
        this.#empresaSector = sector;
        this.#empresaIndustria = industria;
        this.#empresaRubro = rubro;
        this.#empresaPuntaje = 0;
        this.#empresaNivel = 1;
        this.#todasEmpresas.set(this.#empresaCodigo, this);
    }

    //Getters
    get todasEmpresas(){
        return this.#todasEmpresas;
    }
    get empresaCodigo(){
        return this.#empresaCodigo;
    }
    get empresaSector(){
        return this.#empresaSector;
    }
    get empresaIndustria(){
        return this.#empresaIndustria;
    }
    get empresaRubro(){
        return this.#empresaRubro;
    }
    get empresaPuntaje(){
        return this.#empresaPuntaje;
    }
    get empresaNivel(){
        return this.#empresaNivel;
    }
    get empresaLogros(){
        return this.#empresaLogros;
    }
    get empresaJourneys(){
        return this.#empresaJourneys;
    }
    get empresaCertificados(){
        return this.#empresaCertificados;
    }

    //Setters
    set empresaSector(sector){
        this.#empresaSector = sector;
    }
    set empresaIndustria(industria){
        this.#empresaIndustria = industria;
    }
    set empresaRubro(rubro){
        this.#empresaRubro = rubro;
    }
}


