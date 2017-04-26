define(["require", "exports"], function (require, exports) {
    "use strict";
    var KnockoutExtensions = (function () {
        function KnockoutExtensions() {
        }
        KnockoutExtensions.Init = function () {
            ko.subscribable.fn.trackChanges = function () {
                var _this = this;
                this.originalValue = this();
                this.isDirty = ko.computed(function () {
                    return this() !== this.originalValue;
                }, this);
                this.resetToOriginalValue = function () {
                    _this(_this.originalValue);
                };
                return this;
            };
            ko.trackedObservableArray = function (initialValue) {
                var observable = ko.observableArray(initialValue);
                observable.originalValue = initialValue.slice(0);
                observable.getDifferences = function () {
                    return ko.utils.compareArrays(observable.originalValue, observable());
                };
                observable.updateIntialTrackedValueToCurrent = function () {
                    observable.originalValue = observable().slice(0);
                };
                return observable;
            };
        };
        return KnockoutExtensions;
    }());
    exports.KnockoutExtensions = KnockoutExtensions;
});
