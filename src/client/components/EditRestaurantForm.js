import React, { Component } from 'react';

class NewRestaurantForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      address: props.address,
      url: props.url,
      description: props.description
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEats = this.props.setEats.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps)
  // }

  handleChange(event) {
    this.setState({ [event.target.name] : event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const { name, address, url, description } = this.state;
    const { cityId } = this.props;

    let obj = {
      name: name,
      address: address,
      url: url,
      description,
      cityId: cityId
    }

    

    fetch(`/api/restaurants/${cityId}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { 'Content-type': 'application/json' }
    }).then(result => {
      this.setEats(cityId);
    })


  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="newRestaurantForm">
      <h1>Add New Listing</h1>
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