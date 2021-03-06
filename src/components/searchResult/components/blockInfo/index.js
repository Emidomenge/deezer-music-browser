import {
  Col, Grid, Jumbotron, Row,
} from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

const BlockInfo = (props) => {
  const { children, keyName } = props;
  return (
    <Jumbotron
      className={`searchResultsContainer white ${styles.backgroundContainer}`}
      key={keyName}
    >
      <Grid>
        <Row>
          <Col md={12}>
            {children}
          </Col>
        </Row>
      </Grid>
    </Jumbotron>
  );
};

BlockInfo.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
  keyName: PropTypes.string,
};

BlockInfo.defaultProps = {
  children: undefined,
  keyName: undefined,
};

export default BlockInfo;
