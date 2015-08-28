(function () {
    'use strict';

    var windowDimensionsUtils;

    windowDimensionsUtils = {

        /**
         * Gives the height of the window Cross-browser tested IE8+
         *
         * @method   windowTop
         */
        windowTop: function () {
            return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        },

        /**
         * Gives the width of the window
         *
         * @method   getWindowWidth
         */
        getWindowWidth: function () {
            return window.innerWidth || document.documentElement.clientWidth;
        },

        /**
         * Gives the height of the window
         *
         * @method   getWindowHeight
         */
        getWindowHeight: function () {
            return window.innerHeight || document.documentElement.clientHeight;
        }
    };

    module.exports = windowDimensionsUtils;
}());
