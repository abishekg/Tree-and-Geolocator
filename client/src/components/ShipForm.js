import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { submitForm } from './../actions/index';

export class ShipForm extends Component {
  state = {
    isShipActive: false
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="input-field" type={field.type} {...field.input} />
        <div className="text-help" style={{ color: 'red' }}>
          {touched ? error : ""}
        </div>
      </div >
    );
  }

  renderRadio(field) {
    console.log('field: ', field.input);
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;
    return (
      <div className={className}>
        <input className="with-gap" type={field.type} {...field.input} />
        <label>{field.label}</label>
        <div className="text-help" style={{ color: 'red' }}>
          {touched ? error : ""}
        </div>
      </div >
    );
  }

  valueSelected(event) {
    if (event.target.value == 'ship')
      this.setState({ isShipActive: true });
    else
      this.setState({ isShipActive: false });
  }

  renderShipDetails() {
    if (this.state.isShipActive) {
      return (<div>
        <Field
          key='fromLocation'
          label="From Location"
          name="fromLocation"
          type="text"
          component={this.renderField}
        />
        <Field
          key='toLocation'
          label="To Location"
          name="toLocation"
          type="text"
          component={this.renderField}
        />
        <Field
          key='class'
          label="Class/Flag"
          name="class"
          type="text"
          component={this.renderField}
        />
        <Field
          key='cargo'
          label="Cargo"
          name="cargo"
          type="text"
          component={this.renderField}
        />

        <Field
          key='speed'
          label="Speed"
          name="speed"
          type="text"
          component={this.renderField}
        />
        <Field
          key='nextPort'
          label="Next Port"
          name="nextPort"
          type="text"
          component={this.renderField}
        />
      </div>)
    }
  }

  onSubmit(values) {
    console.log('values: ', values);
    this.props.submitForm(values, () => {
      this.props.history.push("/geolocator");
    });
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
        <Field
          key='name'
          label="Name"
          name="name"
          type="text"
          component={this.renderField}
        />
        <Field
          key='description'
          label="Description"
          name="description"
          type="text"
          component={this.renderField}
        />
        <div >
          <label>Type</label>
          <div >
            <label>
              <Field
                name="type"
                label="Ship"
                component={this.renderRadio}
                type="radio"
                onChange={this.valueSelected.bind(this)}
                value="ship"
              />
            </label>
            <label>
              <Field
                name="type"
                label="Port"
                component={this.renderRadio}
                type="radio"
                onChange={this.valueSelected.bind(this)}
                value="port"
                checked={true}
              />
            </label>
          </div>
        </div>
        <Field
          key='latitude'
          label="Latitude"
          name="latitude"
          type="number"
          component={this.renderField}
        />
        <Field
          key='longitude'
          label="Longitude"
          name="longitude"
          type="number"
          component={this.renderField}
        />
        <Field
          key='imoNumber'
          label="IMO Number"
          name="imoNumber"
          type="number"
          component={this.renderField}
        />
        <Field
          key='wind'
          label="Wind"
          name="wind"
          type="text"
          component={this.renderField}
        />
        {this.renderShipDetails()}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/geolocator" className="btn btn-danger">Cancel</Link>
      </form >
    )
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = "Enter the name!";
  }
  if (!values.description) {
    errors.description = "Enter the description!";
  }
  if (!values.imoNumber) {
    errors.imoNumber = "Enter the imonumber! ";
  }
  if (!values.type) {
    errors.type = "Choose the type"
  }

  if (values.latitude < -90 || values.latitude > 90 || !values.latitude) {
    errors.latitude = "Enter a valid Latitude"

  }
  if (values.longitude < -180 || values.longitude > 180 || !values.longitude) {
    errors.longitude = "Enter a valid Longitude"
  }
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: "ShipForm",
  destroyOnUnmount: true
})(connect(null, { submitForm })(ShipForm));

