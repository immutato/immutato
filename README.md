# immutato 

immutable and typed js data structures

[![Build Status](https://secure.travis-ci.org/parroit/immutato.png?branch=master)](http://travis-ci.org/parroit/immutato) [![NPM version](https://badge-me.herokuapp.com/api/npm/immutato.png)](http://badges.enytc.com/for/npm/immutato) [![Code Climate](https://codeclimate.com/github/parroit/immutato.png)](https://codeclimate.com/github/parroit/immutato) [![Test Coverage](https://codeclimate.com/github/parroit/immutato/badges/coverage.svg)](https://codeclimate.com/github/parroit/immutato)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/parroit.svg)](https://saucelabs.com/u/parroit)


## Getting Started
Install the module with: `npm install immutato`

```javascript
var i = require('immutato');
var Person = i.struct('Person', {
    name: i.String,
    age: i.Number
});

var me = Person({name:'Andrea', age:38});    //ok
var him = Person({name:12, age:38});    //throws

```

## Features

* Immutable data structure
* Set method to create a new immutable object with updated data
* Idempotent types
* Optional new 
* Predefined types for primitives, structures, list, enums
* Retain type information at runtime
* Minimize object copy using prototype chain.



## Other stuff

* documentation - maybe I will add documentation if you ask it. open an issue for this.
* support - open an issue [here](https://github.com/parroit/immutato/issues).

## License
[MIT](http://opensource.org/licenses/MIT) © 2014, Andrea Parodi
