'use strict';

import chai from 'chai';
import Flux from 'utils/flux';

chai.should();

describe('UsersStore', () => {

  let flux;
  let store;
  let actions;

  beforeEach(() => {
    flux = new Flux();
    store = flux.getStore('users');
    actions = flux.getActions('users');
  });

  it('should overide users on new fetch', (done) => {
    let count = 0;
    const handleChange = () => {
      let {users} = store.getState();
      users.length.should.be.eql(10);

      setTimeout(() => {
        if (++count === 2) {
          // clean
          store.unlisten(handleChange);
          return done();
        }
        actions.fetch();
      });
    };
    store.listen(handleChange);
    actions.fetch();
  });

});
