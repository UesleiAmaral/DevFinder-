import { Favorites } from "./Favorites.js";

export class Profile {
  constructor(root, user) {
    this.user = user;
    this.local_Storage = JSON.parse(localStorage.getItem('@github-favorites')) || [];
    this.root = document.querySelector(root);
    this.favorites = new Favorites('app');
    this.findUser = this.local_Storage.find(entry => entry.login === this.user.login);
    this.update();

  };

  isFavorite(root) {
    const star = root.querySelector('.star');
    const star_red = root.querySelector('.star-red');

    if (this.findUser) {
      star.classList.add('hide');
      star_red.classList.remove('hide');

    };
  };

  save() {
    this.local_Storage.push(this.user);
    localStorage.setItem('@github-favorites', JSON.stringify(this.local_Storage));

  };

  addFavorites(element) {
    const star = element.querySelector('.star');

    star.addEventListener('click', () => {
      const starRed = element.querySelector('.star-red');
      starRed.classList.remove('hide');
      star.classList.add('hide');

      if (this.findUser) {
        return;

      } else {
        this.save();

      };
    });
  };

  removeFavorites(element) {
    const starRed = element.querySelector('.star-red');

    starRed.addEventListener('click', () => {
      const star = element.querySelector('.star')
      const isOk = confirm('Deseja Realmente Deletar o Favorito?');
      star.classList.remove('hide');
      starRed.classList.add('hide');

      if (isOk) {
        this.local_Storage = this.local_Storage.filter((entry) => entry.login != this.user.login);
        localStorage.setItem('@github-favorites', JSON.stringify(this.local_Storage));

      };
    });
  };

  update() {
    this.root.innerHTML = '';
    this.addProfile();

  };

  createProfile({ login, name, created_at, bio, public_repos, followers, following, location }) {
    
    const data = new Date(created_at);
    const dataDay = String(data.getDate());
    const dataMonth = String(data.getMonth() + 1);

    let dataFormat = (dataDay.padStart(2, '0') + '/' + dataMonth.padStart(2, '0') + '/' + (data.getFullYear()));

    if (bio === null) {
      bio = '';

    };

    if (location === null) {
      location = 'Localização';
    }



    const profile = document.createElement('div');
    profile.classList.add('profile-user');

    profile.innerHTML = `

  <figure class="image-user">
    <img src="https://github.com/${login}.png" alt="">
  </figure>

  <div class="user">
    <div class="name-user">
      <h2>${name}</h2>
      <span>github.com/${login}</span>
    </div>

    <div class="date">
      <span>Joined:</span>
      <span class="day">${dataFormat}</span>
    </div>

    <div class="my-favorites">

      <button class="star">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9655/9655065.png"
          alt="">
      </button>

      <button class="star-red hide">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9654/9654683.png"
          alt="">
      </button>

    </div>

    <p>${bio}</p>

    <table class="date-profile">
      <thead>
        <th>Repos</th>
        <th>Followers</th>
        <th>Following</th>
      </thead>
      <tbody>
        <tr>
          <td class="repos">${public_repos}</td>
          <td class="followers">${followers}</td>
          <td class="following">${following}</td>
        </tr>
      </tbody>
    </table>

    <div class="contacts">
      <a href="#"><img
          src="https://cdn-icons-png.flaticon.com/512/2702/2702604.png"
          alt="cidade do usuario">${location}</a>
      <a href="#"><img
          src="https://cdn-icons-png.flaticon.com/512/270/270798.png"
          alt="github do usuario">Github</a>
      <a href="#"><img
          src="https://cdn-icons-png.flaticon.com/512/270/270826.png"
          alt="twiter do usuario">Twitter</a>
      <a href="#"><img
          src="https://cdn-icons-png.flaticon.com/512/270/270808.png"
          alt="linkedin do usuario">Linkedin</a>
    </div>
  </div>

    `;

    return profile;

  };

  addProfile() {

    
    
    const elementData = this.createProfile({
      login: this.user.login,
      name: this.user.name,
      public_repos: this.user.public_repos,
      followers: this.user.followers,
      bio: this.user.bio,
      following: this.user.following,
      created_at: this.user.created_at,
      location: this.user.location

    });
    
    this.isFavorite(elementData);
    this.addFavorites(elementData);
    this.removeFavorites(elementData);
    this.root.append(elementData);

  };
};

