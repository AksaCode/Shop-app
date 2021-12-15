import {  createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cartItems',
  initialState:{
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
        state.items= newItems.sort(function (a, b) {
          return ('' + a.title).localeCompare(b.title);
        })
        state.total= totalCost.toFixed(2)
      
    },
  },
  deleteProduct(state, action) {
    console.log(action.payload);
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
  
      state.items= newItems.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      })
      state.total= parseFloat(state.total.toFixed(2))
    
  }
});

export const {addProduct,deleteProduct} = cartSlice.actions;
export default cartSlice.reducer;
