import { createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';

export const authenticate = (userId, token, runOutTime) => {
  return (dispatch) => {
    dispatch(logoutTimer(runOutTime));
    let verifyItems = { userId: userId, token: token };
    dispatch(verifyAuth(verifyItems));
  };
};

let timer;

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

export const logout = () => {
  return (dispatch) => {
    clearTimer();
    AsyncStorage.removeItem('userData');
    dispatch(resetAuth());
  };
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

export const login = (data) => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDpEkdP9dTqOtLxlVHgnqIs1xVyr4G9u_0',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
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

export const signup = (data) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDpEkdP9dTqOtLxlVHgnqIs1xVyr4G9u_0`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
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

const initialState = { token: null, userId: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.token = null;
      state.userId = null;
    },
    verifyAuth: (state, action) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
});

export const { resetAuth, verifyAuth } = authSlice.actions;

export default authSlice.reducer;
