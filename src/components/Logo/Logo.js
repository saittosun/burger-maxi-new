//jshint esversion: 6
import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';//we should also make webpack aware of the fact that we're using this image and we're actually doing that by importing the image into our javascript file. Now of course just like for the css files, this does not mean that webpack mixes the image with our javascript code, how would that look like anyways? It just means we make webpack aware of the fact that we're using this image and webpack will then handle this image with a special plug-in or a special module that was added to webpack, to its config, will handle the image, will basically copy it over to the destination directory it creates, again only in memory during development and we'll even optimize the image.

import classes from './Logo.css';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
)

export default logo;