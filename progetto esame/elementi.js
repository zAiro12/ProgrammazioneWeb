const elementiMenu = [
    { nome: "Ricerca", link: "ricerca.html" },
    { nome: "Playlist", link: "playlist.html" }
]

var menuHTML = "";
for (let i = 0; i < elementiMenu.length; i++) {
    let item = elementiMenu[i];
    menuHTML += `<li class="nav-item"><a id="nav-${item.nome}" class="nav-link" href="${item.link}">${item.nome}</a></li> `;
}


var utente = ''
if(localStorage.getItem('user') != null){
    var user = JSON.parse(localStorage.getItem('user'))

    utente = `<li class="nav-item"><a id="nav-login" class="nav-link" href="utente.html">${user.username}</a></li>`
}else{
    utente = `<li class="nav-item"><a id="nav-login" class="nav-link" href="login.html">login</a></li>`
}


const navbar = document.getElementById('navbar')
navbar.innerHTML = `
    <nav class="navbar navbar-expand-sm ">
            <div class="container-fluid">
            <a class="navbar-brand" id="nav-index" href="index.html">zAirfy</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    ${menuHTML}
                    
                    ${utente}
                </ul>
            </div>
            </div>
        </nav> ` 


