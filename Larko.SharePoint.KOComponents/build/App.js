define(["require", "exports", "./Components/DataTable/DataTableColumn", "./Models/League", "./Models/Team", "./Resources/Query", "./Services/DataService"], function (require, exports, DataTableColumn_1, League_1, Team_1, Query_1, DataService_1) {
    "use strict";
    var App = (function () {
        function App() {
            var _this = this;
            this.teams = ko.observableArray([]);
            this.leagues = ko.observableArray([]);
            this.selectedLeague = ko.observable();
            JSRequest.EnsureSetup();
            this.configureLeagueList();
            this.configureTeamList();
            var query = new Query_1.Query("Leagues", _spPageContextInfo.siteServerRelativeUrl)
                .orderBy("Title")
                .expand("Sport")
                .expand("Level");
            DataService_1.DataService.getByQuery(query).then(function (leagues) {
                var mappedLeagues = leagues.map(function (league) {
                    return new League_1.League(league);
                });
                _this.leagueListSettings().currentPage(1);
                _this.leagues(mappedLeagues);
            });
            this.selectedLeague.subscribe(function () {
                _this.loadLeagueTeams();
            });
            ko.applyBindings(this);
        }
        App.prototype.loadLeagueTeams = function () {
            var _this = this;
            var query = new Query_1.Query("Teams", _spPageContextInfo.siteServerRelativeUrl)
                .filter("League/ID eq " + this.selectedLeague().id())
                .orderBy('Title');
            DataService_1.DataService.getByQuery(query).then(function (teams) {
                ko.utils.arrayForEach(teams, function (team) {
                    _this.teams.push(new Team_1.Team(team));
                });
            });
        };
        App.prototype.configureLeagueList = function () {
            this.leagueListSettings = ko.observable({
                columns: ko.observableArray([
                    new DataTableColumn_1.DataTableColumnConfig({
                        header: "League Name",
                        cellTemplate: "league-name-template",
                        params: {
                            click: this.openTeams.bind(this)
                        },
                        cellText: function (league) {
                            return league.title;
                        }
                    }),
                    new DataTableColumn_1.DataTableColumnConfig({
                        header: "Commissioner",
                        cellText: function (league) {
                            return league.Commissioner;
                        }
                    })
                ]),
                items: this.leagues,
                currentPage: ko.observable(1)
            });
        };
        App.prototype.configureTeamList = function () {
            this.teamListSettings = ko.observable({
                columns: ko.observableArray([
                    new DataTableColumn_1.DataTableColumnConfig({
                        header: "Team Name",
                        cellText: function (team) {
                            return team.title;
                        }
                    }),
                    new DataTableColumn_1.DataTableColumnConfig({
                        header: "Owner",
                        cellText: function (team) {
                            return team.Owner;
                        }
                    })
                ]),
                items: this.teams,
                currentPage: ko.observable(1)
            });
        };
        App.prototype.openTeams = function (league) {
            this.selectedLeague(league);
        };
        return App;
    }());
    exports.App = App;
});
