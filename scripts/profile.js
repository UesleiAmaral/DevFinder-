import { Favorites } from "./Favorites.js";

export class Profile {
  constructor(root, user) {
    this.root = document.querySelector(root);
    this.favorites = new Favorites('app');

    this.user = user;

    this.update();

  };

  addFavorites(element) {
    const star = element.querySelector('.star');

    star.addEventListener('click', () => {
      const starRed = element.querySelector('.star-red')
      starRed.classList.remove('hide');
      star.classList.add('hide');

    })

    // AQUI VEM A ADIÇAO AO LOCALSTORAGE

  }

  removeFavorites(element) {
    const starRed = element.querySelector('.star-red');

    starRed.addEventListener('click', () => {
      const star = element.querySelector('.star')
      star.classList.remove('hide');
      starRed.classList.add('hide');

    })

    // AQUI VEM A EXCLUSÃO DO LOCALSTORAGE
  }

  update() {

    this.root.innerHTML = '';
    this.addProfile();

  };


  createProfile({ login, name, joined, bio, public_repos, followers, following }) {

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
      <span>${joined}</span>
      <span class="day">25</span>
      <span class="mes">Jan</span>
      <span class="year">2020</span>

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
          alt="cidade do usuario">Valinhos/sp</a>
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

    this.user.forEach(element => {
      const elementData = this.createProfile({
        login: element.login,
        name: element.name,
        public_repos: element.public_repos,
        followers: element.followers,
        bio: element.bio,
        following: element.following
      });
      
      this.addFavorites(elementData);
      this.removeFavorites(elementData);
      this.root.append(elementData);

    });

  }
};

