import React from 'react';
import { Grid, Row, Col, Table, Image, Jumbotron, Glyphicon } from 'react-bootstrap';
var Spinner = require('react-spinkit');

const SearchResults = ({dataToSerialize, isLoading, hasError}) => {
    if (hasError) {
        return (
            <Jumbotron className="searchResultsContainer backgroundContainer">
                <Grid>
                    <Row>
                        <Col md={12}>
                            <Glyphicon glyph="glyphicon glyphicon-remove-circle" bsSize="large"/>
                            <h4 className="backgroundMessage">Ouch, something went wrong:</h4>
                            <p className="errorMessage">"{ hasError.message }"</p>
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

    if (dataToSerialize.length === 0) {
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

    return (
        <Grid className="searchResultsContainer">
            <Row>
                <Col md={12}>
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
                        {dataToSerialize.map(musicRecord =>
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
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Grid>
    )
};

export default SearchResults;