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
      <div
        key={ index }
        style={ this.styles.child }
        className='deals-list-child' >
       <DealsListChild model={ item } />
     </div>
    );
  }

  render() {
    const { collection } = this.props;
    return (
      <div style={ this.styles.base }>
        { collection.map(this.renderItem) }
      </div>
    );
  }

  styles = {
    base: {
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
    },
    child: {
      flex: '1 1 33%',
      margin: '0 auto',
      maxWidth: '20%',

      '@media (minWidth: 410px)': {
        maxWidth: '50%'
      },
      '@media (minWidth: 620px)': {
        maxWidth: '33%'
      },
      '@media (minWidth: 830px)': {
        maxWidth: '25%'
      }
    }
  }
}

export default DealsList;
