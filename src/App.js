// jshint esversion:6
import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Layout from '../src/hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/auth/Auth.js';
import Logout from './containers/auth/logout/Logout';
import { connect } from 'react-redux';

class App extends Component {
  // state = {
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000);
  // }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={BurgerBuilder}/>
        <Redirect to="/" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          {/* to be able to reach that, I'll also go into my components folder and there to navigation, navigation items into the navigation items component, here we got our links and I will add a new one, */}
          <Route path="/logout" component={Logout}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps) (App);
