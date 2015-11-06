import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Radium from 'utils/radium';

import DealItem from 'components/deal-item';

@connect(({ dealContainers: { collection } }) => ({ collection }))
@Radium
class DealsItems extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('dealContainers').index();
  }

  clickHandle(dealContainer) {
    console.log(dealContainer);
    this.setState({ expanded: true });
  }

  renderItem = (item, index) => {
    return (
       <DealItem
         key={ index }
         onChange={ ::this.clickHandle }
         model={ item } />
    );
  }

  render() {
    const { collection } = this.props;
    return (
      <div style={ this.getStyles().root }>
        { collection.map(this.renderItem) }
      </div>
    );
  }

  getStyles() {
    return {
      root: {
        width: '100%',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        background: '#bdbdbd',
        padding: '1px',
        position: 'relative',
        '@media all and (max-width: 320px)': {
          flexDirection: 'column'
        }
      }
    };
  }
}

export default DealsItems;
