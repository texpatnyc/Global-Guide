import React, { Component } from 'react';

const LocaleIndex = (props) => {

  let locales = props.contents;
  let cityNames = locales.map((locale, i) => (
    <div onClick={props.handleClick} key={i} id={i} className='index-view-locale' id={'view-' + locale.cityName.toLowerCase()}>
      {locale.cityName}
    </div>)
  );
  return (
    <div id='index-view'>{cityNames}</div>
  )

}

export default LocaleIndex;