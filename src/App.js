import React from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import Services from './Services';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App min-h-screen bg-gray-100">
      <BrowserRouter>
        {/* Navbar */}
        <Navbar />

        {/* Contenu principal */}
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/services" element={<Services />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
