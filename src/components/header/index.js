import { Grid, Navbar } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from 'react';
import { Element } from 'react-scroll';


const Header = (props) => {
  const { appName } = props;
  return (

    <Element name="header">
      <Navbar inverse fixedTop>
        <Grid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">{appName}</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
        </Grid>
      </Navbar>
    </Element>
  );
};

Header.propTypes = {
  appName: PropTypes.string.isRequired,
};

export default Header;
