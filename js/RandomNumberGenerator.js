"use strict";

function RandomNumberGenerator (min, max) {
    if (typeof min === 'number' && typeof max === 'number') {
        if (min >= 0 && max >= 0 && min < max) {
            this.min = min;
            this.max = max;
        } else {
            throw new Error('Min and max cannot be less than zero and max must be greater than min.');
        }
    } else {
        throw new TypeError('Min and max must be of type number.');
    }
}

RandomNumberGenerator.prototype = {
    /**
     * Generates one random number given between the min
     * and max of the RandomNumberGenerator instance.
     *
     * @returns {number} Returns a random number.
     */
    generate: function () {
        return (Math.round((this.max - this.min) * Math.random() + this.min));
    },

    /**
     * Generates an array of random numbers. The number of
     * random numbers generated is specified by the size param.
     *
     * @param {number} size A number greater than 0 which determines
     *      the number of random numbers generated.
     * @returns {Array} Returns an array of random numbers.
     */
    generateMultiple: function (size) {
        var nums = [];

        if (typeof size === 'number') {
            if (size > 0) {
                for (var i = 1; i <= size; i++) {
                    nums.push(this.generate());
                }
            } else {
                throw new Error('Size must be greater than 0.');
            }
        } else {
            throw new TypeError('Size must be of type number.');
        }

        return nums;
    }
};