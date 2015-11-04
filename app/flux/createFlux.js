import mapValues from 'lodash/object/mapValues';

import Alt from 'alt';
import makeFinalStore from 'alt/utils/makeFinalStore';

import AltResolver from '../../shared/alt-resolver';

import * as stores from './stores/index';
import * as actions from './actions/index';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this.resolver = new AltResolver();

    // Load actions into alt
    mapValues(actions, (action, name) => this.addActions(name, action));
    // Load stores into alt
    mapValues(stores, (store, name) => this.addStore(name, store));

    // Our `FinalStore` for using `connect-alt`
    this.FinalStore = makeFinalStore(this);
  }

  resolve(action) {
    this.resolver.resolve(action);
  }

}

export default function(config) { return new Flux(config); }
