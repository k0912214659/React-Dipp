import React from 'react';
import { Provider } from 'react-redux';
import createStore from '@Reducers/createStore';
import createInitialStates from '@Reducers/createInitial';
import App from '@Components/App';

export default async function createProvider(params) {
  const {
    Router,
    appKey,
    API_ENV,
    routerProps,
  } = params;
  const initialState = await createInitialStates({ API_ENV });
  const initialStore = await createStore({ initialState });

  return () => (
    <Provider store={initialStore}>
      <App key={appKey} Router={Router} routerProps={routerProps} />
    </Provider>
  );
}
