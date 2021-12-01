import Product from '../../model/product';

export const DELETE_ON_CLICK = 'DELETE_ON_CLICK';
export const ADD = 'ADD';
export const EDIT = 'EDIT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json');
      if (!response.ok) {
        throw new Error('Response is not 200');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].description,
            resData[key].imageUrl,
            resData[key].price,
          ),
        );
        dispatch({ type: SET_PRODUCTS, products: loadedProducts });
      }
    } catch (error) {
      throw error;
    }
  };
};

export const deleteOnClick = (id) => {
  return async (dispetch) => {
    const response = await fetch(`https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products/${id}.json`, {
      method: 'DELETE',
    });
    const resData = await response.json();
    console.log(resData);
    dispetch({ type: DELETE_ON_CLICK, id: id });
  };
};

export const addNewProduct = (title, imageUrl, description, price) => {
  return async (dispatch) => {
    const response = await fetch('https://rn-shop-app-e309f-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        imageUrl,
        description,
        price,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
    dispatch({
      type: ADD,
      id: responseData.name,
      title: title,
      imageUrl: imageUrl,
      description: description,
      price: price,
    });
  };
};

export const editProduct = (id, ownerId, title, description, imageUrl) => {
  return { type: EDIT, id: id, ownerId: ownerId, title: title, description: description, imageUrl: imageUrl };
};
