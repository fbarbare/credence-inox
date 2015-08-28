(function () {
    'use strict';

    var crudElementsUtils;

    crudElementsUtils = {

        /**
         * Checks if an element exists
         *
         * @param {Element} element - element to test
         */
        exists: function (element) {
            return element !== null;
        },

        /**
         * Puts the focus in the element if is possible. Cross-browser tested IE8+
         *
         * @method focus
         * @param {Element} element - element to focus
         */
        focus: function (element) {
            if (element) {
                window.setTimeout(function () {
                    // We do the Try catch because sometimes it doesn't work in IE8
                    try {
                        element.focus();
                    } catch (e) { }
                }, 10);
            }
        },

        /**
         * Generates a div with the requested values and attributes
         *
         * @param {Object} attributes - Generic attributes for the div
         * @param {String} content - The inner content for the div
         * @return {DomElement} The div element
         */
        createDiv: function (attributes, content) {
            var div = document.createElement('div'),
                attributeName;

            div.innerHTML = content || '';

            for (attributeName in attributes) {
                if (attributes.hasOwnProperty(attributeName)) {
                    div.setAttribute(attributeName, attributes[attributeName]);
                }
            }

            return div;
        },

        /**
         * Creates a hidden form with the data passed an submits it as POST to the
         * URL defined.
         *
         * @param {String} url is the URL where the data will be sent.
         * @param {Object} postData is the data sent (same key-value sent to the BE).
         * @param {Boolean} openInNewTab true if we want the new page to open in a new
         * tab. If false, it will be open in the same one.
         */
        createAndSubmitForm: function (url, postData, openInNewTab) {
            var formElement,
                inputTemplate = '<input type="hidden" name="{{ name }}" value="{{ value }}">',
                inputHTML,
                formBody = '',
                key;

            for (key in postData) {
                if (postData.hasOwnProperty(key)) {
                    inputHTML = inputTemplate.replace('{{ name }}', key).replace('{{ value }}', postData[key]);
                    formBody += inputHTML;
                }
            }

            formElement = document.createElement('form');
            formElement.action = url;
            formElement.method = 'post';
            formElement.target = openInNewTab ? '_blank' : '_parent';
            formElement.style.visibility = 'hidden';
            formElement.innerHTML = formBody;

            document.body.appendChild(formElement);

            formElement.submit();
        },

        /**
         * Remove element from the DOM. Cross-browser tested IE7+
         *
         * @method   removeElement
         * @param    element - element to remove from the DOM
         */
        removeElement: function (element) {
            if (element) {
                element.parentElement.removeChild(element);
            }
        }
    };

    module.exports = crudElementsUtils;
}());
