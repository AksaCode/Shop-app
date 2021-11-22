import { ADD_PRODUCT } from '../action/cart';
import { DELETE_PRODUCT } from '../action/cart';
import { CREATOR } from '../action/order';
import { DELETE_ON_CLICK } from '../action/product';
import { EDIT } from '../action/product';
import CartProduct from '../../model/cart';
import Product from '../../model/product';

const initState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT: {
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
    case DELETE_PRODUCT: {
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
    case CREATOR: {
      return { items: [], total: 0 };
    }
    case DELETE_ON_CLICK: {
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
    case EDIT:
      const EditedProduct = state.items.find((prod) => prod.id === action.id);
      const newEditedProduct = new CartProduct(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        EditedProduct.price,
        EditedProduct.count,
      );
      const editedItems = state.items.filter((product) => product.id !== EditedProduct.id);
      return {
        ...state,
        items: [...editedItems, newEditedProduct],
      };
    default:
      return state;
  }
};

export default cartReducer;
