import Product from '../../model/product';

export const DELETE_ON_CLICK = 'DELETE_ON_CLICK';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json');

    const resData = await response.json();
    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(key, 'u1', resData[key].title, resData[key].description, resData[key].imageUrl, resData[key].price),
      );
    }
    dispatch({ type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const deleteOnClick = (id) => {
  return { type: DELETE_ON_CLICK, id: id };
};

export const addNewProduct = (title, imageUrl, description, price) => {
  return { type: ADD, title: title, imageUrl: imageUrl, description: description, price: price };
};

export const editProduct = (id, ownerId, title, description, imageUrl) => {
  return async (dispatch) => {
    await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
      }),
    });
    dispatch({ type: EDIT, id: id, ownerId: ownerId, title: title, description: description, imageUrl: imageUrl });
  };
};
