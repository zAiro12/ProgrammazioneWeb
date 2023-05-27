function mostraTraccia(risposta){
    var traccia = document.getElementById("nomeTraccia")
    var artista = document.getElementById("nomeArtista")
    var album = document.getElementById("nomeAlbum")
    var img = document.getElementById("copertina")

    traccia.innerHTML = risposta.name
    artista.innerHTML = risposta.artist.name
    album.innerHTML = risposta.album.name
    console.log(risposta.album.images)
    // img.src = risposta.album.images
}