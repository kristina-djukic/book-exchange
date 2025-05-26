const express = require("express");
const app = express();
const port = 5000;
const { register } = require("./services/auth.service");
const { login } = require("./services/auth.service");
const session = require("express-session");

app.use(express.json());

app.use(
  session({
    secret: "kristinaskey",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/register", async (req, res) => {
  const { username, name, surname, email, password } = req.body;

  try {
    const user = await register(username, name, surname, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.message === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (error.message === "USERNAME_ALREADY_EXISTS") {
      return res.status(409).json({ message: "Username already exists" });
    }
    res
      .status(400)
      .json({ message: "Registration failed", error: error.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password);
    req.session.userId = user.id;
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
