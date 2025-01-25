import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import PsicologoHorario from './components/PsicologoHorario';
import Paciente from './components/Paciente';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/psicologo" element={<PsicologoHorario />} />
        <Route path="/paciente" element={<Paciente />} />

      </Routes>
    </Router>
  );
};

export default App;
