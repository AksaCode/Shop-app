import { ADD_PRODUCT } from '../action/cart';

const initState = {
  items: [],
  total: 0,
};

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      if (action.type === ADD_PRODUCT) {
        const newItems = [...state.items, action.product];
        const totalCost = state.total + action.product.price;
        return {
          items: newItems.sort(function (a, b) {
            return ('' + a.title).localeCompare(b.title);
          }),
          total: parseFloat(totalCost.toFixed(2)),
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
