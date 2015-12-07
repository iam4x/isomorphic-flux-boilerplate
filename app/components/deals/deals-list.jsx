import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Radium from 'utils/radium';
import DealsListChild from 'components/deals/deals-list-child';
import DealShowAnimation from 'components/deals/deal-show-animation';

@connect(({ dealContainers: { collection } }) => ({ collection }))
@Radium
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
        <DealShowAnimation>
          <DealsListChild model={ item } />
        </DealShowAnimation>
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
      background: '#fff',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      padding: '1px',
      position: 'relative',
      width: '100%'
    },
    child: {
      flex: '1 0 100%',
      margin: '0 auto',

      '@media (min-width: 410px)': {
        flex: '1 50%'
      },
      '@media (min-width: 620px)': {
        flex: '1 33%'
      },
      '@media (min-width: 830px)': {
        flex: '1 25%'
      }
    }
  }
}

export default DealsList;
