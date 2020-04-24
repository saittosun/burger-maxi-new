// jshint esversion: 9
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false
}

const purchaseInit = (state, action) => {
  return updateObject(state, {purchased: false});
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT: return purchaseInit();
      // return updateObject(state, {purchased: false});
      // return {
      //   ...state,
      //   purchased: false
      // }
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId
      }
      return {
        ...state,
        loading: false,
        purchased: true,
        // concat returns a new array and therefore we added this immutably.
        orders: state.orders.concat(newOrder)
      }
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        // to set loading to false of course also because even if it failed, we're still done and the error should be handled through that modal since we added the withErrorHandler higher order component to contact data.
        loading: false,

      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        // we can confirm this in our action creator, in the order file, there we dispatched fetchOrderSuccess and in fetchOrdersSuccess, we have our orders property. So this is the orders property we can extract in our reducer therefore, this one and these are the orders already. if you have a look at the transformation function(yine ayni yerde fetchedOrders da) in an array format, so we can store that in our array.
        orders: action.orders,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        //because even though it failed, the loading at least is done.
        loading: false
      }
    default:
      return state;
  }
}

export default reducer;