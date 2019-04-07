import React from 'react';
import { shallow } from 'enzyme';

import App from './index.jsx';

function setup() {
  const props = {
    imgPath: 'some/image/path/to/a/mock/image',
  };
  const wrapper = shallow(<App />);
  return { wrapper, props };
}

describe('App Test Suite', () => {
  it('Should have an image', () => {
    const { wrapper } = setup();
    expect(wrapper.exists()).toBe(true);
  });
});