define(["require", "exports", "./App", "./Resources/KnockoutExtensions"], function (require, exports, App_1, KnockoutExtensions_1) {
    "use strict";
    $(function () {
        require('core-js/shim');
        var assign = require('object.assign');
        if (!Object.hasOwnProperty('assign')) {
            assign.shim();
        }
        var entries = require('object.entries');
        if (!Object.hasOwnProperty('entries')) {
            entries.shim();
        }
        require('es6-promise/auto');
        KnockoutExtensions_1.KnockoutExtensions.Init();
        require("./Components/DataTable/DataTableBase");
        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
            // Start the app
            var app = new App_1.App();
        });
    });
});
