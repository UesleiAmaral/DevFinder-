import { FavoritesView } from "./Favorites.js";


const buttonSearch = document.querySelector('.favorites');

buttonSearch.addEventListener('click', (event) => {
  event.preventDefault();
  new FavoritesView('#app');


});
