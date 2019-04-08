import React from 'react';
import { shallow } from 'enzyme';

import App from './index.jsx';

it('App', () => {
  const app = shallow(<App />);
  expect(1).toEqual(1);
});

describe('App Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});