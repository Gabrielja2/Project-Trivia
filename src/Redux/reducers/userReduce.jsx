import { GET_INFO, ATUALIZAR_SCORE } from '../Actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
  assertions: 0,
};

const userReduce = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_INFO:
    return ({
      ...state,
      name: action.name,
      email: action.email,
    });
  case ATUALIZAR_SCORE:
    return ({
      ...state,
      score: action.score,
      assertions: action.assertions,
    });
  default:
    return state;
  }
};
export default userReduce;
