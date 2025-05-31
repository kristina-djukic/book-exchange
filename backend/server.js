const express = require("express");
const app = express();
const port = 5000;
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use(
  session({
    secret: "kristinaskey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
