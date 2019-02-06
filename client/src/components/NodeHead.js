import React, { Component } from 'react'
import Tree from 'react-checkbox-tree';
import axios from 'axios';
import './../App.css';
import logo from './../logo.svg';
import { Link } from 'react-router-dom';
import { ROOT_URL } from '../actions/config';


export class NodeHead extends Component {
  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header" >
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome</h1>
          </header>
        <Link to="/tree"><button className="btn btn-primary red accent-2">Tree</button></Link>
        <Link to="/geolocator"><button className="btn btn-primary red accent-2">Geolocator</button></Link>
        <Link to="/infiniteloop"><button className="btn btn-primary red accent-2">infiniteloop</button></Link>
        </div>
      </div>
    );
  }
}

export default NodeHead
