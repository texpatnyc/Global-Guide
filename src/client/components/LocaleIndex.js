import React, { Component } from 'react';

const LocaleIndex = (props) => {

  let locales = props.contents;
  let cityNames = locales.map((locale, i) => (
    <div onClick={props.handleClick} key={i} className='index-view-locale' id={locale.id}>
      {locale.cityName}
    </div>)
  );
  return (
    <div id='index-view'>{cityNames}</div>
  )

}

export default LocaleIndex;