import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { SearchStore } from './contexts/SearchStore';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <SearchStore>
        <App />
      </SearchStore>
    </Router>
  </StrictMode>
);
