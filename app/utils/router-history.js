import createBrowserHistory from 'history/lib/createBrowserHistory';
import useStandardScroll from 'scroll-behavior/lib/useStandardScroll';

// Export history module as singleton to be used outside of components
// for instance after a login into flux stores
export default useStandardScroll(createBrowserHistory)();
