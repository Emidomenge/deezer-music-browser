import {
  Col, Glyphicon, Grid, Row,
} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import InfiniteScroll from 'react-infinite-scroller';
import Zoom from 'react-reveal/Zoom';
import ReactTable from 'react-table';
import React from 'react';
import Spinner from 'react-spinkit';
import './searchResult.css';
import PropTypes from 'prop-types';
import BlockInfo from './components/blockInfo';
import XsLoading from './components/xsLoading';
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
      <BlockInfo>
        <Glyphicon glyph="glyphicon glyphicon-remove-circle" bsSize="large" />
        <h4 className="backgroundMessage">Ouch, something went wrong:</h4>
        <p className="errorMessage">{ getError() }</p>
      </BlockInfo>
    );
  }

  if (isLoading) {
    loadingComponent = (
      <Fade>
        <BlockInfo
          keyName="basicLoadingComponent"
        >
          <Spinner name="folding-cube" fadeIn="quarter" color="white" />
          <h4 className="backgroundMessage">Loading...</h4>
        </BlockInfo>
      </Fade>
    );
    smallLoadingComponent = <XsLoading />;
    if (firstSearch || hardReload) return loadingComponent;
  } else if (dataToSerialize.length === 0 && !isSearchInputEmpty) {
    return (
      <BlockInfo>
        <Glyphicon glyph="glyphicon glyphicon-question-sign" bsSize="large" />
        <h4 className="backgroundMessage">No results found</h4>
        <p className="infoMessage">Sorry, your search did not match anything.</p>
      </BlockInfo>
    );
  } else if (isSearchInputEmpty) {
    return (
      <BlockInfo />
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
