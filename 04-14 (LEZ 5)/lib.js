const baseImg = "https://www.themoviedb.org/t/p/w220_and_h330_face"
var card = document.getElementById("card-film")


for (let i = popolari.results.length-1; i >=0; i--) {
    var clone = card.cloneNode(true)

    clone.id = "card-film-" + i
    clone.getElementsByClassName("card-title")[0].innerHTML = popolari.results[i].title
    clone.getElementsByClassName("card-img-top")[0].src =baseImg +  popolari.results[i].poster_path
    clone.getElementsByClassName("card-text")[0].innerHTML = popolari.results[i].overview
    clone.getElementsByClassName("text-body-secondary")[0].innerHTML= popolari.results[i].release_date
    clone.getElementsByClassName('btn')[0].href = "scheda-film.html?id_film=" + popolari.results[i].id
    
    clone.classList.remove("d-none")
   
    card.after(clone)
}