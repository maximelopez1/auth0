import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
    <Auth0Provider
      domain="dev-qynmvbzcwudsqfft.us.auth0.com"
      clientId="fzlz8gb4cfTjaHGvcJjh9Sq2eWX0XwH8"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://test-node-api",
      }}
    >
      <App />
    </Auth0Provider>
);