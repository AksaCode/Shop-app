export const DELETE = 'DELETE';

export const deleteOnClick = (id) => {
  return { type: DELETE, id: id };
};
