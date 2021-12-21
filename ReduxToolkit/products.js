import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getProducts', async (data, { getState, dispatch }) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;
  const status = getState().auth.status;
  console.log('userId: ', userId);
  console.log('token: ', token);
  console.log('status: ', status);
  const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json');
  const resData = await response.json();
  return resData;
});

export const deleteOnClick = createAsyncThunk('products/deleteOnClick', async (id, { getState }) => {
  const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Response is not 200');
  }
  return id;
});

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (data, { getState }) => {
  const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      imageUrl: data.imageUrl,
      description: data.description,
      price: data.price,
      ownerId: 'I47kHpgjeqYoUhxfll9knc2VhPx2',
    }),
  });
  const responseData = await response.json();
  const id = responseData.name;
  const prodData = { ...data, ownerId: 'I47kHpgjeqYoUhxfll9knc2VhPx2', id };
  console.log('proddata:', prodData);
  return prodData;
});
export const editProduct = createAsyncThunk('products/editProduct', async (data, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${data[0]}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data[1].title,
      imageUrl: data[1].imageUrl,
      description: data[1].description,
    }),
  });
  if (!response.ok) {
    throw new Error('Response is not 200');
  }
  const resData = await response.json();
  const editParams = [resData, data[0]];

  return editParams;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    userProducts: [],
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.products = [];
      state.userProducts = [];
    },
    [getProducts.fulfilled]: (state, action) => {
      const loadedProducts = [];
      for (const key in action.payload) {
        loadedProducts.push({
          id: key,
          ownerId: action.payload[key].ownerId,
          title: action.payload[key].title,
          imageUrl: action.payload[key].imageUrl,
          description: action.payload[key].description,
          price: action.payload[key].price,
        });
      }
      state.products = [...loadedProducts];
      state.userProducts = [...loadedProducts.filter((prod) => prod.ownerId === 'I47kHpgjeqYoUhxfll9knc2VhPx2')];
    },
    [getProducts.rejected]: (state, action) => {
      state.products = [];
      state.userProducts = [];
    },
    [deleteOnClick.fulfilled]: (state, action) => {
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.payload);
      let newListProducts = [];
      newListProducts = state.products.filter((item) => item.id !== action.payload);
      state.userProducts = [...newList];
      state.products = [...newListProducts];
    },
    [addNewProduct.pending]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
    [addNewProduct.fulfilled]: (state, action) => {
      const product = {
        id: action.id,
        ownerId: action.ownerId,
        title: action.title,
        imageUrl: action.imageUrl,
        description: action.description,
        price: action.price,
      };
      state.products = state.products.concat(product);
      state.userProducts = state.userProducts.concat(product);
    },
    [addNewProduct.rejected]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
    [editProduct.pending]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
    [editProduct.fulfilled]: (state, action) => {
      const editIndex = state.userProducts.find((prod) => prod.id === action.payload[1]);
      const product = {
        id: action.payload[1],
        ownerId: action.payload[0].ownerId,
        title: action.payload[0].title,
        imageUrl: action.payload[0].imageUrl,
        description: action.payload[0].description,
        price: editIndex.price,
      };
      const editedMap = state.userProducts.filter((prod) => prod.id !== product.id);
      const editedMapProducts = state.products.filter((prod) => prod.id !== product.id);
      state.products.splice(editIndex, 1);

      state.products = [...editedMapProducts, product];
      state.userProducts = [...editedMap, product];
    },
    [editProduct.rejected]: (state) => {
      state.products = [...state.products];
      state.userProducts = [...state.userProducts];
    },
  },
});

export default productsSlice.reducer;
