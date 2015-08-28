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
