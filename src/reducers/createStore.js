import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createGlobalReducer } from './global';
import { createMessageReducer } from './message';
import { createWeatherReducer } from './weather';
import { createUserReducer } from './user';
import { createADReducer } from './ad';

async function createStore(params) {
  const { initialState } = params;
  return reduxCreateStore(
    combineReducers({
      global: createGlobalReducer({
        initialState: initialState.global,
      }),
      message: createMessageReducer({
        initialState: initialState.message,
      }),
      weather: createWeatherReducer({
        initialState: initialState.weather,
      }),
      user: createUserReducer({
        initialState: initialState.user,
      }),
      ad: createADReducer({
        initialState: initialState.ad,
      }),
    }),
    applyMiddleware(thunk),
  );
}

export default createStore;
