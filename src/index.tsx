import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { GlobalStateProvider } from './GlobalState/GlobalState';
import { Provider } from 'react-redux';
import store from './GlobalState/store';
import './initStore';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStateProvider>
      <Provider {...{ store }}>
        <App />
      </Provider>
    </GlobalStateProvider>
  </React.StrictMode>
);