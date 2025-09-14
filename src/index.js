import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { BrowserRouter } from "react-router-dom";
import { QueryClient,QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import "bootstrap-icons/font/bootstrap-icons.css";

import  "./i18n" 
const queryClient=new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.Suspense fallback={<div>Loading...</div>}>
  {/* Suspense is used for lazy loading components, if you have any */}
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>
  </React.Suspense>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
