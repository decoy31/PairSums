"use strict";

function StopWatch () {
}

StopWatch.prototype = {
    start: function () {
        this.startTime = new Date();
        delete this.endTime;
        delete this.difference;
        return this;
    },
    stop: function () {
        this.endTime = new Date();

        if (this.startTime) {
            this.difference = this.endTime - this.startTime;
        } else {
            delete this.difference;
        }

        return this;
    },
    clear: function () {
        delete this.startTime;
        delete this.endTime;
        delete this.difference;
        return this;
    },
    getMilliseconds: function () {
        return this.difference;
    },
    getSeconds: function () {
        return Math.floor(this.difference % 60000 / 1000);
    },
    getMinutes: function () {
        return Math.floor(this.difference % 36e5 / 60000);
    },
    getHours: function () {
        return Math.floor(this.difference / 36e5);
    },
    getDays: function () {
        return this.getHours() / 24;
    }
};