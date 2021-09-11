import React from "react";
import { Link } from "react-router-dom";
function Homepage() {
  return (
    <div>
      <h1>Homepage</h1>
      <ul>
        <li>
          <Link to="/login">login</Link>
        </li>
        <li>
          <Link to="/signup">Sign-up</Link>
        </li>
        <li>
          <Link to="/sim">Simulation</Link>
        </li>
      </ul>
    </div>
  );
}

export default Homepage;
