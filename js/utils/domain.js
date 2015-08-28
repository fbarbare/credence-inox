(function () {
    'use strict';

    var domainUtils = {
    /**
    * Check if the code is inside an iFrame
    *
    * @public
    * @method   isInIframe
    * @return {boolean} true if the code is running insiede an iFrame
    */
    isInIframe: function () {
        return (window.location !== window.parent.location);
    },

    /**
    * Checks whether the URL of the previous page (referrer) belongs to any of the urls in the array
    *
    * @public
    * @method   referrerIsInDomains
    * @param    {string} currentReferrer - the URL of the previous page (document.referrer)
    * @param    {array} domainsToCheck - the array of URLs to check
    * @return   {boolean} true if the refererr domain exists in the array or if this is empty.
    */
    referrerIsInDomains: function (currentReferrer, domainsToCheck) {
        var i = 0,
            currentRegExp = null;

        function isUrlMatching(url, urlArray) {
            for (; i < urlArray.length; i++) {
                urlArray[i] = urlArray[i].replace(/\./g, '\\.');
                currentRegExp = new RegExp('(^|\\.)' + urlArray[i] + '$');

                if (currentRegExp.test(url)) {
                    return true;
                }
            }

            return false;
        }

        if (currentReferrer !== '') {
            if (domainsToCheck.length === 0) {
                return false;
            }

            currentReferrer = currentReferrer.split('/')[2];
            currentReferrer = currentReferrer.replace('www.', '');

            return isUrlMatching(currentReferrer, domainsToCheck);
        }
        return true; // Must be true. When someone come from HTTPS to HTTP, we lose the referrer and shouldn't show any app in that case on the back button
    },

    getHref: function () {
        return window.location.href;
    },

    /**
    * Creates a full url with the path and query parameters
    *
    * @public
    * @method   createUrl
    * @param    {string} domain - the URL of the previous page (document.referrer)
    * @param    {array}  path - the array of folders of the path
    * @param    {object} params - querystring object with key=value
    * @param    {Boolean} encodeURL - should the path and params be encoded
    * @return   {string} The url with the path and the querystring
    */
    createUrl: function (url, path, params, encodeURL) {
        var i,
            max,
            key,
            finalKey,
            finalValue;

        if (path) {
            for (i = 0, max = path.length; i < max; i++) {

                if (encodeURL) {
                    path[i] = encodeURIComponent(path[i]);
                }


                if (i === 0) {
                    url = url + ((url[url.length - 1] !== '/') ? '/' : '') + path[i];
                } else {
                    url = url + '/' + path[i];
                }
            }
        }

        i = 0;
        for (key in params) {
            if (encodeURL) {
                finalKey = encodeURIComponent(key);
                finalValue = encodeURIComponent(params[key]);
            } else {
                finalKey = key;
                finalValue = params[key];
            }

            url = url + ((i === 0 && (url.indexOf('?') === -1)) ? '?' : '&') + finalKey + '=' + finalValue;
            i++;
        }
        return url;
    },

    /**
    * Gets the value of the key in the query parameter of the current Url
    *
    * @public
    * @method   getQueryParameter
    * @param    {string} key the key to look for
    * @param    {string} url an optional url if don't want to look in the current url
    * @return   {string} the value of that parameter or null if does't exist
    */
    getQueryParameter: function (key, url) {
        var urlToFind = url ? url : window.location.search,
            value = urlToFind.match(new RegExp('[\?\&]' + key + '=([^\&]*)(\&?)', 'i'));

        return value ? decodeURIComponent(value[1]) : value;
    },

    /**
     * Checks wether is a URL or not
     *
     * @public
     * @method   isURL
     * @param    {string} string the string to check
     * @return   {bool}
     */
    isURL: function (string) {
        var pattern = new RegExp('((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?', 'i');

        return (pattern.test(string) ? true : false);
    },
    /**
    *
    * Keeps decoding a string until it doesn't decode further, or decoding causes an error.
    *
    * @public
    * @method   recursiveURIDecode
    * @param    {string} the string to decode
    * @return   {string}
    *
    */
    recursiveURIDecode: function (encodedString) {
        var decodedString = '';

        while (decodedString !== encodedString) {
            decodedString = encodedString;
            try {
                encodedString = decodeURIComponent(decodedString);
            } catch (e) {
                return encodedString;
            }
        }
        return encodedString;
    },

      /**
        *
        *  Gets the root domain from an url
        *
        * @public
        * @method   getDomainHost
        * @param    {string} the url to parse the domain
        * @return   {string}
         */
        getDomainHost: function (url) {
            var self = this,
                host = '',
                link;

            if (self.isURL(url)){
                link = document.createElement('a');
                link.href = url;
                host = link.hostname;
            }
            return host;
        },

        /**
         * Returns a list of supported search engines separated by pipe characters
         * @return {String} The search engines separated by pipes
         */
        getSearchEngineKeywords: function () {
            return {
                google: 'q',
                yahoo: 'p',
                aol: 'q',
                ask: 'q',
                bing: 'q',
                baidu: 'wd',
                yandex: 'text'
            };
        },

        /**
         * Returns a list of supported search engines separated by pipe characters
         * @return {String} The search engines separated by pipes
         */
        getSearchEngineRegExp: function () {
            var key,
                string = '',
                keywords = this.getSearchEngineKeywords();

            for (key in keywords) {
                if (!key.hasOwnProperty()) {
                    string = string + '|' + key;
                }
            }
            return string.replace('|', '');
        },

        /**
        * Gets the searchEngine coming from or false. SearchEngines are:
        * google,  yahoo, aol, ask, bing, baidu, yandex
        *
        * @return {String} The search engine name or false
        */
        getSearchEngine: function (url) {
            var searchEngine,
                regexp = new RegExp('.*?(\\.|:\/\/)(' + this.getSearchEngineRegExp() + ')\\..*');

            if (regexp.test(url)) {
                searchEngine = url.replace(regexp, '$2');
            } else {
                searchEngine = false;
            }

            return searchEngine;
        },
        /**
        *
        *  Gets a parameter and returns that parameter encoded
        *
        * @public
        * @method   encodeParameter
        * @param    {string} the parameter to encode
        * @return   {string}
         */
        encodeParameter: function (param) {
            return encodeURIComponent(param);
        }
    };

    module.exports = domainUtils;

}());
