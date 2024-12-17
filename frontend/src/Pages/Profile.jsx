import React, { useEffect, useState } from "react";
import "./CSS/Profile.css";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
          setUpdatedDetails(data.user);
        }
      })
      .catch((err) => console.error("Error fetching user details:", err));
  };

  const handleEdit = () => setEditMode(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    fetch("http://localhost:5000/api/user/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(updatedDetails);
          setEditMode(false);
          alert("Details updated successfully!");
        } else {
          alert("Failed to update details. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Error updating details:", err);
        alert("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    window.location.href = "/signup";
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        {editMode ? (
          <>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />

            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={updatedDetails.phoneNumber}
              onChange={handleInputChange}
            />

            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={updatedDetails.address}
              onChange={handleInputChange}
            />
            <button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <button onClick={handleEdit}>Edit</button>
          </>
        )}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
