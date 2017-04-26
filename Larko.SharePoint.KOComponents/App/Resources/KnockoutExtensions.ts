
export class KnockoutExtensions {
    static Init() {
        ko.subscribable.fn.trackChanges = function () {
            this.originalValue = this();

            this.isDirty = ko.computed(function () {
                return this() !== this.originalValue;
            }, this);

            this.resetToOriginalValue = () => {
                this(this.originalValue);
            };

            return this;
        };

        ko.trackedObservableArray = function (initialValue) {
            var observable = <TrackedObservableArray<any>>ko.observableArray(initialValue);

            observable.originalValue = initialValue.slice(0);

            observable.getDifferences = function () {
                return ko.utils.compareArrays(observable.originalValue, observable());
            };

            observable.updateIntialTrackedValueToCurrent = function () {
                observable.originalValue = observable().slice(0);
            };

            return observable;
        }
    }
}