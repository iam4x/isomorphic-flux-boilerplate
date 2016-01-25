import fauxJax from 'faux-jax';

import createFlux from 'flux/createFlux';
import ApiClient from '../../../shared/api-client';

chai.should();

describe('UsersStore', () => {
  let flux;
  let store;
  let actions;

  beforeEach(() => {
    flux = createFlux(new ApiClient());
    store = flux.getStore('users');
    actions = flux.getActions('users');
  });

  it('should add users into collection', function (done) {
    function respond(request) {
      request.respond(
        200,
        { 'Content-Type': 'application/json' },
        '[{"email":"clara.coleman83@example.com","name":{"title":"ms","first":"clara","last":"coleman"},"seed":"7729a1ef4ba6ef68","picture":{"large":"http://api.randomuser.me/portraits/women/72.jpg","medium":"http://api.randomuser.me/portraits/med/women/72.jpg","thumbnail":"http://api.randomuser.me/portraits/thumb/women/72.jpg"}}]'
      );
      fauxJax.restore();
    }

    fauxJax.install();
    fauxJax.on('request', respond);

    // add dummy user in store
    function handleChange({ collection }) {
      collection.length.should.be.eql(1);
      store.unlisten(handleChange);
      return done();
    }

    store.listen(handleChange);
    actions.index();
  });

  it('should update user with same seed', function () {
    actions.showSuccess({ name: 'foo', seed: 'bar' });

    store.getState().collection[0].should.eql({ name: 'foo', seed: 'bar' });

    actions.showSuccess({ name: 'yolo', seed: 'bar' });
    store.getState().collection[0].should.eql({ name: 'yolo', seed: 'bar' });
  });
});
