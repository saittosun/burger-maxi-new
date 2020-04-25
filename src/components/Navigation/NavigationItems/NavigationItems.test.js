//jshint esversion: 9
import React from 'react';

// Enzyme allows us to just render this navigation items component standalone independent of the entire other react application, that's the whole idea behind the enzyme package, that we can really write unit tests, isolated tests, tests where we don't need to render the complete react app.
// import something specific, this is a named export so we need curly braces,
// shallow is the one you should use as often as possible because one thing shallow does is it renders the component with all its content but the content isn't deeply rendered. So the navigation items component here has navigation item components but these are only rendered as placeholders, the content of them isn't rendered and that of course again is important for creating isolated tests where we don't then render a whole sub tree of components,
import {configure, shallow} from 'enzyme';

// I'll also need to configure enzyme and connect it to my react version. For that, I need to import the adapter
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

// adapter is instantiated with new adapter (as a constructor function) and that's all, with that enzyme is connected.
configure({adapter: new Adapter()})

// you don't need to import it in that file, it will automatically be made available in our create react app project once we run the test command. Describe is a function that takes two arguments
// First argument is only what you'll see later in the console output so it should be something which allows you to identify which kind of tests we'll run here.
describe('<NavigationItems />', () => {
  // you're going to write your actual tests.
  // It describes or allows you to write one individual test, it also takes two arguments. The first one is again just a string, a description which will appear in the console and typically you just complete the sentence so it and then you describe what it should do.
  // So this is just my description and it doesn't matter what you write here, this is not parsed or anything like that, it should just be something meaningful you recognize in a console because if the test fails, you want to know which test failed. the second argument is now again a testing function describing the actual test,
  it('should render two <NavigationItem /> elements if not authenticated', () => {
    // in here, we write our actual testing logic.
    const wrapper = shallow(
      <NavigationItems />
    )
    // Expect method which is made globally available by jest. Inside expect, we define our, the thing we want to check
    // Find is a function provided by enzyme defined method, this allows us to look into the wrapper and see if it contains a certain content and here I want to find a navigation item.
    // this is not jsx!!!
    // we can expect to find the navigation item as we said earlier, two times if we're not authenticated, so navigation item to half length is what we can call now and you see there are a couple of helper methods.
    expect(wrapper.find(NavigationItem)).toHaveLength(2)
  })
})

// it will have isAuthenticated set to false because we're not passing this prop, remember? We're just shallowly rendering navigation items, we're not sending any props here.