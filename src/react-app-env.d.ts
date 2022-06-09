/// <reference types="react-scripts" />
REACT_APP_API_KEY = 'AIzaSyBUZV-O6ZNEQkXsKgB7sNWFBlJf6bZeyqE';
declare namespace NodeJS {
  interface ProcessEnv {
    // types of envs
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_API_KEY: string;
  }
}
interface Window {
  Stripe: any;
}
