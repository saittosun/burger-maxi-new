//jshint esversion: 6
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {//return something will not be the jsx code immediately but a real function body we'll use here because before I return jsx in there, I basically want to conditionally attach different css classes to make sure we play some animation when the drawer is shown. So we'll add an open class which kind of slides it in and a close class which kind of slides it out
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
      //This is one clever way of adjusting this, setting the height as a property where we simply pass the percentage height to the logo component and in the component, assign it dynamically via inline styles.
      // we can simply set show like this and since it is a boolean property, we don't need to assign a value. Just by adding it, it will be set to true
    <Aux>
      <Backdrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(' ')}>
        {/* <Logo height="11%" /> */}
        <div className={classes.Logo}>
          <Logo  />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  )
}

export default sideDrawer;