import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUser = async ({ name, surname, username, email, password }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("http://localhost:5000/register", {
        name,
        surname,
        username,
        email,
        password,
      });

      setSuccess(true);
      toast.success("Success message!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      toast.error("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
};

export default useRegister;
