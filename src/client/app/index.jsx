import React from 'react';
import {render} from 'react-dom';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <img src="images/user.jpg" className="demo-avatar" />;
const Aeroplane = () => <img src ="images/plane.png" className="demo-avatar" />

var SimpleMap = React.createClass({
  propTypes: {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  },
  getDefaultProps() {
    return {
      center: {lat: 59.95, lng: 30.33},
      zoom: 11
    };
  },

  loadSourceCoordinates() {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?APPID=2ae6f78942b5df339cd6cfc37221080d&q=' + this.state.source,
      dataType: 'json',
      success: function(incomingData) {

        this.setState({sourceLat: incomingData.coord.lat});
        this.setState({sourceLon: incomingData.coord.lon});
        console.log(this.state.sourceLat + " " + this.state.sourceLon);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadDestCoordinates() {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?APPID=2ae6f78942b5df339cd6cfc37221080d&q=' + this.state.dest,
      dataType: 'json',
      success: function(incomingData) {

        this.setState({destLat: incomingData.coord.lat});
        this.setState({destLon: incomingData.coord.lon});
        console.log(this.state.sourceLat + " casdas" + this.state.sourceLon);
        this.loadSourceCoordinates();

      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadFlightFromServer() {
    $.ajax({
      url: 'http://localhost:8000/api/flights/' + this.props.flightId,
      dataType: 'json',
      success: function(incomingData) {
        this.setState({source: incomingData.source});
        this.setState({dest: incomingData.dest});
        console.log(this.state.dest + this.state.source)
        this.loadDestCoordinates();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState() {
    return {source:[], dest:[], sourceLat:[], sourceLon:[], destLat:[], destLon:[]};
  },
  componentDidMount() {
    this.loadFlightFromServer();

    setInterval(this.loadFlightFromServer, 2000);
  },
  render() {
    return (
      <GoogleMapReact
        key="AIzaSyDnxUEK6mpMmDgMT1zWAAAAKppZmscTKiU"
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <AnyReactComponent
          lat={this.state.sourceLat}
          lng={this.state.sourceLon}
          text={'Kreyser Avrora'}
        />
        <AnyReactComponent
          lat={this.state.destLat}
          lng={this.state.destLon}
          text={'UTCLYUC.;YC/;Y'}
        />
        <Aeroplane
          lat = {this.state.sourceLat/2 + this.state.destLat/2}
          lng = {this.state.sourceLon/2 + this.state.destLon/2}
        />
      </GoogleMapReact>
    );
  }
})

var Maps = React.createClass({
  render() {
    return (
      <main className="mdl-layout__content mdl-color--grey-100">
        <div className="mdl-grid demo-content">
          <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
            <SimpleMap flightId = {this.props.flightId}/>
          </div>
          <div className="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
            <DestinationWeather flightId = {this.props.flightId}/>
            <div className="demo-separator mdl-cell--1-col"></div>
          </div>
        </div>
      </main>
    )
  }
})
var FlightBox = React.createClass({
  getDefaultProps() {
    return {
      flightId : 1
    };
  },
  loadFlightFromServer() {
    $.ajax({
      url: 'http://localhost:8000/api/flights/' + this.props.flightId,
      dataType: 'json',
      success: function(incomingData) {
        this.setState({data: incomingData});
      //  console.log(JSON.stringify(this.state.data));
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState() {
    return {data:[]};
  },

  componentDidMount() {
    this.loadFlightFromServer();
    setInterval(this.loadFlightFromServer, 2000);
  },

  render() {
    return (
      <header className="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
      <div className="demo-card-wide mdl-card mdl-shadow--2dp">
        <div className="mdl-card__title-container">
          <h5 className="mdl-card__titletext">{this.state.data.airline} {this.state.data.name}</h5>
          <h5 className="mdl-card__titletext">Source : {this.state.data.source}</h5>
          <h5 className="mdl-card__titletext">Destination : {this.state.data.dest}</h5>
          <h5 className="mdl-card__titletext">Departure : {this.state.data.departure}</h5>
          <h5 className="mdl-card__titletext">Arrival : {this.state.data.arrival}</h5>
        </div>
        <div className="mdl-card__supporting-text">
          Estimated time to Departure is {this.state.data.eta}:
          Departed At {this.state.data.departure}:
        </div>
      </div>
      </header>
    )
  }
});

var DestinationWeather = React.createClass({
  loadDestinationFromServer() {
    $.ajax({
      url: 'http://localhost:8000/api/flights/' + this.props.flightId,
      dataType: 'json',
      success: function(incomingData) {
        this.setState({dest: incomingData.dest});
        this.loadWeatherData();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  loadWeatherData() {
    $.ajax({
      url: 'http://api.openweathermap.org/data/2.5/weather?APPID=2ae6f78942b5df339cd6cfc37221080d&q=' + this.state.dest,
      dataType: 'json',
      success: function(incomingData) {
        this.setState({data: incomingData});
        console.log('asdasd');
        console.log(this.state.data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState() {
    return {data:[], dest:[]};
  },

  componentDidMount() {
    this.loadDestinationFromServer();
    setInterval(this.loadDestinationFromServer, 2000);
  },

  render() {
    if(this.state.data.main == null){
      return null;
    }
    return (
      <div>
      <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
        <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
          <h2 className="mdl-card__title-text">{this.state.dest}</h2>
        </div>
        <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          Max Temp : {this.state.data.main.temp_max }
          Min Temp : {this.state.data.main.temp_min }
          Description : {this.state.data.weather[0].description}
        </div>
      </div>
      </div>
    )
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  render () {
    return (
          <div>
          <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <FlightBox flightId = {this.state.value}/>
            <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
              <header className="demo-drawer-header">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Name:
                  <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" />
              </form>
                <img src="images/user.jpg" className="demo-avatar" />
              </header>
              <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">home</i>Track</a>
                <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">inbox</i>List</a>
                <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">delete</i>Delete</a>
                <div className="mdl-layout-spacer"></div>
                <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">help_outline</i><span className="visuallyhidden">Help</span></a>
              </nav>
            </div>
            <Maps flightId = {this.state.value}/>
          </div>
          <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
          </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
