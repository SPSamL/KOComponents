import { Api } from '../Resources/Api';
import { Item } from './Item';
import { Team } from './Team';

export class League extends Item {
    Commissioner: KnockoutObservable<string> = ko.observable<string>();

    Teams: KnockoutObservableArray<Team> = ko.observableArray<Team>([]);

    NumberOfTeams: KnockoutComputed<number> = ko.computed<number>(() => {
        if (this.Teams) {
            return this.Teams().length;
        }
        else {
            return 0;
        }
    });

    constructor(league: ILeague) {
        super(league, Api.lists.leagues);


    }
}