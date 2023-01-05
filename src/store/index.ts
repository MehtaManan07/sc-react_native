import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import Reactotron from '../constants/Reactotron';
import {Auth} from './Reducers/AuthReducer';
import {User} from './Reducers/UserReducer';
import {Community} from './Reducers/CommunityReducer';
import {Post} from './Reducers/PostReducer';

const rootReducer = combineReducers({
  Auth,
  User,
  Community,
  Post,
});
// @ts-ignore
const createdEnhancer = Reactotron.createEnhancer();
const middlewares = [ReduxThunk];
const composed = compose(applyMiddleware(...middlewares), createdEnhancer);
export const store = createStore(rootReducer, composed);
