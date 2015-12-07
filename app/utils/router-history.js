import createBrowserHistory from 'history/lib/createBrowserHistory';

// Export history module as singleton to be used outside of components
// for instance after a login into flux stores
export default createBrowserHistory();
