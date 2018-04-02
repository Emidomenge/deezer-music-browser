import React from 'react';
import { Grid, Row, Col, Image, Jumbotron, Glyphicon } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';
import ReactTable from 'react-table'
var Spinner = require('react-spinkit');

const SearchResults = ({dataToSerialize, isLoading, hasError, isSearchInputEmpty, handleLoadMore, searchStatus, onSortedCallback, columnSorted }) => {
    var loadingComponent = <span key={"voidLoadingComponent"}></span>;
    var firstSearch = searchStatus === 10;
    var hardReload = searchStatus === 55;
    if (hasError) {
        var getError = function() {
            var errorMsg = "";
            errorMsg = hasError.type ? hasError.type + ": " + errorMsg : errorMsg;
            errorMsg = hasError.message ? errorMsg + hasError.message : errorMsg;
            errorMsg = hasError.code ? errorMsg + " (Error code: " + hasError.code + ")" : errorMsg;
            return '"' + errorMsg + '"';
        };
        return (
            <Jumbotron className="searchResultsContainer backgroundContainer">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Glyphicon glyph="glyphicon glyphicon-remove-circle" bsSize="large"/>
                            <h4 className="backgroundMessage">Ouch, something went wrong:</h4>
                            <p className="errorMessage">{ getError() }</p>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        )
    }

    if (isLoading) {
        loadingComponent = (
            <Jumbotron key={"basicLoadingComponent"} className="searchResultsContainer backgroundContainer">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Spinner name="folding-cube" fadeIn="quarter" color="white"/>
                            <h4 className="backgroundMessage">Loading...</h4>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        );
        if(firstSearch || hardReload) return loadingComponent;
    }
    else if (dataToSerialize.length === 0 && !isSearchInputEmpty) {
        return (
            <Jumbotron className="searchResultsContainer backgroundContainer">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Glyphicon glyph="glyphicon glyphicon-question-sign" bsSize="large"/>
                            <h4 className="backgroundMessage">No results found</h4>
                            <p className="infoMessage">Sorry, your search did not match anything.</p>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        )
    }
    else if(isSearchInputEmpty) {
        return (
            <Jumbotron className="searchResultsContainer backgroundContainer emptyBackground">
                <Grid>
                    <Row>
                        <Col md={12}>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        )
    }

    const columns = [{
        Header: '#',
        accessor: 'id'
    }, {
        Header: 'Image',
        accessor: 'album.cover_medium',
        Cell: props => (
            <Image
                src={props.value}
                style={{width: 100, height: 100}}
            />
        ),
        sortable: false
    }, {
        Header: 'Title',
        accessor: 'title',
    }, {
        Header: 'Album',
        accessor: 'album.title',
    }, {
        Header: 'Artist',
        accessor: 'artist.name'
    }, {
        Header: 'Duration',
        accessor: 'duration',
        Cell: props => <span>{props.value} seconds</span>
    }];

    return (
        <Grid className="searchResultsContainer">
            <Row>
                <Col md={12}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={handleLoadMore}
                        hasMore={true}
                        loader={loadingComponent}
                    >
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
                    </InfiniteScroll>
                </Col>
            </Row>
        </Grid>
    )
};

export default SearchResults;