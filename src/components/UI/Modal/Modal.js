// jshint esversion: 6
import React, { Component } from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/_Aux/_Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {//Alternatively of course, you could keep this as a functional component and wrap the exported component, so the modal constant you're exporting with React.memo.
//if we can control the updating of order summary which is wrapped by the modal by changing the way the modal itself updates.
  shouldComponentUpdate(nextProps, nextState) {// we don't react to changes in the clicked listener, so if the modal closed property would change, we're not checking this, so we only return true if show changed.
    // if (nextProps.show !== this.props.show) {
    //   return true;
    // }
    return nextProps.show !== this.props.show ||
           nextProps.children !== this.props.children;
  }

  componentWillUpdate() {
    console.log('[Modal] will update');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
        <div 
          className={classes.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)', 
            opacity: this.props.show ? '1' : '0'
          //props.children really can be anything, can be our own components, can be some text, a paragraph, that is totally up to us how we use the modal and we can pass anything in there.
          }}>
          {this.props.children}
        </div>
      </Aux>
    )
  }
}

export default Modal;