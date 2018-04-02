import React from 'react';
import { Grid, Row, Col, Table, Image, Jumbotron, Glyphicon } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

var Spinner = require('react-spinkit');

const SearchResults = ({dataToSerialize, isLoading, hasError, isSearchInputEmpty, handleLoadMore, searchStatus}) => {
    var loadingComponent = "";
    var firstSearch = searchStatus === 10;
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
            <Jumbotron className="searchResultsContainer backgroundContainer">
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
        if(firstSearch) return loadingComponent;
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

    var musicRecords = [];
    dataToSerialize.map((musicRecord) => {
        musicRecords.push(
            <tr key={musicRecord.id}>
                <td>{musicRecord.id}</td>
                <td>
                    <Image
                        src={musicRecord.album.cover_medium}
                        style={{width: 100, height: 100}}
                    />
                </td>
                <td>{musicRecord.title}</td>
                <td>{musicRecord.artist.name}</td>
                <td>{musicRecord.album.title}</td>
                <td>{musicRecord.duration} seconds</td>
            </tr>
        );
        return null;
    });

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
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Artist</th>
                                <th>Album</th>
                                <th>Duration</th>
                            </tr>
                            </thead>
                            <tbody>
                            {musicRecords}
                            </tbody>
                        </Table>
                    </InfiniteScroll>
                </Col>
            </Row>
        </Grid>
    )
};

export default SearchResults;