'use strict';

import Alt from 'alt';

import RequestsActions from 'actions/requests';
import LocaleActions from 'actions/locale';
import UsersActions from 'actions/users';

import RequestsStore from 'stores/requests';
import LocaleStore from 'stores/locale';
import UsersStore from 'stores/users';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    // Register Actions
    this.addActions('requests', RequestsActions);
    this.addActions('locale', LocaleActions);
    this.addActions('users', UsersActions);

    // Register Stores
    this.addStore('requests', RequestsStore);
    this.addStore('locale', LocaleStore);
    this.addStore('users', UsersStore);
  }

}

export default Flux;
