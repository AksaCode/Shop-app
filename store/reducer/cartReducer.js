import { ADD_PRODUCT } from '../action/cart';
import { DELETE_PRODUCT } from '../action/cart';

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
          prod = { ...action.product, count: 1 };
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
      const existingProduct = state.items.findIndex((product) => product.id === action.id);
      if (existingProduct >= 0) {
        const updateProducts = [...state.items];
        updateProducts.splice(existingProduct, 1);
        return { items: updateProducts };
      }
    default:
      return state;
  }
};

export default cartReducer;
