import UsersActions from 'flux/actions/users';
import {sample, take} from 'lodash';

import data from 'data/users.json';

const UsersSource = {

  fetch: {
    remote() {
      return new Promise((resolve: Function) => {
        // Take 10 random users in json data
        const users: Array = take(data.users, 10);

        // Fake XHR/Async operation
        setTimeout(() => resolve(users), 300);
      });
    },
    success: UsersActions.fetchSuccess
  },

  fetchBySeed: {
    remote(seed: string) {
      return new Promise((resolve: Function) => {
        // Find user with seed in json data
        const user: Object = data.users
          .find(u => u.seed === seed);

        // Fake XHR/Async operation
        setTimeout(() => resolve(user), 300);
      });
    },
    success: UsersActions.fetchBySeedSuccess
  },

  add: {
    remote(seed: string) {
      return new Promise((resolve: Function) => {
        // Take a random user in json data
        const user: Object = sample(data.users);

        // Fake XHR/Async operation
        setTimeout(() => resolve(user), 300);
      });
    },
    success: UsersActions.addSuccess
  }

};

export default UsersSource;
