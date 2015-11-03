import Alt from 'alt';
import makeFinalStore from 'alt/utils/makeFinalStore';

import AltResolver from './alt-resolver';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    this.addActions('requests', require('actions/requests'));
    this.addActions('locale', require('actions/locale'));
    this.addActions('users', require('actions/users'));
    this.addActions('page-title', require('actions/page-title'));

    this.addStore('requests', require('stores/requests'));
    this.addStore('locale', require('stores/locale'));
    this.addStore('users', require('stores/users'));
    this.addStore('page-title', require('stores/page-title'));

    this.FinalStore = makeFinalStore(this);
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
