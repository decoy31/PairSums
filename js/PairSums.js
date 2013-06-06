"use strict";

function PairSums (min, max) {
    this._randomNumberGenerator = new RandomNumberGenerator(min, max);

    (function (instance) {
        Object.defineProperties(instance, {
            "min": {
                get: function () {
                    return instance._randomNumberGenerator.min;
                },
                set: function (val) {
                    instance._randomNumberGenerator.min = val;
                }
            },
            "max": {
                get: function () {
                    return instance._randomNumberGenerator.max;
                },
                set: function (val) {
                    instance._randomNumberGenerator.max = val;
                }
            }
        });
    }(this));

}

PairSums.prototype = {
    initialize: function (size) {
        var randomNumbersWatch = (new StopWatch()).start();
        var randomNumbersSortedWatch = (new StopWatch()).start();

        this.randomNumbers = this._randomNumberGenerator.generateMultiple(size);
        this.randomNumbersSorted = this.randomNumbers.slice();
        this.randomNumbers.timeToComplete = randomNumbersWatch.stop();

        if (this.randomNumbers.length) {
            this.randomNumbersSorted = this.randomNumbersSorted.sort(function (a, b) {
                return a - b;
            });

            this.randomNumbersSorted.timeToComplete = randomNumbersSortedWatch.stop();
        }

        return this;
    },

    findPairs: function (targetSum) {
        // TODO: Implement.
        return this.findPairsSorted(targetSum);
    },

    findPairsSorted: function (targetSum) {
        var pairs = [],
            x = 0,
            y = this.randomNumbersSorted.length - 1;

        targetSum = parseInt(targetSum, 10) || 0;

        var watch = (new StopWatch()).start();

        // Assumption: Array is sorted.
        while (x < y) {
            if (this.randomNumbersSorted[x] + this.randomNumbersSorted[y] === targetSum) {
                pairs.push([this.randomNumbersSorted[x], this.randomNumbersSorted[y]]);
                y--;
            } else if (this.randomNumbersSorted[x] + this.randomNumbersSorted[y] < targetSum) {
                x++;
            } else if (this.randomNumbersSorted[x] + this.randomNumbersSorted[y] > targetSum) {
                y--;
            }
        }

        pairs.timeToComplete = watch.stop();

        //console.log('findPairsSorted completed in ' + pairs.timeToComplete.getMilliseconds() + 'ms');

        return pairs;
    }
};