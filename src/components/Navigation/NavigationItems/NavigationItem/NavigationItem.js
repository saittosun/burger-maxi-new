//jshint esversion: 6
import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItem.css';

const navigationItem = (props) => (
    <li className={classes.NavigationItem}>
      <NavLink 
        to={props.link}
        exact={props.exact}
        // this will now be the active class name as our css modules transformation spits it out.
        activeClassName={classes.active}>
        {/* the class name isn't needed at all, we don't have to define if it's active or not, it will automatically determine this. */}
        {/* className={props.active ? classes.active : null} */}
        {props.children}
      </NavLink>
    </li>
)

export default navigationItem;