import { PRODUCTS } from '../../data/dummy-data';
import { DELETE } from '../action/product';
import { ADD } from '../action/product';
import Product from '../../model/product';

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      return { ...state, userProducts: [...newList] };
    case ADD:
      const product = new Product(Math.random(), 'u1', action.title, action.imageUrl, action.description, action.price);
      return {
        ...state,
        products: state.products.concat(product),
        userProducts: state.userProducts.concat(product),
      };
    default:
      return state;
  }
};

export default productsReducer;
