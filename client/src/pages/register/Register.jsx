import React, { useRef, useState } from 'react';
import "./register.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const [usermagac, setMagac] = useState(''); //dheeraad

  const validateUsername = (inputUsername) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(inputUsername);
  };
   //dheeraad

   const handleUsernameChange = (e) => {
    const inputUsername = e.target.value;
  
    if (validateUsername(inputUsername) || inputUsername === '') {
      setMagac(inputUsername);
    } else {
      console.error('Invalid username: must only contain letters.');
    }
  };//dheeraad

  

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    }else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/api/auth/register", user);
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div className='login' >
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">KSH Social Media</h3>
            <span className="loginDesc">Connect with friends and the world around you on KSH </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                <input placeholder='Username' value={usermagac} type="text" onChange={handleUsernameChange} required ref={username} className="loginInput" />
                <input placeholder='Email' type='email' required ref={email} className="loginInput" />
                <input placeholder='Password' type='password' minLength="6" required ref={password} className="loginInput" />
                <input placeholder='Confirm Password' type='password' required ref={passwordAgain} className="loginInput" />
                <button className="loginButton" type='submit'>Sign Up</button>
                <button className="loginRegisterButton">Log into Account</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Register
