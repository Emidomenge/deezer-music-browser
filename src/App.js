import React, { Component } from 'react';
import { Grid, Navbar, Jumbotron, Button } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar inverse fixedTop>
              <Grid>
                  <Navbar.Header>
                      <Navbar.Brand>
                          <a href="/">React App</a>
                      </Navbar.Brand>
                      <Navbar.Toggle />
                  </Navbar.Header>
              </Grid>
          </Navbar>
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
          <div>
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
              <p className="App-intro">
                  To get started, edit <code>src/App.js</code> and save to reload.
              </p>
          </div>
      </div>
    );
  }
}

export default App;
