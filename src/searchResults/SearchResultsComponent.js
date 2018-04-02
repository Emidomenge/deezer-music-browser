import React from 'react';
import { Grid, Row, Col, Table, Image, Jumbotron, Glyphicon } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

var Spinner = require('react-spinkit');

const SearchResults = ({dataToSerialize, isLoading, hasError, isSearchInputEmpty, handleLoadMore}) => {
    if (hasError) {
        return (
            <Jumbotron className="searchResultsContainer backgroundContainer">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Glyphicon glyph="glyphicon glyphicon-remove-circle" bsSize="large"/>
                            <h4 className="backgroundMessage">Ouch, something went wrong:</h4>
                            <p className="errorMessage">"{ hasError.type }: { hasError.message } (Error code: { hasError.code })"</p>
                        </Col>
                    </Row>
                </Grid>
            </Jumbotron>
        )
    }

    if (isLoading) {
        return (
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
        )
    }

    if (dataToSerialize.length === 0 && !isSearchInputEmpty) {
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

    if(isSearchInputEmpty) {
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
                        loader={<div className="loader" key={0}>Loading ...</div>}
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