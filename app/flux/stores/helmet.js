type State = {
  title: ?string,
  titleBase: ?string,
  description: ?string,
  statusCode: ?number
};

class HelmetStore {

  constructor() {
    this.bindActions(this.alt.getActions('helmet'))

    this.state = {
      title: '',
      titleBase: 'Universal ReactJS boilerplate example - ',
      description: 'An open source universal ReactJS boilerplate, source code on github.com',
      statusCode: 200
    }
  }

  onUpdate(props: State) {
    this.setState({ ...this.state, ...props })
  }

}

export default HelmetStore
