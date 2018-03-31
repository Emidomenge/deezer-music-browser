import React from 'react';
import { Grid, Jumbotron, Button } from 'react-bootstrap';

const SearchBar = () => {
    return (
        <Jumbotron>
            <Grid>
                <h1>Welcome to React</h1>
                <p>
                    <Button
                        bsStyle="success"
                        bsSize="large"
                        href="http://react-bootstrap.github.io/components.html"
                        target="_blank">
                        View React Bootstrap Docs
                    </Button>
                </p>
            </Grid>
        </Jumbotron>
    )
};

export default SearchBar;
