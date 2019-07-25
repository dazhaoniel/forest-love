import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as apiHelper from "./api.helper";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originAirportCode: "",
      destinationAirportCode: "",
      roundTripChecked: false,
      showResults: false,
      totalDistance: '',
      totalCarbon: ''
    };
    this.getAirportOptions = debounce(this.getAirportOptions.bind(this), 400);
    this.selectOrigin = this.selectOrigin.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  componentDidMount() {}

  getAirportOptions(input, originOrDestination) {
    if (!input) return;
    return apiHelper.getAirports(input).then(airports => {
      return airports.map(airport => {
        const airportObj = {
          value: airport.iata,
          label: `${airport.iata} ${airport.name}`
        };
        return airportObj;
      });
    });
  }

  selectOrigin(selected) {
    console.log("selected", selected);
    this.setState({ originAirportCode: selected.value });
  }

  selectDestination(selected) {
    this.setState({ destinationAirportCode: selected.value });
  }

  changeChecked() {
    this.setState({ roundTripChecked: !this.state.roundTripChecked });
  }
  
  getResults() {
    const {originAirportCode, destinationAirportCode, roundTripChecked} = this.state;
    return apiHelper.getResults(originAirportCode, destinationAirportCode, roundTripChecked).then(result => {
      this.setState({
        totalCarbon: Math.round(result.totalCarbon),
        totalDistance: Math.round(result.totalDistance),
        showResults: true
      });
    })
  }

  renderResults() {
    if (this.state.showResults)
    return (
      <div className="totals">
        <div>You traveled a total distance of <strong>{this.state.totalDistance}</strong>km and emitted <strong>{this.state.totalCarbon}</strong>kg of carbon!
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="forest-love-main">
        <div className="searchContainer">
          <AsyncSelect
            getOptionLabel={this.getOptionLabel}
            loadOptions={input => this.getAirportOptions(input, "origin")}
            className="search-column"
            placeholder="Search for origin city"
            onChange={this.selectOrigin}
          />
          <AsyncSelect
            getOptionLabel={this.getOptionLabel}
            loadOptions={input => this.getAirportOptions(input, "destination")}
            className="search-column"
            placeholder="Search for destination city"
            onChange={this.selectDestination}
          />
          <div className="custom-control custom-checkbox search-column">
            <input
              type="checkbox"
              onChange={this.changeChecked}
              checked={this.state.roundTripChecked}
              className="custom-control-input"
              id="roundTripCheck"
            />
            <label className="custom-control-label" htmlFor="roundTripCheck">
              Round Trip?
            </label>
          </div>
        </div>
        <button type="button" onClick={this.getResults} className="searchButton btn btn-success">
          See my carbon footprint!
        </button>
        {this.renderResults()}
      </div>
    );
  }
}

export default App;
