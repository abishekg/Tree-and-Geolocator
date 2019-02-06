import React, { Component } from 'react'

export class CustomInfoTool extends Component {
  render() {
    return (
      <div className="right">
        Welcome To ShipPalm
        {this.props.markerSelected.photo_title}
        Tada
      </div>
    )
  }
}

export default CustomInfoTool
