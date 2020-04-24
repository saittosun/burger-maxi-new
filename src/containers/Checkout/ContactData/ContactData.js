// jshint esversion: 6
import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from "../../../../src/axios-orders";
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    // name: '',
    // email: '',
    // address: {
    //   street: '',
    //   postalCode: ''
    // },
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'your E-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        // undefined is always treated as false but it also never changes to true. bu nedenle asagidaki kodu ekledik
        valid: true
      }
    },
    formIsValid: false,
    // redux-2 bolumunde command oldu
    // loading: false
  }

  orderHandler = (e) => {
    // I want to prevent the default because I don't want to send the request automatically that would reload my page, instead I now need to extract the data I want to submit and the cool thing is all the data is already managed in this state, in our form object here, which is updated all the time with two way binding, the value is updated at least and the value is certainly what I'm interested in.
    e.preventDefault();
    // we get the ingredients in there with the ingredients being passed, now submitting the request is easy of course. In the burger builder where I have commented out this code for sending a request
    // console.log(this.props.ingredients);
    // redux-2 de command yaptik
    // this.setState({loading: true})
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
      // customer: {
      //   name: 'maxi',
      //   adress: {
      //     street: 'teststreet',
      //     zipcode: '1111',
      //     country: 'Belgium'
      //   },
      //   email: 'test@test.com',
      // },
      // deliveryMethod: 'fastest'
    }
    // axios
    //   .post('/orders.json', order)
    //   .then(response => {
    //     this.setState({loading: false})
    //     this.props.history.push('/')
    //   })
    //   .catch(error => this.setState({loading: false}))

    // I want to pass my order and this contains the ingredients, the price and here, order data is simply the detailed order data the user entered into the form.
    this.props.onOrderBurger(order, this.props.token)
  }

  // I expect to get an event object as it will automatically be passed to me by react if this method is attached to an event listener which it of course is.
  // we also receive or need a second argument which is the input identifier so that we can reach out to our state, get the right element here, the right object and adjust its value.
  inputChangedHandler = (e, inputIdentifer) => {
    console.log(e.target.value)
    // this ID which is just a key from our object and that's exactly what I need. These keys here in our state object (name, street, zipcode and so on), these are the identifiers of the inputs and exactly the objects I need to adjust it. Now of course, I can use that information to update the value, the problem just is I of course can't access this.state.orderForm identifier and update the value, this is not how we mutate the state. Instead we have to mutate it, well immutably and we do this with set state.
    const updatedOrderForm = {
      ...this.state.orderForm
    }

    // I'll create a new object and used to spread operator here to create a clone. Now I can safely change the value of the updatedFormElement because it is again a clone.
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifer]
    }
    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = (
      this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    )
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifer] = updatedFormElement;
    console.log(updatedFormElement)

    let formIsValid = true;
    // updatedOrderForm is the state object which contains all my elements
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    console.log(formIsValid)

    //  the right side here, FormIsValid is referring to my variable, FormIsValid, the left side is referring to the property in the state I want to update which of course is this FormIsValid property here.
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
  }

  checkValidity(value, rules) {
    let isValid = true; 

    // We can of course also implement both for double security but again, I like the approach up here by adding this empty validation object the most because it makes all the controls configured equally.
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
  }
    return isValid
  }

  render() {
    const formElementsArray = [];
    // the keys are going to be name, street, zipcode and so on and if we access order form for a given key, we get these values here on the right side of course.
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        //  this is now the right side of this property so this javascript object, that is what we we'll store in this config property.
        config: this.state.orderForm[key]
      })
    }
    let form = (
      <form onSubmit={this.orderHandler}>
          {/* <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
          <Input inputtype="input" type="email" name="email" placeholder="Your email"/>
          <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
          <Input inputtype="input" type="text" name="postal" placeholder="Your postal"/> */}
          {formElementsArray.map(formElement => {
            return (
              <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.elementConfig.placeholder}
                changed={(e) => this.inputChangedHandler(e, formElement.id)}/>
            )
          })}
          <Button 
            btnType="Success"
            disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if (this.props.loading) {
      form = (
        <Spinner/>
      )
    }
    
    return (
      <div className={classes.ContactData}>
        <h4>enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }
}

// I don't need to do that it's not related to redux but I want to make sure that I do use it here too just as I use it in the burger builder at the bottom, it's getting wrapped by the connect middleware and I want to have this error dropdown here too.
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(ContactData, axios));