import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure this path is correct
import { toast } from 'react-toastify';

const Signup = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    role: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is Required'),
    lastName: Yup.string().required('Last Name is Required'),
    username: Yup.string()
      .required('Email is Required')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password must contain at least one symbol'
      )
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter'),
    role: Yup.string().required('Role is required'),
  });

  const handleSignup = async (values) => {
    try {
      const res = await axios.post('https://sih-pmsss.onrender.com/api/auth/user/signup', values);

      if (res.data && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        setIsLoggedIn(true);
        toast.success('Redirecting To Dashboard');
        navigate('/dashboard');
      } else {
        toast.error('Something Went Wrong !!!');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      toast.error('Error signing up. Please try again.');
    }
  };

  return (
    <div className='container'>
      <div className="signup-container">
        <h2 className="signup-title">Signup</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              <div className="signup-name-container">
                <div className="signup-name-input-group">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    className="signup-input signup-name-input"
                    name="firstName"
                    type="text"
                    id="firstName"
                    placeholder="e.g. - Ram"
                  />
                  <ErrorMessage name="firstName" component="div" className="error-message" />
                </div>

                <div className="signup-name-input-group">
                  <label htmlFor="lastName">Last Name</label>
                  <Field
                    className="signup-input signup-name-input"
                    name="lastName"
                    type="text"
                    id="lastName"
                    placeholder="e.g. - Ji"
                  />
                  <ErrorMessage name="lastName" component="div" className="error-message" />
                </div>
              </div>

              <label htmlFor="username">Email</label>
              <Field
                className="signup-input"
                name="username"
                type="email"
                id="username"
                placeholder="e.g. - ram@gmail.com"
              />
              <ErrorMessage name="username" component="div" className="error-message" />

              <label htmlFor="password">Password</label>
              <Field
                className="signup-input"
                name="password"
                type="password"
                id="password"
                placeholder="e.g. - Ram@12345"
              />
              <ErrorMessage name="password" component="div" className="error-message" />

              <label htmlFor="role">Role</label>
              <Field as="select" name="role" className="signup-select" id="role">
                <option value="" label="Select Role" />
                <option value="student" label="Student" />
                <option value="sag" label="SAG" />
                <option value="finance" label="Finance" />
              </Field>
              <ErrorMessage name="role" component="div" className="error-message" />

              <button className="signup-button" type="submit" disabled={isSubmitting}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
