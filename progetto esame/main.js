function caricamento(stringa){
    var set = document.getElementById(stringa)
    set.classList.add("attivo")
}

// -----------------------------------------------------------------------
//login
function cambialog(){
    var login = document.getElementById('login')
    var registrati = document.getElementById('registrati')

    if (login.style.display == "none"){

        login.style.setProperty("display", "block")
        registrati.style.setProperty("display", "none")

    }else if(registrati.style.display == "none"){
        login.style.setProperty("display", "none")
        registrati.style.setProperty("display", "block")
    }
}

function cercausername(username){
    if (username != "" && username.length >= 3){
       fetch(`http://127.0.0.1:3000/cercausername?&username=${username}`)
       .then(risposta => {
            if (risposta.ok){
                risposta.text("messaggio").then(msg => {
                    var username = document.getElementById('username')
                    var errore = document.getElementById('log-errore')

                    if (msg == "ok"){
                        username.classList.remove('is-invalid')
                        username.classList.remove('invalid')
                        errore.innerHTML = ""
                        errore.classList.add("d-none")
                        username.classList.add("valido-login")
                    }else{
                        username.classList.remove("valido-login")
                        username.classList.add('is-invalid')
                        username.classList.add('invalid')
                        errore.innerHTML = msg
                        errore.classList.remove("d-none")
                    }
                })
            }
       })
    }else{
        var username = document.getElementById('username')
        username.classList.remove('is-invalid')
        username.classList.remove('invalid')
        username.classList.remove("valido-login")
    }
}

function cercamail(mail){
    if (mail != "" && mail.length >= 3){
        fetch(`http://127.0.0.1:3000/cercamail?&mail=${mail}`)
        .then(risposta => {
             if (risposta.ok){
                 risposta.text("messaggio").then(msg => {
                     var mail = document.getElementById('email')
                     var errore = document.getElementById('log-errore')
                
                     if (msg == "ok"){
                         mail.classList.remove('is-invalid')
                         mail.classList.remove('invalid')
                         errore.innerHTML = ""
                         errore.classList.add("d-none")
                         mail.classList.add("valido-login")
                     }else{
                         mail.classList.remove("valido-login")
                         mail.classList.add('is-invalid')
                         mail.classList.add('invalid')
                         errore.innerHTML = msg
                         errore.classList.remove("d-none")
                     }
                 })
             }
        })
     }else{
         var mail = document.getElementById('email')
         mail.classList.remove('is-invalid')
         mail.classList.remove('invalid')
         mail.classList.remove("valido-login")
     }
}

function controllapassword(daControllare){
    var maiuscola = /[A-Z]/
    var numeri = /[0-9]/
    var speciale = /[^A-Za-z0-9]/

    var spanMaiuscola = document.getElementById('maiusLogin')
    var spanNumeri = document.getElementById('numLogin')
    var spanSpeciale = document.getElementById('specLogin')
    var spanLen = document.getElementById('8charLogin')

    if (maiuscola.test(daControllare)){
        spanMaiuscola.classList.add('okpass-login')
        spanMaiuscola.classList.remove('nopass-login')
    }else{
        spanMaiuscola.classList.remove('okpass-login')
        spanMaiuscola.classList.add('nopass-login')

    }

    if (numeri.test(daControllare)){
        spanNumeri.classList.add('okpass-login')
        spanNumeri.classList.remove('nopass-login')
    }else{
        spanNumeri.classList.remove('okpass-login')
        spanNumeri.classList.add('nopass-login')

    }
    if (speciale.test(daControllare)){
        spanSpeciale.classList.add('okpass-login')
        spanSpeciale.classList.remove('nopass-login')
    }else{
        spanSpeciale.classList.remove('okpass-login')
        spanSpeciale.classList.add('nopass-login')

    }
    if (daControllare.length >= 8){
        spanLen.classList.add('okpass-login')
        spanLen.classList.remove('nopass-login')
    }else{
        spanLen.classList.remove('okpass-login')
        spanLen.classList.add('nopass-login')

    }

}

document.getElementById('registrazioneForm').addEventListener("submit", function(event){
    event.preventDefault()
    registrati()
})

function registrati(){
    var errore = document.getElementById('log-errore')
    var flag = true

    var nome = document.getElementById('nome')
    var cognome = document.getElementById('cognome')
    var email = document.getElementById('email')
    var username = document.getElementById('username')
    var password = document.getElementById('password')
    var conferma = document.getElementById('conferma')

    if (nome.value == ""){
        nome.classList.add('is-invalid')
        nome.classList.add('invalid')
        errore.innerHTML = "Nome vuoto"
        errore.classList.remove("d-none")
        flag = false
    }else{
        nome.classList.remove('is-invalid')
        nome.classList.remove('invalid')
        errore.innerHTML = ""
        errore.classList.add("d-none")
    }

    if (cognome.value == ""){
        cognome.classList.add('is-invalid')
        cognome.classList.add('invalid')
        errore.innerHTML = "Cognome vuoto"
        errore.classList.remove("d-none")
        flag = false
    }else{
        cognome.classList.remove('is-invalid')
        cognome.classList.remove('invalid')
        errore.innerHTML = ""
        errore.classList.add("d-none")
    }

    if (email.value == ""){
        email.classList.add('is-invalid')
        email.classList.add('invalid')
        errore.innerHTML = "Email vuota"
        errore.classList.remove("d-none")
        flag = false
    }else{
        email.classList.remove('is-invalid')
        email.classList.remove('invalid')
        errore.innerHTML = ""
        errore.classList.add("d-none")
    }

    if (username.value == ""){
        username.classList.add('is-invalid')
        username.classList.add('invalid')
        errore.innerHTML = "Username vuoto"
        errore.classList.remove("d-none")
        flag = false
    }else{
        username.classList.remove('is-invalid')
        username.classList.remove('invalid')
        errore.innerHTML = ""
        errore.classList.add("d-none")
    }

    if (password.value == ""){
        password.classList.add('is-invalid')
        password.classList.add('invalid')
        errore.innerHTML = "Password vuota"
        errore.classList.remove("d-none")
        flag = false
    }else{
        password.classList.remove('is-invalid')
        password.classList.remove('invalid')
        errore.innerHTML = ""
        errore.classList.add("d-none")
    }

    if (conferma.value == ""){
        conferma.classList.add('is-invalid')
        conferma.classList.add('invalid')
        errore.innerHTML = "Conferma password vuota"
        errore.classList.remove("d-none")
        flag = false
    }else{
        if (password.value != conferma.value){
            password.classList.add('is-invalid')
            password.classList.add('invalid')
            conferma.classList.add('is-invalid')
            conferma.classList.add('invalid')
            errore.innerHTML = "Le password non coincidono"
            errore.classList.remove("d-none")
            flag = false
        }else{
            password.classList.remove('is-invalid')
            password.classList.remove('invalid')
            conferma.classList.remove('is-invalid')
            conferma.classList.remove('invalid')
            errore.innerHTML = ""
            errore.classList.add("d-none")
        }
    }

    

    if (flag){
        var data = {
            name: nome.value,
            surname: cognome.value,
            username: username.value,
            email: email.value,
            password: password.value
        }
        
        fetch("http://127.0.0.1:3000/registrazione", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                window.location.href = "login.html"
            } else {
                response.text().then(text =>{
                    errore.innerHTML = text
                    errore.classList.remove("d-none")
                })
                
            }
            
        })
    }
}

document.getElementById('loginForm').addEventListener("submit", (event) =>{
    event.preventDefault()
    login()
})

function login(){
    var id = document.getElementById('log-id').value
    var password = document.getElementById('log-password').value

    
    user = {
        id: id,
        password: password
    }    

    fetch("http://127.0.0.1:3000/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(logged_user => {

        if (logged_user.err == true){
            console.log
            document.getElementById('log-password').value= ""
            var errore = document.getElementById('log-errore')
            errore.innerHTML= logged_user.messaggio
            errore.classList.remove("d-none")


        }else{
            localStorage.setItem("user", JSON.stringify(logged_user))
            window.location.href = "index.html"
        }

    })
}


// -----------------------------------------------------------------------
// utente

function cambiautente(stringa){
    var profiloDiv = document.getElementById('profiloUtenteDiv')
    var logoutDiv = document.getElementById('logoutUtenteDiv')
    var profilo = document.getElementById('profiloUtente')
    var logout = document.getElementById('logoutUtente')


    if (stringa == "profilo"){

        profiloDiv.style.setProperty("display", "block")
        profilo.classList.add("utente-attivo")
        logoutDiv.style.setProperty("display", "none")
        logout.classList.remove("utente-attivo")


    }else if (stringa == "logout"){
        
        logoutDiv.style.setProperty("display", "block")
        logout.classList.add("utente-attivo")
        profiloDiv.style.setProperty("display", "none")
        profilo.classList.remove("utente-attivo")
    }
}

function logout(stringa){
    localStorage.removeItem("user");
    if (stringa == "home"){
        window.location.href = "index.html"
    }else if (stringa == "cambio"){
        window.location.href = "login.html"
    }
}