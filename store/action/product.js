export const DELETE = 'DELETE';
export const ADD = 'ADD';

export const deleteOnClick = (id) => {
  return { type: DELETE, id: id };
};

export const addP = (title, imageUrl, description,price) => {
  return { type: ADD, product: {title,imageUrl,description,price} };
};
