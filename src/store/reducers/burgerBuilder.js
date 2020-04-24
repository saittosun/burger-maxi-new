// jshint esversion: 6
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients : null,
  totalPrice: 4,
  error: false,
  building: false
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true
  }
  return updateObject(state, updatedState);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // we don't need break statements because we return in each case anyways, so the code execution won't continue in this function.
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action)
      // const updatedIngredient = {
      //   [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      // };
      // const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      // const updatedState = {
      //   ingredients: updatedIngredients,
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // }
      // return updateObject(state, updatedState);
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     [action.ingredientName]: state.ingredients[action.ingredientName] + 1
      //   },
      //   totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      // };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
      };
      case actionTypes.SET_INGREDIENTS:
        return {
          ...state,
          // I receive these ingredients because in the burger builder action file where we have setIngredients, I do pass this ingredients property.
          ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
          },
          totalPrice: 4,
          // I want to set my error to false to reset it in case we had an error earlier
          error: false,
          // false because we just reloaded the page, we're starting from scratch we're not building yet.
          building: false
        };
      case actionTypes.FETCH_INGREDIENTS_FAILED:
        return {
          ...state,
          error: true
        };
    default:
      return state;
  }
}

export default reducer;
