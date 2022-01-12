import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../components/Card';

test('renders correctly', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});
