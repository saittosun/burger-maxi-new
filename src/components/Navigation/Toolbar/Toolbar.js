//jshint esversion: 6
import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';


const toolbar = (props) => (
  // I do have that logo class defined in three different files but due to css modules, this is actually converted to three different css classes so that they don't interfere.
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    {/* <Logo height="80%" /> */}
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
)

export default toolbar;