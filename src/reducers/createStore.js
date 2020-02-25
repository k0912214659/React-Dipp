import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

async function createStore() {
  return reduxCreateStore(
    combineReducers({}),
    applyMiddleware(thunk),
  );
}

export default createStore;
