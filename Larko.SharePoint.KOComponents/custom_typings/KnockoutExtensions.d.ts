interface KnockoutSubscribableFunctions<T> {
    trackChanges: () => any;
}

interface TrackedObservable<T> extends KnockoutObservable<T> {
    isDirty: KnockoutComputed<boolean>;
    resetToOriginalValue: () => void;
    originalValue: any;
}

interface TrackedObservableArray<T> extends KnockoutObservableArray<T> {
    originalValue?: Array<any>;
    getDifferences: () => KnockoutArrayChange<any>[];
    updateIntialTrackedValueToCurrent: () => void;
}

interface KnockoutStatic {
    trackedObservableArray<T>(value?: T[]): TrackedObservableArray<T>;
}