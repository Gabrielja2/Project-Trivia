const END_POINT = 'https://opentdb.com/api_token.php?command=request';

export const GET_INFO = 'GET_INFO';
export const TOKEN_RESQUEST = 'TOKEN_RESQUEST';

export const getUserInfo = (name, email) => ({
  type: GET_INFO,
  name,
  email,
});

export const tokenRequest = (token) => ({
  type: TOKEN_RESQUEST,
  token,
});

export const requestToken = () => async (dispatch) => {
  const response = await fetch(END_POINT);
  const json = await response.json();
  const { token } = json;
  localStorage.setItem('token', token);
  dispatch(tokenRequest(token));
};
