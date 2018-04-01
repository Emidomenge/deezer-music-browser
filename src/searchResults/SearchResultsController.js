import React, { Component } from 'react';
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
                error: null
            };
        }

        componentDidMount() {
            this.setState({ isLoading: true });
            // As app is running in localhost, use proxy to avoid CORS problem
            var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
            fetch(proxyUrl + url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(deezerApiResults => this.setState({ data: deezerApiResults.data, isLoading: false }))
                .catch(error => this.setState({ error, isLoading: false }));
        }

        render() {
            return <WrappedComponent { ...this.props } { ...this.state } />
        }
};

export default withSearchResultsController;
