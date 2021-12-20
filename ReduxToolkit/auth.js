// iznad slice: logoutTimer, clearTimer, saveDataToStorage -- DONE
// unutar slice reducer: logout,authenticate
// unutar slice extraReducer: login,signup

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';

export const authSlice = createSlice({
  name: 'products',
  initialState: {
    token: null,
    userId: 10,
  },
  reducers: {
    resetAuth(state) {
      state.token = 10;
      state.userId = 12;
    },
    verifyAuth(state, action) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
    },
  },
  extraReducers: {},
});

export const { resetAuth, verifyAuth } = authSlice.actions;

export const authenticate = (data) => {
  return (dispatch) => {
    dispatch(logoutTimer(data.expireTime));
    dispatch(verifyAuth(data.userId, data.token));
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
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCo5oYcmYE2nMJj8J3dVism9s9Ql4xK70c',
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
    const userData = {
      userId: responseData.localId,
      token: responseData.idToken,
      expireTime: (+responseData.expiresIn * 1000) / 60,
    };
    dispatch(authenticate(userData));
    const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn * 1000) / 60);
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCo5oYcmYE2nMJj8J3dVism9s9Ql4xK70c`,
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
    const userData = {
      userId: responseData.localId,
      token: responseData.idToken,
      expireTime: (+responseData.expiresIn * 1000) / 60,
    };
    dispatch(authenticate(userData));
    // dispatch(authenticate(responseData.localId, responseData.idToken, +responseData.expiresIn * 1000));
    const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn * 1000) / 60);
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  };
};

export default authSlice.reducer;
