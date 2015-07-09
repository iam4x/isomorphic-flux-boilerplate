import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

if (process.env.BROWSER) {
  require('styles/spinner.scss');
}

class Spinner extends Component {

  static propTypes = {
    active: PropTypes.bool
  }

  render() {
    return <div className={classNames('app--spinner', {active: this.props.active})} />;
  }
}

export default Spinner;
