const express = require("express");
const app = express();
const db = require("./config/db");
const port = 5000;
const cors = require("cors");
const { register } = require("./services/auth.service");
const { login } = require("./services/auth.service");

app.use(express.json());
app.use(cors());

app.post("/register", (req, res) => {
    const { username, name, surname, email, password} = req.body;

    register(username, name, surname, email, password)
       
})

app.post("/login", (req, res) => {
    const {email, password} = req.body;

    login(email, password)

})