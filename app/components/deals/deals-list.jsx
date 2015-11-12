import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Radium from 'utils/radium';
import DealsListChild from 'components/deals/deals-list-child';

@Radium
@connect(({ dealContainers: { collection } }) => ({ collection }))
class DealsList extends Component {

  static propTypes = { collection: PropTypes.array.isRequired }

  static contextTypes = {
    flux: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { flux } = this.context;
    flux.getActions('dealContainers').index();
  }

  renderItem = (item, index) => {
    return (
       <DealsListChild
         key={ index }
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
        '@media all and (maxWidth: 320px)': {
          flexDirection: 'column'
        }
      }
    };
  }
}

export default DealsList;
