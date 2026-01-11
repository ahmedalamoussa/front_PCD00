import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/Home';
import Exercise from './pages/Exercise';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercise/:id" element={<Exercise />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
