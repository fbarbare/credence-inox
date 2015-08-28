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
