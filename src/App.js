import React from 'react';
import './App.css';
import NavBar from "./navbar/NavbarComponent";
import Footer from "./footer/FooterComponent";
import Searchbar from "./searchbar/SearchbarComponent";
import SearchResults from "./searchResults/SearchResultsComponent"
import withSearchResultsController from "./searchResults/SearchResultsController"

const API_TEST = 'https://api.deezer.com/search/track?q=eminem';

const App = ({ data, isLoading, error }) => {
    const musicRecordsResults = data || [];
    return (
        <div className="App">
            <NavBar appName={"Deezer-music-browser"}/>
            <Searchbar placeholderLabel={"Search songs which you love !"}/>
            <SearchResults dataToSerialize={musicRecordsResults} isLoading={isLoading} hasError={error}/>
            <Footer/>
        </div>
    );
};

export default withSearchResultsController(API_TEST)(App);
