// jshint esversion: 6
// show the burger itself, rebuild the burger in this checkout summary form and then when the user clicks on continue and then want to load the contact form. So that's the goal here
import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component {
  // state = {
  //   // ingredients: {
  //   //   salad: 1,
  //   //   bacon: 1,
  //   //   cheese: 1,
  //   //   meat: 1
  //   // }
  //   ingredients: null,
  //   price: 0
  // }

  // I need to parse this in the checkout component and then I'll do this in componentDidMount I won't use componentDidUpdate or anything like that because whenever I load this component, it will mount itself, there is no way I can route to it without it being mounted again because it's not nested in some other page or anything like that.
  // we can simply change componentDidMount to WillMount before we render the child component, we already have access to the props there so we can already get the queryParams there. and we do this at the point of time where we don't render children so we can set up the state prior to render children.
  // redux-1 safhasinda asagiyi command yaptik ve ustteki state tide
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ['salad', '1']
  //     if (param[0] === 'price') {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ingredients: ingredients, totalPrice: price});
  // }

  // componentWillMount in the checkout container is too late, whilst it does run before render runs, it doesn't prevent the rendering with the old props we received and in the old props, purchased is still true. So we can't dispatch this here in componentWillMount, I'll get rid of mapDispatchToProps here entirely,
  // componentWillMount() {
  //   this.props.onInitPurchase()
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  render() {
    let summary = <Redirect to="/"/>
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased && <Redirect to="/" />
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/> 
          <Route 
            path={this.props.match.path + '/contact-data'}
            //  since I now render it manually here I can pass props to it and here, I'll add my ingredients as a prop and refer to this.state.ingredients.
            // we only really need price down here where we use our little trick for loading the contact data. Now thanks to our redux store, we no longer need to use the tricks so we don't actually even need the price here because we don't use it anywhere else in this component. So let's get rid of this price prop here in mapStateToProps and let's get rid of the render method
            component={ContactData}/>
        </div>
      )
    }
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    // price: state.totalPrice
    purchased: state.order.purchased
  }
}

// componentWillMount iptal olunca burasi da command oldu
// const mapDispatchToProps = dispatch => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit())
//   }
// }

// we don't need mapDispatchToProps here because we're not actually dispatching anything in this container, we just navigate a little bit but we don't do this through redux store, we do this through the react router so there is nothing getting dispatched here.

// By the way, if you only had mapDispatchToProps and no mapStateToProps, you simply would set mapStateToProps to null and pass mapDispatchToProps because mapDispatchToProps always has to be the second argument, mapStateToProps has to be the first one. So the first one is not necessary, simply set it to null, ornek=> connect(null, mapDispatchToProps)

export default connect(mapStateToProps) (Checkout);