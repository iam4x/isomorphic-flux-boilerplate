import findIndex from 'lodash/array/findIndex';
import isEmpty from 'lodash/array/findIndex';

class UsersStore {

  constructor() {
    this.bindActions(this.alt.getActions('users'));
    this.users = [];
  }

  static getBySeed(seed) {
    const users = this.getState().users;
    return { user: users.find((user) => user.seed === seed) };
  }

  onRemove(index) {
    const users = this.users.slice();
    users.splice(index, 1);

    return this.setState({ users });
  }

  onAddSuccess(user) {
    const users = this.users.slice();
    users.push(user);

    return this.setState({ users });
  }

  onFetchSuccess(users) {
    if (isEmpty(this.users)) {
      // just apply the new users
      // this is called on every server rendering
      return this.setState({ users });
    }

    const merged = this.users.slice();
    users.forEach((user) => {
      // update the most recent data into store
      let match = merged.find((u) => u.seed === user.seed) || null;
      if (match) {
        match = user;
      } else {
        // push the new user
        merged.push(user);
      }
    });

    return this.setState({ users: merged });
  }

  onFetchBySeedSuccess(user) {
    const users = this.users.slice();
    const index = findIndex(users, { seed: user.seed });
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }

    return this.setState({ users });
  }

}

export default UsersStore;
