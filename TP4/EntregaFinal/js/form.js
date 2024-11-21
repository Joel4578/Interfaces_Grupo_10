const btn = document.getElementById('btn-mail');
const mensaje = document.getElementById('mensaje');
const inputMail = document.getElementById('input-mail');

btn.addEventListener('click', mostrarMensaje);

function mostrarMensaje() {
    if (!inputMail.value.trim()) { // Verifica si el valor está vacío o contiene solo espacios
        mensaje.style.display = "none"; // Oculta el mensaje si el campo no está vacío
    } else {
        mensaje.style.display = "flex";
        setTimeout(() => {
            mensaje.style.display = "none"; // Oculta el mensaje después de 3 segundos
        }, 3000);
        inputMail.value = "";
    }
}