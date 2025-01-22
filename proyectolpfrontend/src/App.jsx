import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PsicologoHorario from './components/PsicologoHorario';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/psicologo" element={<PsicologoHorario />} />
      </Routes>
    </Router>
  );
};

export default App;
