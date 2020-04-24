// jshint esversion: 9
import axios from 'axios';

import * as actionTypes from './actionTypes';

// I will essentially use this action to set a loading state and potentially show a spinner if I want to.
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

// with that, we got this timer in place in our action creator's file in checkAuthTimeout which will fire after whatever firebase returns us and which will then ensure that the user is logged out. And for now, this will clear the store and not do much else, it won't show any visual feedback but we will implement something to happen when the user logs out including when he deliberately logs out to give the user a clue that he's not logged in anymore.
export const checkAuthTimeout = (expirationTime) => {
  // I will return this function where I get dispatch as an argument because I want to run some async code.
  return dispatch => {
    setTimeout(() => {
      // So here I would call dispatch after the expiration time to call the logout action, always execute these functions because that then returns the action (yukaridaki logout actioncreator dan bahsediyor) which is actually dispatched
      dispatch(logout());
      // I want to multiply this value with one thousand to turn my milliseconds to real seconds, so now it should be one hour.
    }, expirationTime * 1000);
  }
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart())
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfJAwZWGyJIt_3DeJJ27QilDOgB6nPgaQ';
    if (!isSignup) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfJAwZWGyJIt_3DeJJ27QilDOgB6nPgaQ';
    }
    axios
      .post(url, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        // I will dispatch this checkAuthTimeout action when we get back a success response
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(err => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      })
  }
}

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

