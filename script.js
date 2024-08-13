gsap.registerPlugin(ScrollTrigger);

// Animación para el texto de introducción
gsap.to(".animated-text", {
    duration: 1,
    opacity: 1,
    y: 0,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#intro",
        start: "top center",
        end: "bottom center",
        scrub: 1
    }
});

// Animaciones para las secciones de servicios
gsap.utils.toArray(".servicio").forEach((servicio, i) => {
    gsap.from(servicio, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: servicio,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
        }
    });
});

// Animación para los casos de estudio
gsap.from(".caso", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.2,
    scrollTrigger: {
        trigger: "#portafolio",
        start: "top 80%",
        end: "top 20%",
        scrub: 1
    }
});

// Animación para el formulario de contacto
gsap.from("#contacto form", {
    opacity: 0,
    y: 50,
    duration: 1,
    scrollTrigger: {
        trigger: "#contacto",
        start: "top 80%",
        end: "top 20%",
        scrub: 1
    }
});

// Manejo del envío del formulario
document.querySelector('#contacto form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
});

// Animación del menú de navegación al hacer scroll
let lastScrollTop = 0;
window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        document.querySelector('header').style.top = '-80px';
    } else {
        document.querySelector('header').style.top = '0';
    }
    lastScrollTop = scrollTop;
});

// Transiciones de página
const pageTransition = () => {
    var tl = gsap.timeline();
    tl.to('ul.transition li', {duration: .5, scaleY: 1, transformOrigin: "bottom left", stagger: .2})
    tl.to('ul.transition li', {duration: .5, scaleY: 0, transformOrigin: "bottom left", stagger: .1, delay: .1})
}

// Función para cargar contenido de manera dinámica
function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector('main').innerHTML = html;
            pageTransition();
        });
}

// Event listeners para los enlaces de navegación
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        loadContent(href);
    });
});

// Animación para las páginas de detalle de servicios
if (document.querySelector('.servicio-detalle')) {
    gsap.from('.servicio-detalle h1', { opacity: 0, y: 50, duration: 1 });
    gsap.from('.servicio-detalle img', { opacity: 0, scale: 0.8, duration: 1, delay: 0.3 });
    gsap.from('.servicio-detalle p, .servicio-detalle ul', { opacity: 0, y: 30, duration: 1, stagger: 0.2, delay: 0.6 });
}