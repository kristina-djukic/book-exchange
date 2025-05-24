const express = require("express");
const app = express();
const db = require("./config/db");
const port = 5000;
const cors = require("cors");
const { register } = require("./services/auth.service");
const { login } = require("./services/auth.service");

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, name, surname, email, password } = req.body;

  try {
    const user = await register(username, name, surname, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error: error.message });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  login(email, password);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
