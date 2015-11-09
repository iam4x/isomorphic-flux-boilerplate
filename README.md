[![Circle CI](https://circleci.com/gh/iam4x/isomorphic-flux-boilerplate.svg?style=svg)](https://circleci.com/gh/iam4x/isomorphic-flux-boilerplate)
[![Coverage Status](https://coveralls.io/repos/iam4x/isomorphic-flux-boilerplate/badge.svg?branch=master&service=github)](https://coveralls.io/github/iam4x/isomorphic-flux-boilerplate?branch=master)
[![Dependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate)
[![devDependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate/dev-status.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/isomorphic-flux-boilerplate.svg?style=flat)](https://www.npmjs.com/package/isomorphic-flux-boilerplate)

# A complete ES7 <s>Isomorphic</s> [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) ReactJS boilerplate with [alt](https://github.com/goatslacker/alt) as Flux library.

> A wonderfull boilerplate for **Flux/ReactJS** [universal](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/) applications, running on **Koa**.

**Demo:** http://isomorphic.iam4x.fr

## Libraries Included

* [react ^0.14](https://facebook.github.io/react/)
* [react-router ^1.0.0](https://github.com/rackt/react-router)
* [react-intl](https://github.com/yahoo/react-intl)
* [react-redbox](https://github.com/KeywordBrain/redbox-react)
* [alt ^0.17](https://github.com/goatslacker/alt)
* [alt-devtools](https://github.com/goatslacker/alt-devtool)
* [connect-alt](http://github.com/iam4x/connect-alt)
* [iso](https://github.com/goatslacker/iso)
* [koa](http://koajs.com/)
* [webpack](http://webpack.github.io/)
* [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)
* [babeljs](https://babeljs.io/)
* [postcss ^0.7](https://github.com/postcss/postcss)
* [precss](https://github.com/jonathantneal/precss)

## TL;DR

Use with `nodejs@4.2.1`, clone the repo, `npm install` and `npm run dev`.

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

On the client, Flux is initialized in `app/main.js` and sent to our first React Component via context (`this.context.flux`). Every time you want to uses stores or actions in a component you need to give it access through context.

On the server, it's similar but Flux is initialized in `server/router.jsx`. The instance is sent to `alt-resolver` for rendering components with the correct props.

Learn more about [alt instances](http://alt.js.org/docs/altInstances) in the alt documentation.

There's also `alt-devtools` enabled in development, it's a Chrome Extension that you can find here: https://github.com/goatslacker/alt-devtool

## Internationalization (i18n)

We use [react-intl](https://github.com/yahoo/react-intl) for internationalization, it uses browser implementation of [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). For older browser and for node, we load the polyfill.

* Support localized strings (see [data/en.js](https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app%2Fdata%2Fen.js))
* Support localized dates, times and currencies.

Lang files and Intl polyfill are compiled into webpack chunks, for lazy-loading depending the locale of the user.

If user changes locale, it is saved into a cookie `_lang` and used by the server to know the locale of rendering. If there's no `_lang` cookie, server will rely on `Accept-Language` request header. Server will set `<html lang='x'>` on rendering.

Thank's to [gpbl/react-locale-hot-switch](https://github.com/gpbl/react-locale-hot-switch) for the implementation example!

In order to use `FormattedRelative` you have to require `messages` && `locales` from context and pass them as props:

```javascript
static contextTypes = {
  messages: PropTypes.object.isRequired,
  locales: PropTypes.array.isRequired
}

render() {
  return (
    <FormattedRelative
      { ...this.context }
      value={Date.now() - (1000 * 60 * 60 * 24)} />
  );
}
```

## Localized routes

We have an utility to generate severals routes for the same component (see `app/utils/localized-routes.js`).

Use the same logic as localized string, declare the localized routes into `app/routes.js` and into your `data/{lang}` file.

## Async data-fetching

Alt-resolver is the magic thing about the boilerplate, it will be our tool for resolving promises (data-fetching) before server side rendering.

Alt-resolver expose also an ApiClient for doing the requests to the intern API. It handle for you the cookies on server and URI matching between server and browser.

Wrap data-fetching requests from actions into promises and send them to `altResolver` like:

```javascript
fetch() {
  this.alt.resolve(async (done) => {
    try {
      this.alt.getActions('requests').start();
      const response = await this.alt.request({ url: '/users' });
      this.actions.indexSuccess(response);
    } catch (error) {
      this.actions.indexFail({ error });
    }
    this.alt.getActions('requests').stop();
    return done();
  });
}
```

Call the fetch action from component in the `componentWillMount` method:

```javascript
import React, { Component, PropTypes } from 'react';
import connect from 'connect-alt';

// connect-alt is an util to connect store state to component props
// you can read more about it here: http://github.com/iam4x/connect-alt
// it handle store changes for you :)
//
// users -> store name
// collection -> `this.collection` into users store
//
@connect(({ users: { collection } }) => ({ users: collection }))
class Users extends Component {

  static contextTypes: { flux: PropTypes.object.isRequired }
  static propTypes: { users: PropTypes.array.isRequired }

  componentWillMount() {
    const { flux } = this.context
    return flux.getActions('users').fetch();
  }

  render() {
    const { users } = this.props;
    return (<pre>{ JSON.stringify(users, null, 4) }</pre>)
  }
}
```

On browser side, the rendering won't be stopped and will resolve the promise instantly.

On server side, `altResolver.render` will fire a first render to collect all the promises needed for a complete rendering. It will then resolve them, and try to re-render the application for a complete markup.

Open `app/actions/users.js`, `app/utils/alt-resolver.js`, `app/stores/users.js` for more information about data-fetching.

## How to `require()` images on server side

On client with webpack, you can directly `require()` images for your images DOM element like:

```javascript
<img src={require('images/logo.png')} />
```

Webpack will load them through the `url-loader` and if it's too big it will sent through `file-loader` for minification/compilation. The results is an image with a new filename for cache busting.

But on node, `require()` an image will just throw an exception. There's an util for loading image on server side to achieve this:

```javascript
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

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install stable`
* `$ nvm use stable`
* `$ nvm alias default stable`

After that, you will just need to clone the repo and install dependancies:

* `$ git clone -o upstream https://github.com/iam4x/isomorphic-flux-boilerplate.git app`
* `$ cd app && npm install`

(Don't forget to add your remote origin: `$ git remote add origin git@github.com:xxx/xxx.git`)

### Run the project in development:

* `$ npm run dev`

Open your browser to `http://localhost:3002` and you will see the magic happens! Try to disable JavaScript in your browser, you will still be able to navigate between pages of the application. Enjoy the power of isomorphic applications!

(Note: ports 3000-3002 are needed, you can change this with `$ PORT=3050 npm run dev` it will run on 3050-3052)

### Run tests

* `$ npm test` will run the tests once
* `$ npm run dev-test` will watch for changes and run the tests on change

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

* `$ NODE_ENV=production node server/index.js`

You can also use `processes.json` to run the application with [PM2 Monitor](https://github.com/Unitech/pm2) on your production server (customize it for your use):

* `$ pm2 start processes.json`

### (OSX) Run into docker for development

You can build and dev with the boilerplate through docker container, it runs with dinghy.

* Install [dinghy](https://github.com/codekitchen/dinghy) (it has support for NFS sharing which is required for changes detection and it's fast!)
* `$ docker-compose up && open http://webapp.docker`

### Learn more

* [Official ReactJS website](http://facebook.github.io/react/)
* [Official ReactJS wiki](https://github.com/facebook/react/wiki)
* [Official Flux website](http://facebook.github.io/flux/)
* [ReactJS Conf 2015 links](https://gist.github.com/yannickcr/148110d3ca658ad96c2b)
* [Learn ES6](https://babeljs.io/docs/learn-es6/)
* [ES6 Features](https://github.com/lukehoban/es6features#readme)
