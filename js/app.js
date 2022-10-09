let cuentas = [
    {nombre: 'Mali',  password: '1234', saldo: 280, img: './img/perfil-mali.jpg' },
    {nombre: 'Maui',  password: '5678', saldo: 550, img: './img/perfil-maui.jpg' },
    {nombre: 'Gera',  password: '4321', saldo: 150, img: './img/perfil-gera.jpg' },
    {nombre: 'Marco', password: '1111', saldo: 50,  img: './img/perfil-monster.jpg' }
]
//Reglas de negocio
const saldoMax = 990;
const saldoMin = 10;
// Se inicia en null porque saladría un error
let usuarioLogueado = null;
// Botones generales
let btnCancelarDeposito = document.getElementById('cancelar-deposito').addEventListener('click', regresar);
let btnCancelarRetiro = document.getElementById('cancelar-retiro').addEventListener('click', regresar);
let btnRegresar = document.getElementById('regresar').addEventListener('click', regresar);
let btnRealizarDeposito =  document.getElementById('aceptar-deposito').addEventListener('click', realizarDeposito);
let btnRealizarRetiro = document.getElementById('aceptar-retiro').addEventListener('click', realizarRetiro );
let btnCerrarSesion = document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);
console.log(localStorage.getItem('cuentas'));
//Verificar el local storage
if(localStorage.getItem('cuentas') !== null ){
    let cuentasSesion = JSON.parse(localStorage.getItem('cuentas')); // lo convierte a un objeto de JS
    cuentas = cuentasSesion;
} else {
   localStorage.setItem('cuentas', JSON.stringify(cuentas)); // el objeto lo transforma en cadena JSON
}
// Iniciar login
function login(){
    let inputUsuario = document.getElementById('input-usuario').value;
    let password = document.getElementById('input-password').value;
    console.log(cuentas.length);
    // buscar usuarios que coincida el nombre usando filter
    let usuariosEncontrados = cuentas.filter(cuenta => cuenta.nombre == inputUsuario);
    // si encontró usuarios con ese nombre
    if(usuariosEncontrados.length > 0){
        // buscar entre esos usuario los que coincidan el password
        let usuariosCorrectos = usuariosEncontrados.filter(usuario => usuario.password == password);
        // si encontró con password correcto
        if(usuariosCorrectos.length > 0){
            // si solo existe un solo registro correcto
            if(usuariosCorrectos.length == 1){
                // obtener el usuario correcto y asignarlo a usuarioLogueado
                usuarioLogueado = usuariosCorrectos[0];
                document.getElementById('login').classList.add('d-none');
                document.getElementById("interfaz").classList.remove('d-none');
                document.getElementById('home').classList.remove('d-none');
                let spanNombreUsuario = document.getElementById('nombre-usuario');
                spanNombreUsuario.innerHTML = usuarioLogueado.nombre;
                let foto = document.getElementById('foto-perfil');
                foto.src = usuarioLogueado.img;
            }
            // si hubo más de un registro válido
            else{
                alert('Existe más de un usuario coincidente');
            }
        }
        else{
            alert('No es la contraseña correcta')
        }
    }
    // si no existe el usuario
    else{
        alert('No se encontró el usuario ');
    }
}
//Funciiones ocultar
function verSaldo(){
    document.getElementById('home').classList.add('d-none');
    document.getElementById('ver-saldo').classList.remove('d-none');
    console.log(usuarioLogueado);
    if(isNaN(usuarioLogueado.saldo)){
        console.log('error');
    }
    document.getElementById('input-saldo').value = usuarioLogueado.saldo;
}
function retiro(){
    document.getElementById('home').classList.add('d-none');
    document.getElementById('retiro').classList.remove('d-none');
    document.getElementById('input-retiro').value = '';
}
function deposito(){
    document.getElementById('home').classList.add('d-none');
    document.getElementById('deposito').classList.remove('d-none');
    document.getElementById('input-deposito').value = '';
}
function regresar(){
    document.getElementById('deposito').classList.add('d-none')
    document.getElementById('retiro').classList.add('d-none')
    document.getElementById('ver-saldo').classList.add('d-none')
    document.getElementById('home').classList.remove('d-none');
}
//Funciiones transacciones
function realizarDeposito(){
    let montoAgregado = parseInt(document.getElementById('input-deposito').value);
    console.log(montoAgregado);
    if(montoAgregado <= 1 || isNaN(montoAgregado)){
        alert('Monto incorrecto');
    } else {
        let nuevoSaldo = parseInt(usuarioLogueado.saldo) + parseInt(montoAgregado);
        console.log(nuevoSaldo);
        if(nuevoSaldo > saldoMax){
            alert('No es posible hacer depósito, saldo rebasa el monto máximo');
        } else {
            usuarioLogueado.saldo = nuevoSaldo;
            alert('Deposito realizado con éxito');
            actualizarSesion ()
            regresar();
        }
    }
}
function realizarRetiro(){
    let montoRetirado = parseInt(document.getElementById('input-retiro').value);
    console.log(montoRetirado);
    if(montoRetirado <= 1 || isNaN(montoRetirado) ){
        alert('Monto incorrecto');
    } else {
        let nuevoSaldo = parseInt(usuarioLogueado.saldo) - parseInt(montoRetirado);
        console.log(nuevoSaldo);
        if(nuevoSaldo < saldoMin) {
            alert('No es posible hacer retiro, la cuenta debe tener al menos ' + saldoMin);
        } else {
            usuarioLogueado.saldo = nuevoSaldo;
            alert('Retiro éxitoso');
            actualizarSesion ()
            regresar();
        }
    }
}
function actualizarSesion (){
    localStorage.removeItem('cuentas');
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
}
function cerrarSesion (){
    usuarioLogueado = null;
    history.go(0);
}