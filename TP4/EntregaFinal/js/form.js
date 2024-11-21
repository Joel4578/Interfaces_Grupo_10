const btn = document.getElementById('btn-mail');
const mensaje = document.getElementById('mensaje');
const inputMail = document.getElementById('input-mail');

btn.addEventListener('click', mostrarMensaje);

function mostrarMensaje(){
    if(!inputMail){
        mensaje.style.display ="flex";
    }
}