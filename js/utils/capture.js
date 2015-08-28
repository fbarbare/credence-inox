/*eslint no-new-wrappers:0*/
/*global FormMappingBuilder*/
(function () {
    'use strict';

    var captureMediator = require('./CaptureAppsMediator'),
        stringUtils = require('./String'),
        arrayUtils = require('./Array'),
        captureUtils = {
        mediator: captureMediator,
        // The parameter order matters because of the
        stringMatch: function (configString, pageString) {
            var regexp,
                specialCharactersToEscape = '\\.\\\\+\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:\\-';

            // These cleanups should be performed much more globally
            configString = this.toLowerCaseString(configString);
            pageString = this.toLowerCaseString(pageString);

            configString = configString.replace(new RegExp('(?=[' + specialCharactersToEscape + '])', 'gi'), '\\');
            configString = configString.replace(/\*/gi, '.*');
            regexp = new RegExp('^' + configString + '$');
            return regexp.test(pageString);
        },

        /*
        * Convert any datatype to a string and ensure it's lowercase.
        * @method toLowerCaseString
        * @param {any} datatype any datatype, normally would be a string, undefined or null.
        * @return {string} the string equivalent converted to lowercase.
        */
        toLowerCaseString: function (datatype) {
            datatype = new String(datatype).toString();
            datatype = datatype.toLowerCase();
            return datatype;
        },

        /*
        * Iterate through form Array to find the one with the given formId
        * @method findFormById
        * @param {number} formId ID of the form you're looking for.
        * @param {Array} formArray Array of forms to search through
        * @return {obj} The matching form, or false if none are found.
        */
        findFormById: function (formId, formArray) {
            var i;

            for (i = 0; i < formArray.length; i++) {
                if (formArray[i].FormId === formId) {
                    return formArray[i];
                }
            }
            return false;
        },

        checkForControls: function (formMappingObject) {
            var formMapping;

            if (formMappingObject instanceof FormMappingBuilder) {
                formMapping = formMappingObject;
            } else {
                formMapping = new FormMappingBuilder(formMappingObject);
            }
            return formMapping.getElementsWithSelector();
        },

        /*
        * Recursively extract the content of text nodes which are children of elementHandle
        * @method getInnerText
        * @param {ElementNode} elementHandle Element to extract the inner text value from.
        * @return {string} the innerText of elementHandle, with spaces added between each distinct textNode, then trimmed of spare whitespace.
        */
        getInnerText: function (elementHandle) {
            var capturedString = '';

            // We don't want to capture the contents of some tags, set in nodeBlackList.
            function isElementCaptureable(element) {
                var nodeBlackList = ['script', 'noscript', 'style', 'template'];

                if (element &&
                    element.nodeType === 1 &&
                    arrayUtils.indexOf(element.nodeName.toLowerCase(), nodeBlackList) === -1) {
                    return true;
                } else {
                    // If the element isn't present or isn't an element node we probably shouldn't capture it...
                    return false;
                }
            }

            function getTextNodes(elementNode) {
                var i,
                    finalString = '',
                    childNodes = elementNode.childNodes;

                if (isElementCaptureable(elementNode)) {
                    for (i = 0; i < childNodes.length; i++) {
                        if (childNodes[i].nodeType === 3) {
                            finalString += childNodes[i].nodeValue + ' ';
                        } else if (childNodes[i].nodeType === 1) {
                            finalString += getTextNodes(childNodes[i]);
                        }
                    }
                }

                return finalString;
            }

            if (elementHandle) {
                // Get values.
                capturedString = getTextNodes(elementHandle);
                // replace &nbsp; with ' '
                capturedString = capturedString.replace(new RegExp(String.fromCharCode(160), 'gmi'), ' ');
                //Trim all types of spare whitespace.
                capturedString = capturedString.replace(/(\r\n|\n|\r)/gm, ' ');
                capturedString = capturedString.replace(/[\s]+/gm, ' ');
                capturedString = stringUtils.trim(capturedString);
            }

            return capturedString;
        },


        /**
        *
        * @method initialiseFormMappings
        * @public
        * @parameter FormMappingArray {Array} Array of objects containing configuration data
        * @return FormMappingArray {Array} Array of FormMappingBuilder instances
        */
        initialiseFormMappings: function (formMappingArray) {
            var initilisedFormMappings = [],
                i;

            for (i = 0; i < formMappingArray.length; i++) {
                initilisedFormMappings.push(new FormMappingBuilder(formMappingArray[i]));
            }

            if (initilisedFormMappings.length === formMappingArray.length) {
                formMappingArray = initilisedFormMappings;
            } else {
                throw new Error('Couldn\'t initialise all the form mappings');
            }

            return formMappingArray;
        },

        /**
         * Gets the subset of the forms passed that match the current page.
         * It filters by URL, then by parameters and finally by visible mappings.
         * The number of forms matched is unknown.
         *
         * @param {Number} formMappingId The form mapping ID we are searching.
         * @param {Array} forms The form array from veTagData
         * @return {Number} The formTypeId of the choosen formMapping.
         */
        getFormTypeIdByFormMappingId: function (formMappingId, forms) {
            var i,
                j,
                mappings,
                response = false;

            forms = forms || [];

            for (i = 0; i < forms.length && !response; i++) {
                mappings = forms[i].FormFields;
                for (j = 0; j < mappings.length && !response; j++) {
                    if (mappings[j].FormMappingId === formMappingId) {
                        response = forms[i].FormTypeId;
                    }
                }
            }

            return response;
        }
    };

    module.exports = captureUtils;
}());
