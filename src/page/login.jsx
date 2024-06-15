import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/auth';
import { validateEmail, validatePassword } from '../utils/validation';
import { useSound } from '../components/soundContext'; // Import the useSound hook
import clickSound from '../assets/soundEffects/welcome.MP3'; // Import your sound effect file
import '../assets/css/login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Add state for password visibility
  const [errors, setErrors] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email cannot be empty';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email address';
    }

    if (!password) {
      validationErrors.password = 'Password cannot be empty';
    } else if (!validatePassword(password)) {
      validationErrors.password = 'Password must be at least 6 characters long';
      playSoundEffect();
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await login(email, password);
      navigate('/home');
      playSoundEffect(); // Play sound effect when logged in
    } catch (error) {
      setErrors({ form: error.message });
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const { soundEffect } = useSound(); // Get soundEffect state from SoundContext
  const playSoundEffect = () => {
    if (soundEffect) {
      const audio = new Audio(clickSound);
      audio.play();
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-body">
      <div className="log-con">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <input type="submit" value="Login" />
          {errors.form && <div className='message'><p className="error">{errors.form}</p></div>}
        </form>
        <button onClick={goToSignup}>Signup</button>
      </div>
    </div>
  );
}

export default Login;