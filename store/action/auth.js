export const LOGIN = 'LOGIN';
export const SIGN_UP = 'SIGN_UP';

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
    if (response.ok) throw new Error('There was an error');
    const responseData = await response.json();
    console.log(responseData);

    dispatch({ type: SIGN_UP, token: responseData.idToken, userId: responseData.localId });
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
      throw new Error('Something went wrong!');
    }
    const responseData = await response.json();
    console.log(responseData);
    dispatch({ type: LOGIN, token: responseData.idToken, userId: responseData.localId });
  };
};
