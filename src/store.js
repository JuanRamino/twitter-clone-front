import { createStore } from 'redux';
import { auth } from 'reducers'
import {combineReducers} from 'redux';

const App = combineReducers({
  auth
})

const store = createStore(App);

export default store