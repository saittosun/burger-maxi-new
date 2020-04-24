// jshint esversion: 9
import React, { Component } from 'react';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  // I want to use my custom input and button components, just as I use them in the contact data component or container. I'll also manage my form through the state of this auth container, not through redux because I'm only talking about the local state, the values the user entered into their form inputs and so on and it makes more sense to me to use them and to manage them inside the container with react's state property.
  state = {
    controls: {
      // ContactData.js den aldik asagidaki kodu sonra duzeltik
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'mail address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  // I have to make sure that I actually reset the path if we reach this page whilst not building a burger and that is what we do in componentDidMount.
  componentDidMount() {
    // that means we're trying to redirect to checkout even though we're not building a burger.
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      // I don't need to pass an argument here because we already set this up to always pass / at the bottom of our component to the action creator
      this.props.onSetRedirectPath();
    }
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
    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      //  for that given control name and distribute all these properties so that I can then overwrite some of the properties
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value, 
          this.state.controls[controlName].validation),
        touched: true
      }
    }
    this.setState({controls: updatedControls});
  }

  submitHandler = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    )
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {isSignup: !prevState.isSignup};
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      })
    }

    let form = (
      formElementsArray.map(formElement => {
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
      })
    )

    if (this.props.loading) {
      form = <Spinner/>
    }

    let errorMessage = null;
    if (this.props.error) {
      // this message property is only available because I'm using the error as it comes back from firebase and that happens to be a javascript object which has a message property, this might not be the case for your own backend of course, adjust this to your needs.
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      // I have to make sure that I actually reset the path if we reach this page whilst not building a burger and that is what we do in componentDidMount.
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
        // now we got a form with inputs and a button. To see it, we need to load it via routing, we got the auth container and we set up all our routes in the app.js file.
      <div className={classes.Auth}>
        {authRedirect}
        {/* we have to ensure that we really store that error, so I have to go to my auth file in the actions folder and we can access the error message, the error object (dispatch(authFail(err.response.data.error))) we get back from firebase on this error object here by accessing the original response and that is due to axios, we're using axios here and it simply wraps the response in this error object */}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button 
            btnType="Success">
            SUBMIT
          </Button>
        </form>
        <Button 
          btnType="Danger"
          clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // on state, we have to access auth since this is what leads to the auth reducer in the end due to combined reducers(src/index.js den gosterdi)
    // the loading property we set up in our auth reducers state,(buradaki initialState deki property ile ayni)
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    // if you're not sure about the name of the slice, always check your index.js file, there you are combining your reducer and it's this property you are looking for. So burger builder is our slice name and there, we got this building prop.
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // With that, we can execute onAuth on our props in this container and I want to do this whenever the form is submitted.
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    //  we just hard code / in here because if I call this action from within that component, I always want to reset it back to its basic form.
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Auth);