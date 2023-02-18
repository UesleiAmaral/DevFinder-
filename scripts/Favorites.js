export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

    this.data =
      [
        {
          login: 'UesleiAmaral',
          name: 'Ueslei Amaral',
          public_repos: '19',
          followers: '12'
        },
        {
          login: 'maykbrito',
          name: 'Mayk Brito',
          public_repos: '76',
          followers: '120000'
        },
        {
          login: 'diego3g',
          name: 'Diego Fernandes',
          public_repos: '76',
          followers: '110000'
        },
      ];

  };

  delete(user, elementData) {

    elementData.querySelector('.star-delete').addEventListener('click', event => {
      event.preventDefault();

      const isOk = confirm('Deseja Realmente Deletar o Favorito?');

      if (isOk) {
        this.data = this.data.filter((entry) => entry.login != user.login);
        this.update();

      }

    });

  };

};

export class FavoritesView extends Favorites {
  constructor(root) {

    super(root);
    this.update();

  };

  update() {
    this.removeAllTr();
    this.addAllTr();

  };

  clearDisplay() {
    this.root.remove(this.root.children);

  };

  removeAllTr() {
    const tr = this.root.querySelectorAll("table tbody tr");

    tr.forEach((tr) => {
      tr.remove();

    });

  };

  addAllTr() {
    const tbody = document.querySelector('table tbody');

    this.data.forEach(user => {

      const elementData = this.createRow({
        login: user.login,
        name: user.name,
        public_repos: user.public_repos,
        followers: user.followers
      });

      this.delete(user, elementData);
      tbody.append(elementData);


      elementData.querySelectorAll('.view-profile').forEach((element) => {
        element.addEventListener('click', (event) => {
          event.preventDefault();
          this.clearDisplay();
        
      })

      });


    });

  };

  createRow({ login, name, public_repos, followers }) {
    const tr = document.createElement('tr');

    tr.innerHTML =
      `
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
      <td><button class="star-delete"><img
            src="https://cdn-icons-png.flaticon.com/512/9654/9654683.png"
            alt=""></button>
      </td>
    `
    return tr;
  };


  testeProfile() {
    
  }

};
