document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.enviar').addEventListener('click', function(event) {
        event.preventDefault();
        const inputs = document.querySelectorAll('input[type="text"], input[type="date"]');
        let allFilled = true;

        inputs.forEach((input) => {
            const errorIcon = input.nextElementSibling;
            if (input.value.trim() === '') {
                errorIcon.style.display = 'inline';
                input.classList.add('input-error');
                allFilled = false;
            } else {
                errorIcon.style.display = 'none';
                input.classList.remove('input-error');
            }
        });

        if (allFilled) {
            window.location.href = 'home.html';
        }
    });
});


