import React, { Component } from 'react';

const EatsView = (props) => {

  let eats = props.contents;
  let restaurants = eats.map((restaurant, i) => (
    <li className='single-restaurant' key={i}>
      <h2>{restaurant.name}</h2>
      <h3>{restaurant.address}</h3>
      <h3><a href="{restaurant.url}">{restaurant.url}</a></h3>
      <p>{restaurant.description}</p>
    </li>)
  );
  return (
    <div id='eats-view' >
      <ul>
        {restaurants}
      </ul>
    </div>
  )

}

export default EatsView;