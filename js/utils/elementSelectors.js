(function () {
    'use strict';

    var elementSelectorsUtils;

    elementSelectorsUtils = {

        /**
         * Group 2 arrays into 1, even if those are Node Lists.
         *
         * @method   concatNodeList
         * @param {Array} array1 - First array
         * @param {Array} array2 - Second array
         * @return {Array} Array of all the elements within the 2 parameters array
         */
        concatNodeList: function (array1, array2) {
            if ((typeof array1 !== 'object' || array1.length === undefined) && (typeof array2 !== 'object' || array2.length === undefined)) {
                throw new TypeError('The parametters are supposed to be Arrays or Node List.');
            }

            array1 = Array.prototype.slice.call(array1);
            array2 = Array.prototype.slice.call(array2);

            return array1.concat(array2);
        },

        /**
         * Gets the top most window
         * @method getTopWindow
         * @param  {Window} wnd - Window to test
         * @return {Window} The top most window
         */
        getTopWindow: function (wnd) {
            var topWindow;

            topWindow = wnd.parent !== wnd
                ? this.getTopWindow(wnd.parent)
                : wnd;

            return topWindow;
        },

        /**
         * Get DOM elements by ClassName Cross-browser tested IE7+
         *
         * @method   getElementsByClassName
         * @param    {String} searchClass -  string that contains the class to search for
         * @param    {Element} node - the parent node (optional)
         * @param    {String} tag - parameter not used. Only to make the function work in IE5
         * @return   {Array} - Returns a array of objects that contains that class
         */
        getElementsByClassName: function (searchClass, node, tag) {

            // if the current browser supports the getElementsByClassName method, uses the native version.
            // if the current website has overwritten this method PRIOR to this code execution, it would be used.
            if (document.getElementsByClassName) {
                this.getElementsByClassName = function (searchClass, node, tag) {
                    var classElements = [];

                    node = node || document;
                    if (typeof searchClass !== 'string') {
                        return classElements;
                    }

                    return node.getElementsByClassName(searchClass);
                };

            // if the current browser supports the querySelectorAll method, uses the native version.
            // if the current website has overwritten this method PRIOR to this code execution, it would be used.
            } else if (document.querySelectorAll) {
                this.getElementsByClassName = function (searchClass, node, tag) {
                    var classElements = [];

                    if (typeof searchClass !== 'string') {
                        return classElements;
                    }

                    return this.querySelectorAll('.' + searchClass, node);
                };

            } else {
                this.getElementsByClassName = function (searchClass, node, tag) {
                    var classElements = [],
                        els,
                        elsLen,
                        pattern,
                        i,
                        j;

                    if (typeof searchClass !== 'string') {
                        return classElements;
                    }
                    node = node || document;
                    tag = tag || '*';

                    els = node.getElementsByTagName(tag);
                    elsLen = els.length;
                    pattern = new RegExp('(^|\\s)' + searchClass + '(\\s|$)');

                    for (i = 0, j = 0; i < elsLen; i++) {
                        if (pattern.test(els[i].className)) {
                            classElements[j] = els[i];
                            j++;
                        }
                    }

                    return classElements;
                };
            }

            return this.getElementsByClassName(searchClass, node, tag);
        },

        /**
         * Get all the elements that matches the data attribute and its value if given.
         *
         * @method   getElementsByDataAttribute
         * @param {Element} parentElement - DOM element to start searching from
         * @param {String} key - The data attribute we are looking for
         * @param {String} value - The value the data attribute must have
         * @return {Array} Found elements
         */
        getElementsByDataAttribute: function (parentElement, key, value) {
            var allChild,
                arrayElement = [],
                i = 0;

            if (parentElement !== null) {
                allChild = parentElement.getElementsByTagName('*');

                for (i = 0; i < allChild.length; i++) {
                    if (allChild[i].hasAttribute(key) && (value === undefined || allChild[i].getAttribute(key) === value)) {
                        arrayElement.push(allChild[i]);
                    }
                }
            }

            return arrayElement;
        },

        /**
         * Get DOM elements by query selector IE8+. This is the only place we use querySelectorAll in order to be able to replace it easily once we move to an IE5-7+ support
         *
         * @method   querySelectorAll
         * @param {String} selector - Query string to find elements in the dom
         * @param {Element} parentElement the element within which we should search for the selector
         * @return {Array} - Array of all the elements it found
         */
        querySelectorAll: function (selector, parentElement) {//TODO : IE7-
            var result;

            parentElement = parentElement || document;

            try {
                result = parentElement.querySelectorAll(selector);
            } catch (e) {
                if (parentElement === document) {
                    result = VEjQuery(selector);
                } else {
                    result = VEjQuery(parentElement).find(selector);
                }
            }

            return result;
        },

        /**
         * Get DOM elements by query selector.
         *
         * @method   getElementsByQuerySelectors
         * @param {Array} selectors - Array of query string to find elements in the dom
         * @return {Array} - Array of all the elements it found
         */
        getElementsByQuerySelectors: function (selectors) {
            var i = 0,
                result = [];

            if (typeof selectors !== 'object' || selectors.length === undefined) {
                throw new TypeError('The parametter is supposed to be an Array.');
            }

            for (i = 0; i < selectors.length; i++) {
                result = this.concatNodeList(result, this.querySelectorAll(selectors[i])); // querySelectorAll not compatible IE7 and less
            }

            return result;
        },


        /**
         * Get the first parent that matches the id.
         *
         * @method   getParentById
         * @param {Element} element - DOM element to start searching from
         * @param {String} id - The id we are looking for
         * @return {Element|Null} Found element or null
         */
        getParentById: function (element, id) {
            var parent = element && element.parentNode,
                element = null;

            if (parent !== document.body) {
                if (parent && parent.getAttribute('id') !== id) {
                    parent = this.getParentById(parent, id);
                }
                element = parent;
            }

            return element;
        },

        /**
         * Get the first parent that matches the tag name.
         *
         * @method   getParentByTagName
         * @param {Element} element - DOM element to start searching from
         * @param {String} parentTagName - The tag name we are looking for
         * @return {Element|Null} Found element or null
         */
        getParentByTagName: function (element, parentTagName) {
            var parent = element && element.parentNode,
                element = null;

            if (parent && parent.tagName) {
                if (parent.tagName.toLowerCase() !== parentTagName.toLowerCase()) {
                    parent = this.getParentByTagName(parent, parentTagName);
                }
                element = parent;
            }

            return element;
        },

        /**
         * Get the first parent that matches the data attribute and its value if given.
         *
         * @method   getParentByDataAttribute
         * @param {Element} element - DOM element to start searching from
         * @param {String} key - The data attribute we are looking for
         * @param {String} value - The value the data attribute must have
         * @return {Element|Null} Found element or null
         */
        getParentByDataAttribute: function (element, key, value) {
            var parent = element && element.parentNode,
                element = null;

            if (parent && parent.hasAttribute) {
                if (!parent.hasAttribute(key) || (value !== undefined && parent.getAttribute(key) !== value)) {
                    parent = this.getParentByDataAttribute(parent, key, value);
                }
                element = parent;
            }

            return element;
        }
    };

    module.exports = elementSelectorsUtils;
}());
