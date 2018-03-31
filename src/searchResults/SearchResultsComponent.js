import React from 'react';
import { Grid, Row, Col, Table, Image } from 'react-bootstrap';

const SearchResults = ({dataToSerialize}) => {
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