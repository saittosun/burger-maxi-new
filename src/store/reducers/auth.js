// jshint esversion: 6
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    // I expect to get this property on my action
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false
  });
}

// we execute or we dispatch the logout function after that time span and that allows me to now go into my reducer and there, handle the logout case.
const authLogout = (state, action) => {
  return updateObject(state, {
    //  so that I am essentially logged out because all that core information that made up a logged in user is now lost again. 
    token: null,
    userId: null
  })
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, {
    authRedirectPath: action.path
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START: return authStart(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;