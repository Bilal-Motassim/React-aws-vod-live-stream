import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const nav = useNavigate();
  const emailhandle = (event) => {
    setemail(event.target.value);
  }
  const passhandle = (event) => {
    setpass(event.target.value);
  }
  const login = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/api/auth/login", {
      email: email,
      password: pass
    }).then((res) => {
      localStorage.setItem('token', res.data.authToken);
      nav("/home");
    }).catch((err) => {
      console.log(err.message)
    })
  }
  return (
    <div className="App">
      <form>
        <input name='email' type='email' value={email} onChange={emailhandle} />
        <input name='password' type='password' value={pass} onChange={passhandle} />
        <button type='submit' onClick={login}>l</button>
      </form>

    </div>
  );
}

export default LoginPage;
