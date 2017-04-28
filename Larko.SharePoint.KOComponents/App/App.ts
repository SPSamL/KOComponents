import { Api } from './Resources/Api';
import { DataTableSettings, DataTable } from './Components/DataTable/DataTable';
import { DataTableColumnConfig } from './Components/DataTable/DataTableColumn';
import { League } from './Models/League';
import { Team } from './Models/Team';
import { Query } from './Resources/Query';
import { DataService } from './Services/DataService';

export class App {

    teamListSettings: KnockoutObservable<DataTableSettings>;
    leagueListSettings: KnockoutObservable<DataTableSettings>;

    teams: KnockoutObservableArray<Team> = ko.observableArray<Team>([]);
    leagues: KnockoutObservableArray<League> = ko.observableArray<League>([]);

    selectedLeague: KnockoutObservable<League> = ko.observable<League>();

    constructor() {
        JSRequest.EnsureSetup();

            this.configureLeagueList();
            this.configureTeamList();
        
        var query: Query = new Query("Leagues", _spPageContextInfo.siteServerRelativeUrl)
            .orderBy("Title")
            .expand("Sport")
            .expand("Level");

        DataService.getByQuery(query).then((leagues: Array<ILeague>) => {
            var mappedLeagues = leagues.map((league: ILeague) => {
                return new League(league);
            });
            this.leagueListSettings().currentPage(1);
            this.leagues(mappedLeagues);
        });

        this.selectedLeague.subscribe(() => {
            this.loadLeagueTeams();
        });

        ko.applyBindings(this);
    }

    loadLeagueTeams() {
        var query: Query = new Query("Teams", _spPageContextInfo.siteServerRelativeUrl)
            .filter(`LeagueId eq ${this.selectedLeague().id()}`)
            .orderBy('Title');

        DataService.getByQuery(query).then((teams: Array<ITeam>) => {
            ko.utils.arrayForEach(teams, (team: ITeam) => {
                this.teams.push(new Team(team));
            });
        });
    }

    configureLeagueList() {
        this.leagueListSettings = ko.observable<DataTableSettings>({
            columns: ko.observableArray<DataTableColumnConfig>([
                new DataTableColumnConfig({
                    header: "League Name",
                    cellTemplate: "league-name-template",
                    params: {
                        click: this.openTeams.bind(this)
                    },
                    cellText: (league: League) => {
                        return league.title;
                    }
                }),
                new DataTableColumnConfig({
                    header: "Sport",
                    cellText: (league: League) => {
                        return league.SportValue;
                    }
                })
            ]),
            items: this.leagues,
            currentPage: ko.observable<number>(1)
        });
    }

    configureTeamList() {
        this.teamListSettings = ko.observable<DataTableSettings>({
            columns: ko.observableArray<DataTableColumnConfig>([
                new DataTableColumnConfig({
                    header: "Team Name",
                    cellText: (team: Team) => {
                        return team.title;
                    }
                }),
                new DataTableColumnConfig({
                    header: "Owner",
                    cellText: (team: Team) => {
                        return team.Owner;
                    }
                })
            ]),
            items: this.teams,
            currentPage: ko.observable<number>(1)
        });
    }

    openTeams(league: League) {
        this.selectedLeague(league);
    }
}