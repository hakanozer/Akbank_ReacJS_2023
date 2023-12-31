import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './useRedux/Store';
import { DataContext, data } from './DataContext' 

// Pages import
import Login from './pages/Login';
import Product from './pages/Product';
import Control from './pages/Control';
import Users from './pages/Users';
import ProductDetail from './pages/ProductDetail';
import Likes from './pages/Likes';
import NotFound from './pages/NotFound';



const route = 
<Provider store={store}>
  <DataContext.Provider value={data}>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/product' element={ <Control page={<Product />} /> } />
        <Route path='/users' element={ <Control page={<Users />} /> } />
        <Route path='/productDetail/:pid' element={ <Control page={<ProductDetail />} /> } />
        <Route path='/likes' element={ <Control page={<Likes />} /> } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </DataContext.Provider>
</Provider>


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(route);

