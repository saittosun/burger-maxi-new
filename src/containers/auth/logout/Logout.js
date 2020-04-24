// jshint esversion: 9
import React, { Component } from 'react';

import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// I also want to redirect and now we have two different ways of doing that, one would be to forward the props of this component which will be loaded via the router, so therefore we could forward this props history and on that history object of the router, we would have the push method. Now what I want to do instead is I want to redirect declaratively.
class Logout extends Component {
  componentDidMount() {
    // this will then be the first thing I do when rendering this component.
    this.props.onLogout();
  }
  render() {
    // means whenever this container is loaded, it just redirects me,
    return <Redirect to="/"/>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(null, mapDispatchToProps) (Logout);