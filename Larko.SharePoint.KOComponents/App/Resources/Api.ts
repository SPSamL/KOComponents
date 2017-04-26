export class Api {
    static url = '_vti_bin/ListData.svc';

    static userRoles = {
        ModuleAdmin: "Module Admin",
        SecurityOffice: "Security Office",
        ComponentPOC: "Component POC",
        ComponentSME: "Component SME",
        SubComponentPOC: "Sub-Component POC",
        SubComponentSME: "Sub-Component SME"
    }

    static lists = {
        cities: <IListProperties>{
            title: 'Cities',
            url: 'Cities'
        },
        leagues: <IListProperties>{
            title: 'Leagues',
            url: 'Leagues'
        },
        teams: <IListProperties>{
            title: 'Teams',
            url: 'Teams'
        },
        players: <IListProperties>{
            title: 'Players',
            url: 'Players'
        },
        goalies: <IListProperties>{
            title: 'Goalies',
            url: 'Goalies'
        },
        skaters: <IListProperties>{
            title: 'Skaters',
            url: 'Skaters'
        },
        hitters: <IListProperties>{
            title: 'Hitters',
            url: 'Hitters'
        },
        pitchers: <IListProperties>{
            title: 'Pitchers',
            url: 'Pitchers'
        }
    }

    /*
     * Convert date string to a Date object. Prevents duplicate time zone conversion. 
     */
    static getDateValue(dateString: string): Date {
        if (!dateString || typeof dateString != 'string') {
            return null;
        }
        var date: Date;
        if (Api.isTicksDate(dateString)) {
            date = Api.ticksToDate(dateString);
            date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        } else {
            date = new Date(dateString);
        }

        return date;
    }

    /*
     * Determines if the date string is in the format /Date(12345)/. 
     */
    static isTicksDate(dateString: string): boolean {
        return dateString.indexOf('/Date(') > -1;
    }

    /*
     * Convert date format /Date(12345)/ to a Date object. 
     */
    static ticksToDate(tickString: string): Date {
        var beginning = '/Date(';
        var end = ')/';
        var ticks: number = parseInt(tickString.replace(beginning, '').replace(end, ''), 10);
        return new Date(ticks);
    }

    static getBooleanValue(bool): boolean {
        if (bool) {
            return true;
        } else {
            return false;
        }
    }

    /*
     * Gets the value of a property from an object. Supports dot notation for child properties.
     */
    static getObjectPropertyFromKey(obj: any, key: string) {
        var keys = key.split('.');
        var value = obj;
        for (var i = 0; i < keys.length; i++) {
            if (!value) {
                continue;
            }
            value = value[keys[i]];
        }
        return value;
    }
}