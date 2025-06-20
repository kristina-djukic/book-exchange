import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/profileForm";
import defaultAvatar from "../assets/noimage.png";
import "./profilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    city: "",
    postcode: "",
    address: "",
    phone: "",
    contactBy: "email",
    pictureURL: "",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile data:", form);
    setIsEditing(false);
    navigate("/homepage");
  };

  const avatarSrc = form.pictureURL || defaultAvatar;

  return (
    <div className="profile-background">
      <div className="profile-container">
        <div className="profile-card card shadow">
          <div className="card-body">
            <div className="profile-header d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div className="profile-avatar me-3">
                  <img src={avatarSrc} alt="Profile avatar" />
                </div>
                <h2 className="card-title mb-0">My Profile</h2>
              </div>
              <button
                className={`btn ${
                  isEditing ? "btn-secondary" : "btn-outline-primary"
                }`}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <ProfileForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            ) : (
              <div className="profile-view">
                <p>
                  <strong>Username:</strong> {form.username}
                </p>
                <p>
                  <strong>Name:</strong> {form.name} {form.surname}
                </p>
                <p>
                  <strong>City:</strong> {form.city}
                </p>
                <p>
                  <strong>Postcode:</strong> {form.postcode}
                </p>
                {form.address && (
                  <p>
                    <strong>Address:</strong> {form.address}
                  </p>
                )}
                {form.phone && (
                  <p>
                    <strong>Phone:</strong> {form.phone}
                  </p>
                )}
                <p>
                  <strong>Preferred Contact:</strong> {form.contactBy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
