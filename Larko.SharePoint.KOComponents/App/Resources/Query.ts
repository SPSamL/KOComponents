import { Api } from './Api';

export class Query {
    allFilters: KnockoutObservableArray<string> = ko.observableArray([]);
    private expands: KnockoutObservableArray<string> = ko.observableArray([]);
    private selects: KnockoutObservableArray<string> = ko.observableArray([]);
    private orderBys: KnockoutObservable<string> = ko.observable<string>();
    private orderByDirection: KnockoutObservable<string> = ko.observable<string>();
    private tops: KnockoutObservable<number> = ko.observable<number>();
    private skips: KnockoutObservable<number> = ko.observable<number>();
    private metaDatas: KnockoutObservable<string> = ko.observable<string>();

    listUrl: KnockoutObservable<string> = ko.observable<string>();
    baseUrl: KnockoutObservable<string> = ko.observable<string>();

    constructor(listUrl: string, baseUrl: string = _spPageContextInfo.webServerRelativeUrl) {
        this.listUrl(listUrl);
        this.baseUrl(baseUrl);
    }

    metaData(filter: string): Query {
        this.metaDatas(filter);

        return this;
    }

    contains(filter: string, valuesToContain: Array<string>): Query {

        if (valuesToContain.length <= 0 || !filter) {
            return this;
        }

        this.allFilters.push(`(${filter} eq ${valuesToContain.join(` or ${filter} eq `)})`);

        return this;
    }

    orderBy(filter: string, direction: string = 'asc'): Query {
        this.orderBys(filter);
        this.orderByDirection(direction);

        return this;
    }

    skip(filter: number): Query {
        this.skips(filter);

        return this;
    }

    top(filter: number): Query {
        this.tops(filter);

        return this;
    }

    filter(filter: string): Query {
        if (filter) {
            this.allFilters.push(filter);
        }

        return this;
    }

    expand(expand: string): Query {
        if (expand) {
            this.expands.push(expand);
        }

        return this;
    }

    select(select: string): Query {
        if (select) {
            this.selects.push(select);
        }

        return this;
    }

    toString(): string {
        var segments: Array<string> = [
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
            var orderBySegment = `$orderby=${this.orderBys()} ${this.orderByDirection()}`;
            segments.push(orderBySegment);
        }

        // Clean out the falsey values then join.
        var filter = segments.filter(Boolean).join('&');

        var url = `${this.baseUrl()}/${Api.url}/${this.listUrl()}`
        if (this.metaDatas()) {
            url = `${url}/${this.metaDatas()}`
        }
        return `${url}?${filter}`;
    }

    private joinSegment(segmentName: string, segmentValues: Array<string>, separator: string) {
        if (segmentValues.length <= 0) {
            return '';
        }

        return `$${segmentName}=${segmentValues.join(separator)}`;
    }
}

