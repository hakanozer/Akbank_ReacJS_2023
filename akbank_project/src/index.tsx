import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages import
import Login from './pages/Login';
import Product from './pages/Product';
import Control from './pages/Control';
import Users from './pages/Users';
import ProductDetail from './pages/ProductDetail';


const route = 
<BrowserRouter>
  <ToastContainer />
  <Routes>
    <Route path='/' element={<Login />} />
    <Route path='/product' element={ <Control page={<Product />} /> } />
    <Route path='/users' element={ <Control page={<Users />} /> } />
    <Route path='/productDetail/:pid' element={ <Control page={<ProductDetail />} /> } />
  </Routes>
</BrowserRouter>


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(route);

