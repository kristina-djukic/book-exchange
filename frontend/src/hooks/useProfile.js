import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const fetchProfile = async () => {
    if (!isAuthenticated || isAuthenticated === "false") return;
    try {
      const res = await axios.get("/profile/userProfile", {
        withCredentials: true,
      });
      setProfile(res.data);
    } catch (err) {
      toast.error("Failed to fetch profile");
    }
  };

  const updateProfile = async (formData) => {
    try {
      const res = await axios.put("/profile/updateProfile", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfile(res.data);
      setError("");
      return true;
    } catch (err) {
      toast.error("Failed to update profile");
      return false;
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    error,
    fetchProfile,
    updateProfile,
  };
};

export default useProfile;
