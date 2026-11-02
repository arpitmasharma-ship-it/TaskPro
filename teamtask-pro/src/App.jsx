import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetailsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProjectsPage />} />
        <Route path='/projects/:id' element={<ProjectDetailsPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App