import { ADD_PRODUCT } from '../action/cart';
import { DELETE_PRODUCT } from '../action/cart';
import { CREATOR } from '../action/order';
import { DELETE } from '../action/product';
import {ADD} from '../action/product';
import Product from '../../model/product';

const initState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      if (action.type === ADD_PRODUCT) {
        const prodIndex = state.items.findIndex((item) => item.id === action.product.id);
        let newItems = [];
        if (prodIndex === -1) {
          prod = new CartProduct();
          for (var k in action.product) prod[k] = action.product[k];
          prod.count = 1;
          newItems = [...state.items, prod];
        } else {
          state.items.map((item) => {
            if (item.id === action.product.id) {
              item.count = item.count + 1;
              newItems = [...state.items];
            }
          });
        }
        const totalCost = state.total + action.product.price;
        return {
          items: newItems.sort(function (a, b) {
            return ('' + a.title).localeCompare(b.title);
          }),
          total: parseFloat(totalCost.toFixed(2)),
        };
      }
    case DELETE_PRODUCT:
      if (action.type === DELETE_PRODUCT) {
        let newItems = [];
        const cartProducts = [...state.items];
        state.items.map((item, index) => {
          if (item.id === action.id) {
            if (item.count === 1) {
              state.total = state.total - item.price;
              newItems = state.items.filter((item) => item.id !== action.id);
            } else if (item.count > 1) {
              item.count = item.count - 1;
              state.total = state.total - item.price;
              newItems = [...state.items];
            }
          }
        });
        return {
          items: newItems.sort(function (a, b) {
            return ('' + a.title).localeCompare(b.title);
          }),
          total: parseFloat(state.total.toFixed(2)),
        };
      }
    case CREATOR:
      if (action.type === CREATOR) {
        return { items: [], total: 0 };
      }
    case DELETE:
      if (action.type === DELETE) {
        let newList = [];
          newList = state.items.map((item) => {
          if (item.id !== action.id) {
            return item;
          } else if (item.id === action.id) {
            state.total = state.total - item.count * item.price;
          }
        });
        newList = newList.filter((item) => item !== undefined);
        return { ...state, items: [...newList], total: parseFloat(state.total.toFixed(2)) };
      }
      case ADD:
      if(action.type===ADD)
      {
        let product=new Product(Math.random(),'u1', action.product.title, action.product.imageUrl, action.product.description, action.product.price);
        return{
          ...state, items: state.items.concat(product)
        }
    }
    default:
      return state;
  }
};

export default cartReducer;
