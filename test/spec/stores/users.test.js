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

  it('should merge users when on new fetch', function(done) {
    // add dummy user in store
    actions.fetchBySeedSuccess({name: 'foo', seed: 'bar'});

    const handleChange = function({users}) {
      users.length.should.be.eql(11);
      store.unlisten(handleChange);
      return done();
    };

    store.listen(handleChange);
    actions.fetch();
  });

  it('should update user with same seed', function() {
    actions.fetchBySeedSuccess({name: 'foo', seed: 'bar'});

    store.getState().users[0].should.eql({name: 'foo', seed: 'bar'});

    actions.fetchBySeedSuccess({name: 'yolo', seed: 'bar'});
    store.getState().users[0].should.eql({name: 'yolo', seed: 'bar'});
  });
});
