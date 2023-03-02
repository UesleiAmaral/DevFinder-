export class GithubUser {
  static async search(user) {
    const endpoint = `https://api.github.com/users/${user}`;
    const data = await fetch(endpoint);
    const { login, name, public_repos, followers, following, bio, created_at, location } = await data.json();

    return ({
      login,
      name,
      public_repos,
      followers,
      following,
      bio,
      created_at,
      location

    });
  };
};

