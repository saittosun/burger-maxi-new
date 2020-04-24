// jshint esversion: 6
import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  //the goal is to display a preview of our burger here and then show the continue or cancel buttons.
  return (
    <div className={classes.CheckoutSummary}>
      <h1>we hope it tastes well</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <Button 
        btnType="Danger"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button 
        btnType="Success"
        clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  )
}

export default checkoutSummary;