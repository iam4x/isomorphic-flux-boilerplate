# ISO-React: Isomorphic ReactJS Boilerplate

> A complete **[isomorphic](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/)** Facebook **[React](https://facebook.github.io/react/)** boilerplate.

This project is still under development, contributions are welcome!

## Libraries / External Tools

* [react](https://facebook.github.io/react/)
* [react-router](https://github.com/rackt/react-router)
* [expressjs](http://expressjs.com/)
* [webpack](http://webpack.github.io/)
* [gulpjs](http://gulpjs.com/)

## Installation / How-to

I recommend to use [io.js](https://iojs.org/) to take advantages of `ES6` without `--harmony` flag on `NodeJS`.

It's super easy to do with [nvm](https://github.com/creationix/nvm):

* `$ nvm install iojs`
* `$ nvm use iojs`
* `$ nvm alias default iojs` (to make `node` default to `iojs`)

After that, you will just need to clone the repo and install dependancies:

* `$ git clone https://github.com/iam4x/iso-react.git`
* `$ cd iso-react && npm install`

To run the project:

* `$ npm install -g gulp`
* `$ gulp dev`

Open your browser to `http://localhost:8080` and you will see the magic happens! Try to disable JavaScript in your browser, you will still be able to navigate between pages of the application. Enjoy the power of isomorphic applications!

## TODO

* Hot module reloader
* Include Reflux
* Gulp production build
* Add async data retrieval before server rendering, currently all the Ajax calls that will change the state of a components are made on the client after rendering. (Still exploring many way to achieves this, because it breaks the Flux architecture).
