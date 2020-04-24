// jshint esversion: 6
import React from 'react';

import classes from './Order.css';

const order = (props) => {
  // this actually is the logic we can use to turn our ingredients into an array of ingredients.
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    // (props.ingredients[ingredientName]) is the value of the ingredient so 0 1 2 and so on.
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName]}
    )
  }

  const ingredientOutput = ingredients.map(ig => {
    return (
      <span 
        key={ig.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}>
        {ig.name} ({ig.amount})
      </span>
    )
  })
    return (
      <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        {/* asagidaki bir diger alternatif ancak orders.js de + koymayacagiz */}
        {/* <p>Price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p> */}
        <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
      </div>
    )
}

export default order;