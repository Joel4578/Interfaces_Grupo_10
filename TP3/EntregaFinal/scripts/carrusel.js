function configurarCarrusel(izqBtn, derBtn, content) {
    const maxScrollIzq = content.scrollWidth - content.clientWidth;

    function actualizarFlechas() {
        if (content.scrollLeft <= 0) {
            izqBtn.classList.add("flecha-oculta");
        } else {
            izqBtn.classList.remove("flecha-oculta");
        }
        if (Math.ceil(content.scrollLeft) >= Math.ceil(maxScrollIzq)) {
            derBtn.classList.add("flecha-oculta");
        } else {
            derBtn.classList.remove("flecha-oculta");
        }

        actualizarVisibilidadTarjetas();
    }

    function actualizarVisibilidadTarjetas() {
        const tarjetas = content.querySelectorAll('.card');
        const contentRect = content.getBoundingClientRect();

        tarjetas.forEach(tarjeta => {
            const tarjetaRect = tarjeta.getBoundingClientRect();

            if (
                tarjetaRect.left >= contentRect.left &&
                tarjetaRect.right <= contentRect.right
            ) {
                tarjeta.classList.add('visible');
            } else {
                tarjeta.classList.remove('visible');
            }
        });
    }

    actualizarFlechas();

    derBtn.addEventListener("click", () => {
        content.scrollLeft += 204;
        setTimeout(actualizarFlechas, 400);
    });

    izqBtn.addEventListener("click", () => {
        content.scrollLeft -= 204;
        setTimeout(actualizarFlechas, 400);  
    });

    content.addEventListener("scroll", actualizarFlechas);
}

document.querySelectorAll(".categoria-con-juegos").forEach(categoria => {
    const derBtn = categoria.querySelector(".flecha-der");
    const izqBtn = categoria.querySelector(".flecha-izq");
    const content = categoria.querySelector(".juegos");

    configurarCarrusel(izqBtn, derBtn, content);
});


// juegos destacados
const circulitos = document.querySelectorAll(".circulo"); 
let circulitoActual = 0; 

function actualizarCirculitos() {
    circulitos.forEach((circulo, index) => {
        if (index === circulitoActual) {
            circulo.classList.add("posicion-circulo");
        } else {
            circulo.classList.remove("posicion-circulo");
        }
    });
}

function configurarCarruselDestacados() {
    const maxScrollIzq = contentDestacados.scrollWidth - contentDestacados.clientWidth;

    function actualizarFlechas() {
        if (contentDestacados.scrollLeft <= 0) {
            izqBtnDest.classList.add("flecha-oculta");
        } else {
            izqBtnDest.classList.remove("flecha-oculta");
        }
        if (Math.ceil(contentDestacados.scrollLeft + 1) >= Math.ceil(maxScrollIzq)) {
            derBtnDest.classList.add("flecha-oculta");
        } else {
            derBtnDest.classList.remove("flecha-oculta");
        }
    }

    function moverCirculito() {
        const scrollLeft = contentDestacados.scrollLeft;
        const totalItems = circulitos.length;
        const itemWidth = maxScrollIzq / (totalItems - 1);

        circulitoActual = Math.round(scrollLeft / itemWidth);
        actualizarCirculitos();
    }

    actualizarFlechas();
    moverCirculito();

    derBtnDest.addEventListener("click", () => {
        contentDestacados.scrollLeft += 413;
        setTimeout(() => {
            actualizarFlechas();
            moverCirculito();
        }, 300); 
    });

    izqBtnDest.addEventListener("click", () => {
        contentDestacados.scrollLeft -= 413;
        setTimeout(() => {
            actualizarFlechas();
            moverCirculito();
        }, 300);
    });

    contentDestacados.addEventListener("scroll", () => {
        actualizarFlechas();
        moverCirculito();
    });
}

const derBtnDest = document.querySelector("#scroll-btn-derecha-Dest");
const izqBtnDest = document.querySelector("#scroll-btn-izquierda-Dest");
const contentDestacados = document.querySelector(".juegos-destacados");

configurarCarruselDestacados();
actualizarCirculitos();