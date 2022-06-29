import { GET_INFO } from '../Actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_INFO:
    return ({
      ...state,
      name: action.name,
      email: action.email,
    });
  default:
    return state;
  }
};
export default userReduce;
