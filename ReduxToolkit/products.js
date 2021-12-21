import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProducts = createAsyncThunk('products/getProducts', async (data, { getState, dispatch }) => {
  const userId = getState().auth.userId;
  const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json');
  const resData = await response.json();
  let fromGetProducts = { items: { ...resData }, userId: userId };
  return fromGetProducts;
});

export const deleteOnClick = createAsyncThunk('products/deleteOnClick', async (id, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
    {
      method: 'DELETE',
    },
  );
  if (!response.ok) {
    throw new Error('Response is not 200');
  }
  return id;
});

export const addNewProduct = createAsyncThunk('products/addNewProduct', async (data, { getState }) => {
  const token = getState().auth.token;
  const userId = getState().auth.userId;

  const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      imageUrl: data.imageUrl,
      description: data.description,
      price: data.price,
      ownerId: userId,
    }),
  });
  const responseData = await response.json();
  const id = responseData.name;
  const prodData = { ...data, ownerId: userId, id };
  return prodData;
});
export const editProduct = createAsyncThunk('products/editProduct', async (data, { getState }) => {
  const token = getState().auth.token;
  const response = await fetch(
    `https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${data[0]}.json?auth=${token}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data[1].title,
        imageUrl: data[1].imageUrl,
        description: data[1].description,
      }),
    },
  );
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
      for (const key in action.payload.items) {
        loadedProducts.push({
          id: key,
          ownerId: action.payload.items[key].ownerId,
          title: action.payload.items[key].title,
          imageUrl: action.payload.items[key].imageUrl,
          description: action.payload.items[key].description,
          price: action.payload.items[key].price,
        });
      }
      state.products = [...loadedProducts];
      state.userProducts = [...loadedProducts.filter((prod) => prod.ownerId === action.payload.userId)];
    },
    [getProducts.rejected]: (state) => {
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
