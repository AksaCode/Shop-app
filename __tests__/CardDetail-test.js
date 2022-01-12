import React from 'react';
import renderer from 'react-test-renderer';
import CardDetail from '../components/CardDetail';

test('renders correctly', () => {
  const tree = renderer.create(<CardDetail />).toJSON();
  expect(tree).toMatchSnapshot();
});
