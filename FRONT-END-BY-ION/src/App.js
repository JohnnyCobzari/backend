import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import IntroPage from './Pages/IntroPage';
import LoginPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import ImageUpload from './components/DragAndDrop';
import AddPetPage from './Pages/AddPetPage';
import MainPage from './Pages/MainPage';



function App() {
  
  return (
    
    <Router>
      
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/LogIn" element={<LoginPage />} />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/AddPet" element={<AddPetPage/>} />
        <Route path="/HomePage" element={<MainPage/>} />

      </Routes>

    </Router>
    
  );
}

export default App;
