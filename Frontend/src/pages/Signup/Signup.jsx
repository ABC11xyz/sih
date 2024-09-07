import React from 'react';
import Signup from '../../components/Auth/Signup/Signup.jsx';

const SignupPage = ({setIsLoggedIn}) => {
    return (
        <div className='body-bg '>
            <Signup setIsLoggedIn = {setIsLoggedIn} />
        </div>
    );
};

export default SignupPage;
