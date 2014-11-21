/*
 *
 * https://github.com/parroit/immutato
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

'use strict';

var chai = require('chai');
var expect = chai.expect;
chai.should();

var immutato = require('../lib/immutato.js');

describe('immutato', function() {

    it('is a function', function() {
        immutato.should.be.a('function');
    });


    describe('that return a factory', function() {
        var makePerson;

        before(function() {
            makePerson = immutato({
                name: null,
                surname: null,
                age: null
            }, 'Person');

        });


        it('is a function', function() {
            makePerson.should.be.a('function');
        });

        describe('that build an instance', function() {
            var person;

            before(function() {
                person = makePerson({
                    name: 'Andrea',
                    surname: 'Parodi',
                    age: 38
                });

            });


            it('is an object', function() {
                person.should.be.a('object');
            });


            it('has getter-setter for its properties', function() {
                person.name.should.be.a('function');
                person.surname.should.be.a('function');
                person.age.should.be.a('function');
            });

            describe('getter-setter', function() {
                describe('without arguments', function() {
                    
                    it('return property values', function() {
                        person.name().should.be.equal('Andrea');
                        person.surname().should.be.equal('Parodi');
                        person.age().should.be.equal(38);
                    });

                });

                describe('with an arguments', function() {
                    var changedPerson;

                    before(function() {
                        changedPerson = person.age(142);
                    });

                    it('return new instance', function() {
                        changedPerson.should.not.be.equal(person);
                    });

                    it('with new property value', function() {
                        changedPerson.age().should.be.equal(142);
                    });

                    it('without changing first instance properties', function() {
                        person.age().should.be.equal(38);
                    });
                });
            });


        });

    });
});
