import React from 'react';
import './App.css';
import NavBar from './navbar/NavbarComponent';
import Footer from './components/footer/footer';
import Search from './components/search';
import SearchResults from './searchResults/SearchResultsComponent';
import withController from './withController';
import ScrollTopButton from './scrollTopButton/ScrollTopButtonComponent';

const API_TEST = 'https://api.deezer.com/search/track?q=';

const App = (props) => {
  const {
    data, isLoading, error, onChangeCallback,
    isSearchInputEmpty, handleLoadMoreCallback,
    apiCallStatus, sortCallback, columnSorted,
  } = props;
  const musicRecordsResults = data || [];

  return (
    <div className="App">
      <NavBar appName="Deezer-music-browser" />
      <Search placeholderLabel="Search songs which you love !" onChangeCallback={onChangeCallback} />
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
      <ScrollTopButton />
      <Footer />
    </div>
  );
};

export default withController(API_TEST)(App);
