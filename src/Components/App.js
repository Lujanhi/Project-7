



//Import the React module from the react package
import React, { Component } from 'react';
//load our component Router 
import Router from './Router';

import '../index.css';  //The app.js component - connects react with the index.html

//App - base component displayed in the index.js 
class App extends Component {
  render (){
    return (
      <div className="container">
          <Router />
      </div>
    );
  }
}

//"export default class App" does this; comment it out
export default App;