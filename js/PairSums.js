"use strict";

function PairSums (min, max) {
    this.randomNumberGenerator = new RandomNumberGenerator(min, max);
}
PairSums.prototype = {
    initialize: function (size) {
        this.randomNumbers = this.randomNumberGenerator.generateMultiple(size);
    },
    findPairs: function (targetSum) {
        var pairs = [],
            x = 0,
            y = this.randomNumbers.length - 1;

        targetSum = parseInt(targetSum, 10) || 0;

        // Assumption: Array is sorted.
        while (x < y) {
            if (this.randomNumbers[x] + this.randomNumbers[y] === targetSum) {
                pairs.push([this.randomNumbers[x], this.randomNumbers[y]]);
                x++;
                y--;
            } else if (this.randomNumbers[x] + this.randomNumbers[y] < targetSum) {
                x++;
            } else if (this.randomNumbers[x] + this.randomNumbers[y] > targetSum) {
                y--;
            }
        }

        return pairs;
    }
};