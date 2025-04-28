import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from './Router/router';
import AuthProvider from './Provider/AuthProvider';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryclient=new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <QueryClientProvider client={queryclient} >
   <HelmetProvider>
   <ToastContainer position="top-center" />
   <div className='max-w-screen-xl mx-auto'>
   <RouterProvider router={router}></RouterProvider>
   </div>
   </HelmetProvider>
   </QueryClientProvider>
   </AuthProvider>
  </StrictMode>,
)
