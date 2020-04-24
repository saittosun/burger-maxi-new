//jshint esversion: 6
//this should actually be a container because there we plan on managing the state for the burger we're about to build.
//Now this allows us to simply use this layout component as a wrapper around the core content component we want to render to the screen.
import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Aux from '../_Aux/_Aux';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

//two solutions to that, do you remember them? Well for one, we could return an array here instead of JSX which is sitting next to each other, if we return an array and give each item a key, we are allowed to kind of return adjacent elements. The alternative is to create such an auxiliary higher order component. It serves only one purpose, wrapping something and immediately outputting it but hence fulfilling the requirement of having a wrapping component. we also have of course the third option of wrapping everything in a div here or another element but I don't need that div or any other element, actually I want to have adjacent elements, that is why I will go with the higher order component approach and create such a utility auxiliary component.
class Layout extends Component {//in my opinion, it makes more sense to turn the layout component into a class component where we can implement the method so that we can listen to both the sideDrawer closing itself by clicking on the backdrop as well as toolbar opening the sideDrawer by clicking on that toggle button.
  state = {
    showSideDrawer: false
  }
  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {//This is the clean way of setting the state when it depends on the old state. Now we have a secure way of toggling that and changing showSideDrawer
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar 
          drawerToggleClicked={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated} />
        <SideDrawer 
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}/>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps) (Layout);

//Navigation items of course is a presentational component so we can't connect this to Redux. Well we could, we could turn this into a class-based component and use connect on this component or use to use that hook, you can do that but I wouldn't recommend doing that. This breaks the idea of having a few container components which are connected to the store and having a lot of dumb components which don't know about the store, so I wouldn't recommend using that approach. A better approach would be to pick a fitting container which actually loads navigation items and here it's not in the container folder but in the layout folder simply because we use it to wrap other components, the layout.js file is a class-based component and there we implement the toolbar and the side drawer which are of course the components which use navigation items in the end. So it would make sense to connect the layout here to our store so that we can pass the auth information down to toolbar and side drawer which then in turn could pass it to navigation items.This is exactly what I want to do,