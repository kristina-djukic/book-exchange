const express = require("express");
const app = express();
const port = 5000;
const session = require("express-session");
const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/books.routes");

app.use(express.json());

app.use(
  session({
    secret: "kristinaskey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
