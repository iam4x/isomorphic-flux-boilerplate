'use strict';

import React from 'react';

if (process.env.BROWSER) {
  require('styles/footer.scss');
}

export default React.createClass({
  displayName: 'footer',
  render() {
    return (
      <footer className='app--footer'>
        <hr />
        <div className='app--footer-content'>
          <iframe
            src='https://ghbtns.com/github-btn.html?user=iam4x&repo=isomorphic-flux-boilerplate&type=star&count=true&size=large'
            frameBorder='0'
            scrolling='0'
            width='120px'
            height='30px'>
          </iframe>
        </div>
      </footer>
    );
  }
});
