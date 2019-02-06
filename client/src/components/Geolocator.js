import React, { Component } from 'react';
import axios from 'axios';
import { fetchGeolocations } from './../actions/index';
import { demoFancyStyle } from './../utils/demoFancyStyle.json';
import { FaAnchor } from 'react-icons/fa/index';
import MyMapComponent from './MyMapComponent';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';


class Geolocator extends Component {

  constructor(props) {
    super(props);


    this.state = {
      markers: undefined,
      selectedMarker: false,
      hover: false,
      openModal: false,
      searchValue: ''
    }
  }

  componentWillMount() {
    this.props.fetchGeolocations();
  }


  onOpenModal = () => {
    this.setState({ openModal: true });
  }

  onCloseModal = () => {
    this.setState({ openModal: false, selectedMarker: false });
  };

  getLatLng(e) {
    console.log(e);
  }

  handleClick = (marker, event) => {
    console.log('marker: ', marker);
    this.setState({ selectedMarker: marker, openModal: true })
  }

  mouseOver = (marker, event) => {
    this.setState({ hover: marker });
  }
  onMapClick = () => {
    this.setState({ selectedMarker: false });
  }

  mouseOut = (marker, event) => {
    this.setState({ hover: false });
  }

  searchUpdated = (searchValue, event) => {
    console.log('searchValue: ', searchValue);
    this.setState({ searchValue });
    console.log("HERE", this.props.markers);
    const filterArray = this.props.markers.filter(createFilter(this.state.searchValue, ['name', 'imoNumber', 'type', 'description']));
    console.log('filterArray: ', filterArray);
    this.setState({ markers: filterArray });
  }


  render() {
    return (
      <div>
        <MyMapComponent
          selectedMarker={this.state.selectedMarker}
          hover={this.state.hover}
          searchValue={this.state.searchValue}
          markers={this.state.markers ? this.state.markers : this.props.markers}
          onClick={this.handleClick}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          openModal={this.state.openModal}
          onCloseModal={this.onCloseModal}
          searchUpdated={this.searchUpdated}
          onMapClick={this.onMapClick}
        />
      </div>
    )
  }
}

function mapStateToProps({ bounds }) {
  return {
    markers: bounds
  }
}

export default connect(mapStateToProps, { fetchGeolocations })(Geolocator);


//AIzaSyA8BnOV72gS-j_2N-1C2zdWrvvd-m4rqg4