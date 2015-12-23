[![Circle CI](https://circleci.com/gh/iam4x/isomorphic-flux-boilerplate.svg?style=svg)](https://circleci.com/gh/iam4x/isomorphic-flux-boilerplate)
[![Coverage Status](https://coveralls.io/repos/iam4x/isomorphic-flux-boilerplate/badge.svg?branch=master&service=github)](https://coveralls.io/github/iam4x/isomorphic-flux-boilerplate?branch=master)
[![Dependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate)
[![devDependency Status](https://david-dm.org/iam4x/isomorphic-flux-boilerplate/dev-status.svg)](https://david-dm.org/iam4x/isomorphic-flux-boilerplate#info=devDependencies)
[![NPM Version](http://img.shields.io/npm/v/isomorphic-flux-boilerplate.svg?style=flat)](https://www.npmjs.com/package/isomorphic-flux-boilerplate)
# ES6 Isomorphic Flux/ReactJS Frontend for KupiKupon

Use with `nodejs@5.2.0`, clone the repo and `npm install`.

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
* Concat & minify scripts to `/dist/js/app-[hash].js`

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
* `$ eval "$(docker-machine env default)"`
* `$ dinghy up`
* `$ docker-compose build` (don't kill your terminal it take time to install node_modules for dev)
* `$ docker-compose up`

Then open http://webapp.docker into your browser. (You can change this URL into `docker-compose.yml`)
