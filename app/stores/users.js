class UsersStore {

  constructor() {
    this.bindActions(this.alt.getActions('users'));
    this.users = [];
  }

  static getBySeed(seed) {
    const { users } = this.getState();
    return { user: users.find((user) => user.seed === seed) };
  }

  onRemove(index) {
    const users = [ ...this.users ];
    users.splice(index, 1);

    this.users = users;
  }

  onAddSuccess(user) {
    this.users = [ ...this.users, user ];
  }

  onFetchSuccess(users) {
    this.users = users.reduce((results, curr) => {
      const index = results.findIndex(({ seed }) => seed === curr.seed);
      if (index > -1) {
        results[index] = curr;
        return results;
      } else {
        return [ curr, ...results ];
      }
    }, [ ...this.users ]);
  }

  onFetchBySeedSuccess(user) {
    const users = [ ...this.users ];
    const index = users.findIndex(({ seed }) => seed === user.seed);
    if (index > -1) {
      users[index] = user;
      this.users = users;
    } else {
      this.users = [ ...users, user ];
    }
  }

}

export default UsersStore;
