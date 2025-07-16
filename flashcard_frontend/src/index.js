import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { FlashcardProvider } from './context/FlashcardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FlashcardProvider>
      <App />
    </FlashcardProvider>
  </React.StrictMode>
);
