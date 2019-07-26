import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "./Search";
import About from "./About";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Search} />
        <Route path="/about/" component={About} />
      </div>
    </Router>
  );
}

export default App;

