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


    it('with default configuration', function() {
        immutato.CACHE_COUNT.should.be.equal(300);
    });

    it('has a configure method', function() {
        immutato.configure.should.be.a('function');
    });

    describe('configure method', function() {
        var reconfigured;
        
        before(function() {
            reconfigured = immutato.configure(2);
        });

        it('return a new shaper function', function() {
            reconfigured.should.be.a('function');
        });

        it('has changed configuration', function() {
            reconfigured.CACHE_COUNT.should.be.equal(2);
        });
    });

    describe('TEST_HOOKS is filled with test internal', function() {
        var reconfigured;
        var TEST_HOOKS = {};
        var makeAnimal;
        
        before(function() {
            reconfigured = immutato.configure(2,TEST_HOOKS);
            makeAnimal = reconfigured({
                name: null,
                kind: null,
                color: null
            }, 'Animal');
        });

        describe('transactionsForClasses',function(){
            it('contains transactionMaps for shapes', function() {
                TEST_HOOKS.transactionsForClasses.should.be.a('object');
            });

            it('transactionMaps are hooked at shape creation time', function() {
                TEST_HOOKS.transactionsForClasses.Animal.should.be.an('array');
            });


    
        });
        
    });

    describe('transactionMaps', function() {
        var reconfigured;
        var TEST_HOOKS = {};
        var makeAnimal;
        var transactionMap;
        
        before(function() {
            reconfigured = immutato.configure(2,TEST_HOOKS);
            makeAnimal = reconfigured({
                name: null,
                kind: null,
                color: null
            }, 'Animal');
            transactionMap = TEST_HOOKS.transactionsForClasses.Animal;
        });

        it('is empty at shape created', function() {
            
            Object.keys(transactionMap).length.should.be.equal(0);
        });


        it('each new instance create a transactionMap', function() {
            var animal = makeAnimal({
                name: 'Fido',
                kind: 'dog',
                color: 'black'
            });
            transactionMap.length.should.be.equal(1);
            animal.dispose();
        });


        it('disposing instances of a class set transactionMap to null', function() {
            var animal = makeAnimal({
                name: 'Fido',
                kind: 'dog',
                color: 'black'
            });
            var another = makeAnimal({
                name: 'Kitty',
                kind: 'cat',
                color: 'white'
            });
            var len = Object.keys(transactionMap).length;
            animal.dispose();
            Object.keys(transactionMap).length.should.be.equal(len);
            expect(transactionMap[0]).to.be.equal(null);
            
        });


        


        

    
        
    });


    describe('CACHE_COUNT define amount of first version instance property indexes to cache at start', function() {
        var reconfigured;
        
        before(function() {
            reconfigured = immutato.configure(2);
        });

        it('build first property indexes at runtime if not caches', function() {
            var makeAnimal = reconfigured({
                name: null,
                kind: null,
                color: null
            }, 'Animal');

            var animal = makeAnimal({
                name: 'Fido',
                kind: 'dog',
                color: 'black'
            });

            animal.name.should.be.a('function');
            animal.kind.should.be.a('function');
            animal.color.should.be.a('function');
            animal.name().should.be.equal('Fido');
            animal.kind().should.be.equal('dog');
            animal.color().should.be.equal('black');
            animal.dispose();
        });
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

            after(function(){
                person.dispose();
            });
            
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
