import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '@CSS/index.css';
import createProvider from './createProvider';
import * as serviceWorker from './serviceWorker';

async function renderApp() {
  const Provider = await createProvider({
    Router: BrowserRouter,
    appKey: 520,
    API_ENV: process.env.NODE_ENV,
    routerProps: {
      basename: '',
    },
  });
  ReactDOM.render(<Provider />, document.getElementById('root'));
}

renderApp();
serviceWorker.register();
