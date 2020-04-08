import * as React from "react";
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withToggle from './with-toggle';

configure({
  adapter: new Adapter()
});

const MockComponent = () => <div />;

it(`Should toggle component`, () => {
  const MockComponentWrapped = withToggle(MockComponent);
  const wrapper = shallow(<MockComponentWrapped/>);
  expect(wrapper.props().isChecked).toBe(false);
  wrapper.props().onToggleClick();
  expect(wrapper.props().isChecked).toBe(true);
});
