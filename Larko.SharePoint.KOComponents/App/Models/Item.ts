import { Api } from '../Resources/Api';

export class Item {
    list: IListProperties;
    id: KnockoutObservable<number> = ko.observable<number>();
    title: KnockoutObservable<string> = ko.observable<string>().trackChanges();
    created: KnockoutObservable<Date> = ko.observable<Date>();
    modified: KnockoutObservable<Date> = ko.observable<Date>().trackChanges();

    constructor(jsonItem: IItem, listProperties: IListProperties) {
        if (jsonItem) {
            this.id(jsonItem.Id);
            this.title(jsonItem.Title);
            this.created(Api.getDateValue(jsonItem.Created));
            this.modified(Api.getDateValue(jsonItem.Modified));
            this.resetDirtyFlags();
        }
    }

    resetDirtyFlags() {
        var item = this;
        for (var key in item) {
            var prop: any = item[key];
            // Does the object have this property, is it an observable, and has it been enabled to track changes
            if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof prop.isDirty == 'function') {
                // Set the new original value to compare against
                if (typeof prop.trackChanges == 'function') {
                    prop.trackChanges();
                } else if (typeof prop.updateIntialTrackedValueToCurrent == 'function') {
                    prop.updateIntialTrackedValueToCurrent();
                }

            }
        }
    }

    /**
     * Revert any dirty property back to the original value.
     */
    cleanDirtyProps() {
        var item = this;
        for (var key in item) {
            var dirtyProp: any = item[key];
            // Does the object have this property, is it an observable, and has it been enabled to track changes
            if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof dirtyProp.resetToOriginalValue == 'function') {
                // Set the new original value to compare against

                <TrackedObservable<any>>(dirtyProp).resetToOriginalValue();
            }
        }
    }

    /**
     * Create a new item.
     */
    create(): JQueryPromise<IItem> {
        var url = `${L_Menu_BaseUrl}/${Api.url}/${this.list.url}`;
        var payload = this.getDirtyProps();
        return $.ajax({
            url: url,
            type: 'POST',
            processData: false,
            headers: {
                'accept': 'application/json;odata=verbose',
                'content-type': 'application/json;odata=verbose',
                'X-RequestDigest': $('#__REQUESTDIGEST').val()
            },
            data: JSON.stringify(payload)
        }).then((results) => {
            var newItem: IItem = results.d;
            this.id(newItem.Id);
            this.resetDirtyFlags();
            return newItem;
        }).fail(() => {
            // TODO: Log it and let the user know
        });
    }

    deleteItem(): JQueryPromise<void> {
        var url = `${L_Menu_BaseUrl}/${Api.url}/${this.list.url}(${this.id()})`;
        return $.ajax({
            url: url,
            type: "DELETE",
            contentType: "application/json; charset=utf-8"
        }).then((results) => {
            // No data returned in the response
        }).fail(() => {
            // TODO: Log it and let the user know
        });
    }

    /**
     * Update an existing item.
     */
    update(): JQueryPromise<void> {
        var payload = this.getDirtyProps();

        if (JSON.stringify(payload) === JSON.stringify({})) {
            return $.when(null);
        }

        var url = `${L_Menu_BaseUrl}/${Api.url}/${this.list.url}(${this.id()})`;
        return $.ajax({
            url: url,
            type: 'POST',
            processData: false,
            headers: {
                'accept': 'application/json;odata=verbose',
                'content-type': 'application/json;odata=verbose',
                'X-RequestDigest': $('#__REQUESTDIGEST').val()
            },
            beforeSend: (xhr) => {
                xhr.setRequestHeader('If-Match', '*');
                // Using MERGE so that the entire entity doesn't need to be sent over the wire. 
                xhr.setRequestHeader('X-HTTP-Method', 'MERGE');
            },
            data: JSON.stringify(payload)
        }).then((results) => {
            // No data returned in the response
            this.resetDirtyFlags();
            this.modified(new Date());
        }).fail(() => {
            // TODO: Log it and let the user know
        });
    }

    getDirtyProps() {
        var item = this;
        var dirtyProps = {};
        for (var key in item) {
            // Does the object have this property
            if (!item.hasOwnProperty(key)) {
                continue;
            }

            // Is the property an observable
            if (!ko.isObservable(item[key])) {
                continue;
            }

            var prop: any = item[key];

            // Make sure this observable has been enabled to track changes
            if (typeof prop.isDirty != 'function') {
                continue;
            }

            // Is the property dirty
            if (prop.isDirty()) {
                var newKey = this.toPascalCase(key);

                if (prop() instanceof Date) {
                    var dateValue: Date = prop();
                    dirtyProps[newKey] = dateValue.toISOString();
                } else {
                    dirtyProps[newKey] = prop();
                }
            }
        }
        return dirtyProps;
    }

    toPascalCase(key: string): string {
        return key.charAt(0).toUpperCase() + key.slice(1);
    }
}