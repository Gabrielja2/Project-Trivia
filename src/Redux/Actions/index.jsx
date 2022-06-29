const END_POINT = 'https://opentdb.com/api_token.php?command=request';

export const GET_INFO = 'GET_INFO';
export const TOKEN_RESQUEST = 'TOKEN_RESQUEST';
export const VALID_TOKEN = 'VALID_TOKEN';

export const getUserInfo = (name, email) => ({
  type: GET_INFO,
  name,
  email,
});

export const tokenRequest = (token) => ({
  type: TOKEN_RESQUEST,
  token,
});

export const validToken = (json) => ({
  type: VALID_TOKEN,
  json,
});

export const requestToken = () => async (dispatch) => {
  const response = await fetch(END_POINT);
  const json = await response.json();
  const { token } = json;
  localStorage.setItem('token', token);
  dispatch(tokenRequest(token));
};

export const validationToken = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const json = await response.json();
  dispatch(validToken(json));
  // console.log('json', json);
};
