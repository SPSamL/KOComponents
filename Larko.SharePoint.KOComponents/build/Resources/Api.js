define(["require", "exports"], function (require, exports) {
    "use strict";
    var Api = (function () {
        function Api() {
        }
        /*
         * Convert date string to a Date object. Prevents duplicate time zone conversion.
         */
        Api.getDateValue = function (dateString) {
            if (!dateString || typeof dateString != 'string') {
                return null;
            }
            var date;
            if (Api.isTicksDate(dateString)) {
                date = Api.ticksToDate(dateString);
                date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
            }
            else {
                date = new Date(dateString);
            }
            return date;
        };
        /*
         * Determines if the date string is in the format /Date(12345)/.
         */
        Api.isTicksDate = function (dateString) {
            return dateString.indexOf('/Date(') > -1;
        };
        /*
         * Convert date format /Date(12345)/ to a Date object.
         */
        Api.ticksToDate = function (tickString) {
            var beginning = '/Date(';
            var end = ')/';
            var ticks = parseInt(tickString.replace(beginning, '').replace(end, ''), 10);
            return new Date(ticks);
        };
        Api.getBooleanValue = function (bool) {
            if (bool) {
                return true;
            }
            else {
                return false;
            }
        };
        /*
         * Gets the value of a property from an object. Supports dot notation for child properties.
         */
        Api.getObjectPropertyFromKey = function (obj, key) {
            var keys = key.split('.');
            var value = obj;
            for (var i = 0; i < keys.length; i++) {
                if (!value) {
                    continue;
                }
                value = value[keys[i]];
            }
            return value;
        };
        return Api;
    }());
    Api.url = '_vti_bin/ListData.svc';
    Api.userRoles = {
        ModuleAdmin: "Module Admin",
        SecurityOffice: "Security Office",
        ComponentPOC: "Component POC",
        ComponentSME: "Component SME",
        SubComponentPOC: "Sub-Component POC",
        SubComponentSME: "Sub-Component SME"
    };
    Api.lists = {
        cities: {
            title: 'Cities',
            url: 'Cities'
        },
        leagues: {
            title: 'Leagues',
            url: 'Leagues'
        },
        teams: {
            title: 'Teams',
            url: 'Teams'
        },
        players: {
            title: 'Players',
            url: 'Players'
        },
        goalies: {
            title: 'Goalies',
            url: 'Goalies'
        },
        skaters: {
            title: 'Skaters',
            url: 'Skaters'
        },
        hitters: {
            title: 'Hitters',
            url: 'Hitters'
        },
        pitchers: {
            title: 'Pitchers',
            url: 'Pitchers'
        }
    };
    exports.Api = Api;
});
