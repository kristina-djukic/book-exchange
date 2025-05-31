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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
