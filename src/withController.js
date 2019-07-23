/* eslint-disable max-len */
import React, { Component } from 'react';
import Lodash from 'lodash';
import fetchJsonp from 'fetch-jsonp';

/*
 *  This controller :
 *      - Fetches data after receiving response from Deezer API query
 *
 *  NOTE:
 *      apiCallStatus glossary:
 *          0   = 'No search to process'
 *          10  = 'First search processing'
 *          50  = 'Search processing + more results to display (ie: infinite loop is ON)'
 *          55  = 'Search processing with hard reload"
 *          100 = 'Search finished (ie: infinite loop is OFF)
 */

const WAIT_INTERVAL = 1000;
const DEEZER_API_INDEX_INTERVAL = 25;

// IE9 compatibility:
if (!window.console) window.console = {};
if (!window.console.log) window.console.log = function () {};

const WithController = url => WrappedComponent => class SearchResultsBody extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      error: null,
      searchInputValue: '',
      onChangeCallback: this.onSearchInputChange.bind(this),
      isSearchInputEmpty: true,
      nbTotalFoundResults: null,
      nextQueryUrl: '',
      currentComputedSearchInput: '',
      handleLoadMoreCallback: this.handleLoadMore.bind(this),
      nbApiCall: 0,
      apiCallStatus: 0,
      sortCallback: this.handleSort.bind(this),
      urlSortOption: '',
      columnSorted: [],
    };

    this.triggerChangeCallback = Lodash.debounce((event) => {
      this.setState({
        searchInputValue: event.target.value,
      });
      this.componentDidMount();
    }, WAIT_INTERVAL);
  }


  componentDidMount() {
    let newSearch = false;
    const {
      currentComputedSearchInput, searchInputValue, error, apiCallStatus, nbTotalFoundResults,
      nbApiCall, urlSortOption, nextQueryUrl, data,
    } = this.state;


    // Check if this is a new search or not
    if (currentComputedSearchInput !== searchInputValue || error) {
      this.setState({
        data: [],
        nbTotalFoundResults: null,
        currentComputedSearchInput: '',
        nextQueryUrl: '',
        nbApiCall: 0,
        apiCallStatus: 10,
        urlSortOption: '',
        columnSorted: [],
      });
      newSearch = true;
      console.log('[Info] New search detected.');
    }

    if (searchInputValue === '') {
      this.setState({
        isSearchInputEmpty: true,
      });
    } else if (apiCallStatus === 100 && !newSearch) {
      // Do nothing...
      return null;
    } else {
      const refreshState = {
        isLoading: true,
        error: null,
        isSearchInputEmpty: false,
      };

      // Check if no more results to display (= end of "infinite" loop)
      if (nbTotalFoundResults < DEEZER_API_INDEX_INTERVAL * nbApiCall) {
        refreshState.apiCallStatus = 100;
        this.setState(refreshState);

        // And stop...
        return null;
      }
      if (!newSearch && apiCallStatus === 10) {
        refreshState.apiCallStatus = 50; // called only when triggering infinite scroll first time
      }

      this.setState(refreshState);

      const url = 'https://api.deezer.com/search/?q=';

      const urlFirstSearch = `${url + searchInputValue + urlSortOption}&output=jsonp`;
      const urlContinueSearch = `${nextQueryUrl + urlSortOption}&output=jsonp`;

      console.log(`[componentDidMount] Option: '${urlSortOption}' with status: ${apiCallStatus}`);

      fetchJsonp(newSearch ? urlFirstSearch : urlContinueSearch)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong ...');
        })
        .then((results) => {
          if (results.error) {
            this.setState({ error: results.error, isLoading: false });
          } else {
            // const deezerApiResults = JSON.parse(results.body);
            const deezerApiResults = results;
            const mergedArray = (data).concat(deezerApiResults.data);
            const uniqueArray = this.extractUniqueArrayFrom(mergedArray);
            const nbDuplicate = mergedArray.length - uniqueArray.length;

            if (nbDuplicate !== 0) {
              console.log(`[Info] There was ${nbDuplicate} duplicate(s) detected record.`);
            }

            console.log(`[Info] Current amount of displayed records found ${uniqueArray.length}.`);
            console.log('------------------');

            const computedNbApiCall = nbApiCall + 1;
            let currentStatus = computedNbApiCall === 1 ? 10 : 50; // 10 = firstCall status | 50 = 'more results to display' status
            currentStatus = currentStatus === 55 ? 50 : currentStatus; // put back to status 50 after hard reload done

            this.setState({
              data: uniqueArray,
              nbTotalFoundResults: deezerApiResults.total,
              nextQueryUrl: deezerApiResults.next,
              currentComputedSearchInput: searchInputValue,
              isLoading: false,
              nbApiCall: computedNbApiCall,
              apiCallStatus: currentStatus,
            });
          }
        })
        .catch((err) => {
          this.setState({ err, isLoading: false });
        });
    }
    return null;
  }

  onSearchInputChange(event) {
    event.persist();
    this.triggerChangeCallback(event);
  }

  handleLoadMore(/* page */) {
    const { isLoading } = this.state;
    if (!isLoading) this.componentDidMount();
  }

  // eslint-disable-next-line class-methods-use-this
  extractUniqueArrayFrom(arr) {
    const cleaned = [];
    arr.forEach((itm) => {
      let unique = true;
      cleaned.forEach((itm2) => {
        if (Lodash.isEqual(itm.id, itm2.id)) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  }

  handleSort(columnSorted) {
    let columnKey = '';
    const sortKey = columnSorted[0].desc ? '_DESC' : '_ASC';
    const { searchInputValue, isLoading } = this.state;

    switch (columnSorted[0].id) {
      case 'title':
        columnKey = 'TRACK';
        break;
      case 'artist.name':
        columnKey = 'ARTIST';
        break;
      case 'album.title':
        columnKey = 'ALBUM';
        break;
      case 'duration':
        columnKey = 'DURATION';
        break;
      default:
        console.log('[handleSort] no column key matched');
        return;
    }
    this.setState({
      data: [],
      nbTotalFoundResults: null,
      nextQueryUrl: url + searchInputValue,
      nbApiCall: 0,
      apiCallStatus: 55, // force hard reload
      urlSortOption: `&order=${columnKey}${sortKey}`,
      columnSorted,
    }, function () {
      if (!isLoading) this.componentDidMount();
    });
  }


  render() {
    const controllerState = { ...this.state };
    return <WrappedComponent controllerState={controllerState} />;
  }
};

export default WithController;
