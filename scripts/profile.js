import { Favorites } from "./Favorites.js";


export class Profile {
  constructor(root) {
    this.root = document.querySelector(root);
    this.favorites = new Favorites('app');

    this.update();

  };

  update() {

    this.root.children.item(0).remove()
    this.addProfile();

  };


  createProfile({ login, name, joined, bio, public_repos, followers, following }) {

    following = 12000

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

      <button class="heart">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9655/9655065.png"
          alt="">
      </button>

      <button class="heart-red hide">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9654/9654683.png"
          alt="">
      </button>

    </div>

    <p>${bio}Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum,
    </p>

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

    const elementData = this.createProfile({
      login: this.favorites.data[1].login,
      name: this.favorites.data[1].name,
      public_repos: this.favorites.data[1].public_repos,
      followers: this.favorites.data[1].followers
    });

    this.root.append(elementData);

  }
};

