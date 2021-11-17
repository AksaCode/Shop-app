import { PRODUCTS } from '../../data/dummy-data';
import { DELETE } from '../action/product';
import { ADD } from '../action/product';

import Product from '../../model/product';

const initialState = {
  products: PRODUCTS,
  userProducts: PRODUCTS.filter((item) => item.ownerId === 'u1'),
  //dodajem preko rest operatora novi product
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE:
      if(action.type===DELETE){
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      return { ...state, userProducts: [...newList] };
      }
    case ADD:
      if(action.type===ADD)
      {
        const exIndex = state.userProducts.findIndex((item) => item.id === action.id);
        let product=new Product(Math.random(),'u1', action.product.title, action.product.imageUrl, action.product.description, action.product.price);
        console.log(product);
    }
    default:
      return state;
  }
};

export default productsReducer;
