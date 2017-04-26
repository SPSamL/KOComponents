
export interface IColumnSettings {
    header: string;
    cellText: (item: any) => KnockoutObservable<string>;
    cellTemplate?: string;
    params?: any;
}

export class DataTableColumnConfig implements IColumnSettings {
    header: string;
    cellText: (item: any) => KnockoutObservable<string>;

    cellTemplate?: string;
    params?: any;

    constructor(settings: DataTableColumnConfig) {
        $.extend(this, settings);
    }
}