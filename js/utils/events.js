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
