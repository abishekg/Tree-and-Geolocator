import React, { Component } from 'react';
import ShipIcon from './../utils/ocean-transportation.png';
import PortIcon from './../utils/big-anchor.png';

export class Legend extends Component {
  render() {
    return (
      <div style={{ backgroundColor: 'white', opacity: '1', border: '1px solid', top: '5px' }} >
        <span>
          <img src={ShipIcon} style={{ float: 'left' }} />
          <div style={{ marginLeft: '25px', color: 'black' }} >
            Ships
          </div>
        </span>
        <hr />
        <span>
          <img src={PortIcon} style={{ float: 'left' }} />
          <div style={{ marginLeft: '25px', color: 'black' }} >
            Ports
          </div>
        </span>
      </div>
    )
  }
}

export default Legend
