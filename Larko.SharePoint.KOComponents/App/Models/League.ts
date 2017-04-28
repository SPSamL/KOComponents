import { Api } from '../Resources/Api';
import { Item } from './Item';
import { Team } from './Team';

export class League extends Item {
    Commissioner: KnockoutObservable<string> = ko.observable<string>().trackChanges();
    SportValue: KnockoutObservable<string> = ko.observable<string>().trackChanges();
    Teams: KnockoutObservableArray<Team> = ko.observableArray<Team>([]).trackChanges();
    
    constructor(league: ILeague) {
        super(league, Api.lists.leagues);
        this.SportValue(league.SportValue)

    }
}