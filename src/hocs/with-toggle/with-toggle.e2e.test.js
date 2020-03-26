import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withToggle from './with-toggle.jsx';

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;

it(`Should toggle component`, () => {
  const MockComponentWrapped = withToggle(MockComponent);
  const wrapper = shallow(<MockComponentWrapped/>);
  expect(wrapper.props().isChecked).toBe(false);
  wrapper.props().handleToggleClick();
  expect(wrapper.props().isChecked).toBe(true);
});
