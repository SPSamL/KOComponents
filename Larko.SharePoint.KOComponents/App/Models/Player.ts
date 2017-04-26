import { Item } from './Item';

export class Player extends Item {
    Position: KnockoutObservable<string> = ko.observable<string>();
}