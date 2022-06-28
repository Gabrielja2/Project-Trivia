export const LOGIN = 'LOGIN';

export const LoginUser = (email) => ({
  type: LOGIN,
  email,
});
