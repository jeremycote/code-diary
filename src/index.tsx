import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ApiContextProvider from './context/ApiContextProvider';
import ConfigContextProvider from './context/ConfigContextProvider';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { apiConfiguration } from './services';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ConfigContextProvider theme="dark" appName="Code Diary" gitApiUrl="https://api.github.com">
      <ApiContextProvider apiConfiguration={apiConfiguration}>
        <App />
      </ApiContextProvider>
    </ConfigContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
