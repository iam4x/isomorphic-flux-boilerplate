import debug from 'debug';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Paths are relative to `app` directory
import createFlux from 'flux/createFlux';

import universalRender from '../shared/universal-render';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') debug.enable('dev,koa');

const flux = createFlux();
const history = createBrowserHistory();

universalRender({ flux, history })
  .catch(err => debug('dev')(err));
