import { PRODUCTS } from '../../data/dummy-data';
import { DELETE, editProduct } from '../action/product';
import { ADD } from '../action/product';
import { EDIT } from '../action/product';
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
    case EDIT:
      const editIndex = state.userProducts.find((prod) => prod.id === action.id);
      const editedProduct = new Product(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        editIndex.price,
      );
      const editedMap = state.userProducts.filter((product) => product.id !== editedProduct.id);
      const editedMapProducts = state.products.filter((product) => product.id !== editedProduct.id);
      state.products.splice(editIndex, 1);
      return {
        ...state,
        products: [...editedMapProducts, editedProduct],
        userProducts: [...editedMap, editedProduct],
      };
    default:
      return state;
  }
};

export default productsReducer;
