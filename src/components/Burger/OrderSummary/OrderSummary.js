// jshint esversion: 6
import React, { Component } from 'react';

import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/_Aux/_Aux';// I don't really need a wrapping element here therefore I will import my auxiliary element from aux

class OrderSummary extends Component {
  // this could be a func component, does not have to be a class comp.
  componentWillUpdate() {
    console.log('[OrderSummary] will update');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        //double curly braces, the outer pair is for marking a dynamic entry and the inner curly braces are the javascript object
        return (
          <li key={igKey}> 
            <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
          </li>
        )
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button
          btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>

    )
  }
}

export default OrderSummary;