export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);

  };


};

export class FavoritesView extends Favorites {
  constructor(root) {

    super(root);
    this.update();

  };

  update() {
    this.removeAllTr();

  };

  removeAllTr() {
    const tr = this.root.querySelectorAll("table tbody tr");

    tr.forEach((tr) => {
      tr.remove();

    });

  };

};
