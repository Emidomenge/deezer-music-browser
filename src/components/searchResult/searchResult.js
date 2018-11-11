import {
  Col, Glyphicon, Grid, Jumbotron, Row,
} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import InfiniteScroll from 'react-infinite-scroller';
import Zoom from 'react-reveal/Zoom';
import ReactTable from 'react-table';
import React from 'react';
import Spinner from 'react-spinkit';
import './searchResult.css';
import PropTypes from 'prop-types';
import columsSettings from './columnsSettings';

const SearchResult = (props) => {
  const {
    dataToSerialize,
    isLoading,
    hasError,
    isSearchInputEmpty,
    handleLoadMore,
    searchStatus,
    onSortedCallback,
    columnSorted,
  } = props;

  let loadingComponent = <span key="voidLoadingComponent" />;
  let smallLoadingComponent = <span key="voidSmallLoadingComponent" />;
  const firstSearch = searchStatus === 10;
  const hardReload = searchStatus === 55;

  if (hasError) {
    const getError = () => {
      let errorMsg = '';
      errorMsg = hasError.type ? `${hasError.type}: ${errorMsg}` : errorMsg;
      errorMsg = hasError.message ? errorMsg + hasError.message : errorMsg;
      errorMsg = hasError.code ? `${errorMsg} (Error code: ${hasError.code})` : errorMsg;
      return `"${errorMsg}"`;
    };
    return (
      <Jumbotron className="searchResultsContainer backgroundContainer">
        <Grid>
          <Row>
            <Col md={12}>
              <Glyphicon glyph="glyphicon glyphicon-remove-circle" bsSize="large" />
              <h4 className="backgroundMessage">Ouch, something went wrong:</h4>
              <p className="errorMessage">{ getError() }</p>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  }

  if (isLoading) {
    loadingComponent = (
      <Fade>
        <Jumbotron key="basicLoadingComponent" className="searchResultsContainer backgroundContainer">
          <Grid>
            <Row>
              <Col md={12}>
                <Spinner name="folding-cube" fadeIn="quarter" color="white" />
                <h4 className="backgroundMessage">Loading...</h4>
              </Col>
            </Row>
          </Grid>
        </Jumbotron>
      </Fade>
    );
    smallLoadingComponent = (
      <Grid key="smallLoadingComponent">
        <Row>
          <Col md={12}>
            <div className="smallLoading">
              <Spinner name="ball-beat" />
              <h4 className="backgroundMessage">Loading more results...</h4>
              <Spinner name="ball-beat" />
            </div>
          </Col>
        </Row>
      </Grid>
    );
    if (firstSearch || hardReload) return loadingComponent;
  } else if (dataToSerialize.length === 0 && !isSearchInputEmpty) {
    return (
      <Jumbotron className="searchResultsContainer backgroundContainer">
        <Grid>
          <Row>
            <Col md={12}>
              <Glyphicon glyph="glyphicon glyphicon-question-sign" bsSize="large" />
              <h4 className="backgroundMessage">No results found</h4>
              <p className="infoMessage">Sorry, your search did not match anything.</p>
            </Col>
          </Row>
        </Grid>
      </Jumbotron>
    );
  } else if (isSearchInputEmpty) {
    return (
      <Jumbotron className="searchResultsContainer backgroundContainer emptyBackground">
        <Grid>
          <Row>
            <Col md={12} />
          </Row>
        </Grid>
      </Jumbotron>
    );
  }

  return (
    <Grid className="searchResultsContainer">
      <Row>
        <Col md={12}>
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore
            loader={smallLoadingComponent}
          >
            <Zoom>
              <ReactTable
                showPagination={false}
                defaultPageSize={300}
                collapseOnDataChange={false}
                minRows={0}
                data={dataToSerialize}
                columns={columsSettings}
                onSortedChange={onSortedCallback}
                defaultSorted={columnSorted}
              />
            </Zoom>
          </InfiniteScroll>
        </Col>
      </Row>
    </Grid>
  );
};

SearchResult.propTypes = {
  dataToSerialize: PropTypes.arrayOf(PropTypes.any),
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.objectOf(PropTypes.any),
  isSearchInputEmpty: PropTypes.bool.isRequired,
  handleLoadMore: PropTypes.func.isRequired,
  searchStatus: PropTypes.number.isRequired,
  onSortedCallback: PropTypes.func.isRequired,
  columnSorted: PropTypes.arrayOf(PropTypes.any).isRequired,
};

SearchResult.defaultProps = {
  dataToSerialize: [],
  hasError: undefined,
};

export default SearchResult;
