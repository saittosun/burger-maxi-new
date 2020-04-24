// jshint esversion: 6
import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../src/axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  // redux-2 de command yaptik cunku redux kullaniyoruz
  // state = {
  //   orders: [],
  //   loading: true
  // }

  // I obviously want to fetch all my orders. Now to do that I will implement componentDidMount. I can use componentDidMount here because I only want to fetch orders when this is loaded, there is no way we will go there with out remounting it So componentDidUpdate is not what I'm looking for, so componentDidMount is what I need.
  componentDidMount() {
    // get orders.json referring to that orders node on my backend and we set this as the baseURL on our own axios instance so I don't have to add this(firebase deki url den bahsediyor).
    // axios.get('/orders.json')
    //   .then(res => {
    //     // res.data will hold the data we get from firebase
    //     console.log(res.data);
    //     // I of course want to turn my orders object into an array and I can simply do that by using a for/in loop.
    //     const fetchedOrders = [];
    //     // given key, accessing the value which of course is the order.
    //     for (let key in res.data) {
    //       // I'll instead push a new object onto this fetchedOrders array where I will distribute the properties off the Order object I've fetched from firebase with the spread operator and add one new property ID which is the key because remember the key is in this object we've fetched from firebase where the ID's created by firebase. So now I have my fetchedOrders array full of order objects which also are aware of their IDs.
    //       fetchedOrders.push({
    //         ...res.data[key],
    //         id: key
    //       });
    //     }
    //     this.setState({loading: false, orders: fetchedOrders});
    //   })
    //   .catch(err => {
    //     this.setState({loading: false});
    //   });
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner/>
    if (!this.props.loading) {
      orders = (
        // since it's not wrapped in any html element, we can just write it like this. cunku bu iki parantez arasindaki bolumu {} bunlarin arasinda onceden yazmistik
        this.props.orders.map(order => {
          return (
            <Order 
            // firebase orders objectinin icine girdik
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}/>
          )
        })
      )
    }
    return (
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // With state order, I'm reaching out to the order reducer and with orders, I then reach out to the orders property in the state of that reducer
    orders: state.order.orders,
    loading: state.order.loading,
    // not .order because I'm not interested in the order related slice of my state instead if we have a look at the index.js file where we combine the reducers, the auth reducer which sets up the state for the token, the auth reducer can be found on an auth property, so this is what we should access. So in orders, I should access state.auth.token, like this
    token: state.auth.token
  }
}

// I want to dispatch this new fetch orders action we just created and for this, I of course need to create my new mapDispatchToProps constant
const mapDispatchToProps = dispatch => {
  return {
    // fetchOrders() bu actioncreator
    // we have to get the token in the place where we call onFetchOrders
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(Orders, axios));