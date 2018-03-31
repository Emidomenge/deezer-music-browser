import React from 'react';
import './App.css';
import NavBar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import SearchBar from "./searchbar/Searchbar";
import searchResultsBody from "./searchResultsBody/SearchResultsBody"
import {Grid, Row, Col, Table, Image} from 'react-bootstrap';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

const App = ({ data, isLoading, error }) => {
    const musicRecordsResults = data || [];

    if (error) {
        return <p>{error.message}</p>;
    }

    if (isLoading) {
        return <p>Loading ...</p>;
    }

    return (
        <div className="App">
            <NavBar appName={"Deezer-music-browser"}/>
            <SearchBar placeholderLabel={"Search songs which you love !"}/>
            <Grid>
                <Row>
                    <Col md={12} className="searchResultsContainer">
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
                            {musicRecordsResults.map(musicRecord =>
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
            <Footer/>
        </div>
    );
};

export default searchResultsBody(API + DEFAULT_QUERY)(App);
