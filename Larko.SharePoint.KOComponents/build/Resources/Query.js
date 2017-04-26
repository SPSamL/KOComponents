define(["require", "exports", "./Api"], function (require, exports, Api_1) {
    "use strict";
    var Query = (function () {
        function Query(listUrl, baseUrl) {
            if (baseUrl === void 0) { baseUrl = _spPageContextInfo.webServerRelativeUrl; }
            this.allFilters = ko.observableArray([]);
            this.expands = ko.observableArray([]);
            this.selects = ko.observableArray([]);
            this.orderBys = ko.observable();
            this.orderByDirection = ko.observable();
            this.tops = ko.observable();
            this.skips = ko.observable();
            this.metaDatas = ko.observable();
            this.listUrl = ko.observable();
            this.baseUrl = ko.observable();
            this.listUrl(listUrl);
            this.baseUrl(baseUrl);
        }
        Query.prototype.metaData = function (filter) {
            this.metaDatas(filter);
            return this;
        };
        Query.prototype.contains = function (filter, valuesToContain) {
            if (valuesToContain.length <= 0 || !filter) {
                return this;
            }
            this.allFilters.push("(" + filter + " eq " + valuesToContain.join(" or " + filter + " eq ") + ")");
            return this;
        };
        Query.prototype.orderBy = function (filter, direction) {
            if (direction === void 0) { direction = 'asc'; }
            this.orderBys(filter);
            this.orderByDirection(direction);
            return this;
        };
        Query.prototype.skip = function (filter) {
            this.skips(filter);
            return this;
        };
        Query.prototype.top = function (filter) {
            this.tops(filter);
            return this;
        };
        Query.prototype.filter = function (filter) {
            if (filter) {
                this.allFilters.push(filter);
            }
            return this;
        };
        Query.prototype.expand = function (expand) {
            if (expand) {
                this.expands.push(expand);
            }
            return this;
        };
        Query.prototype.select = function (select) {
            if (select) {
                this.selects.push(select);
            }
            return this;
        };
        Query.prototype.toString = function () {
            var segments = [
                this.joinSegment('filter', this.allFilters(), ' and '),
                this.joinSegment('expand', this.expands(), ','),
                this.joinSegment('select', this.selects(), ',')
            ];
            if (this.tops()) {
                segments.push(this.joinSegment('top', [this.tops().toString()], ','));
            }
            if (this.skips()) {
                segments.push(this.joinSegment('skip', [this.skips().toString()], ','));
            }
            if (this.orderBys()) {
                var orderBySegment = "$orderby=" + this.orderBys() + " " + this.orderByDirection();
                segments.push(orderBySegment);
            }
            // Clean out the falsey values then join.
            var filter = segments.filter(Boolean).join('&');
            var url = this.baseUrl() + "/" + Api_1.Api.url + "/" + this.listUrl();
            if (this.metaDatas()) {
                url = url + "/" + this.metaDatas();
            }
            return url + "?" + filter;
        };
        Query.prototype.joinSegment = function (segmentName, segmentValues, separator) {
            if (segmentValues.length <= 0) {
                return '';
            }
            return "$" + segmentName + "=" + segmentValues.join(separator);
        };
        return Query;
    }());
    exports.Query = Query;
});
