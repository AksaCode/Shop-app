export const DELETE_ON_CLICK = 'DELETE_ON_CLICK';
export const ADD = 'ADD';
export const EDIT = 'EDIT';

export const deleteOnClick = (id) => {
  return { type: DELETE_ON_CLICK, id: id };
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
