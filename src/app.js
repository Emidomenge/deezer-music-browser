import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/header';
import Footer from './components/footer';
import Search from './components/search';
import SearchResult from './components/searchResult';
import ScrollTopButton from './components/scrollTopButton';
import withController from './withController';

const apiUrl = 'https://api.deezer.com/search/track?q=';

const App = (props) => {
  const { controllerState } = props;

  return (
    <div className="tc">
      <Header appName="Deezer-music-browser" />
      <Search
        placeholderLabel="Search songs which you love !"
        onChangeCallback={controllerState.onChangeCallback}
      />
      <SearchResult
        dataToSerialize={controllerState.data}
        isLoading={controllerState.isLoading}
        hasError={controllerState.error}
        isSearchInputEmpty={controllerState.isSearchInputEmpty}
        handleLoadMore={controllerState.handleLoadMoreCallback}
        searchStatus={controllerState.apiCallStatus}
        onSortedCallback={controllerState.sortCallback}
        columnSorted={controllerState.columnSorted}
      />
      <ScrollTopButton />
      <Footer />
    </div>
  );
};

App.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  controllerState: PropTypes.any.isRequired,
};

export default withController(apiUrl)(App);
