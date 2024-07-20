const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZjE2NWQwYjZmNWQ3YmMyZjRiNTZmZmUxYTM3NzI2ZCIsIm5iZiI6MTcyMTQ2MzIwNi4yNTI5ODgsInN1YiI6IjY2OWI2NzhjY2E3NTY0NmZkNDY5YjMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.m5gwpj__zGc1_-DcMK85DQo5JNZpOoCH0rHVTN9H18U'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const favoritesContainer = document.getElementById('favorites-container');
    const favoriteMovies = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favoriteMovies.length === 0) {
        favoritesContainer.innerHTML = '<p class="text-center text-xl col-span-3">No favorite movies added yet.</p>';
        return;
    }

    favoriteMovies.forEach(async (movie) => {
        const movieDetails = await fetchMovieDetails(movie.id);
        renderMovieCard(movieDetails, movie.notes);
    });

    async function fetchMovieDetails(movieId) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options);
            if (!response.ok) throw new Error('Failed to fetch movie details');
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    function renderMovieCard(movie, notes) {
        const movieCard = document.createElement('div');
        movieCard.classList.add('bg-white', 'p-4', 'rounded', 'shadow-md');

        const poster = document.createElement('img');
        const imageSize = "w200";
        poster.src = 'https://image.tmdb.org/t/p/' + imageSize + movie.poster_path;
        poster.alt = movie.title;
        poster.classList.add('w-30', 'h-auto', 'mx-auto');
        movieCard.appendChild(poster);

        const title = document.createElement('h1');
        title.textContent = movie.title;
        title.classList.add('text-xl', 'font-bold', 'mt-2','text-center');
        movieCard.appendChild(title);

        const overview = document.createElement('p');
        overview.textContent = movie.overview;
        overview.classList.add('text-sm', 'mt-2');
        movieCard.appendChild(overview);

        const notesLabel = document.createElement('label');
        notesLabel.textContent = 'Personal Notes:';
        notesLabel.classList.add('block', 'mt-4');
        movieCard.appendChild(notesLabel);

        const notesTextarea = document.createElement('textarea');
        notesTextarea.classList.add('w-full', 'border', 'rounded', 'p-2', 'mt-2');
        notesTextarea.value = notes || '';
        notesTextarea.addEventListener('input', (event) => {
            const updatedFavorites = favoriteMovies.map(fav => {
                if (fav.id === movie.id) {
                    return { ...fav, notes: event.target.value };
                }
                return fav;
            });
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        });
        movieCard.appendChild(notesTextarea);

        favoritesContainer.appendChild(movieCard);
    }
});
