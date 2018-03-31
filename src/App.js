import React, { Component } from 'react';
import './App.css';
import NavBar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import SearchBar from "./searchbar/Searchbar";
import SearchResultsBody from "./searchResultsBody/SearchResultsBody"

class App extends Component {
  render() {
    return (
      <div className="App">
          <NavBar appName={"Deezer-music-browser"}/>
          <SearchBar/>
          <SearchResultsBody/>
          <Footer/>
      </div>
    );
  }
}

export default App;
