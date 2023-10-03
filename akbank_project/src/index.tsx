import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages import
import Login from './pages/Login';
import Product from './pages/Product';


const route = 
<BrowserRouter>
  <ToastContainer />
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/product' element={<Product />} />
  </Routes>
</BrowserRouter>


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(route);

