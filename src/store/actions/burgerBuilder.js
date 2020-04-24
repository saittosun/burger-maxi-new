// jshint esversion: 9
import * as actionTypes from './actionTypes';
import axios from "../../../src/axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    // ingredientName containers/burgerBuilder.js den geliyor payload olarak
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    // ingredientName containers/burgerBuilder.js den geliyor payload olarak
    ingredientName: name
  };
};

// the setIngredient action is dispatched whenever this page is loaded though, we do it in the burgerbuilder/reducer componentDidMount hook and that is on purpose, I want to load my ingredients and reset them whenever this component gets mounted.
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    // I'll need to pass a payload, I'll name the property ingredients and that name is totally up to you. The value is not, the value should be our function argument which here is also named ingredients, this one. With that, we get the synchronous action creator, that is the action I eventually want to dispatch once the async code in initIngredients is done.
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  }
}

// initIngredients is better name, because we want to do this initially to load the ingredients we can use in the burger builder.
export const initIngredients = () => {
  //  the syntax due to redux-thunk which allows me to use my action creators like this. Now in here, I can execute async code and dispatch a new action whenever I'm done, so I actually need a second action creator which I'll export to though theoretically, I only use it internally in this file, I'll name this action creator setIngredients.
  return dispatch => {
    axios
      .get('https://hamburger-react-maxi.firebaseio.com/ingredients.json')
      .then(response => {
        // a data object which actually contains the data we fetched.
        // this.setState({ingredients: response.data});
        dispatch(setIngredients(response.data));
      })
      // If we catch an error there and simply don't do anything with it for example, then we will already not get this anymore because now we're not calling the then block anymore. We can still dismiss the network error and our application is now broken, so we probably would want to handle that specific error case here for this specific page by for example also setting the UI here.
      .catch(error => {
        // this.setState({error: true})
        dispatch(fetchIngredientsFailed());
      });
  };
};