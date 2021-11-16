import { PRODUCTS } from '../../data/dummy-data';
import { DELETE } from '../action/product';

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
    default:
      return state;
  }
};

export default productsReducer;
