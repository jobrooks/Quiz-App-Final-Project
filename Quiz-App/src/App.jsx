// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import QuizCreatePage from './pages/QuizCreatePage';
import QuizPage from './pages/QuizPage';
import SearchPage from './pages/SearchPage';
import QuizDetails from './pages/QuizDetails';
export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<HomePage />}/>
        <Route path='/register' element = {<RegisterPage />}/>
        <Route path='/login' element = {<LoginPage />}/>
        <Route path='/create' element = {<QuizCreatePage />} />
        <Route path='/quiz/:id' element ={<QuizPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/search/:title' element ={<QuizDetails />} />
      </Routes>
    </div>
  )
}