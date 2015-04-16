[![Build Status](https://travis-ci.org/iam4x/isomorphic-flux-boilerplate.svg?branch=new-alt-resolver)](https://travis-ci.org/iam4x/isomorphic-flux-boilerplate)
[![Coverage Status](https://coveralls.io/repos/iam4x/isomorphic-flux-boilerplate/badge.svg?branch=new-alt-resolver)](https://coveralls.io/r/iam4x/isomorphic-flux-boilerplate?branch=new-alt-resolver)
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

## TL;DR

Use with `iojs^1.6.0`, clone the repo, `npm install` and `npm run dev`.

Learn React ([react-prime-draft](https://github.com/mikechau/react-primer-draft)), learn Flux and Alt ([alt guide](http://alt.js.org/guide/)).

Wrap you async actions into promises, send them to `altResolver` with `altResolver.resolve(xxx)` for async server side rendering (see [app/actions/users.js:31](https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/app/actions/users.js#L31)).

Build for production with `npm run build`, don't forget to run the tests before `npm test`.

## Concepts

**Koa** will be our server for the server side rendering, we use **alt** for our Flux architecture and **react-router** for routing in our app.

With **iso** as helper we can populate **alt** flux stores before the first rendering and have a complete async isomorphic React application.

Run this boilerplate, you will see the server is fetching some fake users and will populate the `UserStore` with this data. **Koa** will render the first markup, serve the JavaScript and then it will entirely run on the client.

## Internationalization (i18n)

We use [react-intl](https://github.com/yahoo/react-intl) for internationalization, it uses browser implementation of [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). For older browser and for node, we load the polyfill.

* Support localized strings (see [data/en.js](https://github.com/iam4x/isomorphic-flux-boilerplate/blob/master/data/en.js))
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
        return resolve()
      });
  };
  // Send the `promise` to altResolver
  altResolver.resolve(promise);
}
```

Call the fetch action from component in the `componentWillMount` method:

```
componentWillMount() {
  UsersActions.fetch()
}
```

On browser side, the rendering won't be stopped and will resolve the promise instantly.

On server side, `altResolver.render` will fire a first render to collect all the promises needed for a complete rendering. It will then resolve them, and try to re-render the application for a complete markup.

Open `app/actions/users.js`, `app/utils/alt-resolver.js`, `app/stores/users.js` for more information about data-fetching.

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

After that, you will just need to clone the repo and install dependancies:

* `$ git clone -o upstream https://github.com/iam4x/isomorphic-flux-boilerplate.git app`
* `$ cd app && npm install`

(Don't forget to add your remote origin: `$ git remote origin git@github.com:xxx/xxx.git`)

### Run the project in development:

* `$ npm run dev`

Open your browser to `http://localhost:8080` and you will see the magic happens! Try to disable JavaScript in your browser, you will still be able to navigate between pages of the application. Enjoy the power of isomorphic applications!

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

* Be sure you are running with iojs > 1.6.0 (check node version `node -v`)
* Delete node_modules `mv node_modules /tmp` (`mv` is much faster than `rm -rf`)
* Clear npm cache `npm cache clear`
* Re-install modules `npm install`

This is an issue with `node-sass` it is reported almost everywhere on the internet.
