import React from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Search from './components/search';
import SearchResult from './components/searchResult';
import ScrollTopButton from './components/scrollTopButton/scrollTopButton';
import withController from './withController';

const apiUrl = 'https://api.deezer.com/search/track?q=';

const App = (props) => {
  const {
    data, isLoading, error, onChangeCallback,
    isSearchInputEmpty, handleLoadMoreCallback,
    apiCallStatus, sortCallback, columnSorted,
  } = props;
  const musicRecordsResults = data || [];

  return (
    <div className="App">
      <Header appName="Deezer-music-browser" />
      <Search placeholderLabel="Search songs which you love !" onChangeCallback={onChangeCallback} />
      <SearchResult
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

export default withController(apiUrl)(App);
