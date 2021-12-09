import { AsyncStorage } from 'react-native';

export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';

export const authenticate = (userId, token, expireTime) => {
  return (dispatch) => {
    dispatch(logoutTimer(expireTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};
let timer;

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo5oYcmYE2nMJj8J3dVism9s9Ql4xK70c`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }
    const responseData = await response.json();

    dispatch(authenticate(responseData.localId, responseData.idToken, +responseData.expiresIn * 1000));
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo5oYcmYE2nMJj8J3dVism9s9Ql4xK70c',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'Wrong password!';
      }
      throw new Error(message);
    }
    const responseData = await response.json();
    dispatch(authenticate(responseData.localId, responseData.idToken, +responseData.expiresIn * 1000));
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const logout = () => {
  clearTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
};

const clearTimer = () => {
  if (timer) clearTimeout(timer);
};

const logoutTimer = (runOutTime) => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, runOutTime);
  };
};
