import Product from '../../model/product';

export const DELETE_ON_CLICK = 'DELETE_ON_CLICK';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch('https://shop-application-comtrade-default-rtdb.firebaseio.com//products.json');
      if (!response.ok) {
        throw new Error('Response is not 200');
      }
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
        dispatch({
          type: SET_PRODUCTS,
          products: loadedProducts,
          userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const deleteOnClick = (id) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com//products/${id}.json?auth=${token}`,
      {
        method: 'DELETE',
      },
    );
    if (!response.ok) {
      throw new Error('Response is not 200');
    }
    dispatch({ type: DELETE_ON_CLICK, id: id });
  };
};

export const addNewProduct = (title, imageUrl, description, price) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com//products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          imageUrl,
          description,
          price,
          ownerId: userId,
        }),
      },
    );
    const responseData = await response.json();
    dispatch({
      type: ADD,
      id: responseData.name,
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
      ownerId: userId,
    });
  };
};

export const editProduct = (id, title, imageUrl, description) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://shop-application-comtrade-default-rtdb.firebaseio.com//products/${id}.json?auth=${token}`,
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
    dispatch({ type: EDIT, id: id, title: title, description: description, imageUrl: imageUrl });
  };
};
