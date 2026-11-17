import { FaGraduationCap } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaShieldHalved } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { useEffect, useState } from "react";


const Navbar = () => {
  const location  = useLocation()
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)


  
// close page
  const handleLoginPage=(e)=>{
    e.preventDefault()
    if(location.pathname === '/login'){
      navigate('/')
    }else(
      navigate('/login')
    )
  }

  useEffect(()=>{
    const token = localStorage.getItem('access_token')
    const storedUser = localStorage.getItem('username')
    const storedIsAdmin = localStorage.getItem('is_admin') === 'true';

    if(token && storedUser){
      setIsLoggedIn(true)
      setUsername(storedUser)
      setIsAdmin(storedIsAdmin)
    }
  },[])

  const handleLogout = ()=>{
    localStorage.clear()
    setIsLoggedIn(false)
    navigate('/')
  }
  
  return (
    <div className="navbar">
      <div className="logo">
        <FaGraduationCap className="logo_icon" />

        <div className="logo_title">
          <h2>QuizMaster Pro </h2>
          <strong>
            Full-Stack Quiz By (Suraj Kumar) | LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/suraj-kumar6596/"
              target="_blank"
              rel="noopener noreferrer"
              className="linkdIn_id"
            >
              Suraj Kumar
            </a>
          </strong>
        </div>
      </div>

      <div className="nav_link">
        <div className="page_option">
          <div className="user_btn">
            <FaUser />
            <h4>User Portal</h4>
          </div>
          <div className="user_btn">
            <FaShieldHalved />
            <h4>Admin Pannel</h4>
          </div>
        </div>

        <div className="profile">
          {isLoggedIn ? (
            <Link to='/profile' className="user_mode">
              <div className="avatar">
                {username.charAt(0).toUpperCase()}
                
              </div>

              <div className="info">
                <span>{isAdmin ? 'Admin Mode' : 'User Mode'}</span>
              </div>
            </Link>
          ): (
            <div className="user_mode">
              <FaUser/>
              <Link to='/login'>Login</Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
