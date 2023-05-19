const menuItems = [
    { label: "Home", link: "index.html" },
    { label: "Ricerca", link: "ricerca.html" },
    { label: "Scheda Film", link: "scheda-film.html?id_film=502356" },

    { label: "Scheda Attore", link: "scheda-attore.html?id_attore=502356" },
]


var menuHTML = "";

for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    menuHTML += `<li class="nav-item"><a class="nav-link" href="${item.link}">${item.label}</a></li>`;
}

const menuElement = document.getElementById('menu');
menuElement.innerHTML = `
<nav class="navbar navbar-expand-md bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Movie</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    ${menuHTML}

                </ul>
            </div>
        </div>
    </nav>
`;
 