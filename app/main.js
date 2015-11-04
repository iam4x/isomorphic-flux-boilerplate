import debug from 'debug';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Paths are relative to `app` directory
import createFlux from 'flux/createFlux';

import ApiClient from '../shared/api-client';
import universalRender from '../shared/universal-render';

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') debug.enable('dev,koa');

const client = new ApiClient();
const flux = createFlux(client);
const history = createBrowserHistory();

universalRender({ flux, history })
  .catch(err => debug('dev')(err));
