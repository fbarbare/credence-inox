(function () {
    'use strict';

    var bodyDimensionsUtils;

    bodyDimensionsUtils = {

        /**
         * stored body height
         */
        bodyHeight: 0,

        /**
         * Returns the width of the Body
         * @method   getBodyWidth
         */
        getBodyWidth: function () {
            return document.body.offsetWidth;
        },

        /**
         * Returns the height of the Body
         * @method   getBodyHeight
         */
        getBodyHeight: function () {
            return document.body.offsetHeight;
        },

        /**
         * Returns the last updated height of the Body
         * @method   getLastUpdatedBodyHeight
         */
        getLastUpdatedBodyHeight: function () {
            return this.bodyHeight;
        },

        /**
         * Updates the stored body height value
         * @method   updateBodyHeight
         */
        updateBodyHeight: function () {
            this.bodyHeight = this.getBodyHeight();
        }
    };

    module.exports = bodyDimensionsUtils;
}());
