import { useEffect, useState } from "react";
import axios from "axios";
import "../css/Profile.css";
import { useNavigate } from "react-router-dom";
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access_token");

        console.log("Access Token:", token);

        const response = await fetch("https://quiz-master-6e29.onrender.com/api/profile/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        console.log("Profile Data:", data);

        if (!response.ok) {
          throw new Error(data.detail || "Profile fetch failed");
        }

        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile-loading">Loading Profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (!user) return null;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_admin");

    navigate("/login");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <button onClick={handleLogout} className="logout_btn">Logout</button>
          <div className="profile-avatar">
            {user.username?.charAt(0).toUpperCase()}
          </div>

          <h2>{user.username}</h2>
          <p>My Profile</p>

          <span className="profile-badge">
            {user.is_admin ? "Admin" : "User"}
          </span>
        </div>

        <div className="profile-details">
          <h3>Personal Information</h3>

          <div className="profile-info">
            <div className="info-item">
              <label>Username</label>
              <p>{user.username}</p>
            </div>

            <div className="info-item">
              <label>First Name</label>
              <p>{user.first_name || "Not provided"}</p>
            </div>

            <div className="info-item">
              <label>Last Name</label>
              <p>{user.last_name || "Not provided"}</p>
            </div>

            <div className="info-item">
              <label>Email Address</label>
              <p>{user.email || "Not provided"}</p>
            </div>

            <div className="info-item">
              <label>Phone Number</label>
              {/* <p>{user.phone || "Not provided"}</p> */}
              <p>
                {user.phone ? "******" + user.phone.slice(-4) : "Not provided"}
              </p>
            </div>

            <div className="info-item">
              <label>Gender</label>
              <p>{user.gender || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
