define(["require", "exports"], function (require, exports) {
    "use strict";
    var templateHtml = require('html!./DataTable.html');
    var DataTableBase = (function () {
        function DataTableBase(params) {
            var _this = this;
            this.settings = ko.observable({
                items: ko.observableArray([]),
                columns: ko.observableArray([]),
                currentPage: ko.observable(1)
            });
            this.pageSize = ko.observable(10);
            this.totalItems = ko.observable(0);
            this.sortColumn = ko.observable();
            this.showingMin = ko.computed(function () {
                if (_this.settings() && _this.settings().currentPage && _this.settings().currentPage() && _this.pageSize()) {
                    return (_this.settings().currentPage() - 1) * _this.pageSize() + 1;
                }
            });
            this.lastPage = ko.computed(function () {
                if (_this.totalItems() && _this.pageSize()) {
                    var remainder = _this.totalItems() % _this.pageSize();
                    var pages = _this.totalItems() / _this.pageSize();
                    if (remainder > 0 && _this.totalItems() > _this.pageSize()) {
                        pages += 1;
                    }
                    return Math.floor(pages);
                }
            });
            this.showingMax = ko.computed(function () {
                if (_this.totalItems() && _this.pageSize()) {
                    var max = _this.showingMin() + _this.pageSize() - 1;
                    if (max > _this.totalItems()) {
                        max = _this.totalItems();
                    }
                    return max;
                }
            });
            this.allRows = ko.observableArray([]);
            this.processedRows = ko.computed(function () {
                return _this.allRows();
            });
            this.footerRow = ko.pureComputed(function () {
                var footerRow = {
                    cells: [],
                    item: null,
                    errors: ko.observableArray([])
                };
                var totalRowIsUsed = false;
                ko.utils.arrayForEach(_this.settings().columns(), function (column) {
                    var columnCells = [];
                    ko.utils.arrayForEach(_this.processedRows(), function (row) {
                        var columnCell = ko.utils.arrayFirst(row.cells, function (cell) {
                            return cell.column == column;
                        });
                        if (columnCell) {
                            columnCells.push(columnCell);
                        }
                    });
                    var renderedColumnCellValues = columnCells.map(function (columnCell) {
                        return columnCell.value();
                    });
                    footerRow.cells.push({
                        column: column
                    });
                });
                return totalRowIsUsed ? footerRow : null;
            });
            if (!params) {
                return;
            }
            this.mergeSettings(this.settings, params);
            this.settings().currentPage = this.settings().currentPage;
            this.initRows();
        }
        DataTableBase.prototype.pageNext = function () {
            if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {
                var nextPage = this.settings().currentPage() + 1;
                this.settings().currentPage(nextPage);
            }
        };
        DataTableBase.prototype.pagePrev = function () {
            if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {
                var prevPage = this.settings().currentPage() - 1;
                this.settings().currentPage(prevPage);
            }
        };
        DataTableBase.prototype.initRows = function () {
            // Render the array provided
            this.renderRows(this.settings().items());
            // Subscribe to the array provided. We will re-render rows when it changes.
            this.subscribeToItemChanges();
        };
        DataTableBase.prototype.subscribeToItemChanges = function () {
            var _this = this;
            this.settings().items.subscribe(function (changes) {
                _this.renderRows(_this.settings().items());
            });
        };
        /**
         * Renders (or re-renders) all of the rows.
         */
        DataTableBase.prototype.renderRows = function (itemsToRender) {
            var _this = this;
            var newRows = [];
            ko.utils.arrayForEach(itemsToRender, function (item) {
                newRows.push(_this.renderRow(item));
            });
            this.allRows(newRows);
        };
        /**
         * Using the column configuration and the raw Items array, build an array of rows.
         * @param item
         */
        DataTableBase.prototype.renderRow = function (item) {
            var row = {
                cells: [],
                item: item,
                errors: ko.observableArray([])
            };
            ko.utils.arrayForEach(this.settings().columns(), function (column) {
                var cell = {
                    value: column.cellText(item),
                    column: column
                };
                row.cells.push(cell);
            });
            return row;
        };
        DataTableBase.prototype.mergeSettings = function (defaultSettings, newSettings) {
            if (ko.isObservable(newSettings)) {
                newSettings = newSettings();
            }
            if (!newSettings) {
                return;
            }
            var settings2 = $.extend({}, defaultSettings(), newSettings);
            defaultSettings(settings2);
        };
        DataTableBase.modelActivator = function (type, jsonItem) {
            return new type(jsonItem);
        };
        return DataTableBase;
    }());
    exports.DataTableBase = DataTableBase;
    exports.component = ko.components.register("data-table", {
        viewModel: DataTableBase,
        template: templateHtml
    });
});
