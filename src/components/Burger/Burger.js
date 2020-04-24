//jshint esversion: 6
import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // the transformed ingredients, this actually is the logic we can use to turn our ingredients into an array of ingredients.
  let transfromIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])]//you can create an array with it, for example array three will give you an array with three empty spaces basically, with three undefined spaces.I don't care about the element itself so that is why I will use the underscore as an argument name to indicate that it's a blank but the index of that element is important
        .map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
      })
      .reduce((arr, el) => {//to flatten the array//this function receives two arguments passed in automatically by javascript, the previous value and the current value. The reduce method does not only accept these callback here which is executed on every element in this array we return here, it also accepts an initial value, let's say an empty array. So the initial value of the reduced value now of course you want to adjust this reduced value by returning something and it will then loop through all the elements and simply add them to the initial values step by step.
        return arr.concat(el);//here I want to return the updated values starting with the initial one is then stored in the first argument which we receive in each loop here. So array this argument is the always updated root array which I want to return in the end.
      }, []);
      if (transfromIngredients.length === 0) {
        transfromIngredients = <p>please start adding ingredients</p>
      }
    // console.log(transfromIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transfromIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

export default burger;