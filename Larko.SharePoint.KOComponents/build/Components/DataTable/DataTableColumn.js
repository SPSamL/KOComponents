define(["require", "exports"], function (require, exports) {
    "use strict";
    var DataTableColumnConfig = (function () {
        function DataTableColumnConfig(settings) {
            $.extend(this, settings);
        }
        return DataTableColumnConfig;
    }());
    exports.DataTableColumnConfig = DataTableColumnConfig;
});
