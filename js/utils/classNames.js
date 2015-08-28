(function () {
    'use strict';

    var classNamesUtils;

    classNamesUtils = {

        /**
        * Checks if the element contains the class
        *
        * @method   hasClass
        * @param    element - element to check
        * @param    value - class to check if it contained
        * @return {boolean}
        */
        hasClass: function (element, value) {
            if (element.classList) {
                this.hasClass = function (element, value) {
                    return element.classList.contains(value);
                };

            } else {
                this.hasClass = function (element, value) {
                    return new RegExp('(?:^|\\s+)' + value + '(?:\\s+|$)').test(element.className);
                };
            }

            return this.hasClass(element, value);
        },

        /**
         * Add the class to the element
         *
         * @method   addClass
         * @param    element - element to add the class
         * @param    value - class to add to the element
         */
        addClass: function (element, value) {
            if (element.classList) {
                this.addClass = function (element, value) {
                    element.classList.add(value);
                };

            } else {
                this.addClass = function (element, value) {
                    if (!this.hasClass(element, value)) {
                        element.className = element.className ? [element.className, value].join(' ') : value;
                    }
                };
            }

            this.addClass(element, value);
        },

        /**
         * Remove the class from the element
         *
         * @method   removeClass
         * @param    element - element to remove the class
         * @param    value - class to remove if found
         */
        removeClass: function (element, value) {
            if (element.classList) {
                this.removeClass = function (element, value) {
                    element.classList.remove(value);
                };

            } else {
                this.removeClass = function (element, value) {
                    var c;

                    if (this.hasClass(element, value)) {
                        c = element.className;
                        element.className = c.replace(new RegExp('(?:^|\\s+)' + value + '(?:\\s+|$)', 'g'), ' ');
                    }
                };
            }

            this.removeClass(element, value);
        }
    };

    module.exports = classNamesUtils;
}());
