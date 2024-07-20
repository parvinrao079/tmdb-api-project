const container = document.getElementById("movie-container");
const searchButton = document.getElementById("submit-search");
const searchInput = document.getElementById("search");

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjE2NWQwYjZmNWQ3YmMyZjRiNTZmZmUxYTM3NzI2ZCIsIm5iZiI6MTcyMTQ2MzIwNi4yNTI5ODgsInN1YiI6IjY2OWI2NzhjY2E3NTY0NmZkNDY5YjMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m5gwpj__zGc1_-DcMK85DQo5JNZpOoCH0rHVTN9H18U'
  }}
  
    window.addEventListener('load', async () => {
        try {
            const res = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);
            if (!res.ok) throw new Error('Something went wrong');
            const data = await res.json();
            //console.log(data)
            data.results.forEach(element => {
                const movieCard = document.createElement("div");
                const poster = document.createElement("img");
                const imageSize = "w200" //determines the width of the poster
                poster.src = 'https://image.tmdb.org/t/p/' + imageSize + element.poster_path;
                movieCard.appendChild(poster);
                const title = document.createElement("h1");
                title.textContent = element.title;
                movieCard.appendChild(title);
                const overview = document.createElement("p");
                overview.textContent = element.overview;
                movieCard.appendChild(overview);
                const favoriteButton = document.createElement("button");
                favoriteButton.textContent = "Add to Favorites";
                favoriteButton.addEventListener("click", () => {
                    const previousData = JSON.parse(localStorage.getItem('favorites')) || [];
                    localStorage.setItem('favorites', JSON.stringify([...previousData, element]));
                })
                movieCard.appendChild(favoriteButton);
                container.appendChild(movieCard);
                //console.log(element)
            });
        } catch (error) {
            console.error(error);
        }
    })

searchButton.addEventListener("click", async () => {
    container.replaceChildren();
    const query = searchInput.value.replaceAll(" ","%20");
    try {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`, options);
        if (!res.ok) throw new Error('Something went wrong');
        const data = await res.json();
        //console.log(data)
        data.results.forEach(element => {
            const movieCard = document.createElement("div");
            const poster = document.createElement("img");
            const imageSize = "w200" //determines the width of the poster
            poster.src = 'https://image.tmdb.org/t/p/' + imageSize + element.poster_path;
            movieCard.appendChild(poster);
            const title = document.createElement("h1");
            title.textContent = element.title;
            movieCard.appendChild(title);
            const overview = document.createElement("p");
            overview.textContent = element.overview;
            movieCard.appendChild(overview);
            const favoriteButton = document.createElement("button");
                favoriteButton.textContent = "Add to Favorites";
                favoriteButton.addEventListener("click", () => {
                    const previousData = JSON.parse(localStorage.getItem('favorites')) || [];
                    localStorage.setItem('favorites', JSON.stringify([...previousData, element]));
                })
                movieCard.appendChild(favoriteButton);
            container.appendChild(movieCard);
            //console.log(element)
        });
    } catch (error) {
        console.error(error);
    }
})

function addFavoriteButton () {
    const button = document.createElement("button");
    button.textContent = "Add to Favorites";
    button.addEventListener("click", () => {

    })
}