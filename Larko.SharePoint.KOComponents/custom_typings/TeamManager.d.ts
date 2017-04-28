declare var L_Menu_BaseUrl: string;

interface IItem {
    Id?: number;
    Title?: string;
    Created?: string;
    Modified?: string;
}

interface ComponentSettings {

}

interface ComponentParameters {
    settings: KnockoutObservable<ComponentSettings>
}

interface IListProperties {
    url: string;
    title: string;
}

interface ITeam extends IItem {
    Name?: string;
    Owner?: string;
    LeagueValue?: string;
}


interface ILeague extends IItem {
    Name?: string;
    Commissioner?: string;
    SportValue?: string
}