import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";
import * as apiHelper from "./api.helper";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        originAirportCode: "",
        destinationAirportCode: "",
        roundTripChecked: false,
      }],
      showResults: false,
      totalDistance: '',
      totalCarbon: ''
    };
    this.getAirportOptions = debounce(this.getAirportOptions.bind(this), 400);
    this.selectOrigin = this.selectOrigin.bind(this);
    this.selectDestination = this.selectDestination.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
    this.getResults = this.getResults.bind(this);
    this.handleAddTrip = this.handleAddTrip.bind(this);
    this.handleRemoveTrip = this.handleRemoveTrip.bind(this);
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
    this.setState({ originAirportCode: selected.value });
  }

  selectDestination(selected) {
    this.setState({ destinationAirportCode: selected.value });
  }

  changeChecked() {
    this.setState({ roundTripChecked: !this.state.roundTripChecked });
  }

  handleAddTrip = idx => e => {
    this.setState({
      trips: this.state.data.concat([{
        originAirportCode: "",
        destinationAirportCode: "",
        roundTripChecked: false,
      }])
    });
  };

  handleRemoveTrip = idx => e => {
    this.setState({
      trips: this.state.data.filter((s, sidx) => idx !== sidx)
    });
  };
  
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
      <div className="container">
        <h1 className="">
          Calculate and Offset your Emissions!
        </h1>
        {this.state.data.map((data, idx) => (
        <div className="row" key={"oneTrip"+idx}>
          <AsyncSelect
            getOptionLabel={this.getOptionLabel}
            loadOptions={input => this.getAirportOptions(input, "origin")}
            className="col"
            placeholder="From"
            onChange={this.selectOrigin}
          />
          <AsyncSelect
            getOptionLabel={this.getOptionLabel}
            loadOptions={input => this.getAirportOptions(input, "destination")}
            className="col"
            placeholder="To"
            onChange={this.selectDestination}
          />
          <div className="custom-control custom-checkbox col">
            <input
              type="checkbox"
              onChange={this.changeChecked}
              checked={this.state.roundTripChecked}
              className="custom-control-input"
              id="roundTripCheck"
            />
            <label className="custom-control-label" htmlFor="roundTripCheck">
              Round-trip
            </label>
          </div>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleRemoveTrip(idx)}>
            -
          </button>
          <button type="button" className="btn btn-outline-secondary btn-sm" onClick={this.handleAddTrip(idx)}>
            +
          </button>
        </div>
        ))}
        <button type="button" onClick={this.getResults} className="btn btn-primary my-5">
          See my carbon footprint!
        </button>
        <div>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}

export default Search;