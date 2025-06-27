import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import URLForm from './components/URLForm';
import Stats from './pages/Stats';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Container sx={{ mt: 4 }}>
      <Routes>
        <Route path="/" element={<URLForm />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </Container>
  </Router>
);

export default App;