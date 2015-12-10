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

  render() {
    const { collection } = this.props;
    const { root, child } = this.getStyles();
    return (
      <div style={ root } >
        { collection.map( (model, index) => {
          return (
            <div key={ index } style={ child } >
              <DealShowAnimation
                model={ model } />
            </div>
          );
        } ) }
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
        padding: 4,
        margin: '0 8px'
      },
      child: {
        flex: '1 0 100%',
        margin: 4,

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
