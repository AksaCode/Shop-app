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
    dispatch({ type: SIGN_UP });
  };
};
