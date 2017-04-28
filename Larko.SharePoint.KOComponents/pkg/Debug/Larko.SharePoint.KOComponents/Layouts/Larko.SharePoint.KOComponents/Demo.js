webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(3), __webpack_require__(14)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, App_1, KnockoutExtensions_1) {
	    "use strict";
	    $(function () {
	        __webpack_require__(15);
	        var assign = __webpack_require__(306);
	        if (!Object.hasOwnProperty('assign')) {
	            assign.shim();
	        }
	        var entries = __webpack_require__(317);
	        if (!Object.hasOwnProperty('entries')) {
	            entries.shim();
	        }
	        __webpack_require__(338);
	        KnockoutExtensions_1.KnockoutExtensions.Init();
	        __webpack_require__(342);
	        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
	            // Start the app
	            var app = new App_1.App();
	        });
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(7), __webpack_require__(8), __webpack_require__(11), __webpack_require__(12), __webpack_require__(13)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, DataTableColumn_1, League_1, Team_1, Query_1, DataService_1) {
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
	                .filter("LeagueId eq " + this.selectedLeague().id())
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
	                        header: "Sport",
	                        cellText: function (league) {
	                            return league.SportValue;
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
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var DataTableColumnConfig = (function () {
	        function DataTableColumnConfig(settings) {
	            $.extend(this, settings);
	        }
	        return DataTableColumnConfig;
	    }());
	    exports.DataTableColumnConfig = DataTableColumnConfig;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko) {var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Api_1, Item_1) {
	    "use strict";
	    var League = (function (_super) {
	        __extends(League, _super);
	        function League(league) {
	            var _this = _super.call(this, league, Api_1.Api.lists.leagues) || this;
	            _this.Commissioner = ko.observable().trackChanges();
	            _this.SportValue = ko.observable().trackChanges();
	            _this.Teams = ko.observableArray([]).trackChanges();
	            _this.SportValue(league.SportValue);
	            return _this;
	        }
	        return League;
	    }(Item_1.Item));
	    exports.League = League;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var Api = (function () {
	        function Api() {
	        }
	        /*
	         * Convert date string to a Date object. Prevents duplicate time zone conversion.
	         */
	        Api.getDateValue = function (dateString) {
	            if (!dateString || typeof dateString != 'string') {
	                return null;
	            }
	            var date;
	            if (Api.isTicksDate(dateString)) {
	                date = Api.ticksToDate(dateString);
	                date = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
	            }
	            else {
	                date = new Date(dateString);
	            }
	            return date;
	        };
	        /*
	         * Determines if the date string is in the format /Date(12345)/.
	         */
	        Api.isTicksDate = function (dateString) {
	            return dateString.indexOf('/Date(') > -1;
	        };
	        /*
	         * Convert date format /Date(12345)/ to a Date object.
	         */
	        Api.ticksToDate = function (tickString) {
	            var beginning = '/Date(';
	            var end = ')/';
	            var ticks = parseInt(tickString.replace(beginning, '').replace(end, ''), 10);
	            return new Date(ticks);
	        };
	        Api.getBooleanValue = function (bool) {
	            if (bool) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        };
	        /*
	         * Gets the value of a property from an object. Supports dot notation for child properties.
	         */
	        Api.getObjectPropertyFromKey = function (obj, key) {
	            var keys = key.split('.');
	            var value = obj;
	            for (var i = 0; i < keys.length; i++) {
	                if (!value) {
	                    continue;
	                }
	                value = value[keys[i]];
	            }
	            return value;
	        };
	        return Api;
	    }());
	    Api.url = '_vti_bin/ListData.svc';
	    Api.userRoles = {
	        ModuleAdmin: "Module Admin",
	        SecurityOffice: "Security Office",
	        ComponentPOC: "Component POC",
	        ComponentSME: "Component SME",
	        SubComponentPOC: "Sub-Component POC",
	        SubComponentSME: "Sub-Component SME"
	    };
	    Api.lists = {
	        cities: {
	            title: 'Cities',
	            url: 'Cities'
	        },
	        leagues: {
	            title: 'Leagues',
	            url: 'Leagues'
	        },
	        teams: {
	            title: 'Teams',
	            url: 'Teams'
	        },
	        players: {
	            title: 'Players',
	            url: 'Players'
	        },
	        goalies: {
	            title: 'Goalies',
	            url: 'Goalies'
	        },
	        skaters: {
	            title: 'Skaters',
	            url: 'Skaters'
	        },
	        hitters: {
	            title: 'Hitters',
	            url: 'Hitters'
	        },
	        pitchers: {
	            title: 'Pitchers',
	            url: 'Pitchers'
	        }
	    };
	    exports.Api = Api;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko, $) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Api_1) {
	    "use strict";
	    var Item = (function () {
	        function Item(jsonItem, listProperties) {
	            this.id = ko.observable();
	            this.title = ko.observable().trackChanges();
	            this.created = ko.observable();
	            this.modified = ko.observable().trackChanges();
	            if (jsonItem) {
	                this.id(jsonItem.Id);
	                this.title(jsonItem.Title);
	                this.created(Api_1.Api.getDateValue(jsonItem.Created));
	                this.modified(Api_1.Api.getDateValue(jsonItem.Modified));
	                this.resetDirtyFlags();
	            }
	        }
	        Item.prototype.resetDirtyFlags = function () {
	            var item = this;
	            for (var key in item) {
	                var prop = item[key];
	                // Does the object have this property, is it an observable, and has it been enabled to track changes
	                if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof prop.isDirty == 'function') {
	                    // Set the new original value to compare against
	                    if (typeof prop.trackChanges == 'function') {
	                        prop.trackChanges();
	                    }
	                    else if (typeof prop.updateIntialTrackedValueToCurrent == 'function') {
	                        prop.updateIntialTrackedValueToCurrent();
	                    }
	                }
	            }
	        };
	        /**
	         * Revert any dirty property back to the original value.
	         */
	        Item.prototype.cleanDirtyProps = function () {
	            var item = this;
	            for (var key in item) {
	                var dirtyProp = item[key];
	                // Does the object have this property, is it an observable, and has it been enabled to track changes
	                if (item.hasOwnProperty(key) && ko.isObservable(item[key]) && typeof dirtyProp.resetToOriginalValue == 'function') {
	                    // Set the new original value to compare against
	                    (dirtyProp).resetToOriginalValue();
	                }
	            }
	        };
	        /**
	         * Create a new item.
	         */
	        Item.prototype.create = function () {
	            var _this = this;
	            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url;
	            var payload = this.getDirtyProps();
	            return $.ajax({
	                url: url,
	                type: 'POST',
	                processData: false,
	                headers: {
	                    'accept': 'application/json;odata=verbose',
	                    'content-type': 'application/json;odata=verbose',
	                    'X-RequestDigest': $('#__REQUESTDIGEST').val()
	                },
	                data: JSON.stringify(payload)
	            }).then(function (results) {
	                var newItem = results.d;
	                _this.id(newItem.Id);
	                _this.resetDirtyFlags();
	                return newItem;
	            }).fail(function () {
	                // TODO: Log it and let the user know
	            });
	        };
	        Item.prototype.deleteItem = function () {
	            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url + "(" + this.id() + ")";
	            return $.ajax({
	                url: url,
	                type: "DELETE",
	                contentType: "application/json; charset=utf-8"
	            }).then(function (results) {
	                // No data returned in the response
	            }).fail(function () {
	                // TODO: Log it and let the user know
	            });
	        };
	        /**
	         * Update an existing item.
	         */
	        Item.prototype.update = function () {
	            var _this = this;
	            var payload = this.getDirtyProps();
	            if (JSON.stringify(payload) === JSON.stringify({})) {
	                return $.when(null);
	            }
	            var url = L_Menu_BaseUrl + "/" + Api_1.Api.url + "/" + this.list.url + "(" + this.id() + ")";
	            return $.ajax({
	                url: url,
	                type: 'POST',
	                processData: false,
	                headers: {
	                    'accept': 'application/json;odata=verbose',
	                    'content-type': 'application/json;odata=verbose',
	                    'X-RequestDigest': $('#__REQUESTDIGEST').val()
	                },
	                beforeSend: function (xhr) {
	                    xhr.setRequestHeader('If-Match', '*');
	                    // Using MERGE so that the entire entity doesn't need to be sent over the wire. 
	                    xhr.setRequestHeader('X-HTTP-Method', 'MERGE');
	                },
	                data: JSON.stringify(payload)
	            }).then(function (results) {
	                // No data returned in the response
	                _this.resetDirtyFlags();
	                _this.modified(new Date());
	            }).fail(function () {
	                // TODO: Log it and let the user know
	            });
	        };
	        Item.prototype.getDirtyProps = function () {
	            var item = this;
	            var dirtyProps = {};
	            for (var key in item) {
	                // Does the object have this property
	                if (!item.hasOwnProperty(key)) {
	                    continue;
	                }
	                // Is the property an observable
	                if (!ko.isObservable(item[key])) {
	                    continue;
	                }
	                var prop = item[key];
	                // Make sure this observable has been enabled to track changes
	                if (typeof prop.isDirty != 'function') {
	                    continue;
	                }
	                // Is the property dirty
	                if (prop.isDirty()) {
	                    var newKey = this.toPascalCase(key);
	                    if (prop() instanceof Date) {
	                        var dateValue = prop();
	                        dirtyProps[newKey] = dateValue.toISOString();
	                    }
	                    else {
	                        dirtyProps[newKey] = prop();
	                    }
	                }
	            }
	            return dirtyProps;
	        };
	        Item.prototype.toPascalCase = function (key) {
	            return key.charAt(0).toUpperCase() + key.slice(1);
	        };
	        return Item;
	    }());
	    exports.Item = Item;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(2)))

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko) {var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(10), __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Item_1, Api_1) {
	    "use strict";
	    var Team = (function (_super) {
	        __extends(Team, _super);
	        function Team(team) {
	            var _this = _super.call(this, team, Api_1.Api.lists.teams) || this;
	            _this.Owner = ko.observable().trackChanges();
	            _this.Players = ko.observableArray([]);
	            _this.League = ko.observable().trackChanges();
	            _this.LeagueValue = ko.observable().trackChanges();
	            _this.Owner(team.Owner);
	            _this.LeagueValue(team.LeagueValue);
	            return _this;
	        }
	        return Team;
	    }(Item_1.Item));
	    exports.Team = Team;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Api_1) {
	    "use strict";
	    var Query = (function () {
	        function Query(listUrl, baseUrl) {
	            if (baseUrl === void 0) { baseUrl = _spPageContextInfo.webServerRelativeUrl; }
	            this.allFilters = ko.observableArray([]);
	            this.expands = ko.observableArray([]);
	            this.selects = ko.observableArray([]);
	            this.orderBys = ko.observable();
	            this.orderByDirection = ko.observable();
	            this.tops = ko.observable();
	            this.skips = ko.observable();
	            this.metaDatas = ko.observable();
	            this.listUrl = ko.observable();
	            this.baseUrl = ko.observable();
	            this.listUrl(listUrl);
	            this.baseUrl(baseUrl);
	        }
	        Query.prototype.metaData = function (filter) {
	            this.metaDatas(filter);
	            return this;
	        };
	        Query.prototype.contains = function (filter, valuesToContain) {
	            if (valuesToContain.length <= 0 || !filter) {
	                return this;
	            }
	            this.allFilters.push("(" + filter + " eq " + valuesToContain.join(" or " + filter + " eq ") + ")");
	            return this;
	        };
	        Query.prototype.orderBy = function (filter, direction) {
	            if (direction === void 0) { direction = 'asc'; }
	            this.orderBys(filter);
	            this.orderByDirection(direction);
	            return this;
	        };
	        Query.prototype.skip = function (filter) {
	            this.skips(filter);
	            return this;
	        };
	        Query.prototype.top = function (filter) {
	            this.tops(filter);
	            return this;
	        };
	        Query.prototype.filter = function (filter) {
	            if (filter) {
	                this.allFilters.push(filter);
	            }
	            return this;
	        };
	        Query.prototype.expand = function (expand) {
	            if (expand) {
	                this.expands.push(expand);
	            }
	            return this;
	        };
	        Query.prototype.select = function (select) {
	            if (select) {
	                this.selects.push(select);
	            }
	            return this;
	        };
	        Query.prototype.toString = function () {
	            var segments = [
	                this.joinSegment('filter', this.allFilters(), ' and '),
	                this.joinSegment('expand', this.expands(), ','),
	                this.joinSegment('select', this.selects(), ',')
	            ];
	            if (this.tops()) {
	                segments.push(this.joinSegment('top', [this.tops().toString()], ','));
	            }
	            if (this.skips()) {
	                segments.push(this.joinSegment('skip', [this.skips().toString()], ','));
	            }
	            if (this.orderBys()) {
	                var orderBySegment = "$orderby=" + this.orderBys() + " " + this.orderByDirection();
	                segments.push(orderBySegment);
	            }
	            // Clean out the falsey values then join.
	            var filter = segments.filter(Boolean).join('&');
	            var url = this.baseUrl() + "/" + Api_1.Api.url + "/" + this.listUrl();
	            if (this.metaDatas()) {
	                url = url + "/" + this.metaDatas();
	            }
	            return url + "?" + filter;
	        };
	        Query.prototype.joinSegment = function (segmentName, segmentValues, separator) {
	            if (segmentValues.length <= 0) {
	                return '';
	            }
	            return "$" + segmentName + "=" + segmentValues.join(separator);
	        };
	        return Query;
	    }());
	    exports.Query = Query;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($, ko) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(9)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, Api_1) {
	    "use strict";
	    //import { ComponentUtility } from '../Resources/ComponentUtility';
	    var DataService = (function () {
	        function DataService() {
	        }
	        DataService.getChoiceValues = function (listUrl, fieldName) {
	            var url = _spPageContextInfo.webServerRelativeUrl + "/" + Api_1.Api.url + "/" + listUrl + fieldName;
	            return $.getJSON(url).then(function (data) {
	                var retval = [];
	                ko.utils.arrayForEach(data.d.results, function (item) {
	                    retval.push(item["Value"]);
	                });
	                return retval;
	            });
	        };
	        DataService.getById = function (id, query) {
	            // A new deferred is created so we can reject if no item is found in the query
	            var deferred = $.Deferred();
	            if (!query) {
	                return $.when(null);
	            }
	            query.filter("Id eq " + id);
	            $.getJSON(query.toString())
	                .then(function (data) {
	                if (data.d.results[0]) {
	                    deferred.resolve(data.d.results[0]);
	                }
	                else {
	                    // If no items are found, reject the deferred.
	                    var error = "Item " + id + " not found.";
	                    deferred.reject(error);
	                }
	            }, function (error) {
	                // Handle any other errors
	                var errorMessage = DataService.parseError(error);
	                deferred.reject(errorMessage);
	            });
	            return deferred.promise();
	        };
	        DataService.executeQueryAsync = function (clientContext) {
	            var deferred = $.Deferred();
	            clientContext.executeQueryAsync(function (results) {
	                deferred.resolve(results);
	            }, function (sender, args) {
	                deferred.reject("Error executing SP JSOM Query: " + args.get_message());
	            });
	            return deferred.promise();
	        };
	        DataService.getByQuery = function (query) {
	            if (!query) {
	                return $.when(null);
	            }
	            return $.getJSON(query.toString())
	                .then(function (data) {
	                if (typeof (data.d) == 'undefined') {
	                    // The results were returned to us directly on data (Ex: using $count).
	                    return data;
	                }
	                else if (data.d instanceof Array) {
	                    // The results were returned to us directly on data.d.
	                    return data.d;
	                }
	                else {
	                    return data.d.results;
	                }
	            }, function (response) {
	                var failed = $.Deferred();
	                var errorMessage = DataService.parseError(response);
	                console.warn(errorMessage);
	                return failed.reject(errorMessage);
	            });
	        };
	        DataService.parseError = function (response) {
	            if (response && response.responseJSON && response.responseJSON.error && response.responseJSON.error.message && response.responseJSON.error.message.value) {
	                return "" + response.responseJSON.error.message.value;
	            }
	            else if (typeof response === 'string') {
	                return response;
	            }
	            else {
	                return 'An error has occurred.';
	            }
	        };
	        DataService.saveArrayChanges = function (array, folderPath) {
	            var promises = [];
	            var item;
	            ko.utils.arrayForEach(array.getDifferences(), function (change) {
	                item = change.value;
	                switch (change.status) {
	                    case 'added':
	                        if (!item.id()) {
	                            promises.push(item.create());
	                        }
	                        break;
	                    case 'deleted':
	                        promises.push(item.deleteItem());
	                        break;
	                }
	            });
	            return $.when.apply(null, promises);
	        };
	        return DataService;
	    }());
	    exports.DataService = DataService;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2), __webpack_require__(4)))

/***/ },

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var KnockoutExtensions = (function () {
	        function KnockoutExtensions() {
	        }
	        KnockoutExtensions.Init = function () {
	            ko.subscribable.fn.trackChanges = function () {
	                var _this = this;
	                this.originalValue = this();
	                this.isDirty = ko.computed(function () {
	                    return this() !== this.originalValue;
	                }, this);
	                this.resetToOriginalValue = function () {
	                    _this(_this.originalValue);
	                };
	                return this;
	            };
	            ko.trackedObservableArray = function (initialValue) {
	                var observable = ko.observableArray(initialValue);
	                observable.originalValue = initialValue.slice(0);
	                observable.getDifferences = function () {
	                    return ko.utils.compareArrays(observable.originalValue, observable());
	                };
	                observable.updateIntialTrackedValueToCurrent = function () {
	                    observable.originalValue = observable().slice(0);
	                };
	                return observable;
	            };
	        };
	        return KnockoutExtensions;
	    }());
	    exports.KnockoutExtensions = KnockoutExtensions;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },

/***/ 338:
/***/ function(module, exports, __webpack_require__) {

	// This file can be required in Browserify and Node.js for automatic polyfill
	// To use it:  require('es6-promise/auto');
	'use strict';
	module.exports = __webpack_require__(339).polyfill();


/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(ko, $) {!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
	    "use strict";
	    var templateHtml = __webpack_require__(343);
	    var DataTable = (function () {
	        function DataTable(params) {
	            var _this = this;
	            this.settings = ko.observable({
	                items: ko.observableArray([]),
	                columns: ko.observableArray([]),
	                currentPage: ko.observable(1)
	            });
	            this.pageSize = ko.observable(10);
	            this.totalItems = ko.observable(0);
	            this.showingMin = ko.computed(function () {
	                if (_this.settings() && _this.settings().currentPage && _this.settings().currentPage() && _this.pageSize()) {
	                    return (_this.settings().currentPage() - 1) * _this.pageSize() + 1;
	                }
	            });
	            this.lastPage = ko.computed(function () {
	                if (_this.totalItems() && _this.pageSize()) {
	                    var remainder = _this.totalItems() % _this.pageSize();
	                    var pages = _this.totalItems() / _this.pageSize();
	                    if (remainder > 0 && _this.totalItems() > _this.pageSize()) {
	                        pages += 1;
	                    }
	                    return Math.floor(pages);
	                }
	            });
	            this.showingMax = ko.computed(function () {
	                if (_this.totalItems() && _this.pageSize()) {
	                    var max = _this.showingMin() + _this.pageSize() - 1;
	                    if (max > _this.totalItems()) {
	                        max = _this.totalItems();
	                    }
	                    return max;
	                }
	            });
	            this.allRows = ko.observableArray([]);
	            this.processedRows = ko.computed(function () {
	                return _this.allRows();
	            });
	            this.footerRow = ko.pureComputed(function () {
	                var footerRow = {
	                    cells: [],
	                    item: null,
	                    errors: ko.observableArray([])
	                };
	                var totalRowIsUsed = false;
	                ko.utils.arrayForEach(_this.settings().columns(), function (column) {
	                    var columnCells = [];
	                    ko.utils.arrayForEach(_this.processedRows(), function (row) {
	                        var columnCell = ko.utils.arrayFirst(row.cells, function (cell) {
	                            return cell.column == column;
	                        });
	                        if (columnCell) {
	                            columnCells.push(columnCell);
	                        }
	                    });
	                    var renderedColumnCellValues = columnCells.map(function (columnCell) {
	                        return columnCell.value();
	                    });
	                    footerRow.cells.push({
	                        column: column
	                    });
	                });
	                return totalRowIsUsed ? footerRow : null;
	            });
	            if (!params) {
	                return;
	            }
	            this.mergeSettings(this.settings, params.settings);
	            this.settings().currentPage = this.settings().currentPage;
	            this.initRows();
	        }
	        DataTable.prototype.pageNext = function () {
	            if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {
	                var nextPage = this.settings().currentPage() + 1;
	                this.settings().currentPage(nextPage);
	            }
	        };
	        DataTable.prototype.pagePrev = function () {
	            if (this.settings() && this.settings().currentPage && this.settings().currentPage()) {
	                var prevPage = this.settings().currentPage() - 1;
	                this.settings().currentPage(prevPage);
	            }
	        };
	        DataTable.prototype.initRows = function () {
	            // Render the array provided
	            this.renderRows(this.settings().items());
	            // Subscribe to the array provided. We will re-render rows when it changes.
	            this.subscribeToItemChanges();
	        };
	        DataTable.prototype.subscribeToItemChanges = function () {
	            var _this = this;
	            this.settings().items.subscribe(function (changes) {
	                _this.renderRows(_this.settings().items());
	            });
	        };
	        /**
	         * Renders (or re-renders) all of the rows.
	         */
	        DataTable.prototype.renderRows = function (itemsToRender) {
	            var _this = this;
	            var newRows = [];
	            ko.utils.arrayForEach(itemsToRender, function (item) {
	                newRows.push(_this.renderRow(item));
	            });
	            this.allRows(newRows);
	        };
	        /**
	         * Using the column configuration and the raw Items array, build an array of rows.
	         * @param item
	         */
	        DataTable.prototype.renderRow = function (item) {
	            var row = {
	                cells: [],
	                item: item,
	                errors: ko.observableArray([])
	            };
	            ko.utils.arrayForEach(this.settings().columns(), function (column) {
	                var cell = {
	                    value: column.cellText(item),
	                    column: column
	                };
	                row.cells.push(cell);
	            });
	            return row;
	        };
	        DataTable.prototype.mergeSettings = function (defaultSettings, newSettings) {
	            if (ko.isObservable(newSettings)) {
	                newSettings = newSettings();
	            }
	            if (!newSettings) {
	                return;
	            }
	            var settings2 = $.extend({}, defaultSettings(), newSettings);
	            defaultSettings(settings2);
	        };
	        DataTable.modelActivator = function (type, jsonItem) {
	            return new type(jsonItem);
	        };
	        return DataTable;
	    }());
	    exports.DataTable = DataTable;
	    exports.component = ko.components.register("data-table", {
	        viewModel: DataTable,
	        template: templateHtml
	    });
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(2)))

/***/ },

/***/ 343:
/***/ function(module, exports) {

	module.exports = "\r\n<table class=\"table table-bordered table-striped table-paged\">\r\n    <thead>\r\n        <tr>\r\n            <!-- ko foreach: settings().columns -->\r\n            <th class=\"ui-state-default datatable-column-header\">\r\n                <span data-bind=\"text: header\"></span>\r\n            </th>\r\n            <!-- /ko -->\r\n        </tr>\r\n    </thead>\r\n\r\n\r\n    <!-- ko if: processedRows().length <= 0 -->\r\n    <tbody>\r\n        <tr>\r\n            <td class=\"text-center\" colspan=\"44\">\r\n                None found.\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n    <!-- /ko -->\r\n    <!-- ko if: processedRows().length > 0 -->\r\n    <tbody data-bind=\"foreach: processedRows\">\r\n        <tr data-bind=\"css: { danger : errors().length > 0 }\">\r\n            <!-- ko foreach: cells -->\r\n            <!-- ko if: $data.column.cellTemplate -->\r\n            <td data-bind='template: {\r\n                                name: $data.column.cellTemplate,\r\n                                data: $parent.item }'></td>\r\n            <!-- /ko -->\r\n            <!-- ko ifnot: $data.column.cellTemplate -->\r\n            <!-- ko ifnot: $data.column.cellRenderer-->\r\n            <td data-bind=\"text: $data.value\"></td>\r\n            <!-- /ko -->\r\n            <!-- /ko -->\r\n            <!-- /ko -->\r\n        </tr>\r\n    </tbody>\r\n    <!-- ko with: footerRow -->\r\n    <tfoot>\r\n        <tr data-bind=\"foreach: cells\">\r\n            <td>\r\n                <strong data-bind=\"text: value\"></strong>\r\n            </td>\r\n        </tr>\r\n    </tfoot>\r\n    <!-- /ko -->\r\n    <!-- /ko -->\r\n</table>\r\n<!-- ko if: settings().showPagination && settings().showPagination() && settings().currentPage && settings().currentPage() > 0 -->\r\n<div class=\"fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix ui-corner-bl ui-corner-br\">\r\n    <div class=\"dataTables_info\">Showing <span data-bind=\"text: showingMax() > 0 ? showingMin : 0 \"></span> to <span data-bind=\"text: showingMax\"></span> of <span data-bind=\"text: totalItems\"></span> entries</div>\r\n    <div class=\"dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi ui-buttonset-multi paging_simple_numbers\">\r\n        <a class=\"fg-button ui-button ui-state-default previous\" data-bind=\"click: settings().currentPage() == 1 ? null : pagePrev, css: { 'ui-state-disabled' : settings().currentPage() == 1 } \">Previous</a>\r\n        <a class=\"fg-button ui-button ui-state-default ui-state-disabled\" data-bind=\"text: settings().currentPage\"></a>\r\n        <a class=\"fg-button ui-button ui-state-default next\" data-bind=\"click: settings().currentPage() >= lastPage() ? null : pageNext, css: { 'ui-state-disabled' : settings().currentPage() >= lastPage() }\">Next</a>\r\n    </div>\r\n</div>\r\n<!-- /ko -->";

/***/ }

});