import { GET_INFO, VALID_TOKEN } from '../Actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  validToken: 0,
  questions: [],
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_INFO:
    return ({
      ...state,
      name: action.name,
      email: action.email,
    });
  case VALID_TOKEN:
    return ({
      ...state,
      validToken: action.json.response_code,
      questions: action.json.results,
    });
  default:
    return state;
  }
};
export default userReduce;
