import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { KineProvider } from './context/KineContext';
import HomePage from './pages/Home';
import Exercise from './pages/Exercise';
import KineDashboard from './pages/KineDashboard';
import Login from './Login';
import Register from './Register';
import Services from './Services';
import Home from './Home';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <KineProvider>
      <UserProvider>
        <Router>
          <div className="App">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/exercises" element={<HomePage />} />
                <Route path="/exercise/:id" element={<Exercise />} />
                <Route path="/kine-dashboard" element={<KineDashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Services />} />
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </KineProvider>
  );
}

export default App;
