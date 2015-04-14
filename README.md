[![Build Status](https://semaphoreci.com/api/v1/projects/78ca7991-8a6f-4523-88e7-4e05a5579254/397136/shields_badge.svg)](https://semaphoreci.com/iam4x/react-frontend)
[![Dependency Status](https://david-dm.org/savemysmartphone/react-frontend.svg)](https://david-dm.org/savemysmartphone/react-frontend)
[![devDependency Status](https://david-dm.org/savemysmartphone/react-frontend/dev-status.svg)](https://david-dm.org/savemysmartphone/react-frontend#info=devDependencies)

# Savemysmartphone - React FrontEnd

> FrontEnd isomorphic application for the new website of [Savemysmartphone.com](Savemysmartphone.com)

> Fork of [isomorphic-flux-boilerplate](https://github.com/iam4x/isomorphic-flux-boilerplate) (Check the `README.md`)

## Libraries Included

* [react](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
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

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

Clone and install dependencies:

* `$ git clone git@github.com:savemysmartphone/react-frontend.git && cd react-frontend`
* `$ npm install`

### Run the project in development:

* `$ npm run dev`

Open your browser to `http://localhost:8080`

### Run tests

* `$ npm test` will run the tests once
* `$ ./node_modules/.bin/karma start` will watch for changes and run the tests on change

### Build project:

Just run `$ npm run build`, it will produce these tasks:

* Concat & minify styles to `/dist/app-[hash].css`
* Concat & minify scripts to `/dist/js/app-[hash].js`

### Learn more

* [Boilerplate README](https://github.com/iam4x/isomorphic-flux-boilerplate)
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
