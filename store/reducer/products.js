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
      if(action.type===DELETE){
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      return { ...state, userProducts: [...newList] };
      }
    case ADD:
      if(action.type===ADD)
      {
        
        const product=new Product(Math.random(),'u1', action.product.title, action.product.imageUrl, action.product.description, action.product.price);
        console.log(product);
        return{
          ...state , products: state.products.concat(product), userProducts: state.products.concat(product)
          
        }
        
    }
    default:
      return state;
  }
};

export default productsReducer;
