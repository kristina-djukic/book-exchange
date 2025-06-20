import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const loginUser = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("/auth/login", {
        email,
        password,
      });

      setSuccess(true);
      toast.success("Login successful!");
      navigate("/homepage");
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, success };
};

export default useLogin;
