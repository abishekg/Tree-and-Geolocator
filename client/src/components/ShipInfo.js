import React, { Component } from 'react'

export class ShipInfo extends Component {
  render() {
    return (
      <div style={{
        position: 'fixed',
        bottom: '400px',
        right: '10px',
        padding: '5px',
        height: '450px',
        top: '300px',
        backgroundColor: 'black',
        opacity: '0.7',
        color: 'white',
        width:'275px',
      }
      }>
        <button style={{
          right: '0',
          marginRight: '0px',
          backgroundColor: 'transparent',
          border: '0px',
          position: 'absolute',
          top: '0'
        }} onClick={this.props.onCloseModal}>X</button>
        <div>
          <p>Name:{this.props.markers.name}</p>
          <p>Description:{this.props.markers.description}</p>
          <p>Type:{this.props.markers.type}</p>
          <p>From:{this.props.markers.fromLocation}</p>
          <p>To:{this.props.markers.toLocation}</p>
          <p>Class/Flag:{this.props.markers.class}</p>
          <p>Cargo:{this.props.markers.cargo}</p>
          <p>Wind:{this.props.markers.wind}</p>
          <p>Speed:{this.props.markers.speed}</p>
          <p>Next Port:{this.props.markers.nextPort}</p>
          <p>Report Date:{this.props.markers.reportDate}</p>
        </div>
      </div >
    )
  }
}

export default ShipInfo;
