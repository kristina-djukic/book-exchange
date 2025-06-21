import React, { useState, useEffect } from "react";
import ProfileForm from "../components/profileForm";
import defaultAvatar from "../assets/noimage.png";
import "./profilePage.css";
import useProfile from "../hooks/useProfile";

const ProfilePage = () => {
  const { profile, error, fetchProfile, updateProfile } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
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
                form={{ ...form, setForm }}
                handleChange={HandleChange}
                handleSubmit={HandleSubmit}
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
                  <strong>Preferred Contact:</strong>{" "}
                  {[
                    form.contact_email && "Email",
                    form.contact_phone && "Phone",
                  ]
                    .filter(Boolean)
                    .join(", ")}
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
