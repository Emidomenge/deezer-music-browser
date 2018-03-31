import React from 'react';
import './App.css';
import NavBar from "./navbar/NavbarComponent";
import Footer from "./footer/FooterComponent";
import Searchbar from "./searchbar/SearchbarComponent";
import searchResultsController from "./searchResults/SearchResultsController"
import SearchResults from "./searchResults/SearchResultsComponent"

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

const App = ({ data, isLoading, error }) => {
    const musicRecordsResults = data || [];

    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="App">
            <NavBar appName={"Deezer-music-browser"}/>
            <Searchbar placeholderLabel={"Search songs which you love !"}/>
            <SearchResults dataToSerialize={musicRecordsResults}/>
            <Footer/>
        </div>
    );
};

export default searchResultsController(API + DEFAULT_QUERY)(App);
