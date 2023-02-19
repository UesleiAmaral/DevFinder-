import { FavoritesView } from "./Favorites.js";


const buttonFavorites = document.querySelector('.favorites');

buttonFavorites.addEventListener('click', (event) => {
  event.preventDefault();
  new FavoritesView('#app');

});

