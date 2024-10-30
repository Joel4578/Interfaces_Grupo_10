document.getElementById('loginButton').addEventListener('click', function() {
    // Ocultar iconos de error
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';

    // Obtener valores de los inputs
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let valid = true;

    // Validar el correo electrónico
    if (!email) {
        document.getElementById('emailError').style.display = 'block'; // Muestra el icono
        document.getElementById('email').classList.add('input-error'); // Añade la clase de error
        valid = false;
    } else {
        document.getElementById('email').classList.remove('input-error'); // Elimina la clase si está lleno
    }

    // Validar la contraseña
    if (!password) {
        document.getElementById('passwordError').style.display = 'block'; // Muestra el icono
        document.getElementById('password').classList.add('input-error'); // Añade la clase de error
        valid = false;
    } else {
        document.getElementById('password').classList.remove('input-error'); // Elimina la clase si está lleno
    }

    // Si todos los campos son válidos, redirigir
    if (valid) {
        window.location.href = 'home.html'; // Cambia por la URL de destino
    }
});



