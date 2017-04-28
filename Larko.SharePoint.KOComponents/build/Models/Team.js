var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Item", "../Resources/Api"], function (require, exports, Item_1, Api_1) {
    "use strict";
    var Team = (function (_super) {
        __extends(Team, _super);
        function Team(team) {
            var _this = _super.call(this, team, Api_1.Api.lists.teams) || this;
            _this.Owner = ko.observable().trackChanges();
            _this.Players = ko.observableArray([]);
            _this.League = ko.observable().trackChanges();
            _this.LeagueValue = ko.observable().trackChanges();
            _this.Owner(team.Owner);
            _this.LeagueValue(team.LeagueValue);
            return _this;
        }
        return Team;
    }(Item_1.Item));
    exports.Team = Team;
});
