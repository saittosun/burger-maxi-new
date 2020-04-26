// jshint esversion: 9
import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});
// This can now be rendered again with shallow and so on, just as we rendered the normal component because it is just a normal component and we totally strip out the connection to redux which is what we want. You essentially strip out the component part and get rid of the connection to redux.

describe('<BurgerBuilder/>', () => {
  let wrapper;
  beforeEach(() => {
    // We have to add it here onInitIngredients and I'll set it to an empty arrow function here, to simply fulfill the requirement of passing a function.
    wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}}/>);
  });

  it('should render <BuildControls/> when receiving ingredients', () => {
    wrapper.setProps({ings: {salad: 0}});
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
})