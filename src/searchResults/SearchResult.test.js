import React from 'react';
import withSearchResultsController from "./SearchResultsController"

var API_TEST = 'https://api.deezer.com/search/track?q=';


/*
 * TO DO LIST:
 *    - Read doc: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests
 *    - Mock Input/Output of withSearchResultsController
 *    - Check when user write something on searchbar -> trigger an url to fetch which contains user input + fits Deezer API template
 *    - Check 'apiCallStatus' values when there is no search, when triggering infinite scroll...
 *    - Check url to fetch when simulating a click on a column header
 *    - Check if we succeed to receive a correct json from a hardcoded url
 */


const AppTest = () => {
  return (
      <div></div>
  );
};

it('should do something', () => {
  var test = withSearchResultsController(API_TEST)(AppTest);
});

