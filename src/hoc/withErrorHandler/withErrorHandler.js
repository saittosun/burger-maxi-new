// jshint esversion: 6
import React, { Component } from 'react';
import Aux from '../_Aux/_Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  // no name class component because I want to use component factory to reach lifecycle hooks
  return class extends Component {
    state = {
      error: null
    }

    // burgerbuilder.js de axios.get yaptigi yerde .json uzantisini silince hata verdi. sebebini acikliyor. We're setting up our interceptors in the componentDidMount hook and it worked great for the post request but think about that lifecycle diagram, there you see componentDidMount is actually called after all child components have been rendered, which means after componentDidMount was completed in the child components. Now think about our withErrorHandler, here we're wrapping this wrapped component which is our burger builder container for example because there we are using withErrorHandler on the export,so we're essentially wrapping the burger builder and that of course has one implication, componentDidMount in the withErrorHandler will only be called once componentDidMount was called here and since we reach out to the web in componentDidMount of the wrapped component, we never set up our interceptors. The fix is simple, here I'll use componentWillMount. However in the future, this React lifecycle hook or lifecycle method will not be supported anymore and therefore you can also just use the constructor because the general idea here is that we execute this code when this component here gets created and with that, I mean that component object and of course the constructor also runs when this gets created, so therefore using the constructor instead of componentWillMount will work in exactly the same way.
    // This will be called before the child components are rendered and we're not causing side effects here, we're just registering the interceptors and we want to do that before the child components are rendered.
    componentWillMount() {
      // I want to call this set state and clear any errors, so that whenever I send a request, I don't have my error set up anymore, so that I definitely clear it here.
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      // once we have more pages where we might use withErrorHandler, we of course create this instance here multiple times, this component here and therefore all the old interceptors, so all the interceptors we set up when we wrapped this around another component which might not be needed anymore still exist. So we have a lot of that interceptor sitting in memory which actually are not that but which still react to our requests and in the worst case, they lead to errors or do somehow change the state of our application but even in the best case, they leak memory because that's code that still runs that is not required anymore. So we should actually remove the interceptors when this component gets unmounted, so when this specific instance of our withErrorHandler wrapper is not needed anymore and there actually is a lifecycle hook for this too, it's componentWillUnmount.we can now set up our axios listener, so on the axios instance here, we can now set up our global interceptor which also allows us to handle errors.
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    // Now as the name suggests, this is a lifecycle method which is executed at the point of time a component isn't required anymore.
    componentWillUnmount() {
      console.log('will unmount', this.reqInterceptor, this.resInterceptor);
      //to be able to remove an interceptor here, we need to store a reference to the interceptors we create in properties of this class.
      //And now with that, we got this set up in componentWillUnmount and we should remove our interceptors with that preventing memory leaks.
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null})
    }
    render() {
      return (
        <Aux>
          <Modal 
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;