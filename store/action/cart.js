export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';


export const addProduct = (product) => {
  return { type: ADD_PRODUCT, product: product };
};

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, id: id };
};
