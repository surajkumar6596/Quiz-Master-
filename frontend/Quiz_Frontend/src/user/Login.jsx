import { Link, useNavigate } from "react-router-dom";
import "../css/Login.css";
import { FaWindowClose } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

// apge close
  const ClosePage = () => {
    navigate("/");
  };


  const handleLogin = async () => {
    try {
      const res = await axios.post(`https://quiz-master-6e29.onrender.com/api/login/`,{
        username:username,
        password: password
      });
      localStorage.setItem('access_token', res.data.access)
      localStorage.setItem('refresh_token', res.data.refresh)
      localStorage.setItem('username', res.data.username)
      localStorage.setItem('is_admin', res.data.is_admin)
      
      console.log("Login successfull", res.data);
      alert('Login success')
      navigate('/')
    } catch (err){
      console.log('Login error', err.response?.data || err.message)
      alert('Login failed')
    }
  };

  return (
    <div className="login_page">
      <h2>Login</h2>
      <h4>QuizMaster Pro</h4>
      <FaWindowClose className="close_icon" onClick={ClosePage} />
      <div className="content">
        <input type="text" name="username" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="username" />
        <input type="password" name="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
        <button className="login_btn" onClick={handleLogin}>Login</button>
        <div className="link_signup">
          <span>Already have account ?</span>
          <Link to="/signup">Signup Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
