import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';
import Radium from 'utils/radium';
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

  resetState() {
    console.log('reset');
  }

  renderItem = (item, index) => {
    const { child } = this.getStyles();
    return (
      <div
        key={ index }
        style={ child }
        className='deals-list-child' >
        <DealShowAnimation
          initWidth='20%'
          initHeight='160'
          model={ item } />
     </div>
    );
  }

  render() {
    const { collection } = this.props;
    const { root } = this.getStyles();
    return (
      <div style={ root }>
        { collection.map(this.renderItem) }
      </div>
    );
  }

  getStyles() {
    return {
      root: {
        background: '#fff',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        position: 'relative',
        boxSizing: 'border-box',
        padding: '.2em',
        margin: '0 .5em'
      },
      child: {
        flex: '1 0 100%',
        margin: '.3em',
        whiteSpace: 'nowrap',
        overflow: 'hidden',

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
    };
  }
}

export default DealsList;
