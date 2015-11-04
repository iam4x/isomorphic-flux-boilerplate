import debug from 'debug';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Paths are relative to `app` directory
import Flux from 'utils/flux';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') debug.enable('dev,koa');

const flux = new Flux();
const universalRender = require('../shared/universal-render');
const history = createBrowserHistory();

universalRender({ flux, history })
  .catch(err => debug('dev')(err));
