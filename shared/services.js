'use strict';

import request from 'superagent';

export default {
  users(done) {
    return request
      .get('http://api.randomuser.me/?results=10')
      .end((response) => {
        return done(null, {
          UserStore: {users: response.body.results}
        });
      });
  }
};
