[![Build Status](https://travis-ci.org/iam4x/isomorphic-flux-boilerplate.svg?branch=new-alt-resolver)](https://travis-ci.org/iam4x/isomorphic-flux-boilerplate)
[![Coverage Status](https://coveralls.io/repos/iam4x/isomorphic-flux-boilerplate/badge.svg)](https://coveralls.io/r/iam4x/isomorphic-flux-boilerplate)
[![Dependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate)
[![devDependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate/dev-status.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/isomorphic-flux-boilerplate.svg?style=flat)](https://www.npmjs.com/package/isomorphic-flux-boilerplate)

# ES6 Isomorphic Flux/ReactJS Boilerplate

> A wonderfull boilerplate for **Flux/ReactJS** [isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) applications, running on **Koa**.

**Demo:** http://isomorphic.iam4x.fr

## Libraries Included

* [react](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [react-a11y](https://github.com/rackt/react-a11y)
* [react-intl](https://github.com/yahoo/react-intl)
* [alt](https://github.com/goatslacker/alt)
* [iso](https://github.com/goatslacker/iso)
* [koa](http://koajs.com/)
* [webpack](http://webpack.github.io/)
* [babeljs](https://babeljs.io/)
* [flowtype](http://flowtype.org/)
* [flowcheck](https://gcanti.github.io/flowcheck/)

## TL;DR

Use with `iojs^1.8.0` or `nodejs^0.12.0`, clone the repo, `npm install` and `npm run dev`.

Learn React ([react-prime-draft](https://github.com/mikechau/react-primer-draft)), learn Flux and Alt ([alt guide](http://alt.js.org/guide/)).

Wrap you async actions into promises, send them to `altResolver` with `altResolver.resolve(xxx)` for async server side rendering (see [app/actions/users.js:31](https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app/actions/users.js#L31)).

Build for production with `npm run build`, don't forget to run the tests before `npm test`.

## Concepts

**Koa** will be our server for the server side rendering, we use **alt** for our Flux architecture and **react-router** for routing in our app.

With **iso** as helper we can populate **alt** flux stores before the first rendering and have a complete async isomorphic React application.

Run this boilerplate, you will see the server is fetching some fake users and will populate the `UserStore` with this data. **Koa** will render the first markup, serve the JavaScript and then it will entirely run on the client.

## Flux

We use [alt](http://alt.js.org) instance as [Flux](http://facebook.github.io/react/blog/2014/05/06/flux.html) implementation.

We need to use instances for isomorphic applications, to have a unique store/actions per requests on the server.

On the client, Flux is initialized in `app/main.js` and sent to our first React Component via props (`this.props.flux`). Everytime you want to uses stores or actions in a component you need to give it access through props.

On the server, it's similar but Flux is initialized in `server/router.jsx`. The instance is sent to `alt-resolver` for rendering components with the correct props.

Learn more about [alt instances](http://alt.js.org/docs/altInstances) in the alt documentation.

## Internationalization (i18n)

We use [react-intl](https://github.com/yahoo/react-intl) for internationalization, it uses browser implementation of [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). For older browser and for node, we load the polyfill.

* Support localized strings (see [data/en.js](https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app%2Fdata%2Fen.js))
* Support localized dates, times and currencies.

Lang files and Intl polyfill are compiled into webpack chunks, for lazy-loading depending the locale of the user.

If user changes locale, it is saved into a cookie `_lang` and used by the server to know the locale of rendering. If there's no `_lang` cookie, server will rely on `Accept-Language` request header. Server will set `<html lang='x'>` on rendering.

Thank's to [gpbl/react-locale-hot-switch](https://github.com/gpbl/react-locale-hot-switch) for the implementation example!

## Async data-fetching

Alt-resolver is the magic thing about the boilerplate, it will be our tool for resolving promises (data-fetching) before server side rendering.

Wrap data-fetching requests from actions into promises and send them to `altResolver` like:

```
fetch() {
  const promise = (resolve) => {
    request
      .get('http://example.com/api/users')
      .end((response) => {
        // fire new action to send data to store
        this.actions.fetchSuccess(response.body);
        return resolve();
      });
  };
  // Send the `promise` to altResolver
  this.alt.resolve(promise);
}
```

Call the fetch action from component in the `componentWillMount` method:

```
propTypes: {
  flux: React.PropTypes.object.isRequired
},
componentWillMount() {
  const usersActions = this.props.flux.getActions('users');
  return usersActions.fetch();
}
```

On browser side, the rendering won't be stopped and will resolve the promise instantly.

On server side, `altResolver.render` will fire a first render to collect all the promises needed for a complete rendering. It will then resolve them, and try to re-render the application for a complete markup.

Open `app/actions/users.js`, `app/utils/alt-resolver.js`, `app/stores/users.js` for more information about data-fetching.

## How to `require()` images on server side

On client with webpack, you can directly `require()` images for your images DOM element like:

```
<img src={require('images/logo.png')} />
```

Webpack will load them through the `url-loader` and if it's too big it will sent through `file-loader` for minification/compilation. The results is an image with a new filename for cache busting.

But on node, `require()` an image will just throw an exception. There's an util for loading image on server side to achieve this:

```
import imageResolver from 'utils/image-resolver'

let image;
// On browser just require() the image as usual
if (process.env.BROWSER) {
  image = require('images/logo.png');
}
else {
  image = imageResolver('images/logo.png');
}

...
render () {
  return (
    <img src={image} />
  );
}
...
```

The utils/image-resolver with match the original image name with the compiled one.

Voilà! You can `require()` images on server side too.

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

But it works well with `nodejs^0.12.0` as well :)

After that, you will just need to clone the repo and install dependancies:

* `$ git clone -o upstream https://github.com/iam4x/isomorphic-flux-boilerplate.git app`
* `$ cd app && npm install`

(Don't forget to add your remote origin: `$ git remote origin git@github.com:xxx/xxx.git`)

### Run the project in development:

* `$ npm run dev`

Open your browser to `http://localhost:3002` and you will see the magic happens! Try to disable JavaScript in your browser, you will still be able to navigate between pages of the application. Enjoy the power of isomorphic applications!

(Note: ports 3000-3002 are needed, you can change this with `$ PORT=3050 npm run dev` it will run on 3050-3052)

### Run tests

* `$ npm test` will run the tests once
* `$ ./node_modules/.bin/karma start` will watch for changes and run the tests on change

### Build project:

Just run `$ npm run build`, it will produce these tasks:

* Run tests from `test/spec/**/*.jsx`
* Concat & minify styles to `/dist/app-[hash].css`
* Concat & minify scripts to `/dist/js/app-[hash].js`

### Update the boilerplate

You can fetch the upstream branch and merge it into your master:

* `$ git checkout master`
* `$ git fetch upstream`
* `$ git merge upstream/master`
* `$ npm install`

### Run in production

Build the project first:

* `$ npm run build`

Then start the koa server:

* `$ NODE_ENV=production node server/index.js` (iojs)
* `$ NODE_ENV=production node --harmony server/index.js` (nodejs 0.12.x)

You can also use `processes.json` to run the application with [PM2 Monitor](https://github.com/Unitech/pm2) on your production server (customize it for your use):

* `$ pm2 start processes.json`

### Learn more

* [Official ReactJS website](http://facebook.github.io/react/)
* [Official ReactJS wiki](https://github.com/facebook/react/wiki)
* [Official Flux website](http://facebook.github.io/flux/)
* [ReactJS Conf 2015 links](https://gist.github.com/yannickcr/148110d3ca658ad96c2b)
* [Learn ES6](https://babeljs.io/docs/learn-es6/)
* [ES6 Features](https://github.com/lukehoban/es6features#readme)

### Common errors

```
Error: `libsass` bindings not found. Try reinstalling `node-sass`
```

* Be sure you are running with iojs > 1.7.0 (check node version `node -v`)
* Delete node_modules `mv node_modules /tmp` (`mv` is much faster than `rm -rf`)
* Clear npm cache `npm cache clear`
* Build `node-sass` for your system `$ npm install node-sass`
* Re-install modules `npm install`

This is an issue with `node-sass` it is reported almost everywhere on the internet.

**Windows 7:**

On windows for building `node-sass` before running the commands you need:

* Install [python27](https://www.python.org/downloads/release/python-279/) and set it your path (http://stackoverflow.com/a/6318188)
* Install Visual Studio Express 2013 ([download](https://www.visualstudio.com/en-us/products/free-developer-offers-vs.aspx))

**Windows 8:**

There's an issue with [node-sass #870](https://github.com/sass/node-sass/issues/870) open.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/iam4x/isomorphic-flux-boilerplate/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

