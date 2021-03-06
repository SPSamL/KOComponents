﻿import { Item } from './Item';
import { Player } from './Player';
import { League } from './League';
import { Api } from '../Resources/Api';

export class Team extends Item {
    Owner: KnockoutObservable<string> = ko.observable<string>().trackChanges();

    Players: KnockoutObservableArray<Player> = ko.observableArray<Player>([]);

    League: KnockoutObservable<League> = ko.observable<League>().trackChanges();
    LeagueValue: KnockoutObservable<string> = ko.observable<string>().trackChanges();

    constructor(team: ITeam) {
        super(team, Api.lists.teams);

        this.Owner(team.Owner);
        this.LeagueValue(team.LeagueValue);
    }
}