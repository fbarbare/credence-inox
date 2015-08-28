/*eslint no-unused-vars:0,no-fallthrough:0*/
(function () {
    'use strict';

    var objectUtils = {
        /**
        * Creates an object to inherit from another object
        *
        * @method  create
        * @param   obj -  object to copy
        * @return  Return the object copied
        */
        create: function (obj) {
            var newObject = {};

            function F() { }
            if (obj) {
                if (Object.create) {
                    newObject = Object.create(obj);

                } else {
                    F.prototype = obj;
                    newObject = new F();
                }
            }

            return newObject;
        },

        /**
        * Checks if an object is empty or not
        *
        * @method  create
        * @param   obj -  object
        * @return  Return true if is empty
        */
        isEmpty: function (obj) {
            var prop;

            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    return false;
                }
            }

            return true;
        },

        /**
        * Checks if two objects are have the same properties and values affected to them.
        *
        * @method  areEqual
        * @param   object1 - First object
        * @param   object2 - Second object
        * @return  Return true if is the object are the same
        */
        areEqual: function (object1, object2) {
            var key = '';

            function areEqual(obj1, obj2) {
                for (key in obj1) {
                    if (typeof obj1[key] === 'object' && obj2[key]) {
                        if (!areEqual(obj1[key], obj2[key])) {
                            return false;
                        }
                    } else {
                        if (obj1[key] !== obj2[key]) {
                            return false;
                        }
                    }
                    delete object1[key];
                    delete object2[key];
                }
                return true;
            }

            return (areEqual(object1, object2) && areEqual(object2, object1));
        },

        /**
        * Checks if two objects are have the same properties and values affected to them.
        *
        * @method  length
        * @param   object1 - First object
        * @return  Return true if is the object are the same
        */
        length: function (object) {
            var i = 0,
                key = '';

            if (typeof object !== 'object') {
                throw new TypeError('The parametter must be an object.');
            }
            for (key in object) {
                i++;
            }

            return i;
        },

    /**
     * Concatenates both objects creating a new one.
     * In case of duplicated keys, keeps the value of the first object.
     * @param  {Object} firstObject is the an  object to concatenate, which has
     * more priority in case of matching keys.
     * @param  {Object} secondObject is the an object to concatenate, which has
     * less priority in case of matching keys.
     * @return {Object} is the concatenated object.
     */
    concatenate: function (firstObject, secondObject) {
        var key,
            concatenatedObejct = {};

        for (key in firstObject) {
            if (firstObject.hasOwnProperty(key)) {
                concatenatedObejct[key] = firstObject[key];
            }
        }

        for (key in secondObject) {
            if (secondObject.hasOwnProperty(key) && !concatenatedObejct.hasOwnProperty(key)) {
                concatenatedObejct[key] = secondObject[key];
            }
        }

        return concatenatedObejct;
    },

        //TODO: review this function because it doesn't work properly
        /**
        * Checks if two objects are have the same properties and values affected to them.
        *
        * @method  length
        * @param   object1 - First object
        * @return  Return true if is the object are the same
        */
        toLowerCase: function (object) {
            var key = null,
                newObect = {},
                keyLowerCased = null,
                value = null;

            for (key in object) {
                keyLowerCased = key.toLowerCase();

                if (typeof object[keyLowerCased] === 'undefined' && keyLowerCased !== key) {

                    value = object[key];

                    switch (typeof value) {
                        case 'string':
                            newObect[keyLowerCased] = value.toLowerCase();
                            break;
                        case 'object':
                            if (value !== null && typeof value.length === 'undefined') {
                                newObect[keyLowerCased] = this.toLowerCase(value);
                                break;
                            }
                        default:
                            newObect[keyLowerCased] = value;
                            break;
                    }
                } else if (keyLowerCased === key) {
                    newObect[key] = object[key];
                }
            }
            return newObect;
        }
    };

    module.exports = objectUtils;
}());
