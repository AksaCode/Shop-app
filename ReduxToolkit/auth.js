// iznad slice: logoutTimer, clearTimer, saveDataToStorage -- DONE
// unutar slice reducer: logout,authenticate
// unutar slice extraReducer: login,signup

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AsyncStorage } from 'react-native';

let timer;

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expiryDate: expirationDate.toISOString(),
    }),
  );
  console.log('TOKEN', token);
  console.log('USERID', userId);
  console.log('EXPIRATIONDATE', expirationDate);
  console.log('save data to storage');
};

const clearTimer = () => {
  if (timer) clearTimeout(timer);
  console.log('clear timer');
};

export const login = createAsyncThunk('auth/login', async (data, dispatch) => {
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
  const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn * 1000) / 60);
  saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  console.log('login');
  return responseData;
});

export const signup = createAsyncThunk('auth/signup', async (data, dispatch) => {
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
  const expirationDate = new Date(new Date().getTime() + (+responseData.expiresIn * 1000) / 60);
  saveDataToStorage(responseData.idToken, responseData.localId, expirationDate);
  console.log('signup');
  return responseData;
});

export const authSlice = createSlice({
  name: 'products',
  initialState: {
    token: null,
    userId: null,
  },
  reducers: {
    logout(state) {
      console.log('logout func');
      clearTimer();
      AsyncStorage.removeItem('userData');
      state.token = null;
      state.userId = null;
    },
    logoutTimer(runOutTime) {
      timer = setTimeout(() => {
        dispatch(logout());
      }, runOutTime);
      console.log('logout timer');
    },
    authenticate(state, action) {
      console.log('auth start');
      dispatch(logoutTimer(action.payload.expireTime));
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      console.log('auth func');
    },
  },
  extraReducers: {
    [login.rejected]: (state, action) => {
      console.log('login rejected');
    },
    [login.pending]: (state, action) => {
      console.log('login pending');
    },
    [login.fulfilled]: (state, action) => {
      console.log('loginfulfilled');
      //   const pom = {
      //     localId: action.payload.localId,
      //     idToken: action.payload.idToken,
      //     expiresIn: +action.payload.expiresIn,
      //   };
      //   console.log(expiresIn);
      //   console.log('login fulfilled');
      //   dispatch(authenticate(pom));
    },
    [signup.fulfilled]: (state, action) => {
      console.log('signupfulfilled');

      //   const pom = {
      //     localId: action.payload.localId,
      //     idToken: action.payload.idToken,
      //     expiresIn: +action.payload.expiresIn,
      //   };
      //   dispatch(authenticate(pom));
      //   console.log('login fulfilled');
    },
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authSlice.reducer;
