import { PRODUCTS } from '../../data/dummy-data';
import { DELETE_ON_CLICK } from '../action/product';
import { ADD } from '../action/product';
import { EDIT } from '../action/product';
import Product from '../../model/product';

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ON_CLICK:
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      let newListProducts = [];
      newListProducts = state.products.filter((item) => item.id !== action.id);
      return { ...state, userProducts: [...newList], products: [...newListProducts] };
    case ADD:
      console.log('edit start');
      const product = new Product(Math.random(), 'u1', action.title, action.imageUrl, action.description, action.price);
      console.log(product);
      return {
        ...state,
        products: state.products.concat(product),
        userProducts: state.userProducts.concat(product),
      };
    case EDIT:
      console.log('edit start');
      const editIndex = state.userProducts.find((prod) => prod.id === action.id);
      const editedProduct = new Product(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        editIndex.price,
      );
      console.log(editedProduct);
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
