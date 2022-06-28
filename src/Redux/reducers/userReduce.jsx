import { LOGIN } from '../Actions';

const INITIAL_STATE = {
  name: '',
  email: '',
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};
export default userReduce;
