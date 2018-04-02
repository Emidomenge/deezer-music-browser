import React, { Component } from 'react';
const WAIT_INTERVAL = 1000;
var _ = require('lodash');
//var customData = require('./../demoData/deezer-api-results-sample.json');

/*
 *  This controller :
 *      - Fetches data after receiving response from Deezer API query
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
                handleLoadMoreCallback : this.handleLoadMore.bind(this)
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
            this.componentDidMount();
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
            if(this.state.searchInputValue === "") {
                this.setState({
                    isSearchInputEmpty: true
                });
            }
            else {
                var newSearch = false;
                this.setState({ isLoading: true, error: null, isSearchInputEmpty: false });

                // Check if this is a new search or not
                if(this.state.currentComputedSearchInput !== this.state.searchInputValue) {
                    this.setState({ data:[], nbTotalFoundResults: null, currentComputedSearchInput: "", nextQueryUrl: ""});
                    newSearch = true;
                    console.log("[Info] New search detected.")
                }

                // As app is running in localhost, use proxy to avoid CORS problem
                // Works with modern browser only: var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                var proxyUrlIE9 = 'http://cors-proxy.htmldriven.com/?url='; // IE9 requires http url only (not https)

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

                            this.setState({
                                data: uniqueArray,
                                nbTotalFoundResults: deezerApiResults.total,
                                nextQueryUrl: deezerApiResults.next,
                                currentComputedSearchInput: searchInputValue,
                                isLoading: false
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
