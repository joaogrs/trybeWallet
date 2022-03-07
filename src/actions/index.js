export const LOGIN = 'LOGIN';

export const loginToState = (email) => ({
  type: LOGIN,
  payload: email,
});
