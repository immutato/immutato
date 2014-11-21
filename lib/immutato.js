/*
 *
 * https://github.com/parroit/immutato
 *
 * Copyright (c) 2014 Andrea Parodi
 * Licensed under the MIT license.
 */

 'use strict';


function configure(CACHE_COUNT, TEST_HOOKS) {
    
    var caches = cacheFirstVersionPropertyIndexes();
    I.CACHE_COUNT = CACHE_COUNT;

    if (TEST_HOOKS) {
        TEST_HOOKS.transactionsForClasses = {};
    }

    return I;

    function buildFirstVersionPropertyIndexes(keysLength) {
        var propertyIndexes = new Array(keysLength);
        var i = keysLength;
        while (i--) {
            propertyIndexes[i] = 0;
        }
        return propertyIndexes;
    }

    function cacheFirstVersionPropertyIndexes(){
        var cachedPropertyIndexes = [];
        var k = CACHE_COUNT;

        while (k--) {
            cachedPropertyIndexes[k] = buildFirstVersionPropertyIndexes(k);
        }
        return cachedPropertyIndexes;
    }
    

    function getFirstVersionPropertyIndexes(keysLength) {
        

        if (keysLength > CACHE_COUNT) {
            return buildFirstVersionPropertyIndexes(keysLength);
        } else {
            return caches[keysLength];

        }


    }


    function get(self, opts) {

        var propertyIndexes = self.propertyIndexes;
        var instanceId = self.instanceId;
        var propertyIndex = opts.propertyIndex;
        var transactionsForClass = opts.transactionsForClass;
        var transactionIndex = propertyIndexes[propertyIndex];
        var transactions = transactionsForClass[instanceId];
        var transaction = transactions[transactionIndex];


        return transaction[propertyIndex];
    }


    function set(value, self, opts) {
        var propertyIndexes = self.propertyIndexes;
        var instanceId = self.instanceId;
        var propertyIndex = opts.propertyIndex;
        var transactionsForClass = opts.transactionsForClass;
        var Contructor = opts.Contructor;
        var transactions = transactionsForClass[instanceId];
        var keysLength = opts.keysLength;

        //TODO: check for data immutability or do a shallow copy
        //of input data

        //save new transaction
        var newTransaction = new Array(propertyIndex + 1);
        newTransaction[propertyIndex] = value;
        transactions.push(newTransaction);

        //create new propertyIndex for prop
        //it points to last transaction position
        var newPropertyIndexes  = new Array(keysLength);
        //newPropertyIndexes.generation:0};
        var i = keysLength;
        while (i--) {
            newPropertyIndexes[i] = propertyIndexes[i];
        }
        newPropertyIndexes[propertyIndex] = transactions.length -1;

        //return new instance, give new property indexes and 
        //root version id
        return new Contructor(newPropertyIndexes, instanceId);
    }

    function mkGetterSetter(opts) {
        return function getterSetter(value) {
            if (typeof value === 'undefined') {
                return get(this, opts);
            } else {
                return set(value, this, opts);
            }
        };
    }

    function I(dataSample, shapeName) {

        //cache key names
        var keys = Object.keys(dataSample);
        var keysLength = keys.length;



        //TODO: check for data immutability or do a shallow copy
        //of input data
        var transactionsForClass = [];

        //add test hooks to inspect transactionsForClass
        if (TEST_HOOKS) {
            TEST_HOOKS.transactionsForClasses[shapeName] = transactionsForClass;
        }

        //
        // build getter/setter for all properties
        // and save them in prototype.
        //
        var Proto = {
            dispose: function() {
                transactionsForClass[this.instanceId] = null;
            
                
            }
        };
        var i = keysLength;
        var clonedData = {};

        while (i--) {


            var opts = {
                propertyIndex: i,
                transactionsForClass: transactionsForClass,
                Contructor: Contructor,
                keysLength: keysLength
            };

            var propertyName = keys[i];
            Proto[propertyName] = mkGetterSetter(opts);
        }

        function Contructor(propertyIndexes, instanceId) {
            this.propertyIndexes = propertyIndexes;
            this.instanceId = instanceId;

        }

        //Object.freeze(Proto);

        Contructor.prototype = Proto;

        var instanceId = 0;

        return function(data) {
            var propertyIndexes = getFirstVersionPropertyIndexes(keysLength);
            var clonedData = [];

            i = 0;
            while (i < keysLength) {
                clonedData.push(data[keys[i]]);
                i++;
            }
            //console.dir(clonedData)
            transactionsForClass[instanceId] = [clonedData];
            var res = new Contructor(propertyIndexes, instanceId);

            instanceId++;

            return res;
        };




    }

    
}


module.exports = configure(300);
module.exports.configure = configure;
