import { DELETE_ON_CLICK, ADD, EDIT, SET_PRODUCTS } from '../action/product';
import Product from '../../model/product';

const initialState = {
  products: [],
  userProducts: [],
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        products: action.products,
        userProducts: action.userProducts,
      };
    case DELETE_ON_CLICK:
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      let newListProducts = [];
      newListProducts = state.products.filter((item) => item.id !== action.id);
      return { ...state, userProducts: [...newList], products: [...newListProducts] };
    case ADD:
      const product = new Product(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        action.price,
      );
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
