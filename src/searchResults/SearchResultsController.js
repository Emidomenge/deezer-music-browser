import React, { Component } from 'react';
const WAIT_INTERVAL = 1000;
const DEEZER_API_INDEX_INTERVAL = 25;
var _ = require('lodash');

// IE9 compatibility:
if(!window.console) window.console = {};
if(!window.console.log) window.console.log = function() {};

/*
 *  This controller :
 *      - Fetches data after receiving response from Deezer API query
 *
 *  NOTE:
 *      apiCallStatus glossary:
 *          0   = 'No search to process'
 *          10  = 'First search processing'
 *          50  = 'Search processing + more results to display (ie: infinite loop is ON)'
 *          55  = 'Search processing with hard reload"
 *          100 = 'Search finished (ie: infinite loop is OFF)
 */
const withSearchResultsController = (url) => (WrappedComponent) =>
    class SearchResultsBody extends Component {
        constructor(props) {
            super(props);

            this.state = {
                data: [],
                isLoading: false,
                error: null,
                searchInputValue: "",
                onChangeCallback: this.onSearchInputChange.bind(this),
                isSearchInputEmpty: true,
                nbTotalFoundResults: null,
                nextQueryUrl: "",
                currentComputedSearchInput: "",
                handleLoadMoreCallback : this.handleLoadMore.bind(this),
                nbApiCall: 0,
                apiCallStatus: 0,
                sortCallback : this.handleSort.bind(this),
                urlSortOption: "",
                columnSorted: []
            };
        }

        triggerChangeCallback =
            _.debounce(event => {
                this.setState({
                    searchInputValue: event.target.value
                });
                this.componentDidMount();
            }, WAIT_INTERVAL);

        onSearchInputChange(event) {
            event.persist();
            this.triggerChangeCallback(event);
        };

        handleLoadMore(page) {
            if(!this.state.isLoading) this.componentDidMount();
        }

        extractUniqueArrayFrom(arr) {
            var cleaned = [];
            arr.forEach(function(itm) {
                var unique = true;
                cleaned.forEach(function(itm2) {
                    if (_.isEqual(itm.id, itm2.id)) unique = false;
                });
                if (unique)  cleaned.push(itm);
            });
            return cleaned;
        };

        handleSort(columnSorted) {
            var columnKey = "";
            var sortKey = columnSorted[0].desc ? "_DESC" : "_ASC";

            switch(columnSorted[0].id) {
                case "title":
                    columnKey = "TRACK";
                    break;
                case "artist.name":
                    columnKey = "ARTIST";
                    break;
                case "album.title":
                    columnKey = "ALBUM";
                    break;
                case "duration":
                    columnKey = "DURATION";
                    break;
                default:
                    console.log("[handleSort] no column key matched");
                    return;
            }
            this.setState({
                data: [],
                nbTotalFoundResults: null,
                nextQueryUrl: url + this.state.searchInputValue,
                nbApiCall: 0,
                apiCallStatus: 55, // force hard reload
                urlSortOption: "&order=" + columnKey + sortKey,
                columnSorted: columnSorted
            }, function() {
                if(!this.state.isLoading) this.componentDidMount();
            });
        }

        componentDidMount() {
            var newSearch = false;

            // Check if this is a new search or not
            if(this.state.currentComputedSearchInput !== this.state.searchInputValue || this.state.error) {
                this.setState({ data:[],
                    nbTotalFoundResults: null,
                    currentComputedSearchInput: "",
                    nextQueryUrl: "",
                    nbApiCall: 0,
                    apiCallStatus: 10,
                    urlSortOption: "",
                    columnSorted: []
                });
                newSearch = true;
                console.log("[Info] New search detected.")
            }

            if(this.state.searchInputValue === "") {
                this.setState({
                    isSearchInputEmpty: true
                });
            }
            else if(this.state.apiCallStatus === 100 && !newSearch) {
                return;
            }
            else {
                var refreshState = {
                    isLoading: true,
                    error: null,
                    isSearchInputEmpty: false,
                };

                // Check if no more results to display (= end of "infinite" loop)
                if(this.state.nbTotalFoundResults < DEEZER_API_INDEX_INTERVAL * this.state.nbApiCall) {
                    refreshState.apiCallStatus = 100;
                    this.setState(refreshState);
                    return;
                }
                else if(!newSearch && this.state.apiCallStatus === 10) {
                    refreshState.apiCallStatus = 50; // called only when triggering infinite scroll first time
                }

                this.setState(refreshState);

                // As app is running in localhost, use proxy to avoid CORS problem (WARNING: might be too slow, sometimes...)
                var proxyUrlIE9 = 'http://cors-proxy.htmldriven.com/?url=';

                var urlFirstSearch = proxyUrlIE9 + encodeURIComponent(url + this.state.searchInputValue + this.state.urlSortOption);
                var urlContinueSearch = proxyUrlIE9 + encodeURIComponent(this.state.nextQueryUrl + this.state.urlSortOption);

                console.log("[componentDidMount] Option: '" + this.state.urlSortOption + "' with status: " + this.state.apiCallStatus);

                fetch(newSearch ? urlFirstSearch : urlContinueSearch)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Something went wrong ...');
                        }
                    })
                    .then(deezerApiResults => {
                        if(deezerApiResults.error) {
                            this.setState({ error: deezerApiResults.error, isLoading: false })
                        }
                        else {
                            deezerApiResults = JSON.parse(deezerApiResults.body);
                            var mergedArray = (this.state.data).concat(deezerApiResults.data);
                            var uniqueArray = this.extractUniqueArrayFrom(mergedArray);
                            var nbDuplicate = mergedArray.length - uniqueArray.length;

                            if(nbDuplicate !== 0) {
                                console.log("[Info] There was " + nbDuplicate + " duplicate(s) detected record.");
                            }

                            console.log("[Info] Current amount of displayed records found " + uniqueArray.length + ".");
                            console.log("------------------");

                            var searchInputValue = this.state.searchInputValue;
                            var computedNbApiCall = this.state.nbApiCall + 1;
                            var currentStatus = computedNbApiCall === 1 ? 10 : 50; // 10 = firstCall status | 50 = 'more results to display' status
                            currentStatus = currentStatus === 55 ? 50 : currentStatus; // put back to status 50 after hard reload done

                            this.setState({
                                data: uniqueArray,
                                nbTotalFoundResults: deezerApiResults.total,
                                nextQueryUrl: deezerApiResults.next,
                                currentComputedSearchInput: searchInputValue,
                                isLoading: false,
                                nbApiCall: computedNbApiCall,
                                apiCallStatus: currentStatus
                            });
                        }
                    })
                    .catch(error => {
                        this.setState({ error, isLoading: false })
                    });
            }
        }

        render() {
            return <WrappedComponent { ...this.props } { ...this.state } />
        }
};

export default withSearchResultsController;
