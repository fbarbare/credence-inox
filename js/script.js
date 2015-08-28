(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
    'use strict';

    var Menu = require('./menu');

    function initiateMenu() {
        var menuElement = document.getElementById('menu');

        var menu = new Menu(menuElement, 'stick');
        menu.init();
    }

    function init() {
        initiateMenu();
    }

    window.onload = init;

}());

},{"./menu":2}],2:[function(require,module,exports){
(function (win) {
    'use strict';

    var eventsUtils = require('./utils/events'),
        classNamesUtils = require('./utils/classNames');

    function Menu(container, className) {
        this.container = container;
        this.className = className;
    }

    Menu.prototype.handleEvent = function () {
        var topPosition = this.container.getBoundingClientRect().top;

        if (topPosition < 0) {
            classNamesUtils.addClass(this.container, this.className);
        } else {
            classNamesUtils.removeClass(this.container, this.className);
        }
    };

    Menu.prototype.init = function () {
        eventsUtils.addEvent(win, 'scroll', this);
    };

    module.exports = Menu;
}(window));

},{"./utils/classNames":3,"./utils/events":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/*eslint no-shadow:0,no-unused-expressions:0*/
(function () {
'use strict';


    var utilsEvent = {
        /**
         * Add event to an element. Cross-browser tested IE7+
         * If neither addEventListener and attachEvent are supported, do nothing.
         *
         * @method  addEvent
         * @param   element -  element to attach the event
         * @param   evenType - type of event to attach to the element
         * @param   {Function} handler - function executed when the event occurs on the element
         */
        addEvent: function (element, eventType, handler, bubbling) {
            if (element.addEventListener) {
                this.addEvent = function (element, eventType, handler, bubbling) {
                    bubbling = bubbling ? true : false;
                    element.addEventListener(eventType, handler, bubbling);
                    return true;
                };
            } else if (element.attachEvent) {
                this.addEvent = function (element, eventType, handler) {
                    element.attachEvent('on' + eventType, handler);
                    return true;
                };
            } else {
                this.addEvent = function () {
                    return false;
                };
            }
            return this.addEvent(element, eventType, handler, bubbling);
        },

        /**
        * Remove event from an element. Cross-browser tested IE7+
        * If neither removeEventListener and detachEvent are supported, do nothing.
        *
        * @method   removeEvent
        * @param    element -  the element to remove the event
        * @param    evenType - the type of event attached to the element
        * @param    {Function} handler - function executed when the event occurs on the element
        */
        removeEvent: function (element, eventType, handler, bubbling) {
            if (element.removeEventListener) {
                this.removeEvent = function (element, eventType, handler, bubbling) {
                    bubbling = bubbling ? true : false;
                    element.removeEventListener(eventType, handler, bubbling);
                    return true;
                };
            } else if (element.detachEvent) {
                this.removeEvent = function (element, eventType, handler) {
                    element.detachEvent('on' + eventType, handler);
                    return true;
                };
            } else {
                this.removeEvent = function () {
                    return false;
                };
            }
            return this.removeEvent(element, eventType, handler, bubbling);
        },

        /**
        * Add event to an array of elements.
        * If neither addEventListener and attachEvent are supported, do nothing.
        *
        * @method  addEventsToArray
        * @param   array -  the array of elements to attach the event
        * @param   evenType - the type of event to attach to the elements
        * @param   {Function} handler - function executed when the event occurs on the elements
        */
        addEventsToArray: function (array, eventType, handler, bubbling) {
            var i,
                len;

            if (array === undefined) {
                throw new TypeError('Argument array should not be undefined or NULL.');
            }
            len = array.length >>> 0;
            for (i = 0; i < len; i++) {
                this.addEvent(array[i], eventType, handler, bubbling);
            }
        },

        /**
        * Remove events from an array of elements.
        * If neither addEventListener and attachEvent are supported, do nothing.
        *
        * @method  removeEventsFromArray
        * @param   array -  the array of elements to remove the event
        * @param   evenType - the type of event to remove from the elements
        * @param   {Function} handler - function executed when the event occurs on the elements
        */
        removeEventsFromArray: function (array, eventType, handler, bubbling) {
            var val = true,
                currentVal = true,
                len,
                i;

            if (typeof array === 'undefined') {
                throw new TypeError('Argument array should not be undefined or NULL.');
            }
            len = array.length >>> 0;
            for (i = 0; i < len; i++) {
                currentVal = this.removeEvent(array[i], eventType, handler, bubbling);
                val = currentVal && val ? true : false;
            }
            return val;
        },


        preventDefault: function (event) {
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            return event;
        },

        getSrcElement: function (event) {
            return event.target || event.srcElement;
        },

        onClick: function (element, handler) {
            this.addEvent(element, 'click', handler);
        },

        /**
         * Checks if the event wants to open the link in a new window.
         *
         * @param {Event} event is the event we want to check.
         * @returns {Boolean} true if it needs to be open in a new window.
         */
        isOpeningNewWindow: function (event) {
            var leftClick = false,
                wheelClick = false;

            if (event.which) {
                switch (event.which) {
                    case 1:
                        leftClick = true;
                        break;
                    case 2:
                        wheelClick = true;
                        break;
                }
            } else {
                switch (event.button) {
                    case 1:
                        leftClick = true;
                        break;
                    case 4:
                        wheelClick = true;
                        break;
                }
            }

            return (wheelClick || (leftClick && (event.shiftKey || event.ctrlKey)));
        },

        /**
         * Checks if the event has the right button clicked.
         *
         * @param {Event} event is the event that wants to be checked.
         * @returns {Boolean} true if the right button is clicked.
         */
        checkRightClick: function (event) {
            return (event.wich && event.wich === 3) || (!event.wich && event.button && event.button === 2);
        }

    };

    module.exports = utilsEvent;

}());

},{}]},{},[1]);
