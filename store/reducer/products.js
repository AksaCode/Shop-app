import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === 'u2'),
};

const productsReducer = (state = initialState, action) => {
  return state;
};

export default productsReducer;
