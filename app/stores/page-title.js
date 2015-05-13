'use strict';

import debug from 'debug';

class PageTitleStore {
  constructor() {
    this.bindActions(this.alt.getActions('page-title'));

    this.baseTitle = 'ISO-ReactJS';
    this.delimeter = '|';

    // Defaut title
    this.title = `${this.baseTitle}`;
  }

  onSet(title: ?string) {
    title = `${this.baseTitle} ${this.delimeter} ${title}`;

    debug('dev')(`update page title to '${title}'`);
    return this.setState({title});
  }
}

export default PageTitleStore;
