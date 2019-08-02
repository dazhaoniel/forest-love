import React from "react";
import Projects from "./Projects";

function About() {
  return (
  	<div className="container-fluid">
      <div className="row snow-mountain">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1><span className="display-3 bg-white p-2 shadow">Travel inspires us,</span></h1>
          <h1><span className="bg-white p-2 shadow-lg">but we are also aware of what this means for our planet.</span></h1>
          <h2><span className="bg-white p-2 shadow">JFK > PEK</span></h2>
          <h2><span className="bg-white p-2 shadow">2923 kg</span></h2>
        </div>
        <div className="col">
        </div>
      </div>
      <div className="container">
        <div className="col-md-8 p-lg-5 mx-auto my-5">
          <h4>Why is carbon offsetting important?</h4>
          <h4>It balances out the carbon we created through</h4>
          <ul>
            <li>reforestation</li>
            <li>sequestration</li>
            <li>investing in renewable energy</li>
          </ul>
          <h4>Travel Better.</h4>
          {/*<h2>Forest Love</h2>*/}
          <h4>Our mission is simple.</h4>
        </div>
        <div>
          <h4>Projects We Support</h4>
          <Projects />
        </div>
      </div>
    </div>
  );
}

export default About;