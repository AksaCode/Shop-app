import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartItems',
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addProduct(state, action) {
      const prodIndex = state.items.findIndex((item) => item.id === action.payload.id);
      let newItems = [];
      if (prodIndex === -1) {
        prod = {};
        for (var k in action.payload) prod[k] = action.payload[k];
        prod.count = 1;
        newItems = [...state.items, prod];
      } else {
        state.items.map((item) => {
          if (item.id === action.payload.id) {
            item.count = item.count + 1;
            newItems = [...state.items];
          }
        });
      }
      const totalCost = +state.total + +action.payload.price;
      state.items = newItems.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      state.total = totalCost.toFixed(2);
    },
    deleteProduct(state, action) {
      let newItems = [];
      const cartProducts = [...state.items];
      state.items.map((item, index) => {
        if (item.id === action.payload) {
          if (item.count === 1) {
            state.total = state.total - item.price;
            newItems = state.items.filter((item) => item.id !== action.payload);
          } else if (item.count > 1) {
            item.count = item.count - 1;
            state.total = state.total - item.price;
            newItems = [...state.items];
          }
        }
      });

      state.items = newItems.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      state.total = parseFloat(state.total.toFixed(2));
    },
    restartOrder(state, action) {
      state.items = [];
      state.total = 0;
    },
    deleteOnClick(state, action) {
      let newListItems = [];
      newList = state.userProducts.filter((item) => item.id !== action.payload);
      state.items = [...newListItems];
    },
    editProduct(state, action) {
      const editItems = state.items.find((item) => item.id === action.payload[1]);
      const items = {
        id: action.payload[1],
        ownerId: action.payload[0].ownerId,
        title: action.payload[0].title,
        imageUrl: action.payload[0].imageUrl,
        description: action.payload[0].description,
        price: editItems.price,
      };
      const editedMapItems = state.items.filter((item) => item.id !== items.id);
      state.items.splice(editItems, 1);
      state.items = [...editedMapItems, items];
    },
  },
});

export const { addProduct, deleteProduct, restartOrder, deleteOnClick, editProduct } = cartSlice.actions;
export default cartSlice.reducer;
