import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, logout } from '../utils/auth';
import { validateEmail, validatePassword, validateName } from '../utils/validation';
import '../assets/css/signup.css';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false); // Add state for password visibility
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!name) {
      validationErrors.name = 'Name cannot be empty';
    } else if (!validateName(name)) {
      validationErrors.name = 'Invalid name';
    }

    if (!surname) {
      validationErrors.surname = 'Surname cannot be empty';
    } else if (!validateName(surname)) {
      validationErrors.surname = 'Invalid surname';
    }

    if (!email) {
      validationErrors.email = 'Email cannot be empty';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!password) {
      validationErrors.password = 'Password cannot be empty';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 6 characters long';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await signup(email, password);
      setSuccessMessage('Signup successful! Redirecting to login...');
      await logout();
      setTimeout(() => {
        navigate('/login');
      }, 3000); // 3 seconds delay
    } catch (error) {
      setErrors({ form: error.message });
    }
  };
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="signup-body">
      <div className="sign-con">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Name"
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <input
            type="text"
            placeholder="Surname"
            autoComplete="family-name"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {errors.surname && <p className="error">{errors.surname}</p>}
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="pass-review">
            <input
              type={passwordVisible ? 'text' : 'password'} // Toggle between 'text' and 'password'
              placeholder="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="eye-box" onClick={togglePasswordVisibility}>
              {passwordVisible ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </div>
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <input type="submit" value="Signup" />
          {errors.form && <div className='message'><p className="error">{errors.form}</p></div>}
        </form>
        {successMessage && <div className='message'><p className="success">{successMessage}</p></div>}
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Signup;