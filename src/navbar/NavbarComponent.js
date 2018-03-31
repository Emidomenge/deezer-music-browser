import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Navbar } from 'react-bootstrap';

const NavBar = ({appName}) => {
    return (
        <Navbar inverse fixedTop>
            <Grid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">{appName}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
            </Grid>
        </Navbar>
    )
};

NavBar.propTypes = {
    appName: PropTypes.string.isRequired
};

export default NavBar;
