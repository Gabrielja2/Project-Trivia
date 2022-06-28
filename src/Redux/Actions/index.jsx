const END_POINT = 'https://opentdb.com/api_token.php?command=request';

export const LOGIN = 'LOGIN';
export const TOKEN_RESQUEST = 'TOKEN_RESQUEST';

export const LoginUser = (email) => ({
  type: LOGIN,
  payload: email,
});

export const tokenRequest = (token) => ({
  type: TOKEN_RESQUEST,
  payload: token,
});

export const requestToken = () => async (dispatch) => {
  const response = await fetch(END_POINT);
  const json = await response.json();
  const { token } = json;
  localStorage.setItem('token', token);
  dispatch(tokenRequest(token));
};
