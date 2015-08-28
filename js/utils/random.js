(function () {
    'use strict';


    var dateUtils = require('./Date'),
        randomnessUtils = {
        generateUUID: function () {
            var d = dateUtils.now(),
                uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = (d + Math.random() * 16) % 16 | 0;

                    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
                });

            return uuid;
        }
    };

    module.exports = randomnessUtils;
}());
