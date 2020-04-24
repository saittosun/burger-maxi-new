// jshint esversion: 9
import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/_Aux/_Aux';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from "../../../src/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

// redux-1 bolumunde buradan alip reducer.js e yapistirdik
// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   bacon: 0.7,
//   cheese: 0.4,
//   meat: 1.3
// }

class BurgerBuilder extends Component {
  // redux-1 asamasinda state icindeki bu kodu kaldirdik
  // ingredients: null, 
  // totalPrice: 4,
  // purchaseable: false,
  state = {
    purchasing: false,
    // loading: false,
    // error: false
  }

  //  I want to set up the state dynamically and you learned that a good place for fetching data is componentDidMount
  componentDidMount() {
    // console.log(this.props);
    // this will now send a request to get our ingredients, I'll then add a then block here to handle the response we get back and that response should of course contain our ingredients object.
    // asagidaki bolumu redux-1 bolumunde ignore ettik daha async i gormedigimiz icin
    // axios
    //   .get('https://hamburger-react-maxi.firebaseio.com/ingredients.json')
    //   .then(response => {
    //     // a data object which actually contains the data we fetched.
    //     this.setState({ingredients: response.data});
    //   })
    //   // If we catch an error there and simply don't do anything with it for example, then we will already not get this anymore because now we're not calling the then block anymore. We can still dismiss the network error and our application is now broken, so we probably would want to handle that specific error case here for this specific page by for example also setting the UI here.
    //   .catch(error => {
    //     this.setState({error: true})
    //   });
    this.props.onInitIngredients()
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({purchasing: true});
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  }

  purchaseCancelHandler = () => {
    this.props.onInitPurchase()
    this.setState({purchasing: false});
  }

  // I will command all this code out because I no longer want to store it on firebase immediately here I want to go to the checkout component instead Now as you learned since burger builder is part of the routable area of our project, we have access to the match location and history props. Bunu yukarida console.log(this.props); satirinda ispatliyor.
  purchaseContinueHandler = () => {
    // redux-1 safhasinda asagiyi command yaptik bir yeri degistirerek yazdik
    // const queryParams = [];
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     encodeURIComponent(i) + '=' + 
    //     encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParams.push('price=' + this.state.totalPrice)
    // const queryString = queryParams.join('&');
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // });
    this.props.history.push('/checkout');
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients).map(igKey => {
      //we can use this to return new value and replace the old value which was the property name, salad and so on with that new value.
      return ingredients[igKey];//here I simply wanted to return ingredients and there the value for a given key and this will be the amount because with ingredients and this notation, I'm accessing a certain property in the ingredients object, igKey is salad, bacon and so on so I'm basically getting these values, the numbers and that is what I return for each key.
    }).reduce((sum, el) => {
      return sum + el;
    }, 0);
    // redux-1 safhasinda alttaki kodu degistirdik
    // this.setState({purchaseable: sum > 0});
    return sum > 0;
  }

  // bu add ve remove ingredientHandler lari redux-1 safhasinda command yaptik
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type]= updatedCount;
  //   const priceAddition = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // }

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {return;}
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   };
  //   updatedIngredients[type]= updatedCount;
  //   const priceDeduction = INGREDIENT_PRICES[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
  //   this.updatePurchaseState(updatedIngredients);
  // };

  render() {
    const disabledInfo = {
      // ...this.state.ingredients
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0//disableInfo key is the value of each key
    }
    //the structure of disabledInfo is basically {salad: true, meat: false, ...}
    let orderSummary = null; 

    let burger = this.props.error ? <p>Ingredients can not be loaded!</p> : <Spinner />

    if (this.props.ings) {
      burger = (
        <Aux>
            {/* redux-1 safhasindan once asagida yazili olarak boyleydi purchaseable={this.state.purchaseable} */}
          <Burger ingredients={this.props.ings} />
          <BuildControls 
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}/>
        </Aux>
      );
      orderSummary = (
        <OrderSummary 
          ingredients={this.props.ings}
          price={this.props.price.toFixed(2)}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />
      )     
    }
   
    // if (this.state.loading) {
    //   orderSummary = <Spinner/>
    // }
    
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    ) 
  }
}

// mapStateToProps holds a function which receives the state automatically and which returns a javascript object where we define which property should hold which slice of the state.
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     onIngredientAdded: (ingName) => dispatch({
//       type: actionTypes.ADD_INGREDIENT, 
//       ingredientName: ingName
//     }),
//     onIngredientRemoved: (ingName) => dispatch({
//       type: actionTypes.REMOVE_INGREDIENT, 
//       ingredientName: ingName
//     })
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

// you can have as many higher order components in there as you want. In the end what connect will do is it will just set some props on the component it's wrapping, so as long as you pass this props(<WrappedComponent {...this.props} />**witherrorhandler.js deki kod) on in your own higher order components, this should work fine because any props set by other higher order components which might wrap this one will still be passed on just fine, so this shouldn't pose an issue at all
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));