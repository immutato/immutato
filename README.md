# immutato 

immutable and typed js data structures

[![Build Status](https://secure.travis-ci.org/immutato/immutato.png?branch=master)](http://travis-ci.org/immutato/immutato) [![NPM version](https://badge-me.herokuapp.com/api/npm/immutato.png)](http://badges.enytc.com/for/npm/immutato) [![Code Climate](https://codeclimate.com/github/immutato/immutato.png)](https://codeclimate.com/github/immutato/immutato) [![Test Coverage](https://codeclimate.com/github/immutato/immutato/badges/coverage.svg)](https://codeclimate.com/github/immutato/immutato)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/parroit.svg)](https://saucelabs.com/u/parroit)


## Getting Started
Install the module with: `npm install immutato --save`

```javascript

var i = require('immutato');

//
//  create a "shape"
//
var Person = i('Person', {
    name: '',
    surname: ''
},Person);

//
//  object creation
//
var person = Person({name:'Andrea', surname:'Parodi'});
person.name().should.be.equal('Andrea')
person.surname().should.be.equal('Parodi')

// 
// update a property
//
var renamed = person.name('Gianni');
renamed.name().should.be.equal('Gianni');
renamed.surname().should.be.equal('Parodi');

//
// previous version is still the same
//
person.name().should.be.equal('Andrea');
person.surname().should.be.equal('Parodi');

```

## Features

* Immutable data structure
* Setter methods to create a new immutable object with updated data
* Getter methods to retrieve property values
* Idempotent types (TODO - not implemented)
* Minimize object copy using WeakMap.
* Very fast

## Design 

See [DESIGN.md](DESIGN.md) (TODO - update to current implementation concepts)

## Status 

This is version 0.3 of the module. It is a complete rewrite, so maybe it contains weird things
like bugs or snakes.
Version 0.2 is [still available here](https://github.com/immutato/types). 
It is a bit more stable but [not very performant](https://github.com/immutato/benchmarks).

## Performance

It appear to be very fast. I wrote benchmarks to compare it with Immutable, Ancient Oak
and plain old JavaScript objects (using Object.freeze).
They are a bit biased (written by me) and cover really simple use cases, but it sound promises

[You can see my benchmarks here](https://github.com/immutato/benchmarks)

## Other stuff

* documentation - I will add, I promise.
* support - open an issue [here](https://github.com/immutato/immutato/issues).

## License
[MIT](http://opensource.org/licenses/MIT) © 2014, Andrea Parodi
