import { LOGIN, LOGOUT } from '../action/auth';
import { SIGN_UP } from '../action/auth';

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    case SIGN_UP:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
