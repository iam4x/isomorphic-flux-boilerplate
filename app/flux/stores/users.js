import alt from 'utils/alt';
import UsersSource from 'flux/sources/users';
import UsersActions from 'flux/actions/users';
import {datasource} from 'alt/utils/decorators';

@datasource(UsersSource)
class UsersStore {

  static displayName = 'UsersStore'

  static getBySeed(seed: string) {
    const user = this.getState().users
      .find((user) => user.seed === seed) || null;

    return {user};
  }

  constructor() {
    this.users = [];
    this.bindActions(UsersActions);
  }

  onFetchSuccess(users: Array<Object>) {
    return this.setState({users});
  }

  onFetchBySeedSuccess(user: Object) {
    const users: Array<Object> = this.users.slice();
    let match: ?Object = users
      .find((u) => u.seed === user.seed);

    match ? match = user : users.push(user);

    return this.setState({users});
  }

  onAddSuccess(user: Object) {
    const users: Array<Object> = this.users.slice();
    users.push(user);

    return this.setState({users});
  }

  onRemove(index: number) {
    const users: Array<Object> = this.users.slice();
    users.splice(index, 1);

    return this.setState({users});
  }

}

export default alt.createStore(UsersStore);
