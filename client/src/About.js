import React from "react";

function About() {
  return (
  	<div className="container-fluid">
      <div className="row snow-mountain">
        <div className="col-md-6 p-lg-5 mx-auto my-5">
          <h1><span className="display-3 bg-white">Travel inspires us,</span></h1>
          <h1><span className="bg-white">but we are also aware of what this means for our planet.</span></h1>
          <h2><span className="bg-white">JFK > PEK</span></h2>
          <h2><span className="bg-white">2923 kg</span></h2>
        </div>
        <div className="col">
        </div>
      </div>
      <div className="container">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h4>Why is carbon offsetting important?</h4>
          <h4>It balances out the carbon we created through</h4>
          <p>reforestation</p>
          <p>sequestration</p>
          <p>investing in renewable energy</p>
          <h4>Travel Better.</h4>
          <h2>Forest Love</h2>
          <h4>Our mission is simple.</h4>
        </div>
        <div>
          <h4>Projects We Support</h4>
        </div>
      </div>
    </div>
  );
}

export default About;