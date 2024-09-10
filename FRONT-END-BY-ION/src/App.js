import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import IntroPage from './Pages/IntroPage';
import LoginPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import ImageUpload from './components/DragAndDrop';



function App() {
  return (
    
    <Router>
      
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/LogIn" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path='/idk' element={<ImageUpload/>} />
      </Routes>
    </Router>
    
  );
}

export default App;
