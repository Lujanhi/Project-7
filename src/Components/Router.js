import React from "react";

//import necessary Components from react-router-dom module

import { BrowserRouter as MainRouter, Route, Switch, NavLink } from "react-router-dom";


import SearchForm from './SearchForm';
import Gallery from './Gallery';
import Home from './Home';
import Error from './Error';
//import Components to Router.js component
function Router() {
  return (
    <MainRouter>

      <SearchForm />
      <div>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/gallery/Cars" style={{ color: 'white', textDecoration: 'none' }} activeStyle={{ color: 'yellow', backgroundColor: 'red' }} >Cars</NavLink>
            </li>
            <li>
              <NavLink to="/gallery/Motorcycle">Motorcycle</NavLink>
            </li>
            <li>
              <NavLink to="/gallery/Trucks">Trucks</NavLink>
            </li>
            <li>
              <NavLink to="gallery/" style={{ color: 'white', textDecoration: 'none' }} activeStyle={{ color: 'yellow', backgroundColor: 'red' }}>Home</NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/*three Switch routes:
        1) home page
        2) gallery page
               (accessible from search and nav links - or direct address bar manip)
        3) Error page - default route when the above two are not reached (404)
                  https://www.youtube.com/watch?v=PHMzwisL_Ss
    */}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/gallery/:type" component={Gallery} />
        <Route component={Error} />
      </Switch>
    </MainRouter>
  );
}

export default Router;

