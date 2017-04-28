define(["require", "exports", "../Resources/Api"], function (require, exports, Api_1) {
    "use strict";
    var Item = (function () {
        function Item(jsonItem, listProperties) {
            this.id = ko.observable();
            this.title = ko.observable().trackChanges();
            this.created = ko.observable();
            this.modified = ko.observable().trackChanges();
            if (jsonItem) {
                this.id(jsonItem.Id);
                this.title(jsonItem.Title);
                this.created(Api_1.Api.getDateValue(jsonItem.Created));
                this.modified(Api_1.Api.getDateValue(jsonItem.Modified));
                this.resetDirtyFlags();
            }
        }
        Item.prototype.resetDirtyFlags = function () {
            var item = this;
            for (var key in item) {
                var prop = item[key];
                // Does the object have this property, is it an observable, and has it been enabled to track changes
                if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof prop.isDirty == 'function') {
                    // Set the new original value to compare against
                    if (typeof prop.trackChanges == 'function') {
                        prop.trackChanges();
                    }
                    else if (typeof prop.updateIntialTrackedValueToCurrent == 'function') {
                        prop.updateIntialTrackedValueToCurrent();
                    }
                }
            }
        };
        /**
         * Revert any dirty property back to the original value.
         */
        Item.prototype.cleanDirtyProps = function () {
            var item = this;
            for (var key in item) {
                var dirtyProp = item[key];
                // Does the object have this property, is it an observable, and has it been enabled to track changes
                if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof dirtyProp.resetToOriginalValue == 'function') {
                    // Set the new original value to compare against
                    (dirtyProp).resetToOriginalValue();
                }
            }
        };
        /**
         * Create a new item.
         */
        Item.prototype.create = function () {
            var _this = this;
            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url;
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
            }).then(function (results) {
                var newItem = results.d;
                _this.id(newItem.Id);
                _this.resetDirtyFlags();
                return newItem;
            }).fail(function () {
                // TODO: Log it and let the user know
            });
        };
        Item.prototype.deleteItem = function () {
            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url + "(" + this.id() + ")";
            return $.ajax({
                url: url,
                type: "DELETE",
                contentType: "application/json; charset=utf-8"
            }).then(function (results) {
                // No data returned in the response
            }).fail(function () {
                // TODO: Log it and let the user know
            });
        };
        /**
         * Update an existing item.
         */
        Item.prototype.update = function () {
            var _this = this;
            var payload = this.getDirtyProps();
            if (JSON.stringify(payload) === JSON.stringify({})) {
                return $.when(null);
            }
            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url + "(" + this.id() + ")";
            return $.ajax({
                url: url,
                type: 'POST',
                processData: false,
                headers: {
                    'accept': 'application/json;odata=verbose',
                    'content-type': 'application/json;odata=verbose',
                    'X-RequestDigest': $('#__REQUESTDIGEST').val()
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('If-Match', '*');
                    // Using MERGE so that the entire entity doesn't need to be sent over the wire. 
                    xhr.setRequestHeader('X-HTTP-Method', 'MERGE');
                },
                data: JSON.stringify(payload)
            }).then(function (results) {
                // No data returned in the response
                _this.resetDirtyFlags();
                _this.modified(new Date());
            }).fail(function () {
                // TODO: Log it and let the user know
            });
        };
        Item.prototype.getDirtyProps = function () {
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
                var prop = item[key];
                // Make sure this observable has been enabled to track changes
                if (typeof prop.isDirty != 'function') {
                    continue;
                }
                // Is the property dirty
                if (prop.isDirty()) {
                    var newKey = this.toPascalCase(key);
                    if (prop() instanceof Date) {
                        var dateValue = prop();
                        dirtyProps[newKey] = dateValue.toISOString();
                    }
                    else {
                        dirtyProps[newKey] = prop();
                    }
                }
            }
            return dirtyProps;
        };
        Item.prototype.toPascalCase = function (key) {
            return key.charAt(0).toUpperCase() + key.slice(1);
        };
        return Item;
    }());
    exports.Item = Item;
});
