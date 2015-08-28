Utils.ajax = Utils.ajax || {};
Utils.ajax = {

    JSONP: function () {
        'use strict';

        var callbacks = {},
            requestCount = 0,
            windowId = Utils.date.now().toString() + Math.floor(Math.random() * 10000000).toString();

        return {
            /**
             * makes a JSONP request
             *
             * @param {String} url
             * @param {Object} data
             * @param {Function} callback
             */
            request: function (url, callback, data) {

                function doRequest() {
                    var head = document.getElementsByTagName('head')[0],
                        script = document.createElement('script'),
                        params = [],
                        param,
                        // Now follows the same approach as jQuery, where we have a static section for this page, then a dynamic second section.
                        timestamp = windowId + '_' + requestCount;

                    // check if data was passed
                    if (!data) {
                        data = {};
                    }

                    // determine if there already are params
                    url += (url.indexOf('?') + 1 ? '&' : '?');

                    requestCount++;

                    // create external callback name
                    data.jsoncallback = 'VeAPI.JSONP.callbacks.VEjQuery' + timestamp; //Changed the callback name to match the DB changes

                    // set callback function
                    callbacks['VEjQuery' + timestamp] = function (newdata) {
                        // clean up
                        head.removeChild(script);
                        delete callbacks['VEjQuery' + timestamp];

                        // fire callback
                        if (callback) {
                            callback(newdata);
                        }
                    };

                    // traverse data and puts it in the url
                    for (param in data) {
                        params.push(param + '=' + encodeURIComponent(data[param]));
                    }

                    // generate params
                    url += params.join('&');

                    // set script attributes
                    script.type = 'text/javascript';
                    script.src = url;

                    // add to the DOM
                    head.appendChild(script);
                }

                if (classes.QueueManager) {
                    classes.QueueManager.getInstance().request(doRequest);
                } else {
                    doRequest();
                }

            },

            /**
             * keeps a public reference of the callbacks object
             */
            callbacks: callbacks
        };
    }

};
