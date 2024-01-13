import './Login.css';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const myStyle = {
    width: "50%",
  };
  const div_style = {
    marginTop: "2.5rem",
  }



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert,setAlert] = useState('');

  const navigate = useNavigate();




  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(username, password);
      const response = await axios.post('http://localhost:8081/api/v1/auth/authenticate', {
        "email": username,
        "password": password
      });
      const token = response.data;
      console.log(token)
      // Store token in local storage (not secure, consider better methods)

      localStorage.setItem('id', token.id);
      localStorage.setItem('access_token', token.access_token);
      console.log("login Sucessful");
      navigate('/profile');
      setAlert("")
      // Redirect or perform actions upon successful login
    } catch (error) {
      setAlert("Username or password is invalid")
      console.error('Login failed:', error);
    }
  };


  return (
    <>
      <div class="ms-3" style={div_style}>
        <div className="card mx-auto" style={myStyle}>
          {/* <img className="card-img-top" src="https://th.bing.com/th/id/OIP.XSZAFm-5JI7nriDLwZqRQQHaE7?pid=ImgDet&rs=1" alt="Card image" width="100" height="300" /> */}
          <div className="card-body">
            <h4 className="card-title">Login </h4>
            <form onSubmit={handleLogin} id='login-form'>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
              </div>
              <div className='alert-text'>
                  {alert}
                </div>
                <br></br>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>

          </div>
        </div>
      </div>
    </>
  )
}
