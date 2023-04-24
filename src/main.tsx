import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import './index.css';
import { AuthProvider } from './context/AuthProvider';
import { TodoProvider } from './context/TodoProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TodoProvider>
          <Layout />
        </TodoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
