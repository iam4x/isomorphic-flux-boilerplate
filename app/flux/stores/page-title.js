import debug from 'debug';

class PageTitleStore {

  constructor() {
    this.bindActions(this.alt.getActions('title'));

    this.baseTitle = 'ISO-ReactJS';
    this.delimeter = '|';

    // Defaut title
    this.title = `${this.baseTitle}`;
  }

  onSet(title) {
    debug('dev')(`update page title to '${title}'`);
    this.title = `${this.baseTitle} ${this.delimeter} ${title}`;
  }

}

export default PageTitleStore;
