import React from 'react';
import {
  Grid, Row, Col, Jumbotron, FormGroup, InputGroup, FormControl, Glyphicon,
} from 'react-bootstrap';
import Flip from 'react-reveal/Flip';
import PropTypes from 'prop-types';
import logo from '../../assets/logo.svg';
import './search.css';

const Searchbar = ({ placeholderLabel, onChangeCallback }) => (
  <Jumbotron>
    <Grid>
      <Flip top>
        <Row className="show-grid">
          <Col md={12}>
            <div>
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome</h1>
              <p className="App-intro">
                {'This app is running with Deezer API engine.'}
              </p>
            </div>
          </Col>
          <Col md={12} className="searchbarInput">
            <FormGroup>
              <InputGroup>
                <FormControl
                  type="text"
                  onInput={onChangeCallback}
                  placeholder={placeholderLabel}
                />
                <InputGroup.Addon>
                  <Glyphicon glyph="music" />
                </InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
      </Flip>
    </Grid>
  </Jumbotron>
);

Searchbar.propTypes = {
  placeholderLabel: PropTypes.string,
  onChangeCallback: PropTypes.func.isRequired,
};

Searchbar.defaultProps = {
  placeholderLabel: '',
};

export default Searchbar;
