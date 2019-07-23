import React from 'react';
import {
  Grid, Row, Col, Jumbotron, FormGroup, InputGroup, FormControl, Glyphicon,
} from 'react-bootstrap';
import Flip from 'react-reveal/Flip';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo.svg';
import styles from './index.css';

const Searchbar = ({ placeholderLabel, onChangeCallback }) => (
  <Jumbotron className={styles.jumbotron}>
    <Grid>
      <Flip top>
        <Row className="show-grid">
          <Col md={12}>
            <div>
              <img src={logo} className={styles.logo} alt="logo" />
              <h1 className="f1-ns f2-m">Welcome</h1>
              <div className="f2-ns f3 mb3">
                {'This app is running with Deezer API engine.'}
              </div>
            </div>
          </Col>
          <Col md={12}>
            <FormGroup className={`mr-auto ml-auto ${styles.searchbarInput}`}>
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
