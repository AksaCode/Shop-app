export const DELETE = 'DELETE';
export const ADD = 'ADD';

export const deleteOnClick = (id) => {
  return { type: DELETE, id: id };
};

export const addP = (title, description, imageUrl, price) => {
  return { type: ADD, product: { title: title, description: description, imageUr: imageUrl, price: price } };
};
