

# Deezer-music-browser

![App_Cover](https://image.ibb.co/bDmWx7/Screen_Shot_2018_04_02_at_8_00_05_PM.png)

This is a simple single-page app (SPA) build with [React](https://reactjs.org/). <br> This SPA allows you to browse music informations thanks to the [Deezer API](https://developers.deezer.com/api).

Project created by [Emilien Domenge-Heritier](http://www.domenge.fr/)


## Main features of this SPA

 - [DONE] - Ability to search a song
  - [DONE] - Ability to display song informations into a grid layout
  - [DONE] - Ability to sort informations using columns header
  - [DONE] - Ability to display dynamically more results when user scrolls down the web page ("Infinite scroll")
  - [DONE] - Ability to filter dynamically results when user types on the search bar
  - [DOING] - Cover features with unit tests

## Things to improve

 - Fill remaining vertical space on screen with `ResultsContainer` (for all support browser)
 - Put a scroll back to top button
 - Put a smooth fadein animation when reading results
 - Put a counter which displays total found results  + an another for currently displayed results
 - Improve UX of grid result layout for mobile screen resolution.
 - Ability to select kind of informations you want and put each type of information into one column
 - Improve loading animation on IE9
 - Fix CSS Flexbox issue on IE9
	 - Some informations which I should check more in details later:
		 - [Case using react table working on IE](https://github.com/react-tools/react-table/issues/304)
		 - [Flexibility](https://github.com/jonathantneal/flexibility) + [PostCSS](https://github.com/postcss/postcss-js)
		 - [Mordernizr](https://github.com/modernizr/modernizr)



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

 - [React Bootstrap](https://react-bootstrap.github.io/)
 - [React-spinkit](https://github.com/KyleAMathews/react-spinkit)
 - [Lodash](https://lodash.com/)
 - [React Infinite Scroller](https://github.com/CassetteRocks/react-infinite-scroller)
 - [React-table](https://react-table.js.org/#/story/readme)
 - [React-reveal](https://github.com/rnosov/react-reveal)

## Supported Browsers

 - Chrome
 - Firefox
 - Safari
 - Internet Explorer (IE10++)
 - Internet Explorer (IE9) until commit `19a10c9525c8c58bf055d31ca7b2bb0c7610f5d7`