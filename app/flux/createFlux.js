import Alt from 'alt';
import makeFinalStore from 'alt-utils/lib/makeFinalStore';

import AltResolver from '../../shared/alt-resolver';

import * as stores from './stores/index';
import * as actions from './actions/index';

class Flux extends Alt {

  constructor(client, config = {}) {
    super(config);

    // Bind AltResolve to flux instance
    //   - access to it in actions with `alt.resolve`
    //     for resolving async actions before server render
    this.resolver = new AltResolver();
    this.resolve = ::this.resolver.resolve;

    // Bind the ApiClient aswell
    //   - access to it in actions with `alt.request`
    this.request = ::client.request;

    // Load actions into alt
    Object.keys(actions).forEach(key => this.addActions(key, actions[key]));
    // Load stores into alt
    Object.keys(stores).forEach(key => this.addStore(key, stores[key]));

    // Our `FinalStore` for using `connect-alt`
    this.FinalStore = makeFinalStore(this);
  }

}

export default function (config) { return new Flux(config); }
