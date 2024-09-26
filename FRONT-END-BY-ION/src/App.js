import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import IntroPage from './Pages/IntroPage';
import LoginPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';
import AddPetPage from './Pages/AddPetPage';
import MainPage from './Pages/HomePage';
import { Navigate } from 'react-router-dom';
import ProfilePage from './Pages/ProfilePage';
import EditProfilePage from './Pages/EditProfilePage';
import { jwtDecode } from 'jwt-decode'; // Correct way to import named export
import Admin from './Admin_PetServices/admin';
import ServiceLoginPage from './Admin_PetServices/ServicesLogIn';
import ServiceSignUpPage from './Admin_PetServices/ServicesSignUp';
import ServiceHomePage from './Admin_PetServices/ServicesHomePage';
import LocalProfile from './Admin_PetServices/LocalsProfile';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    try {
      const { exp } = jwtDecode(authToken);

      // Check if the token is expired
      if (Date.now() >= exp * 1000) {
        // Token is expired
        localStorage.removeItem('authToken');
        localStorage.removeItem('userId'); // if you store userId separately
        return <Navigate to="/LogIn" replace />;
      }
    } catch (error) {
      // If token is invalid or cannot be decoded
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      return <Navigate to="/LogIn" replace />;
    }
  } else {
    // Redirect to login page if no token is found
    return <Navigate to="/LogIn" replace />;
  }

  // Render the protected content if token exists and is valid
  return children;
};



function App() {
  
  return (
    
    <Router>
      
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/ServiceLogin" element={<ServiceLoginPage />} />
        <Route path="/ServiceSignUp" element={<ServiceSignUpPage />} />
        <Route path="/ServiceHome" element={<ServiceHomePage/>}/>
        <Route path='/LocalProfile' element={<LocalProfile/>}/>

        <Route path="/Admin" element={<Admin />} />
        <Route path="/LogIn" element={<LoginPage />  } />
        <Route path="/SignUp" element={<SignUpPage/>} />
        <Route path="/AddPet" element={<ProtectedRoute><AddPetPage/></ProtectedRoute>} />
        <Route path="/HomePage" element={<ProtectedRoute><MainPage/></ProtectedRoute>} />
        <Route path="/ProfilePage/:id" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>} />
        <Route path="/EditProfilePage/:id" element={<ProtectedRoute><EditProfilePage/></ProtectedRoute>} />
      </Routes>

    </Router>
    
  );
}

export default App;
