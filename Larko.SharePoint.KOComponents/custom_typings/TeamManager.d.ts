declare var L_Menu_BaseUrl: string;

interface IItem {
    Id?: number;
    Title?: string;
    Created?: string;
    Modified?: string;
}

//interface IMultiLookupCollection<T> {
//    results: Array<T>;
//}

interface IListProperties {
    url: string;
    title: string;
}

interface ITeam extends IItem {
    Name?: string;
    Owner?: string;
    LeagueValue?: string;
}

interface IPlayer extends IItem {
    FirstName?: string;
    LastName?: string;
    Position?: string;
}

interface IStats extends IItem {
    Year?: number;
    PlayerID?: number;
    GamesPlayed?: number;
}

interface ICity extends IItem {
    Name?: string;
}

interface ILeague extends IItem {
    Name?: string;
    Commissioner?: string;
}

interface IHockeySkaterStats extends IStats {
    Goals?: number;
    Assists?: number;
    PenaltyMinutes?: number;
    PlusMinus?: number;
    Shots?: number;
}

interface IHockeyGoalieStats extends IStats {
    GoalsAllowed?: number;
    Saves?: number;
    ShotsFaced?: number;
    Shutouts?: number;
    Wins?: number;
    Minutes?: number;
}

interface IBaseballHitterStats extends IStats {
    Hits?: number;
    HR?: number;
    RBI?: number;
    Runs?: number;
    AtBats?: number;
    PlateAppearances?: number;
    Walks?: number;
    HBP?: number;
    SacFlies?: number;
    TotalBases?: number;
}

interface IBaseballPitcherStats extends IStats {
    Wins?: number;
    Loses?: number;
    GamesStarted?: number;
    Innings?: number;
    Strikeouts?: number;
    Saves?: number;
    Walks?: number;
    EarnedRuns?: number;
}