import React, { useState, useEffect } from "react";
import ProfileForm from "../components/profileForm";
import ReviewsSection from "../components/reviewsSection";
import defaultAvatar from "../assets/noimage.png";
import "./profilePage.css";
import useProfile from "../hooks/useProfile";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { profile, error, fetchProfile, updateProfile } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    city: "",
    postcode: "",
    address: "",
    phone: "",
    contact_email: true,
    contact_phone: false,
    pictureURL: "",
    picture: null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile) return;
    setForm({
      username: profile.username || "",
      name: profile.name || "",
      surname: profile.surname || "",
      city: profile.city || "",
      postcode: profile.postcode || "",
      address: profile.address || "",
      phone: profile.phone || "",
      contact_email:
        profile.contact_email !== undefined
          ? profile.contact_email === 1
          : true,
      contact_phone:
        profile.contact_phone !== undefined
          ? profile.contact_phone === 1
          : false,
      pictureURL: profile.picture || "",
      picture: null,
    });
  }, [profile]);

  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    if (!isAuthenticated || isAuthenticated === "false") navigate("/login");
  }, [isAuthenticated, navigate]);

  const HandleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("surname", form.surname);
    data.append("city", form.city);
    data.append("postcode", form.postcode);
    data.append("address", form.address);
    data.append("phone", form.phone);
    data.append("contact_email", form.contact_email ? 1 : 0);
    data.append("contact_phone", form.contact_phone ? 1 : 0);
    if (form.picture) {
      data.append("picture", form.picture);
    } else if (form.pictureURL) {
      data.append("existingPicture", form.pictureURL);
    } else {
      data.append("removePicture", "true");
    }

    const success = await updateProfile(data);
    if (success) {
      setIsEditing(false);
      await fetchProfile();
    }
  };

  const avatarSrc = form.picture
    ? URL.createObjectURL(form.picture)
    : form.pictureURL
    ? `/uploads/${form.pictureURL}`
    : defaultAvatar;

  if (error) return <p className="error">{error}</p>;

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
              {activeTab === "profile" && (
                <button
                  className={`btn ${
                    isEditing ? "btn-secondary" : "btn-outline-primary"
                  }`}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              )}
            </div>

            <ul className="nav nav-tabs mb-4">
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "profile" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("profile");
                    setIsEditing(false);
                  }}
                >
                  <i className="fas fa-user me-2"></i>
                  Profile Info
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "reviews" ? "active" : ""
                  }`}
                  onClick={() => {
                    setActiveTab("reviews");
                    setIsEditing(false);
                  }}
                >
                  <i className="fas fa-star me-2"></i>
                  My Reviews
                </button>
              </li>
            </ul>

            <div className="tab-content">
              {activeTab === "profile" && (
                <div className="tab-pane fade show active">
                  {isEditing ? (
                    <ProfileForm
                      form={{ ...form, setForm }}
                      handleChange={HandleChange}
                      handleSubmit={HandleSubmit}
                    />
                  ) : (
                    <div className="profile-view">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="info-section mb-4">
                            <h6 className="text-muted mb-3">
                              Personal Information
                            </h6>
                            <p>
                              <strong>Username:</strong> {form.username}
                            </p>
                            <p>
                              <strong>Name:</strong> {form.name} {form.surname}
                            </p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="info-section mb-4">
                            <h6 className="text-muted mb-3">Location</h6>
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
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="info-section">
                            <h6 className="text-muted mb-3">
                              Contact Information
                            </h6>
                            {form.phone && (
                              <p>
                                <strong>Phone:</strong> {form.phone}
                              </p>
                            )}
                            <p>
                              <strong>Preferred Contact:</strong>{" "}
                              {[
                                form.contact_email && "Email",
                                form.contact_phone && "Phone",
                              ]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="tab-pane fade show active">
                  <ReviewsSection />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
