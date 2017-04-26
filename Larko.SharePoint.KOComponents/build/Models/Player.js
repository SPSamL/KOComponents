var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./Item"], function (require, exports, Item_1) {
    "use strict";
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            var _this = _super.apply(this, arguments) || this;
            _this.Position = ko.observable();
            return _this;
        }
        return Player;
    }(Item_1.Item));
    exports.Player = Player;
});
