

# Deezer-music-browser
This is a simple single-page app (SPA) build with [React](https://reactjs.org/). <br> This SPA allows you to browse music informations thanks to the [Deezer API](https://developers.deezer.com/api).

Project created by [Emilien Domenge-Heritier](http://www.domenge.fr/)


## Main features of this SPA

 - [DONE] - Ability to search a song
  - [DONE] - Ability to display song informations into a grid layout
  - [DOING] - Ability to sort informations using columns header
  - [DONE] - Ability to display dynamically more results when user scrolls down the web page ("Infinite scroll")
  - [DONE] - Ability to filter dynamically results when user types on the search bar
  - [TODO] - Cover features with unit tests

## Things to improve

  - Fill remaining vertical space on screen with `ResultsContainer` (for all support browser)
  - Put a scroll back to top button
  - Put a smooth fadein animation when reading results
  - Put a counter which displays total found results  + an another for currently displayed results
  - Improve UX of grid result layout for mobile screen resolution.
  - Ability to select kind of informations you want and put each type of information into one column


## Available Scripts

**Prerequisite:**
 - Make use you have React:  `npm install -g create-react-app`
 - Install node package dependencies: `npm install`

Then, in the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `npm test`

Launches the test runner in the interactive watch mode.


## Framework/Librairies Used

 - React Bootstrap
 - React-spinkit
 - Lodash
 - React Infinite Scroller

## Supported Browsers

 - Chrome
 - Firefox
 - Safari
 - Internet Explorer (IE9)