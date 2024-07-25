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
                movieCard.classList = "carousel-item max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 m-2";
                const poster = document.createElement("img");
                const imageSize = "w500" //determines the width of the poster
                poster.src = 'https://image.tmdb.org/t/p/' + imageSize + element.poster_path;
                poster.alt = element.title;
                movieCard.appendChild(poster);
                const title = document.createElement("h1");
                title.textContent = element.title;
                title.classList = "px-6 py-4 font-bold text-xl mb-2 text-yellow-400";
                movieCard.appendChild(title);
                const overview = document.createElement("p");
                overview.textContent = element.overview;
                overview.classList = "text-gray-300 text-base";
                movieCard.appendChild(overview);
                const favoriteButton = document.createElement("button");
                favoriteButton.textContent = "Add to Favorites";
                favoriteButton.addEventListener("click", () => {
                    const previousData = JSON.parse(localStorage.getItem('favorites')) || [];
                    localStorage.setItem('favorites', JSON.stringify([...previousData, element]));
                });
                favoriteButton.classList = "bg-yellow-500 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded";
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
            poster.alt = element.title;
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
                });
                favoriteButton.classList = "bg-yellow-500 hover:bg-yellow-700 text-gray-900 font-bold py-2 px-4 rounded";
                movieCard.appendChild(favoriteButton);
            container.appendChild(movieCard);
            //console.log(element)
        });
    } catch (error) {
        console.error(error);
    }
})

// Selecting carousel elements
const track = document.querySelector('.carousel-track');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
let currentIndex = 0;

// Function to update carousel position
function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').clientWidth;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

// Event listener for previous button
prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Event listener for next button
nextButton.addEventListener('click', () => {
    if (currentIndex < track.children.length - 3) {
        currentIndex++;
        updateCarousel();
    }
});

// Update carousel position on window resize
window.addEventListener('resize', updateCarousel);