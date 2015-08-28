(function () {
    'use strict';

    var shellUtils = require('./Shell.js'),
        jsonUtils = {
        /**
        * Parses the JSON data into an object. If it is already an object it doen't do anything.
        *
        * @method  parseJSON
        * @param   data -  data received from an Ajax request, either JSON or string
        * @return  Return the data parsed to json
        */
        parseJSON: function (data, errorMessage) {
            var object = data;

            if ((typeof data !== 'object') && (typeof JSON !== 'undefined')) {
                try {
                    object = window.JSON.parse(data);
                } catch (e) {
                    if (errorMessage) {
                        shellUtils.log(errorMessage);
                    }
                }
            }
            return object;
        },

        /**
        * Parses the JSON data into an string. If it is already an string it doen't do anything.
        *
        * @method  stringify
        * @param   object -  data received from an Ajax request, either JSON or string
        * @return  Return the object parsed to string
        */
        stringify: function (object, errorMessage) {
            var string = object;

            if ((typeof data !== 'string') && typeof JSON !== 'undefined') {
                try {
                    string = window.JSON.stringify(object);
                } catch (e) {
                    if (errorMessage) {
                        shellUtils.log(errorMessage);
                    }
                }
            }
            return string;
        }
    };

    module.exports = jsonUtils;
}());
