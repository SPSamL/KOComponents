var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../Resources/Api", "./Item"], function (require, exports, Api_1, Item_1) {
    "use strict";
    var League = (function (_super) {
        __extends(League, _super);
        function League(league) {
            var _this = _super.call(this, league, Api_1.Api.lists.leagues) || this;
            _this.Commissioner = ko.observable().trackChanges();
            _this.SportValue = ko.observable().trackChanges();
            _this.Teams = ko.observableArray([]).trackChanges();
            _this.SportValue(league.SportValue);
            return _this;
        }
        return League;
    }(Item_1.Item));
    exports.League = League;
});
