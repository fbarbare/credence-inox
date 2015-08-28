(function () {
    'use strict';

    var dateUtils = {
        /**
         * Gives the current timeStamp. Date.now() doesn't work in IE8 but is has better performance . Cross-browser tested IE8+
         *
         * @method  now
         * @return  {number} returns the timeStamp of the current time
         */
        now: function () {
            if (Date.now) {
                this.now = function () {
                    return window.Date.now();
                };
            } else {
                this.now = function () {
                    return new Date().getTime();
                };
            }
            return this.now();
        }
    };

    module.exports = dateUtils;
}());
