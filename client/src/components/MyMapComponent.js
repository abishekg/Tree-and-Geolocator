/*global google*/
import React from 'react';
import axios from 'axios';
import './MyMapComponent.css';
import _ from 'lodash';
import { compose, withProps, withStateHandlers, withState, withHandlers, lifecycle } from "recompose";
import { withGoogleMap, GoogleMap, Marker, withScriptjs, InfoWindow, Polyline } from 'react-google-maps';
import { demoFancyStyle } from './../utils/demoFancyStyle.json';
import { FaAnchor } from 'react-icons/fa/index';
import { MarkerClusterer } from 'react-google-maps/lib/components/addons/MarkerClusterer';
import fetch from 'isomorphic-fetch';
import ShipIcon from './../utils/ocean-transportation.png';
import PortIcon from './../utils/big-anchor.png';
import Modal from 'react-responsive-modal';
import SearchInput, { createFilter } from 'react-search-input';
import { relative } from 'path';
import { Legend } from './Legend';
import { ShipInfo } from './ShipInfo';
import { Link } from 'react-router-dom';
// import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';

// "originPort": {
//   "lat": -7.318609,
//     "lng": 106.650736
// },
// "destinationPort": {
//   "lat": -19.716945,
//     "lng": 120.547575
// },
var polylines =
  [[
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 }
  ], [
    {
      lat: -7.318609,
      lng: 106.650736
    },
    { lat: -19.716945, lng: 120.547575 },
  ], [
    { lat: 11.706482, lng: 92.755273 },
    { lat: 10.620520, lng: 79.824749 },
  ], [{ lat: 20.625375, lng: -97.114231 },
  { lat: 24.662634, lng: - 90.313730 },
  { lat: 22.423946, lng: - 85.649679 },
  { lat: 15.908218, lng: - 84.728136 },
  ], [
    {
      lat: 19.884652,
      lng: - 75.382795
    },
    {
      lat: 12.237124,
      lng: - 71.847035
    },
  ], [
    {
      lat: 39.518063,
      lng: - 74.537311
    },
    {
      lat: 27.641777,
      lng: -51.138058
    },
    {
      lat: 5.680879,
      lng: - 54.028602
    }
  ], [
    {
      lat: 18.547976,
      lng: - 66.351122
    },
    {
      lat: 45.897193,
      lng: - 46.974191
    },
    {
      lat: 60.064440,
      lng: - 44.271038
    },
  ],]


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyA8BnOV72gS-j_2N-1C2zdWrvvd-m4rqg4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `758px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withStateHandlers(() => ({
    isOpen: false,
  }), {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      })
    }),
  withScriptjs,
  withGoogleMap
)(props => {
  const searchUpdated = props.searchUpdated.bind(this);
  const onMapClick = props.onMapClick.bind(this);
  console.log("SEARCH VALUE INSIDE " + props.searchValue);
  return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 0.0, lng: 0.0 }}
      options={{ minZoom: 1, maxZoom: 20, mapTypeControl: false, streetViewControl: false }}
      onClick={onMapClick}
      style={{ position: 'relative' }}
    > <div style={{
      color: '#fff',
      border: '0',
      background: 'black',
      opacity: '0.7',
      fontWeight: '500',
      float: 'right',
      fontSize: '15px',
      paddingLeft: '0.6em',
      width: '185px',
      fontFamily: 'Roboto',
      position: 'fixed',
      top: ' 5px',
      left: '10px',
      padding: '5px',
      height: '52px',
    }} >
        <SearchInput onChange={searchUpdated} />
        <Legend />
        <a class="btn-floating btn-large waves-effect waves-light" style={{ backgroundColor: 'transparent', border: '0px' }}>
          <Link to="/shipForm">
            <i class="material-icons black-text">add</i>
          </Link>
        </a>
      </div>
      {polylines.map((polyline) => {
        return (<Polyline key={polyline.lat} path={polyline} options={{
          strokeColor: "#808080", strokeOpacity: '0.7',
          fillOpacity: 0,
          icons: [{ icon: { path: google.maps.SymbolPath.CIRCLE, fillOpacity: '0', scale: '2' }, offset: '0', repeat: '10px' }]
        }}
        />)
      })}

      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker);
        const onMouseOver = props.onMouseOver.bind(this, marker);
        const onMouseOut = props.onMouseOut.bind(this, marker);
        const onCloseModal = props.onCloseModal.bind(this);
        return (
          <Marker
            key={marker._id}
            position={{ lat: (marker.latitude), lng: (marker.longitude) }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            markerWithLabel={marker.name}
            icon={marker.type === 'ship' ? ShipIcon : PortIcon}
          >
            {props.hover === marker &&
              <InfoWindow style={{
                display: 'flex',
                alignItems: 'flex-start',
                position: 'fixed',
                right: '0',
                bottom: '0',
                overflowY: 'auto',
                overflowX: 'hidden',
                zIndex: '1000',
                padding: '1.2rem',
              }}>
                <div>
                  {marker.name}
                  <p>Report Date:{marker.reportDate}</p>
                </div>
              </InfoWindow>}
            {
              props.selectedMarker === marker && <ShipInfo markers={marker} onCloseModal={onCloseModal}></ShipInfo>
            }
          </Marker>
        )
      })
      }
    </GoogleMap>);
}

);


// <Modal className="modal" animationDuration={5000} open={props.openModal} onClose={onCloseModal} style={{ backgroundColor: `red` }} >
//   <div>
//     <p>Name:{marker.name}</p>
//     <p>Description:{marker.description}</p>
//     <p>Type:{marker.type}</p>
//     <p>From:{marker.fromLocation}</p>
//     <p>To:{marker.toLocation}</p>
//     <p>Class/Flag:{marker.class}</p>
//     <p>Cargo:{marker.cargo}</p>
//     <p>Wind:{marker.wind}</p>
//     <p>Speed:{marker.speed}</p>
//     <p>Next Port:{marker.nextPort}</p>
//     <p>Report Date:{marker.reportDate}</p>
//   </div>
// </Modal>

export default MyMapComponent;


