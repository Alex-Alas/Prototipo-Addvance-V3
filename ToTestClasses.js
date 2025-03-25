//TESTER
//Import packages
import  {Usuario} from './Usuario.js';
import  {UsuarioEmpresa} from './UsuarioEmpresa.js';

//Test crear una empresa
let empresa = new UsuarioEmpresa('Emresa1', 'tdgfe','uuuu@gmail.com','12345678');
console.log(empresa);
console.log(empresa.getTodasEmpresas());