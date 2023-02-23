import { GithubUser } from "./GithubUser.js";
import { Profile } from "./profile.js";

export class Search {
  constructor(root) {

    this.root = document.querySelector(root);
    this.onAdd();

  };

  dataSearch() {
    this.data = [];

  }

  async add(user) {
    const userData = await GithubUser.search(user);

    this.data = [userData];

    this.data.forEach((element) => {
      this.renderSearch(element.login, element.name, element.public_repos, element.followers);

    })

  };

  onAdd() {
    const search = document.querySelector('.search-button');

    search.addEventListener('click', () => {
      let { value } = document.querySelector('.input-search');

      this.add(value);

    })

  };

  renderSearch(login, name, public_repos, followers) {

    const element = this.createSearch({
      login,
      name,
      public_repos,
      followers,
    });

    element.querySelector('.profile').addEventListener('click', (event) => {
      event.preventDefault();
      this.root.innerHTML = '';
      new Profile('#app', this.data);

    });

    this.root.append(element);


  }

  createSearch({ login, name, public_repos, followers }) {
    const div = document.createElement('div');
    div.classList.add('view-search');

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
            <img src="https://github.com/${login}.png" alt="Imagem do(a)
              Usuário(a) ${name}">
            <a href="https://github.com/${login}" target="_blank">
              <p>${name}</p>
              <span>github.com/${login}</span>
            </a>
          </td>
          <td class="repositories">${public_repos}</td>
          <td class="followers">${followers}</td>
          <td><a class="profile"><img
                src="https://cdn-icons-png.flaticon.com/512/8847/8847153.png"
                alt=""></a>
          </td>
        </tr>
      </tbody>
    </table>

    `
    return div;
  };


}