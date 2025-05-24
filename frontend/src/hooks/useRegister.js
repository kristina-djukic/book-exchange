import axios from "axios";
import { useState } from "react";

export const useRegister = () => {
        

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createUser = async ({
      name,
      surname,
      username,
      email,
      password,
    }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
console.log("Creating user with data:", {
      name,
      surname,
      username,
      email,
      password,
    });
    try {
      await axios.post("/register", {
      name,
      surname,
      username,
      email,
      password,
    });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { createUser, loading, error, success };
};

export default useRegister;