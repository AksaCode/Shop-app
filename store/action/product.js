export const DELETE_ON_CLICK = 'DELETE_ON_CLICK';
export const ADD = 'ADD';
export const EDIT = 'EDIT';

export const deleteOnClick = (id) => {
  return async dispetch => {
    await fetch(`https://rn-complete-guide.firebaseio.com/products/${id}.json`,
    {
      method: 'DELETE'
    });
    dispetch({ type: DELETE_ON_CLICK, id: id });
  }};

export const addNewProduct = (title, imageUrl, description, price) => {
  return { type: ADD, title: title, imageUrl: imageUrl, description: description, price: price };
};

export const editProduct = (id, ownerId, title, description, imageUrl) => {
  return { type: EDIT, id: id, ownerId: ownerId, title: title, description: description, imageUrl: imageUrl };
};
