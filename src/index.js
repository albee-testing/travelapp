import React from 'react';
import ReactDOM from 'react-dom';
import TravelApp from './TravelApp.jsx'; // 確保路徑正確

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <TravelApp />
  </React.StrictMode>,
  rootElement
);