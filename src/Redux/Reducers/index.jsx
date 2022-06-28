import { combineReducers } from 'redux';
import userReduce from './userReduce';

const rootReducer = combineReducers({
  userReduce,
});

export default rootReducer;
