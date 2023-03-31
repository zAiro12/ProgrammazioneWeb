function validazione() {
    var flag = true
    var termini = document.getElementById('termini')
    var termini_label = document.getElementById('labelTermini')
    var titolo = document.getElementById('titolo')
    var attore = document.getElementById('attore')


    if (titolo.value == "" && attore.value == "") {
        titolo.classList.add('is-invalid')
        attore.classList.add('is-invalid')
        flag = false
    } else {
        titolo.classList.remove('is-invalid')
        attore.classList.remove('is-invalid')

    }

    if (!termini.checked) {
        termini_label.classList.add('text-danger')
        termini.classList.add('is-invalid')
        flag = false
    } else {
        termini_label.classList.remove('text-danger')
        termini.classList.remove('is-invalid')
    }

    // alert("Sono nella funzione validazione")

    return flag


}