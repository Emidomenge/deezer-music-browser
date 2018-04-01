import React from 'react';
import { Grid, Row, Col, Jumbotron, FormGroup, InputGroup, FormControl, Glyphicon, Form, Button } from 'react-bootstrap';
import logo from './../assets/logo.svg';

const Searchbar = ({placeholderLabel}) => {
    var searchInput;
    var searchInput2 = "";

    const onClickTest = () => {
        console.log("[onClickTest] search value is: " + searchInput2.value);
        searchInput.value = searchInput2.value;
    };

    const updateSearchInput = event => {
        searchInput.value = event.target.value;
        searchInput2.value = event.target.value;
        if(searchInput) {
            console.log("[updateSearchInput] value is " + searchInput.value + " and " + searchInput2.value);
        }
    };


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
                                <FormControl
                                    type="text"
                                    value={ searchInput }
                                    inputRef={(ref) => {searchInput = ref}}
                                    onChange={ event => updateSearchInput(event) }
                                    placeholder={placeholderLabel} />
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
                                    <FormControl
                                        type="text"
                                        value={ searchInput2.value }
                                        placeholder={placeholderLabel}
                                        inputRef={(ref) => {searchInput2 = ref}}
                                    />
                                </Col>
                                <Col sm={1}>
                                    <Button onClick={ onClickTest }>Let's go</Button>
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
