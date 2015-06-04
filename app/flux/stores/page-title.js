import debug from 'debug';
import alt from 'utils/alt';
import PageTitleActions from 'flux/actions/page-title';

class PageTitleStore {

  static displayName = 'PageTitleStore'

  baseTitle = 'ISO-ReactJS'
  delimiter = '|'

  constructor() {
    this.bindActions(PageTitleActions);
    this.title = this.baseTitle;
  }

  onSet(title: ?string) {
    const nextTitle = `${this.baseTitle} ${this.delimiter} ${title}`;

    debug('dev')(`update page title to '${title}'`);
    return this.setState({title});
  }

}

export default alt.createStore(PageTitleStore);
