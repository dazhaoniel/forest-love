import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as apiHelper from './api.helper';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originCity: '',
      destinationCity: '',
      originCityList: []
    };
    this.updateOrigin = this.updateOrigin.bind(this);
    this.updateDestination = this.updateDestination.bind(this);
    this.searchCities = this.searchCities.bind(this);

  }
  componentDidMount () {

  }

  updateOrigin (e) {
    this.setState({originCity: e.target.value});
  }

  updateDestination (e) {
    this.setState({destinationCity: e.target.value});
  }

  searchCities(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
      const inputName = e.target.name;
      if (inputName === "originInput") {
        apiHelper.getAirports(this.state.originCity)
        .then(airports => {
          this.setState({
            originCity: '',
            originCityList: airports
          });
        });
      }
    }
  }

  renderOriginCities() {
    if (this.state.originCityList.length > 0) {
      return this.state.originCityList.map(city => {
        return <li className="airportList">Airport code {city.iata} in {city.name}, {city.country}</li>
      });
    }
  }

  render() {
    return (
      <div className="">
        <input className="airportInputs" onKeyUp={this.searchCities} name="originInput" onChange={this.updateOrigin} type="text" value={this.state.originCity} placeholder="Origin city name or airport code"/> <br/>
        {this.renderOriginCities()}
        <input className="airportInputs" onChange={this.updateDestination} name="destinationInput" type="text" value={this.state.destinationCity} placeholder="Destination city name or airport code"/><br/>
        <p>Round trip flight?</p>
        <input type="checkbox"/>
      </div>
    );
  }
}

export default App;
