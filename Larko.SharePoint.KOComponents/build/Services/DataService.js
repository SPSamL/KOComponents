define(["require", "exports", "../Resources/Api"], function (require, exports, Api_1) {
    "use strict";
    //import { ComponentUtility } from '../Resources/ComponentUtility';
    var DataService = (function () {
        function DataService() {
        }
        DataService.getChoiceValues = function (listUrl, fieldName) {
            var url = _spPageContextInfo.webServerRelativeUrl + "/" + Api_1.Api.url + "/" + listUrl + fieldName;
            return $.getJSON(url).then(function (data) {
                var retval = [];
                ko.utils.arrayForEach(data.d.results, function (item) {
                    retval.push(item["Value"]);
                });
                return retval;
            });
        };
        DataService.getById = function (id, query) {
            // A new deferred is created so we can reject if no item is found in the query
            var deferred = $.Deferred();
            if (!query) {
                return $.when(null);
            }
            query.filter("Id eq " + id);
            $.getJSON(query.toString())
                .then(function (data) {
                if (data.d.results[0]) {
                    deferred.resolve(data.d.results[0]);
                }
                else {
                    // If no items are found, reject the deferred.
                    var error = "Item " + id + " not found.";
                    deferred.reject(error);
                }
            }, function (error) {
                // Handle any other errors
                var errorMessage = DataService.parseError(error);
                deferred.reject(errorMessage);
            });
            return deferred.promise();
        };
        DataService.executeQueryAsync = function (clientContext) {
            var deferred = $.Deferred();
            clientContext.executeQueryAsync(function (results) {
                deferred.resolve(results);
            }, function (sender, args) {
                deferred.reject("Error executing SP JSOM Query: " + args.get_message());
            });
            return deferred.promise();
        };
        DataService.getByQuery = function (query) {
            if (!query) {
                return $.when(null);
            }
            return $.getJSON(query.toString())
                .then(function (data) {
                if (typeof (data.d) == 'undefined') {
                    // The results were returned to us directly on data (Ex: using $count).
                    return data;
                }
                else if (data.d instanceof Array) {
                    // The results were returned to us directly on data.d.
                    return data.d;
                }
                else {
                    return data.d.results;
                }
            }, function (response) {
                var failed = $.Deferred();
                var errorMessage = DataService.parseError(response);
                console.warn(errorMessage);
                return failed.reject(errorMessage);
            });
        };
        DataService.parseError = function (response) {
            if (response && response.responseJSON && response.responseJSON.error && response.responseJSON.error.message && response.responseJSON.error.message.value) {
                return "" + response.responseJSON.error.message.value;
            }
            else if (typeof response === 'string') {
                return response;
            }
            else {
                return 'An error has occurred.';
            }
        };
        DataService.saveArrayChanges = function (array, folderPath) {
            var promises = [];
            var item;
            ko.utils.arrayForEach(array.getDifferences(), function (change) {
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
        };
        return DataService;
    }());
    exports.DataService = DataService;
});
