import { shallow } from './jest.setup';
import React from 'react';

import feedContainer from './src/components/feedContainer.jsx'

// const wrapper = shallow(<MyComponent />);
// expect(wrapper.equals(<div className="foo bar" />)).to.equal(true);
describe('feedContainer',() =>{
  it('contains 1 <feedContainer/> component', () => {
    // const wrapper = shallow(<feedContainer />);
    const wrapper = shallow(<feedContainer />);
  expect(wrapper.equals(<h1>Feed Container</h1>)).to.equal(true);
  });
})
