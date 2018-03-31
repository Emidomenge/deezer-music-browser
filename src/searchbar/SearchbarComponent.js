import React from 'react';
import { Grid, Row, Col, Jumbotron, FormGroup, InputGroup, FormControl, Glyphicon, Form, Button } from 'react-bootstrap';
import logo from './../assets/logo.svg';

const Searchbar = ({placeholderLabel}) => {
    return (
        <Jumbotron>
            <Grid>
                {/*Search input - Sample 1*/}
                <Row className="show-grid">
                    <Col md={12}>
                        <div>
                            <img src={logo} className="App-logo" alt="logo" />
                            <h1 className="App-title">Welcome</h1>
                            <p className="App-intro">
                                This app is running with Deezer API engine.
                            </p>
                        </div>
                    </Col>
                    <Col md={12} className="searchbarInput">
                        <FormGroup>
                            <InputGroup>
                                <FormControl type="text" placeholder={placeholderLabel} />
                                <InputGroup.Addon>
                                    <Glyphicon glyph="music" />
                                </InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                </Row>
                {/*Search input - Sample 2*/}
                <Row className="show-grid">
                    <Col md={12} className="searchbarInput">
                        <Form horizontal>
                            <FormGroup>
                                <Col sm={11}>
                                    <FormControl type="email" placeholder={placeholderLabel} />
                                </Col>
                                <Col sm={1}>
                                    <Button type="submit">Let's go</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Grid>
        </Jumbotron>
    )
};

export default Searchbar;
