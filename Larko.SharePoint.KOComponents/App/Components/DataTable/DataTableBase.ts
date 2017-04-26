var templateHtml = require('html!./DataTable.html');
import { DataTableColumnConfig, IColumnSettings } from './DataTableColumn';
import { Item } from '../../Models/Item';

export interface DataTableSettings {
    items: KnockoutObservableArray<any> | KnockoutComputed<Array<any>>;
    columns: KnockoutObservableArray<DataTableColumnConfig>;
    currentPage: KnockoutObservable<number>;
}

export interface DataTableRow {
    item: any;
    cells: Array<DataTableCell>;
    errors: KnockoutObservableArray<string>;
}

export interface DataTableCell {
    column: DataTableColumnConfig;
    value?: KnockoutObservable<string>;
}

export class DataTableBase<T extends DataTableColumnConfig> {

    settings: KnockoutObservable<DataTableSettings> = ko.observable<DataTableSettings>({
        items: ko.observableArray<any>([]),
        columns: ko.observableArray([]),
        currentPage: ko.observable(1)
    });

    pageSize: KnockoutObservable<number> = ko.observable<number>(10);
    totalItems = ko.observable<number>(0);
    sortColumn = ko.observable<T>();
    showingMin: KnockoutComputed<number> = ko.computed(() => {
        if (this.settings() && this.settings().currentPage && this.settings().currentPage() && this.pageSize()) {
            return (this.settings().currentPage() - 1) * this.pageSize() + 1;
        }
    });

    lastPage: KnockoutComputed<number> = ko.computed(() => {
        if (this.totalItems() && this.pageSize()) {
            var remainder = this.totalItems() % this.pageSize();

            var pages = this.totalItems() / this.pageSize();

            if (remainder > 0 && this.totalItems() > this.pageSize()) {
                pages += 1;
            }

            return Math.floor(pages);
        }
    });

    showingMax: KnockoutComputed<number> = ko.computed(() => {
        if (this.totalItems() && this.pageSize()) {

            var max = this.showingMin() + this.pageSize() - 1;
            if (max > this.totalItems()) {
                max = this.totalItems();
            }

            return max;
        }
    });

    pageNext() {
        if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {

            var nextPage = this.settings().currentPage() + 1;
            this.settings().currentPage(nextPage);
        }
    }

    pagePrev() {
        if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {
            var prevPage = this.settings().currentPage() - 1;
            this.settings().currentPage(prevPage);
        }
    }

    constructor(params: KnockoutObservable<DataTableSettings>) {
        if (!params) {
            return;
        }

        this.mergeSettings(this.settings, params);

        this.settings().currentPage = this.settings().currentPage;
        this.initRows();
    }

    initRows() {
        // Render the array provided
        this.renderRows(this.settings().items());

        // Subscribe to the array provided. We will re-render rows when it changes.
        this.subscribeToItemChanges();
    }

    subscribeToItemChanges() {
        this.settings().items.subscribe((changes: Array<KnockoutArrayChange<any>>) => {
            this.renderRows(this.settings().items());
        });
    }

    allRows: KnockoutObservableArray<DataTableRow> = ko.observableArray<DataTableRow>([]);

    processedRows: KnockoutComputed<Array<DataTableRow>> = ko.computed(() => {
        return this.allRows();
    });

    /**
     * Renders (or re-renders) all of the rows.
     */
    renderRows(itemsToRender: Array<Item>) {
        var newRows: Array<DataTableRow> = [];
        ko.utils.arrayForEach(itemsToRender, (item: Item) => {
            newRows.push(this.renderRow(item));
        });
        this.allRows(newRows);
    }

    /**
     * Using the column configuration and the raw Items array, build an array of rows.
     * @param item
     */
    renderRow(item: Item): DataTableRow {
        var row: DataTableRow = {
            cells: [],
            item: item,
            errors: ko.observableArray<string>([])
        };

        ko.utils.arrayForEach(this.settings().columns(), (column: DataTableColumnConfig) => {
            var cell: DataTableCell = {
                value: column.cellText(item),
                column: column
            };
            row.cells.push(cell);
        });

        return row;
    }

    footerRow: KnockoutComputed<DataTableRow> = ko.pureComputed<DataTableRow>(() => {
        var footerRow: DataTableRow = {
            cells: [],
            item: null,
            errors: ko.observableArray<string>([])
        };

        var totalRowIsUsed: boolean = false;

        ko.utils.arrayForEach(this.settings().columns(), (column: DataTableColumnConfig) => {
            var columnCells: Array<DataTableCell> = [];
            ko.utils.arrayForEach(this.processedRows(), (row: DataTableRow) => {
                var columnCell = ko.utils.arrayFirst(row.cells, (cell: DataTableCell) => {
                    return cell.column == column;
                });

                if (columnCell) {
                    columnCells.push(columnCell)
                }
            })

            var renderedColumnCellValues: Array<string> = columnCells.map((columnCell: DataTableCell) => {
                return columnCell.value();
            });

            footerRow.cells.push({
                column: column
            });
        });

        return totalRowIsUsed ? footerRow : null;
    });

    mergeSettings(defaultSettings: KnockoutObservable<DataTableSettings>, newSettings: KnockoutObservable<DataTableSettings> | DataTableSettings) {
        if (ko.isObservable(newSettings)) {
            newSettings = newSettings();
        }

        if (!newSettings) {
            return;
        }
        var settings2 = $.extend({}, defaultSettings(), newSettings);
        defaultSettings(settings2);
    }

    static modelActivator<T extends Item>(type: { new (item: IItem): T; }, jsonItem: IItem): T {
        return new type(jsonItem);
    }
}

export let component = ko.components.register("data-table", {
    viewModel: DataTableBase,
    template: templateHtml
});