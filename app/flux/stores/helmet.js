class HelmetStore {

  constructor() {
    this.bindActions(this.alt.getActions('helmet'));

    this.title = '';
    this.titleBase = 'Universal ReactJS boilerplate example - ';
    this.description = 'An open source universal ReactJS boilerplate, source code on github.com';
    this.statusCode = 200;
  }

  onUpdate(props) {
    Object.keys(props)
      .forEach((key) => this[key] = props[key]);
  }

}

export default HelmetStore;
