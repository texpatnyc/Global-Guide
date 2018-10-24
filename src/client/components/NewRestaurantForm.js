import React, { Component } from 'react';

class NewRestaurantForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityId: props.cityId,
      name: '',
      address: '',
      url: '',
      description: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEats = this.props.setEats.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { cityId, name, address, url, description } = this.state;

    // alert( name + address + url + description + cityId );

    fetch(`/api/restaurants/${cityId}`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: { 'Content-type': 'application/json' }
    }).then(result => {
      this.setEats(cityId);
    })


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="newRestaurantForm">
        <label>
          Name:
          <input type="text" name="name" defaultValue={this.state.name} onChange={this.handleChange} />
        </label><br />
        <label>
          Address:
          <input type="text" name="address" defaultValue={this.state.address} onChange={this.handleChange} />
        </label><br />
        <label>
          Website:
          <input type="text" name="url" defaultValue={this.state.url} onChange={this.handleChange} />
        </label><br />
        <label>
          Description:
          <textarea type="text" name="description" defaultValue={this.state.description} onChange={this.handleChange} />
        </label><br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewRestaurantForm;