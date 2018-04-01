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
                isSearchInputEmpty: true
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

        componentDidMount() {
            if(this.state.searchInputValue === "") {
                this.setState({
                    isSearchInputEmpty: true
                });
            }
            else {
                this.setState({ isLoading: true, error: null, isSearchInputEmpty: false });
                // As app is running in localhost, use proxy to avoid CORS problem
                var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                fetch(proxyUrl + url + this.state.searchInputValue)
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
                            this.setState({ data: deezerApiResults.data, isLoading: false });
                        }
                    })
                    .catch(error => this.setState({ error, isLoading: false }));
            }
        }

        render() {
            return <WrappedComponent { ...this.props } { ...this.state } />
        }
};

export default withSearchResultsController;
