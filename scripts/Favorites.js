import { Profile } from "./Profile.js";

export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();

  };

  load() {
    this.data = JSON.parse(localStorage.getItem('@github-favorites')) || [];

  };

  save() {
    localStorage.setItem('@github-favorites', JSON.stringify(this.data));

  };

  delete(user, elementData) {

    elementData.querySelector('.star-delete').addEventListener('click', event => {
      event.preventDefault();

      const isOk = confirm('Deseja Realmente Deletar o Favorito?');

      if (isOk) {
        this.data = this.data.filter((entry) => entry.login != user.login);
        this.save();
        this.update();

      };
    });
  };
};

export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);
    this.buttonFavorites();

  };

  update() {
    this.root.innerHTML = '';
    this.addAllFavorites();

  };

  buttonFavorites() {
    const buttonFavorites = document.querySelector('.favorites');
    buttonFavorites.addEventListener('click', (event) => {
      event.preventDefault();
      this.load();
      this.update();

    });
  };

  addAllFavorites() {
    this.data.forEach(user => {

      const elementData = this.createFavorites({
        login: user.login,
        name: user.name,
        public_repos: user.public_repos,
        followers: user.followers,
      });

      this.delete(user, elementData);
      this.root.append(elementData);

      elementData.querySelectorAll('.view-profile').forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          this.root.innerHTML = '';
          new Profile('#app');

        });
      });
    });
  };

  createFavorites({ login, name, public_repos, followers }) {
    const div = document.createElement('div');
    div.classList.add('view-favorites');

    div.innerHTML =
      `
      <table
        cellpadding="0"
        cellspacing="0">
        <thead>
          <th>Usuário</th>
          <th>Repositórios</th>
          <th>Followers</th>
          <th></th>
        </thead>
        <tbody>
          <tr>
            <td class="user">
              <a class="view-profile">
                <img src="https://github.com/${login}.png" alt="Imagem do(a)
                Usuário(a) ${name}">
              </a>
                <a href="https://github.com/${login}" target="_blank">
                <p>${name}</p>
                <span>github.com/${login}</span>
              </a>
            </td>
            <td class="repositories">${public_repos}</td>
            <td class="followers">${followers}</td>
            <td>
              <button class="star-delete">
                <img src="https://cdn-icons-png.flaticon.com/512/9654/9654683.png" alt="">
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    `
    return div;
  };
};
