import React, { Component } from 'react';
var customData = require('./../demoData/deezer-api-results-sample.json');

const searchResultsBody = (url) => (Comp) =>
    class SearchResultsBody extends Component {
        constructor(props) {
            super(props);

            this.state = {
                data: customData.data,
                isLoading: false,
                error: null
            };
        }

        componentDidMount() {
            this.setState({ isLoading: true });

            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong ...');
                    }
                })
                .then(data => this.setState({ data: customData.data, isLoading: false }))
                .catch(error => this.setState({ error, isLoading: false }));
        }

        render() {
            return <Comp { ...this.props } { ...this.state } />
        }
};

export default searchResultsBody;
