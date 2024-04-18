// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<HomePage />}/>
        <Route path='/register' element = {<RegisterPage />}/>
        <Route path='/login' element = {<LoginPage />}/>
      </Routes>
    </div>
  )
}