let cuentas = [
    {nombre: 'Mali', password: '1234', saldo: 280, img: '../img/perfil-mali.jpg' },
    {nombre: 'Maui', password: '5678', saldo: 550, img: '../img/perfil-maui.jpg' },
    {nombre: 'Gera', password: '4321', saldo: 150, img: '../img/perfil-gera.jpg' },
    {nombre: 'Monster', password: '1234', saldo: 11, img: '../img/perfil-gera.jpg' }
]
const saldoMax = 990;
const saldoMin = 10;
let usuarioLogueado = null;
let btnCancelarDeposito = document.getElementById('cancelar-deposito').addEventListener('click', regresar);
let btnCancelarRetiro = document.getElementById('cancelar-retiro').addEventListener('click', regresar);
let btnRegresar = document.getElementById('regresar').addEventListener('click', regresar);
let btnRealizarDeposito =  document.getElementById('aceptar-deposito').addEventListener('click', realizarDeposito);
let btnRealizarRetiro = document.getElementById('aceptar-retiro').addEventListener('click', realizarRetiro );
let btnCerrarSesion = document.getElementById('cerrar-sesion').addEventListener('click', cerrarSesion);

console.log(localStorage.getItem('cuentas'));

if(localStorage.getItem('cuentas') !== null ){
    let cuentasSesion = JSON.parse(localStorage.getItem('cuentas'));
    cuentas = cuentasSesion;
} else {
   localStorage.setItem('cuentas', JSON.stringify(cuentas));
}

function login(){
    let inputUsuario = document.getElementById('input-usuario').value;
    let password = document.getElementById('input-password').value;
    console.log(cuentas.length);
    for(let i = 0; i < cuentas.length; i++){ // uso de for porque forEach no tiene un break
        usuario = cuentas[i];
        console.log(usuario.nombre , inputUsuario);
        if(usuario.nombre == inputUsuario){
            console.log('Usuario correcto');

            if(usuario.password == password){
                console.log('Password correcto');
                usuarioLogueado = usuario;
                document.getElementById('login').classList.add('d-none');
                document.getElementById("interfaz").classList.remove('d-none');
                document.getElementById('home').classList.remove('d-none');
                let spanNombreUsuario = document.getElementById('nombre-usuario');
                spanNombreUsuario.innerHTML = usuarioLogueado.nombre;
                break;
            }
        } else {
            console.log('usuario incorrecto');
        }
    }
}

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

function realizarDeposito(){
    let montoAgregado = parseInt(document.getElementById('input-deposito').value);
    console.log(montoAgregado);
    if(montoAgregado <= 1 || isNaN(montoAgregado)){
        console.log('Monto incorrecto');
    } else {
        let nuevoSaldo = parseInt(usuarioLogueado.saldo) + parseInt(montoAgregado);
        console.log(nuevoSaldo);
        if(nuevoSaldo > saldoMax){
            console.log('No es posible hacer depósito, saldo rebasa el monto máximo');
        } else {
            usuarioLogueado.saldo = nuevoSaldo;
            console.log('Deposito realizado con éxito');
            actualizarSesion ()
            regresar();
        }
    }
}

function realizarRetiro(){
    let montoRetirado = parseInt(document.getElementById('input-retiro').value);
    console.log(montoRetirado);
    if(montoRetirado <= 1 || isNaN(montoRetirado) ){
        console.log('Monto incorrecto');
    } else {
        let nuevoSaldo = parseInt(usuarioLogueado.saldo) - parseInt(montoRetirado);
        console.log(nuevoSaldo);
        if(nuevoSaldo < saldoMin) {
            console.log('No es posible hacer retiro, la cuenta debe tener al menos ', saldoMin);
        } else {
            usuarioLogueado.saldo = nuevoSaldo;
            console.log('Retiro éxitoso');
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