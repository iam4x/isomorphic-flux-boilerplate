# ES6 Isomorphic React Boilerplate

> A complete isomorphic **[Facebook React](https://facebook.github.io/react/)** boilerplate.

> Including **[React-Router](https://github.com/rackt/react-router)** and **[Reflux](https://github.com/spoike/refluxjs)** for your next web application!

Contributions are welcome! Please drop me a PR!

## Libraries Included

* [react](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [react-hot-loader](https://github.com/gaearon/react-hot-loader)
* [expressjs](http://expressjs.com/)
* [webpack](http://webpack.github.io/)
* [gulpjs](http://gulpjs.com/)
* [6to5](https://6to5.org/)

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

After that, you will just need to clone the repo and install dependancies:

* `$ git clone https://github.com/iam4x/iso-react.git`
* `$ cd iso-react && npm install`
* `$ npm install -g gulp`

### Run the project in development:

* `$ gulp dev`

Open your browser to `http://localhost:8080` and you will see the magic happens! Try to disable JavaScript in your browser, you will still be able to navigate between pages of the application. Enjoy the power of isomorphic applications!

### Build project:

Just run `$ gulp build`, it will produce these tasks:

* Concat & minify styles to `/dist/css/styles.css`
* Concat & minify scripts to `/dist/js/app.js`
* Optimize & copy images to `/dist/img/`
