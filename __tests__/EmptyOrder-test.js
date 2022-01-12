import React from 'react';
import renderer from 'react-test-renderer';
import EmptyOrder from '../components/EmptyOrder';

test('renders correctly', () => {
  const tree = renderer.create(<EmptyOrder />).toJSON();
  expect(tree).toMatchSnapshot();
});
