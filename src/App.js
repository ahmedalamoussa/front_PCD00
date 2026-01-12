import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/Home';
import Exercise from './pages/Exercise';
import Login from './Login';
import Register from './Register';
import Services from './Services';
import Home from './Home';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercises" element={<HomePage />} />
              <Route path="/exercise/:id" element={<Exercise />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/services" element={<Services />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
