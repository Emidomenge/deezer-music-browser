import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import logo from './../assets/logo.svg';

const SearchResultsBody = () => {
    return (
        <Grid>
            <Row className="show-grid">
                <Col sm={6} md={4}>
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                        <p className="App-intro">
                            To get started, edit <code>src/App.js</code> and save to reload.
                        </p>
                    </div>
                </Col>
                <Col sm={6} md={4}>
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                        <p className="App-intro">
                            To get started, edit <code>src/App.js</code> and save to reload.
                        </p>
                    </div>
                </Col>
                <Col smHidden xsHidden md={4}>
                    <div>
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                        <p className="App-intro">
                            To get started, edit <code>src/App.js</code> and save to reload.
                        </p>
                    </div>
                </Col>
            </Row>
        </Grid>
    )
};

export default SearchResultsBody;
