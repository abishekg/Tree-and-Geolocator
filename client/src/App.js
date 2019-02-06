import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchTree } from './actions/index';
import Tree from 'react-checkbox-tree';



class App extends Component {

  componentDidMount() {
    this.props.fetchTree();
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      checked: ["Synergy/Global United/fas"],
      expanded: ["Synergy"],
      clicked: [],
      displayTree: false,
      displayInput: false,
      buttonText: "Lets Go!",
      showInputForm: false,
      addValue: "",
      buttonToggle: true,
      nodes: [],
      displayEditForm: false,
      modifiedValue: "",
      headerValue: "Tree Structure"
    }
  }
  // <input type="text" className="addInput" placeholder="Enter Search Value" onChange={(event) => this.searchParameter(event.target.value)} />

  renderInput() {
    if (this.state.displayInput) {
      console.log("Inside IF");
      return (<div>
        <input type="text" className="addInput" placeholder="Enter new Branch Value" onChange={(event) => this.handleInputValue(event.target.value)} autoFocus />
        <span>
          <button className="btn btn-secondary white-text blue" onClick={() => this.handleSubmit()}>Add</button>
          <button className="btn btn-secondary white-text red accent-1" onClick={() => this.closeAdd()}>Cancel</button>
        </span>
      </div>);
    }
    else {
      console.log("Inside else");
    }
  }

  renderEditInput() {
    if (this.state.displayEditForm) {
      console.log("Inside IF");
      return (<div>
        <input type="text" className="addInput" placeholder="Enter new Branch Value" onChange={(event) => this.handleEditedValue(event.target.value)} autoFocus />
        <span>
          <button className="btn btn-secondary white-text blue" onClick={() => this.handleEditSubmit()}>Edit Value</button>
          <button className="btn btn-secondary white-text red accent-1" onClick={() => this.closeEdit()}>Cancel</button>
        </span>
      </div>);
    }
    else {
      console.log("Inside else");
    }
  }

  renderTree() {
    if (this.state.displayTree) {
      if (!this.props.tree) {
        return (<div>Click on the Button to display the tree</div>);
      }
      return (<div>
        <Tree
          nodes={this.state.nodes}
          checked={this.state.checked}
          expanded={this.state.expanded}
          onCheck={(checked) => this.setState({ checked })}
          onExpand={expanded => this.setState({ expanded })}
          onClick={(event, clicked) => this.clickedNode(event, clicked)}
          showNodeTitles={true}
          expandOnClick={true}
          showNodeIcon={true}
          showExpandAll={true}
          nameAsArray={true}
          showExpandAll={true}
          optimisticToggle={false}
          icons={{
            check: <i className="material-icons" style={{ color: "#59ABEC" }}> check_box</i>,
            uncheck: <i className="material-icons" style={{ color: "#d2d5da" }}>check_box_outline_blank</i>,
            halfCheck: <i className="material-icons" style={{ color: "#59ABEC" }}>indeterminate_check_box</i>,
            expandClose: <i className="material-icons" style={{ color: "#363940" }}>keyboard_arrow_right</i>,
            expandOpen: <i className="material-icons" style={{ color: "#363940" }}>keyboard_arrow_down</i>,
            expandAll: <i className="material-icons" style={{ color: "#363940" }}>line_weight</i>,
            collapseAll: <i className="material-icons" style={{ color: "#363940" }}>cancel_presentation</i>,
            parentClose: <i className="material-icons" style={{ color: "#5e6066" }}>folder</i>,
            parentOpen: <i className="material-icons" style={{ color: "#5e6066" }}>folder_open</i>,
            leaf: <i className="material-icons" style={{ color: "#5e6066" }}>unfold_less</i>,
          }}
        />
      </div>);
    } else {
      return (<div className="App"><button className="btn waves-effect waves-light red accent-1" name="action" onClick={this.fetchData.bind(this)}>{this.state.buttonText}
        <i className="material-icons right">send</i>
      </button></div>)
    }
  }

  async fetchData() {
    this.props.fetchTree();
    console.log("PROPS" + this.props.tree);
    this.setState({ displayTree: true, buttonText: "Refresh Tree", nodes: this.props.tree });
  }


  clickedNode(clicked) {
    console.log('clicked: ', clicked);
    console.log('expanded: ', this.state.expanded);
    this.setState({ clicked });
    console.log("Checked", this.state.checked);
  }

  handleSubmit() {
    if (this.state.addValue) {
      console.log(this.state.clicked.value);
      this.setState({ displayInput: false });
      axios.post("http://172.22.25.53:5000/addnode", {
        "parentValue": this.state.clicked.value,
        "label": this.state.addValue
      }).then(res => {
        this.setState({
          nodes: res.data,
        });
      });
      console.log({ "expanded": this.state.expanded });
      this.props.fetchTree();
    }
  }

  handleEditSubmit() {
    if (this.state.modifiedValue) {
      this.setState({ displayEditForm: false });
      axios.post("http://172.22.25.53:5000/modify", {
        "value": this.state.clicked.value,
        "newLabel": this.state.modifiedValue
      }).then(res => {
        this.setState({
          nodes: res.data,
        });
      });
      console.log({ "expanded": this.state.expanded });
      this.props.fetchTree();
    }
  }

  handleInputValue(e) {
    this.setState({ addValue: e });
    console.log(this.state.addValue);
  }
  handleEditedValue(e) {
    this.setState({ modifiedValue: e });
  }

  closeAdd() {
    this.setState({ addValue: "", displayInput: false });
  }

  closeEdit() {
    this.setState({ modifiedValue: "", displayEditForm: false });
  }

  async removeNode() {
    await axios.post("http://172.22.25.53:5000/removenode", { value: this.state.clicked.value }).then(res => {
      console.log("AXIOS REMOVED", res);
      this.setState({ nodes: res.data });
    });
  }

  async editNode() {
    if (!this.state.displayEditForm)
      this.setState({ displayEditForm: true });
    else {
      this.setState({ displayEditForm: false });
    }
  }

  addNode() {
    if (!this.state.displayInput)
      this.setState({ displayInput: true });
    else {
      this.setState({ displayInput: false });
    }
    console.log("CLICKED" + this.state.clicked);
    console.log(this.state.expanded);
    console.log(this.state.checked);
  }

  renderButtons() {
    if (this.state.displayTree) {
      return (<div>
        <a className="btn-floating btn-large waves-effect waves-light red right" onClick={this.editNode.bind(this)}><i className="material-icons">edit</i></a>
        <a className="btn-floating btn-large waves-effect waves-light red right" onClick={this.removeNode.bind(this)}><i className="material-icons">remove</i></a>
        <a className="btn-floating btn-large waves-effect waves-light red right" onClick={this.addNode.bind(this)}><i className="material-icons">add</i></a>
        <br />
        <div className="right">{this.renderInput()}</div>
        <div className="right">{this.renderEditInput()}</div>
      </div>)
    }
  }

  screenClick(e) {
    this.setState({ clicked: "" });
    console.log('clicked123s: ', this.state.clicked);
    console.log(e);

  }


  render() {
    return (
      <div>
        <div className="App">
          <header className="App-header" onClick={this.screenClick.bind(this)} >
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">{this.state.headerValue}</h1>
          </header>
        </div>
        <div>
          {this.renderButtons()}
          {this.renderTree()}
        </div>
      </div >
    );
  }
}


function mapStateToProps({ node }) {
  return {
    tree: node
  }
}

export default connect(mapStateToProps, { fetchTree })(App);
