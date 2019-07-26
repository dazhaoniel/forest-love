import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "./Search";
import About from "./About";
import logo from './assets/images/logo.png';

function App() {
  return (
    <Router>
      <div class="container">
        <nav class="navbar navbar-expand-lg bg-white sticky-top">
          <Link to="/" class="navbar-brand">
            <img src={logo} height="70" alt="Forest Love"/>
          </Link>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <Link to="/about/" class="nav-link">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Route path="/" exact component={Search} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
}

export default App;

