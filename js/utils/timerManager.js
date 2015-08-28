/*eslint no-underscore-dangle:0, no-extra-boolean-cast:0*/
(function (win, Utils) {
    'use strict';

    /**
     * This object manages the intervals set in order to centralize them and not
     * to have one for each callback.
     * @type {Object}
     */
    Utils.intervalManager = {

        /**
         * Stores the ids of the timers for each interval.
         * @type {Object}
         */
        _ids: {},

        /**
         * Stores the list of callbacks for each interval.
         * @type {Object}
         */
        _callbacks: {},

        /**
         * Adds a new callback to be executed in the interval set.
         *
         * @param {Number} interval is the number of milliseconds between executions.
         * @param {Function} callback is the method to be executed.
         * @param {Object} context is the context which will be used to execute
         * the callback.
         */
        addCallback: function (interval, callback, context) {
            var self = this;

            self._callbacks[interval] = self._callbacks[interval] || [];
            self._callbacks[interval].push({ callback: callback, context: context });

            if (!self._ids[interval]) {
                self._ids[interval] = win.setInterval(function (innercontext) {
                    innercontext.executeCallbacks(interval);
                }, interval, self);
            }
        },

        /**
         * Removes a set callback from an interval list of callbacks.
         *
         * @param {Number} interval is the interval to which it was subscribed.
         * @param {Function} callback is the method to be removed.
         */
        removeCallback: function (interval, callback) {
            var self = this,
                     i = 0,
                callbackList = self._callbacks[interval],
                removed = false;

            if (!!callbackList) {
                for (i = 0; i < callbackList.length && !removed; i++) {
                    if (callbackList[i].callback === callback) {
                        callbackList.splice(i, 1);
                        removed = true;
                    }
                }

                if (callbackList.length === 0) {
                    win.clearInterval(self._ids[interval]);
                    delete self._ids[interval];
                    delete self._callbacks[interval];
                }
            }
        },

        /**
         * Executes all the callback that are subscribed to an specific interval.
         * The context stored is used to execute the method. If none was set,
         * window is used as context.
         *
         * @param {Number} interval is the interval of which the callbacks will be
         * removed.
         */
        executeCallbacks: function (interval) {
            var callbackList = this._callbacks[interval] || [],
                i,
                context;

            for (i = 0; i < callbackList.length; i++) {
                if (typeof callbackList[i].callback === 'function') {
                    context = callbackList[i].context || win;
                    callbackList[i].callback.call(context);
                }
            }
        }
    };

}(window, Utils));
