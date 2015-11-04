import mapValues from 'lodash/object/mapValues';

import Alt from 'alt';
import makeFinalStore from 'alt/utils/makeFinalStore';

import AltResolver from './alt-resolver';

import * as stores from '../stores/index';
import * as actions from '../actions/index';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Load actions into alt
    mapValues(actions, (action, name) => this.addActions(name, action));
    // Load stores into alt
    mapValues(stores, (store, name) => this.addStore(name, store));

    // Our `FinalStore` for using `connect-alt`
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
