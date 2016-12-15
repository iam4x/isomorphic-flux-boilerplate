const path = require('path')

module.exports = {
  "parser": "babel-eslint",
  "extends": "eslint-config-airbnb",
  "plugins": ["react", "jsx-a11y"],
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "globals": {
    "chai": true,
    "sinon": true,
    "expect": true,
    "jest": true,
    "__DEV__": true,
    "__TEST__": true
  },
  "settings": {
    "import/resolver": { "node": { "paths": [ path.resolve(__dirname, 'app')  ] } }
  },
  "rules": {
    "react/jsx-curly-spacing": [2, "always"],
    "react/jsx-closing-bracket-location": [2, "after-props" ],
    "react/sort-comp": 0,
    "react/jsx-boolean-value": [2, "always"],
    "react/no-unused-prop-types": 0,
    "react/style-prop-object": 0,

    "import/no-extraneous-dependencies": [2, { "devDependencies": [
      "**/*.{spec,test}.{js,jsx}",
      "**/*.config.js",
      "server/koa.js",
      "internals/**"
    ] }],

    "import/extensions": [2, "never", { "svg": "always", "css": "always", "json": "always" }],
    "import/no-dynamic-require": 0,

    "jsx-a11y/no-static-element-interactions": 0,

    "comma-dangle": [2, "never"],
    "indent": [2, 2],
    "object-curly-spacing": [2, "always"],
    "array-bracket-spacing": [2, "always"],
    "no-underscore-dangle": [2, { "allow": ["__TEST__", "__DEV__", "_initPaths"] }],
    "jsx-quotes": [2, "prefer-single"],
    "max-len": [1, 100],
    "camelcase": 0,
    "space-before-function-paren": [2, "never"],
    "consistent-return": 0,
    "semi": [2, "never"],
    "no-confusing-arrow": [2, { "allowParens": true }],
    "arrow-parens": [2, "always"],
    "class-methods-use-this": 0,
    "no-param-reassign": 0,
    "global-require": 0,
    "no-plusplus": 0
  }
}
