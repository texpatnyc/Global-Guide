import React, { Component } from 'react';
import '../app.css';
import LocaleIndex from './LocaleIndex';
import EatsView from './EatsView';
import NewRestaurantForm from './NewRestaurantForm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentLocale: { cityName: 'New York', id: 'BBF910E1-14EF-42B4-AAFA-E450D66FEAE4' },
      locales: [ { cityName: 'Loading, please wait' } ],
      currentDetails: { eats: [] }
    };

    this.getLocalesList = this.getLocalesList.bind(this);
    this.showOnClick = this.showOnClick.bind(this);
    this.setCurrentEats = this.setCurrentEats.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    
  }
  componentDidMount() {
    this.getLocalesList();
    this.setCurrentEats(this.state.currentLocale.id)
  }

  getLocalesList() {
    let allLocales;
    fetch('/api/locales/')
      .then(res => res.json())
      .then(locales => {
        allLocales = locales.slice()
        this.setState({ locales: allLocales });
      });
  }

  setCurrentEats(id) {
    fetch(`/api/restaurants/${id}`)
      .then(res => res.json())
      .then(data => this.setState({ currentDetails: { eats: data } }))
  }

  showOnClick(e) {
    const id = e.target.id;
    const name = e.target.innerText;
    this.setCurrentEats(id);
    this.setState({ currentLocale: { cityName: name, id: id } });;
  }

  editItem() {

  }

  deleteItem(e) {
    e.preventDefault();
    const id = e.target.id;
    fetch(`/api/restaurants/${id}`, {
      method: "DELETE",
      headers: { 'Content-type': 'application/json' }
    }).then(result => {
      this.setCurrentEats(this.state.currentLocale.id);
    });
  }

  render() {
    const { currentLocale, locales, currentDetails } = this.state;
    return (
      <div>
        {currentLocale ? <h1>{`The current Locale is  ${currentLocale.cityName}`}</h1> : <h1>Loading.. please wait!</h1>}
        <LocaleIndex handleClick={this.showOnClick} contents={locales} />
        <EatsView contents={currentDetails.eats} deleteItem={this.deleteItem} />
        <NewRestaurantForm className="newRestarantForm" cityId={this.state.currentLocale.id} setEats={this.setCurrentEats}/>
      </div>
    );
  } 
} 