import { LOGOUT } from '../action/auth';
import { AUTHENTICATE } from '../action/auth';

const initialState = {
  token: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return initialState;
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};

export default authReducer;
