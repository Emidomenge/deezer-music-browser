import React, { Component } from 'react';
import './App.css';
import NavBar from "./navbar/NavbarComponent";
import Footer from "./components/footer/footer";
import Searchbar from "./searchbar/SearchbarComponent";
import SearchResults from "./searchResults/SearchResultsComponent"
import withSearchResultsController from "./searchResults/SearchResultsController"
var _ = require('lodash');

const API_TEST = 'https://api.deezer.com/search/track?q=';
const WAIT_INTERVAL = 1000;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: false,
            error: null,
            searchInputValue: ""
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
        this.setState({ isLoading: true, error: null });
        // As app is running in localhost, use proxy to avoid CORS problem
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + API_TEST + this.state.searchInputValue)
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

    render() {
        const { data, isLoading, error, searchInputValue } = this.state;


        return (
            <div className="App">
                <NavBar appName={"Deezer-music-browser"}/>
                <Searchbar placeholderLabel={"Search songs which you love !"} value={searchInputValue} onChangeCallback={this.onSearchInputChange.bind(this)}/>
                <SearchResults dataToSerialize={data} isLoading={isLoading} hasError={error}/>
                <Footer/>
            </div>
        );
    }
}


export default App;