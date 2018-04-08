import React from 'react';
import './App.css';
import NavBar from "./navbar/NavbarComponent";
import Footer from "./footer/FooterComponent";
import Searchbar from "./searchbar/SearchbarComponent";
import SearchResults from "./searchResults/SearchResultsComponent"
import withSearchResultsController from "./searchResults/SearchResultsController"
import ScrollTopButton from "./scrollTopButton/ScrollTopButtonComponent"

const API_TEST = 'https://api.deezer.com/search/track?q=';

const App = ({ data, isLoading, error, onChangeCallback, isSearchInputEmpty, handleLoadMoreCallback, apiCallStatus, sortCallback, columnSorted }) => {
    const musicRecordsResults = data || [];

    return (
        <div className="App">
            <NavBar appName={"Deezer-music-browser"}/>
            <Searchbar placeholderLabel={"Search songs which you love !"} onChangeCallback={onChangeCallback}/>
            <SearchResults
                dataToSerialize={musicRecordsResults}
                isLoading={isLoading}
                hasError={error}
                isSearchInputEmpty={isSearchInputEmpty}
                handleLoadMore={handleLoadMoreCallback}
                searchStatus={apiCallStatus}
                onSortedCallback={sortCallback}
                columnSorted={columnSorted}
            />
            <ScrollTopButton/>
            <Footer/>
        </div>
    );
};

export default withSearchResultsController(API_TEST)(App);
