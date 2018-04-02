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
                apiCallStatus: 0
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

        componentDidMount() {
            var newSearch = false;

            // Check if this is a new search or not
            if(this.state.currentComputedSearchInput !== this.state.searchInputValue) {
                this.setState({ data:[], nbTotalFoundResults: null, currentComputedSearchInput: "", nextQueryUrl: "", nbApiCall: 0, apiCallStatus: 10});
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
                //this.setState({ isLoading: true, error: null, isSearchInputEmpty: false, apiCallStatus: 50 });

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

                // As app is running in localhost, use proxy to avoid CORS problem
                var proxyUrlIE9 = 'http://cors-proxy.htmldriven.com/?url='; // IE9 requires http url only (not https)

                // If first proxy is too slow:
                var proxyUrlIE9_backup = 'http://anyorigin.com/go?url=';

                fetch(newSearch ? proxyUrlIE9 + encodeURIComponent(url + this.state.searchInputValue) : proxyUrlIE9 + encodeURIComponent(this.state.nextQueryUrl))
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Something went wrong ...');
                        }
                    })
                    .then(deezerApiResults => {
                        if(deezerApiResults.error) {
                            // TODO: fullclean
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
                            var isFirstCall = computedNbApiCall === 1 ? 10 : 50; // 10 = firstCall status | 50 = 'more results to display' status

                            this.setState({
                                data: uniqueArray,
                                nbTotalFoundResults: deezerApiResults.total,
                                nextQueryUrl: deezerApiResults.next,
                                currentComputedSearchInput: searchInputValue,
                                isLoading: false,
                                nbApiCall: computedNbApiCall,
                                apiCallStatus: isFirstCall
                            });
                        }
                    })
                    .catch(error => {
                        // TODO: fullclean
                        this.setState({ error, isLoading: false })
                    });
            }
        }

        render() {
            return <WrappedComponent { ...this.props } { ...this.state } />
        }
};

export default withSearchResultsController;
