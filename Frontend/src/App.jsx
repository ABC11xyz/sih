import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import LoginPage from './pages/Login/Login.jsx';
import SignupPage from './pages/Signup/Signup.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import CommunityPage from './pages/CommunityPage/CommunityPage.jsx';
import ApplicationForm from './pages/ApplicationForm/ApplicationForm.jsx';
import VerifyDocument from './pages/VerifyDocument/VerifyDocument.jsx'; // Import the VerifyDocument component
import Header from './components/Layout/Header/Header.jsx';
import Footer from './components/Layout/Footer/Footer.jsx';

const App = () => {

    const [isLoggedIn , setIsLoggedIn] = useState(false);

    return (
        <Router>
            <Header  isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn}  />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginPage setIsLoggedIn = {setIsLoggedIn} />} />
                    <Route path="/signup" element={<SignupPage setIsLoggedIn = {setIsLoggedIn} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/community" element={<CommunityPage />} />
                    <Route path="/apply" element={<ApplicationForm />} />
                    <Route path="sag/verify/:documentId" element={<VerifyDocument />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>
             <Footer />
        </Router>
    );
};

export default App;
