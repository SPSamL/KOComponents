import { App } from './App';
import { KnockoutExtensions } from './Resources/KnockoutExtensions';

$(() => {
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
    
    KnockoutExtensions.Init();
    
    require("./Components/DataTable/DataTable");

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', () => {
        // Start the app
        var app = new App();
    });
});