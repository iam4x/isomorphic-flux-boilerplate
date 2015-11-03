import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Spinner extends Component {

  static propTypes = { active: PropTypes.bool }

  render() {
    const { active } = this.props;
    return <div className={ cx('app--spinner', { active }) } />;
  }
}

export default Spinner;
