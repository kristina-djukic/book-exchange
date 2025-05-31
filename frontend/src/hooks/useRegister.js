import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const createUser = async ({ name, surname, username, email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("/auth/register", {
        name,
        surname,
        username,
        email,
        password,
      });

      setSuccess(true);
      toast.success("Success message!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
};

export default useRegister;
