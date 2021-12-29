import { createSlice } from '@reduxjs/toolkit';

export const getProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://shop-application-comtrade-default-rtdb.firebaseio.com/products.json');
      if (!response.ok) {
        throw new Error('Response is not 200');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push({
          id: key,
          ownerId: resData[key].ownerId,
          title: resData[key].title,
          imageUrl: resData[key].imageUrl,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      const objProducts = {
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      };
      dispatch(setProductsDispatch(objProducts));
    } catch (error) {
      throw error;
    }
  };
};

export const deleteOnClick = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Response is not 200');
    }
    dispatch(deleteProductDispatch(id));
  };
};

export const addNewProduct = (values) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          imageUrl: values.imageUrl,
          description: values.description,
          price: values.price,
          ownerId: userId,
        }),
      },
    );
    const responseData = await response.json();
    const productData = {
      id: responseData.name,
      title: values.title,
      imageUrl: values.imageUrl,
      description: values.description,
      price: values.price,
      ownerId: userId,
    };
    dispatch(addNewProductDispatch(productData));
  };
};

export const editProduct = (values) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com//products/${values[0]}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values[1].title,
          imageUrl: values[1].imageUrl,
          description: values[1].description,
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Response is not 200');
    }
    const editProductInfo = {
      id: values[0],
      title: values[1].title,
      description: values[1].description,
      imageUrl: values[1].imageUrl,
    };
    dispatch(editProductDispatch(editProductInfo));
  };
};

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    userProducts: [],
  },
  reducers: {
    setProductsDispatch(state, action) {
      state.products = action.payload.products.sort(function (a, b) {
        return ('' + a.title).localeCompare(b.title);
      });
      state.userProducts = action.payload.userProducts;
    },
    deleteProductDispatch(state, action) {
      let newList = [];
      newList = state.userProducts.filter((item) => item.id !== action.payload);
      let newListProducts = [];
      newListProducts = state.products.filter((item) => item.id !== action.payload);
      state.userProducts = [...newList];
      state.products = [...newListProducts];
    },
    addNewProductDispatch(state, action) {
      const product = {
        id: action.payload.id,
        ownerId: action.payload.ownerId,
        title: action.payload.title,
        imageUrl: action.payload.imageUrl,
        description: action.payload.description,
        price: action.payload.price,
      };
      state.products = state.products.concat(product);
      state.userProducts = state.userProducts.concat(product);
    },
    editProductDispatch(state, action) {
      const editIndex = state.userProducts.find((prod) => prod.id === action.payload.id);
      const editedProduct = {
        id: action.payload.id,
        ownerId: action.payload.ownerId,
        title: action.payload.title,
        imageUrl: action.payload.imageUrl,
        description: action.payload.description,
        price: editIndex.price,
      };
      const editedMap = state.userProducts.filter((product) => product.id !== editedProduct.id);
      const editedMapProducts = state.products.filter((product) => product.id !== editedProduct.id);
      state.products.splice(editIndex, 1);
      state.products = [...editedMapProducts, editedProduct];
      state.userProducts = [...editedMap, editedProduct];
    },
  },
});

export const { setProductsDispatch, deleteProductDispatch, addNewProductDispatch, editProductDispatch } =
  productsSlice.actions;

export default productsSlice.reducer;
