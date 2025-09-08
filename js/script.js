document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar a");
    const content = document.getElementById("content");

    function loadSection(url) {
        fetch(url)
            .then(res => res.text())
            .then(data => {
                content.innerHTML = data; // Pone el contenido en el <main>
                history.pushState({ url }, "", `#${url}`);
            })
            .catch(() => {
                content.innerHTML = "<p>Error al cargar la sección.</p>";
            });
    }

    // Manejar clicks en el menú
    links.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const url = link.getAttribute("href");
            loadSection(url);
        });
    });

    // Manejar botón "Atrás"
    window.addEventListener("popstate", e => {
        if (e.state && e.state.url) {
            loadSection(e.state.url);
        } else {
            loadSection("secciones/introduccion.html");
        }
    });

    // Cargar Introducción al inicio
    loadSection("secciones/introduccion.html");
});
