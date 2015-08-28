/*eslint no-shadow:0*/
(function () {
    'use strict';

    var objectUtils = require('./Object.js'),
        arrayUtils;

    arrayUtils = {
        /**
         * Search in an array if an element exists. Cross-browser tested IE7+
         * If more than one elemetn exist it returns the first found
         *
         * @method  indexOf
         * @param   array -  array to search
         * @param   element - element
         * @return  {number} -1 if not found. Else the index of that element in the array
         * If the array is undefined it throws an error
         */
        indexOf: function (element, array) {
            if (typeof array === 'undefined') {
                throw new TypeError('Argument array should not be undefined or NULL.');
            }

            // if the current browser supports the indexOf method, uses the native version.
            // if the current website has overwritten this method PRIOR to this code execution, it would be used.
            if (array.indexOf) {
                this.indexOf = function (element, array) {
                    return array.indexOf(element);
                };
            } else {
                this.indexOf = function (element, array) {
                    var k, t = Object(array),
                        len = t.length >>> 0;

                    if (len > 0) {
                        for (k = 0; k < len; k++) {
                            if (k in t && t[k] === element) {
                                return k;
                            }
                        }
                    }

                    return -1;
                };
            }
            return this.indexOf(element, array);
        },

        /**
         * Search in an array if an element exists and if it does, it's removing it. Then it returns the final array.
         *
         * @method  removeElementFromArray
         * @param {Array} array -  Array to search in
         * @param {Any} element - Element to remove
         * @return  {Array} - Final array
         */
        removeElementFromArray: function (array, element) {
            var i;

            for (i = 0; i < array.length; i++) {
                if (array[i] === element || (typeof array[i] === 'object' && objectUtils.areEqual(array[i], element))) {
                    array.splice(i, 1);
                    return array;
                }
            }
            return array;
        },

        /**
         * Removes a specific index from an array
         * @method  removeElementFromArray
         * @param {Array} array - Array to remove the index from
         * @param {Number} index - Index to remove
         */
        removeIndex: function (array, index) {
            if (array[index]) {
                array.splice(index, 1);
            }
        },

        /**
         * Merge two arrays into one without any duplicated value.
         *
         * @method  concatWithoutDuplicate
         * @param {Array} array1 - First array
         * @param {Array} array2 - Second array
         * @return  {Array} - Final array
         */
        concatWithoutDuplicate: function (array1, array2) { //TODO: Unit test
            var self = this,
                array = [];

            function storeDifferentValues(a) {
                    var i;

                    for (i = 0; i < a.length; i++) {
                        if (self.indexOf(a[i], array) === -1) {
                        array.push(a[i]);
                    }
                }
            }
            storeDifferentValues(array1);
            storeDifferentValues(array2);
            return array;
        },

        pushWithoutDuplicate: function (elem, array) { //TODO: Unit test
            if (this.indexOf(elem, array) === -1) {
                array.push(elem);
            }
            return array;
        },

        /**
         * removes empty elements from the array
         * @param  {Array} array with elements
         * @return {Array} array with no empty elements
         */
        removeNullElements: function(array) {
            var i;

            for (i = 0; i < array.length; i++) {
                if (array[i] === null) {
                    array.splice(i, 1);
                    i--;
                }
            }

            return array;
        }
    };

    module.exports = arrayUtils;
}());
