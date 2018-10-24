import React, { Component } from 'react';
import '../app.css';
import WooHoo from '../woohoo.jpg';
import LocaleIndex from './LocaleIndex';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      currentLocale: null,
      locales: [ { cityName: 'Loading, please wait' } ]
    };

    this.getLocalesList = this.getLocalesList.bind(this);
    this.showOnClick = this.showOnClick.bind(this);
    
  }
  componentDidMount() {
    let locales;
    fetch('/api/locales')
      .then(res => res.json())
      .then(data => {
        locales = data.slice();
        this.setState({ 
          currentLocale: locales[0].cityName,
          locales: locales
         }) 
      })
  }

  getLocalesList() {
    let allLocales;
    fetch('/api/locales/')
      .then(res => res.json())
      .then(locales => {
        allLocales = locales.slice();
      });
    return allLocales;
  }

  showOnClick(e) {
    let currentLocale = e.target.innerText;
    this.setState({ currentLocale: currentLocale });
  }

  render() {
    const { currentLocale, locales } = this.state;
    console.log('in render', this.state)
    return (
      <div>
        {currentLocale ? <h1>{`The current Locale is  ${currentLocale}`}</h1> : <h1>Loading.. please wait!</h1>}
        <LocaleIndex handleClick={this.showOnClick} contents={locales} />
        <img src={WooHoo} alt="react" width="100%"/>
      </div>
    );
  } 
} 