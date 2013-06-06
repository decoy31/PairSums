"use strict";

/**
 * Creates a new instance of the StopWatch class.
 *
 * @constructor
 */
function StopWatch () {
}

StopWatch.prototype = {
    /**
     * "Starts" the stopwatch timer.
     *
     * @returns {StopWatch} Returns the current StopWatch instance.
     */
    start: function () {
        this.startTime = new Date();
        delete this.endTime;
        delete this.difference;
        return this;
    },

    /**
     * "Stops" the stopwatch timer and calculates the difference.
     *
     * @returns {StopWatch} Returns the current StopWatch instance.
     */
    stop: function () {
        this.endTime = new Date();

        if (this.startTime) {
            this.difference = this.endTime - this.startTime;
        } else {
            delete this.difference;
        }

        return this;
    },

    /**
     * Resets the stopwatch.
     *
     * @returns {StopWatch} Returns the current StopWatch instance.
     */
    clear: function () {
        delete this.startTime;
        delete this.endTime;
        delete this.difference;
        return this;
    },

    /**
     * Returns the elapsed time in milliseconds.
     *
     * @returns {number|undefined} Returns the number of elapsed milliseconds
     *      or if the StopWatch instance was never "started" or "stopped", returns
     *      undefined.
     */
    getMilliseconds: function () {
        return this.difference;
    },

    /**
     * Returns the elapsed time in seconds.
     *
     * @returns {number|undefined} Returns the number of elapsed seconds
     *      or if the StopWatch instance was never "started" or "stopped", returns
     *      undefined.
     */
    getSeconds: function () {
        return Math.floor(this.difference % 60000 / 1000);
    },

    /**
     * Returns the elapsed time in minutes.
     *
     * @returns {number|undefined} Returns the number of elapsed minutes
     *      or if the StopWatch instance was never "started" or "stopped", returns
     *      undefined.
     */
    getMinutes: function () {
        return Math.floor(this.difference % 36e5 / 60000);
    },

    /**
     * Returns the elapsed time in hours.
     *
     * @returns {number|undefined} Returns the number of elapsed hours
     *      or if the StopWatch instance was never "started" or "stopped", returns
     *      undefined.
     */
    getHours: function () {
        return Math.floor(this.difference / 36e5);
    },

    /**
     * Returns the elapsed time in days.
     *
     * @returns {number|undefined} Returns the number of elapsed days
     *      or if the StopWatch instance was never "started" or "stopped", returns
     *      undefined.
     */
    getDays: function () {
        return this.getHours() / 24;
    }
};