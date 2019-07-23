import { Col, Grid, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import React from 'react';

const XsLoading = () => (
  <Grid key="smallLoadingComponent">
    <Row>
      <Col md={12}>
        <div className="pv3">
          <Spinner name="ball-beat" />
          <h4 className="pv4 backgroundMessage">Loading more results...</h4>
          <Spinner name="ball-beat" />
        </div>
      </Col>
    </Row>
  </Grid>
);

export default XsLoading;
