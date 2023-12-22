import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import View from './components/Student/View';
import Edit from './components/Student/Edit';

const App = () => {
  return (
    <Router>
      <Routes>
        < Route path="/" element={<Home />} />
        < Route path="/view/:id" element={<View />} />
        < Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
};

export default App;