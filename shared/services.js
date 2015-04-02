'use strict';

import request from 'superagent';

import UserStore from 'stores/user';

const fetchUsers = (resolve, reject) => {
  const users = UserStore.getState().users;
  // Check if store has already data
  // before request new data.
  if (users && users.length > 0) {
    return resolve({UserStore: {users}});
  }
  else {
    return request
      .get('http://api.randomuser.me/?results=10')
      .end((response) => resolve({UserStore: {users: response.body.results}}));
  }
};

export default {
  users: fetchUsers
};
