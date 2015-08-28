/*eslint new-cap:1*/
(function () {
    'use strict';
    module.exports = {
        /**
         * This function allows us to bind function in IE8+
         *
         * @method  bind
         * @param {Function}  myFunction - function to bind
         * @param {Object} context - context of the binding
         * @return {Function} - The binded function
         * If the array is undefined it throws an error
         */
        bind: function (myFunction, context) {
            var argsWithContext = Array.prototype.slice.call(arguments, 1),
                argsWithoutContext = Array.prototype.slice.call(arguments, 2),
                fNOP = function () { },
                fBound = function () {
                    return myFunction.apply(this instanceof fNOP
                            ? this
                            : context,
                            argsWithoutContext.concat(Array.prototype.slice.call(arguments)));
                };

            if (typeof myFunction !== 'function') {
                throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
            }

            if (myFunction.bind) {
                if (argsWithContext.length > 1) {
                    return myFunction.bind.apply(myFunction, argsWithContext);
                } else {
                    return myFunction.bind(context);
                }
            } else {
                fNOP.prototype = myFunction.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            }
        }
    };
}());
