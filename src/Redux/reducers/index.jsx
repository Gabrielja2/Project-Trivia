import { combineReducers } from 'redux';
import player from './userReduce';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
