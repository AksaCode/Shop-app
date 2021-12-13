import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Product from '../model/product';

export const getProducts = createAsyncThunk('products/getProducts', async (dispatch, getState) => {
  const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json');
  const resData = await response.json();
  const loadedProducts = [];
  for (const key in resData) {
    loadedProducts.push(
      new Product(
        key,
        resData[key].ownerId,
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price,
      ),
    );
  }
  return loadedProducts;
});

export const deleteOnClick = createAsyncThunk('products/deleteOnClick', async (id, dispatch, getState) => {
  // ovde je bio return {}
  // const token = getState().auth.token;

  const response = await fetch(
    `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`, // ?auth=${token}
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    throw new Error('Response is not 200');
  }
});

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (data, dispatch) => {
  // ovde je bio return
  // const token = getState().auth.token;
  // const userId = getState().auth.userId;
  const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json`, {
    // ?auth=${token}
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      imageUrl: data.imageUrl,
      description: data.description,
      price: data.price,
      ownerId: 'zylavxBt6XR1D1Lj2vCsptTgKZh2', //userId
    }),
  });
  const responseData = await response.json();
  const id = responseData.name;
  const prodData = { ...data, ownerId: 'zylavxBt6XR1D1Lj2vCsptTgKZh2', id };
  return prodData;
});
export const editProduct = createAsyncThunk(
  'products/editProduct',
  async (id, title, imageUrl, description, dispatch, getState) => {
    // ovde je bio return
    // const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`, //?auth=${token}
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Response is not 200');
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    userProducts: [],
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.products = [];
      state.userProducts = [];
    },
    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;
      state.userProducts = action.payload.filter((prod) => prod.ownerId === 'zylavxBt6XR1D1Lj2vCsptTgKZh2'); //userId
    },
    [getProducts.rejected]: (state, action) => {
      state.products = [];
      state.userProducts = [];
    },
    [deleteOnClick.fulfilled]: (state, action) => {
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.id);
      let newListProducts = [];
      newListProducts = state.products.filter((item) => item.id !== action.id);
      state.userProducts = [...newList];
      state.products = [...newListProducts];
    },
    [addNewProduct.pending]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
    [addNewProduct.fulfilled]: (state, action) => {
      const product = new Product(
        action.id,
        action.ownerId,
        action.title,
        action.imageUrl,
        action.description,
        action.price,
      );
      state.products = state.products.concat(product);
      state.userProducts = state.userProducts.concat(product);
    },
    [addNewProduct.rejected]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
  },
});

export const { fetchProducts } = productsSlice.actions;

export default productsSlice.reducer;
