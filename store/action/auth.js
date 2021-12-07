export const LOGIN = 'LOGIN';

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[AIzaSyCo5oYcmYE2nMJj8J3dVism9s9Ql4xK70c]', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData=await response.json();
    dispatch({ type: LOGIN });
  };
};
