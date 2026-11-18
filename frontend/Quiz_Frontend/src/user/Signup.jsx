import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { useState } from "react";
import axios from 'axios'



const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormFata] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "male",
  });

  // close page
  const PageCloseHandle = () => {
    navigate("/");
  };

  // form handle
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e)=>{
    e.preventDefault();
   try{
     const res = await axios.post(`https://quiz-master-6e29.onrender.com/api/register/`, formData)
    console.log('Signup Successful', res.data)
    alert('Signup Successfull')
   }catch(err){
    console.log('Signup error', err.response?.data || err.message)
    alert('Signup falied')
   }
  }

  return (
    <div className="signup_page">
      <h3>Create account</h3>
      <FaWindowClose className="close_icon" onClick={PageCloseHandle} />

      <div className="content">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email ex: axy123@gmail.com"
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <div className="gender_div">
          <label htmlFor="gender">Gender</label>
          <select
            name="gender"
            id="gender"
            required
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="sign_btn">
          <button onClick={handleSubmit}>Submit</button>
        </div>

        <div className="login_link">
          <span>already have account ?</span>
          <Link to="/login">
            <strong>Login Now</strong>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
