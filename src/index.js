import React from 'react';
import ReactDOM from 'react-dom/client';
import ConnectionStatus from './components/connectionStatus';
import AppRoutes from './utils/routes';
import { LessonsProvider } from './components/contexts/LessonsContext';
import { AuthProvider } from './utils/authContext';
import { SoundProvider } from './components/soundContext';
import reportWebVitals from './reportWebVitals';
import './assets/css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <LessonsProvider>
        <SoundProvider>
          <div className="App">
            <ConnectionStatus />
            <AppRoutes />
          </div>
        </SoundProvider>
      </LessonsProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();