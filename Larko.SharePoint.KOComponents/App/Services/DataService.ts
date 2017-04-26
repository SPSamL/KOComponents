import { Api } from '../Resources/Api';
import { Query } from '../Resources/Query';
import { Item } from '../Models/Item';
//import { ComponentUtility } from '../Resources/ComponentUtility';

export class DataService {

    static getChoiceValues(listUrl: string, fieldName: string): JQueryPromise<Array<string>> {
        var url = `${_spPageContextInfo.webServerRelativeUrl}/${Api.url}/${listUrl}${fieldName}`;

        return $.getJSON(url).then((data) => {
            var retval: Array<string> = [];
            ko.utils.arrayForEach(data.d.results, (item: Object) => {
                retval.push(item["Value"]);
            });
            return retval;
        });
    }

    static getById(id: number, query: Query): JQueryPromise<IItem> {
        // A new deferred is created so we can reject if no item is found in the query
        var deferred = $.Deferred();

        if (!query) {
            return $.when(null);
        }
        query.filter(`Id eq ${id}`);


        $.getJSON(query.toString())
            .then((data) => {

                if (data.d.results[0]) {
                    deferred.resolve(data.d.results[0]);
                } else {
                    // If no items are found, reject the deferred.
                    var error = `Item ${id} not found.`;
                    deferred.reject(error);
                }
            }, (error) => {
                // Handle any other errors
                var errorMessage = DataService.parseError(error);
                deferred.reject(errorMessage);
            });

        return deferred.promise();
    }

    static executeQueryAsync(clientContext: SP.ClientContext): JQueryPromise<any> {
        var deferred: JQueryDeferred<SP.List> = $.Deferred();

        clientContext.executeQueryAsync((results) => {
            deferred.resolve(results);
        }, (sender: any, args: SP.ClientRequestFailedEventArgs) => {
            deferred.reject(`Error executing SP JSOM Query: ${args.get_message()}`);
        });

        return deferred.promise();
    }

    static getByQuery(query: Query): JQueryPromise<Array<IItem>> {

        if (!query) {
            return $.when(null);
        }

        return $.getJSON(query.toString())
            .then((data) => {
                if (typeof (data.d) == 'undefined') {
                    // The results were returned to us directly on data (Ex: using $count).
                    return data;
                }
                else if (data.d instanceof Array) {
                    // The results were returned to us directly on data.d.
                    return data.d;
                } else {
                    return data.d.results;
                }
            }, (response) => {
                var failed = $.Deferred();
                var errorMessage = DataService.parseError(response);
                console.warn(errorMessage);
                return failed.reject(errorMessage);
            });
    }

    static parseError(response: any) {
        if (response && response.responseJSON && response.responseJSON.error && response.responseJSON.error.message && response.responseJSON.error.message.value) {
            return `${response.responseJSON.error.message.value}`;
        } else if (typeof response === 'string') {
            return response;
        } else {
            return 'An error has occurred.';
        }
    }

    static saveArrayChanges(array: TrackedObservableArray<Item>, folderPath?: string): JQueryPromise<any> {
        var promises: Array<JQueryPromise<any>> = [];
        var item: Item;
        ko.utils.arrayForEach(array.getDifferences(), (change: KnockoutArrayChange<Item>) => {
            item = change.value;
            switch (change.status) {
                case 'added':
                    if (!item.id()) {
                        promises.push(item.create());
                    }
                    break;
                case 'deleted':
                    promises.push(item.deleteItem());
                    break;
            }
        });

        return $.when.apply(null, promises);
    }

    ///**
    // * Dynamically builds an "or" filter segment and applies it to the original query provided.
    // * Will check the URL length after applying the dynamic filter. If it is too long, multiple
    // * requests may be sent, but one results set will be returned.
    // * @param originalQuery
    // * @param ids
    // */
    //static getAllByIds(originalQuery: Query, ids: Array<number>): JQueryPromise<Array<IItem>> {

    //    if (ids.length <= 0) {
    //        return $.when([]);
    //    }

    //    var idFilter = `(Id eq ${ids.join(' or Id eq ')})`;
    //    var urlLengthQuery: Query = ko.utils.clone(originalQuery);
    //    urlLengthQuery.filter(idFilter);

    //    DODCTS.LOG.debug(`Request URL length is ${urlLengthQuery.toString().length}`);

    //    if (urlLengthQuery.toString().length > 1350) {
    //        DODCTS.LOG.debug('Request URL length or is too long. Attempting to request in chunks.');
    //        var deferreds = [];
    //        var results = [];
    //        var halfIdsLength = Math.ceil(ids.length / 2);

    //        DODCTS.LOG.debug(`Requesting 2 batches of ${halfIdsLength} ids.`);
    //        // Try again with half as many ids.
    //        // Pass a copy of this query so that filters that are applied to the original query async
    //        // do not affect the queries that have been split off.
    //        deferreds.push(this.getAllByIds(ko.utils.clone(originalQuery), ids.splice(0, halfIdsLength)));
    //        deferreds.push(this.getAllByIds(ko.utils.clone(originalQuery), ids));

    //        return $.when.apply(null, deferreds).then((batch1Results: Array<IItem>, batch2Results: Array<IItem>) => {
    //            results.push.apply(results, batch1Results);
    //            results.push.apply(results, batch2Results);
    //            return results;
    //        });
    //    } else {
    //        var queryToExecute = ko.utils.clone(originalQuery)
    //        queryToExecute.filter(idFilter);
    //        return DataService.getByQuery(queryToExecute);
    //    }
    //}

    ///**
    // * Clones the provided item.
    // * @param source - The item to clone.
    // * @param destination - The constructor function of the item to be created. 
    // * @param excludedProps (Optional) - Array of property names to ignore when cloning.
    // * In a future version of TypeScript, this may change to avoid using string literals as the property names.
    // * More on this feature here: https://github.com/Microsoft/TypeScript/issues/1579
    // */
    //static clone<T extends Item>(source: T,
    //    destination: new (jsonItem: IItem, listProps?: IListProperties) => T,
    //    excludedProps?: Array<keyof T>): JQueryPromise<IItem>
    //{
    //    var clonedItem = ComponentUtility.modelActivator(destination, null);

    //    for (var key in source) {
    //        if (source.hasOwnProperty(key)) {
    //            // key is in excluded props, continue
    //            if (excludedProps.indexOf(key) < 0) {

    //                var prop: any = source[key];

    //                if (typeof prop.isDirty == 'function' && ko.isObservable(prop)) {
    //                    // Set the prop of the cloned item.
    //                    var destinationProp: any = clonedItem[key];
    //                    destinationProp(prop());
    //                }
    //            }
    //        } 
    //    }

    //    return clonedItem.create();
    //}

    //static cloneAllSync<T extends Item>(count: number,
    //    source: T,
    //    destination: new (jsonItem: IItem, listProps?: IListProperties) => T,
    //    excludedProps?: Array<keyof T>
    //): JQueryPromise<Array<IItem>> {

    //    var base: JQueryPromise<any> = $.when({});

    //    var newItems: Array<IItem> = [];
    //    for (var i = 0; i < count; i++) {
    //        base = base.then((result) => {
    //            return DataService.clone(source, destination, excludedProps).then((newItem: IQFR) => {
    //                newItems.push(newItem);
    //            });
    //        });
    //    }

    //    return base.then(() => {
    //        return newItems;
    //    });
    //}

    ///**
    // * Attempts to pick an item out of an array of objects by the id of an existing item.
    // * If a match is not found, null is returned.
    // * @param itemToRefresh
    // * @param existingItems
    // */
    //static refreshItemFromArray<T extends Item>(itemToRefresh: Item, existingItems: Array<T>): T {
    //    if (!itemToRefresh || !existingItems) {
    //        return null;
    //    }

    //    var refreshedItem = ko.utils.arrayFirst(existingItems, (existingItem: T) => {
    //        return existingItem.id() === itemToRefresh.id();
    //    });

    //    return refreshedItem ? refreshedItem : null;
    //}
}