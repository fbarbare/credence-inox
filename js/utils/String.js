(function () {
    'use strict';

    module.exports = {
        /**
         * Checks if a string starts with a substring. Cross-browser tested IE7+
         *
         * @method  startsWith
         * @param   string -  string to check
         * @param   substring - substring
         * @return  {boolean} True if strings starts with substring
         * False if any parameter is empty or it doesn's start with the substring
         */
        startsWith: function (string, substring) {
            return substring === '' ? false : (string.indexOf(substring) === 0);
        },

        /**
        * Checks if a string ends with a substring. Cross-browser tested IE7+
        *
        * @method  endsWith
        * @param   string -  string to check
        * @param   substring - substring
        * @return  {boolean} True if strings ends with substring
        * False if any parameter is empty or it doesn's end with the substring
        */
        endsWith: function (string, substring) {
            if (!string || !substring) {
                return false;
            }
            return string.indexOf(substring, string.length - substring.length) !== -1;
        },

        /**
        * Removes white spaces at the beginning and end of a string Cross-browser tested IE7+
        *
        * @method  trim
        * @param   string -  string to trim
        * @return  {string} Returns the same string trimmed
        */
        trim: function (string) {
            if (typeof string === 'string') {
                return string.replace(/^\s+|\s+$/g, '');
            }
        },

        /**
        * Check if a string is a valid email address. TODO: Check cross-browser
        *
        * @method  isValidEmail
        * @param   string - email address to validate
        * @return  {bool}
        */
        isValidEmail: function (string) {
            var regEmail = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/;

            string = string.toUpperCase();
            return (string.search(regEmail) === -1) ? false : true;
        },

        /**
        * Decode a string, trim it, and replace characters that can be XSS unsafe. TODO: Check cross-browser
        *
        * @method  cleanString
        * @param   string - email address to validate
        * @return  {string} the string already cleaned
        */
        cleanString: function (string) {
            // Commented the below line out while we test whether it's required for the '%' symbol fix.
            // Prevents decodeURI from running, causing non-latin character bugs
            // string = string.replace(/%20|%/g, ' ');

            // var blackList = /([¿¡`~!?@#%\^&*\(\)\|=;:\'",\.\-<>\{\}\[\]¬¦\/\\])/gi;

            ////////////////// No need to decode because we already get decoded characters (regexp, url, autocomplete search-box)
            //decode the string that might come from an url
            //string = window.decodeURIComponent(string);

            // Replace the special characters in the blacklist
            // string = string.replace(blackList, ' ');

            // Replace symbol '+' for spaces and trim the string
            // string = Utils.string.trim(string.replace(/[\+]+/g, '+').replace(/\+/g, ' ').replace(/ +/g, " "));

            return string;
        },

        boolToString: function (boolean) {
            return (boolean) ? '1' : '0';
        },

        stringToBool: function (string) {
            return (string !== '0') ? true : false;
        },

        /**
        * Check if captured value is a valid credit card number.
        *
        * @method  checkIfCreditCard
        * @param   value - captured value
        * @return  {Boolean}
        */
        isCreditCard: (function (arr) {
            return function (value) {
                var len = null,
                  bit = 1,
                  sum = 0;

              value = value.replace(/[\s]*/gi, '');
                len = value.length;

                while (len--) {
                    sum += !(bit ^= 1) ? parseInt(value[len], 10) : arr[value[len]];
                }

                return sum % 10 === 0 && sum > 0;
            };
        }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9])),

        /**
         * Formats a string with placeholders using the params as replacers
         * (e.g.: formatString("{0}-{1}-{0}", "x", "y") returns "x-y-x" )
         *
         * @method  formatString
         * @param   {String} string - string to format
         * @return  {String} Formatted string
         */
        formatString: function (string){
            var args = Array.prototype.slice.call(arguments, 1);

            return string.replace(/{(\d+)}/g, function (match, number) {
              return typeof args[number] !== 'undefined'
                ? args[number]
                : match;
            });
        }
    };
}());
