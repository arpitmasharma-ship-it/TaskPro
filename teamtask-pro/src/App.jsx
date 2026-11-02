
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
const App = () => {
  console.log("APP COMPONENT RUNNING");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>REGISTER PAGE TEST</h1>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
