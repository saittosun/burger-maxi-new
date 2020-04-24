//jshint esversion: 6
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import reducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: reducer,
  auth: authReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);

registerServiceWorker();
