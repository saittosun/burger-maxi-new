// jshint esversion: 9
import * as actionTypes from './actionTypes';
import axios from '../../../src/axios-orders';

// these two actioncreators are sync
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error
  }
}

// so that I can handle this in redux because this being a async normal action reaches redux which has the reducer.
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

// async actioncreator--this is the action we dispatched from the container once we click that order button. 
// Now I'll create an action creator for this (actionTypes.js de ki => export const PURCHASE_BURGER_START = 'PURCHASE_BURGER_START';) , we have one which is named like this but this has our async code and therefore doesn't return an action, so I'll actually refactor this and I'll add a new action creator. bu yuzden ismini degistirdi.
export const purchaseBurger = (orderData, token) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios
    .post('/orders.json?auth=' + token, orderData)
    .then(response => {
      console.log(response.data);
      dispatch(purchaseBurgerSuccess(response.data.name, orderData))
    })
    .catch(error => {
      dispatch(purchaseBurgerFail(error)); 
    })
  }
}

// PURCHASE_INIT will be dispatched whenever we load the checkout page
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START
  }
}

// make sure that we can still reach orders if we are authenticated and have a token. To do that, I need to go to the place where we actually send this orders request and that of course is the action creators
export const fetchOrders = (token) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    // Here we essentially have to add our token, our token we got back from firebase when authenticating and then we can attach this (?auth=) token to this request. we received the token here when dispatching fetchOrders, fetch orders is of course dispatched in my orders container,
    axios.get('/orders.json?auth=' + token)
      .then(res => {
        // res.data will hold the data we get from firebase
        console.log(res.data);
        // I of course want to turn my orders object into an array and I can simply do that by using a for/in loop.
        const fetchedOrders = [];
        // given key, accessing the value which of course is the order.
        for (let key in res.data) {
          // I'll instead push a new object onto this fetchedOrders array where I will distribute the properties off the Order object I've fetched from firebase with the spread operator and add one new property ID which is the key because remember the key is in this object we've fetched from firebase where the ID's created by firebase. So now I have my fetchedOrders array full of order objects which also are aware of their IDs.
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });
        }
        // I want to pass my fetched orders which I do transform here as an argument and that is a good argument for where do we transform data. I do it here because I'm transforming the data I'm getting back, I don't want to put this into the reducer because if I ever change my backend data, I would have to change my reducer and in this case, I have to change my action creator I guess, but still it feels more natural for me to have a reducer where I get the data in the format I want to store it, where I only want to do logical changes and don't want to change anything just because of the data format I get. That is why I do data format changes like this in my action creators.
        dispatch(fetchOrdersSuccess(fetchedOrders));
        // this.setState({loading: false, orders: fetchedOrders});
      })
      .catch(err => {
        dispatch(fetchOrdersFail(err));
      });
  }
}