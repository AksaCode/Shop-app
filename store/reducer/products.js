import { PRODUCTS } from '../../data/dummy-data';

const initialState = {
  products: PRODUCTS,
};

const productsReducer = (state = initialState, action) => {
  return state;
};

export default productsReducer;
