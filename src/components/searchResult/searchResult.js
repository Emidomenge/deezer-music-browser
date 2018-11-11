import {
  Col, Glyphicon, Grid, Image, Jumbotron, Row,
} from 'react-bootstrap';
import Fade from 'react-reveal/Fade';
import InfiniteScroll from 'react-infinite-scroller';
import Zoom from 'react-reveal/Zoom';
import ReactTable from 'react-table';
import React from 'react';
import Spinner from 'react-spinkit';
import './searchResult.css';

const SearchResult = (props) => {
  const {
    dataToSerialize, isLoading, hasError, isSearchInputEmpty, handleLoadMore, searchStatus, onSortedCallback, columnSorted,
  } = props;
  let loadingComponent = <span key="voidLoadingComponent" />;
  let smallLoadingComponent = <span key="voidSmallLoadingComponent" />;
  const firstSearch = searchStatus === 10;
  const hardReload = searchStatus === 55;
  if (hasError) {
    const getError = function () {
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

  const columns = [
    {
      Header: '#',
      accessor: 'id',
      Cell: props => (
        <Fade bottom>
          <div>{props.value}</div>
        </Fade>
      ),
    }, {
      Header: 'Image',
      accessor: 'album.cover_medium',
      Cell: props => (
        <Fade>
          <Image
            src={props.value}
            style={{ width: 100, height: 100 }}
          />
        </Fade>
      ),
      sortable: false,
    }, {
      Header: 'Title',
      accessor: 'title',
      Cell: props => (
        <Fade bottom>
          <div>{props.value}</div>
        </Fade>
      ),
    }, {
      Header: 'Album',
      accessor: 'album.title',
      Cell: props => (
        <Fade bottom>
          <div>{props.value}</div>
        </Fade>
      ),
    }, {
      Header: 'Artist',
      accessor: 'artist.name',
      Cell: props => (
        <Fade bottom>
          <div>{props.value}</div>
        </Fade>
      ),
    }, {
      Header: 'Duration',
      accessor: 'duration',
      Cell: props => (
        <Fade bottom>
          <div>
            {props.value}
            {' '}
seconds
          </div>
        </Fade>
      ),
    }];

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
                columns={columns}
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

export default SearchResult;