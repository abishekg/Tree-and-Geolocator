import React, { Component } from 'react';
import { fetchGrid } from './../actions/index';
import { connect } from 'react-redux';
import Grid from 'react-data-grid';
import axios from 'axios';
import index from '../reducers';
import InfiniteScroll from 'react-infinite-scroller';
import _ from 'lodash';
import {data} from './value'
// import Waypoint from 'react-waypoint';

// import geolocations from '../reducers/geolocations';


const value = _.orderBy(data, 'firstName');
console.log('value: ', value);
const currentValue = 0;

export class Infiniteloop extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      rows: [],
      hasMore: true,
      curValue: 34,
    }
  }
  componentDidMount() {
    console.log('value: ', value);
    this.setState({ rows: value.slice(0, 35) });
  }

  fetchValues() {
    var grids = this.state.rows;
    if (this.state.curValue < value.length - 35) {
      value.slice(this.state.curValue, this.state.curValue + 35).map(val => {
        grids.push(val);
        console.log('currentValue: ', this.state.curValue);
        this.setState({ curValue: this.state.curValue + 1 });
      })
      this.setState({ rows: grids });
    } else if (this.state.curValue <= value.length) {
      value.slice(this.state.curValue, value.length).map(val => {
        grids.push(val);
        console.log('currentValue: ', this.state.curValue);
        this.setState({ curValue: this.state.curValue + 1 });
      })
      this.setState({ rows: grids, hasMore: false });
    }
    else {
      this.setState({ hasMore: false });
    }
  }

  renderGrid() {
    const columns = [
      { key: 'county', name: 'Country' },
      { key: 'email', name: 'Email' },
      { key: 'title', name: 'Title' },
      { key: 'firstName', name: 'First Name' },
      { key: 'lastName', name: 'Last Name' },
      { key: 'street', name: 'Street' },
      { key: 'zipCode', name: 'Zip Code' },
      { key: 'bs', name: 'BS' },
      { key: 'catchPhrase', name: 'Catch Phrase' },
      { key: 'companyName', name: 'Company Name' },
      { key: 'words', name: 'Words' },
      { key: 'sentence', name: 'Sentence' },
    ];

    var items = [];

    this.state.rows.map((row, i) => {
      items.push(
        <tr id="addr0" key={i}>
        
          <td>
            {row.title} {row.firstName} {row.lastName}
          </td>
          <td>
            {row.bs}
          </td>
          <td>
            {row.email}
          </td>
          <td>
            {row.companyName}
          </td>
          <td>
            {row.county}
          </td>
          <td>
            {row.words}
          </td>
          <td>
            {row.street}, {row.zipCode}
          </td>
          <td>
            {row.catchPhrase}
          </td>
          <td>
            {row.sentence}
          </td>
        </tr>

        // <p className="title">{row.firstName} + {row.lastName}</p>
      )
    })


    return (<div>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.fetchValues.bind(this)}
        hasMore={this.state.hasMore}
        loader={<div className="loader" key={0}>Loading...</div>}
      >
        <div>
          <div className="col-md-12">
            <table
              className="table table-bordered table-dark"
              id="tab_logic"
            >
              <thead>
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">BS</th>
                  <th className="text-center">Email</th>
                  <th className="text-center">Company Name</th>
                  <th className="text-center">Country</th>
                  <th className="text-center">Words</th>
                  <th className="text-center">Address</th>
                  <th className="text-center">Catch Phrase</th>
                  <th className="text-center">Sentences</th>
                </tr>
              </thead>
              <tbody>
                {items}
              </tbody>
            </table>
          </div>
        </div>
      </InfiniteScroll>
    </div>)


  }

  render() {
    return (
      <div>
        {this.renderGrid()}
      </div>
    )
  }
}

export default Infiniteloop;




