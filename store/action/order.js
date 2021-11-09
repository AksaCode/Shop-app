export const CREATOR = 'CREATOR';

export const addOrder = (cartItems, totalAmount) => {
  return { type: CREATOR, totalAmount: totalAmount, cartItems: cartItems };
};
