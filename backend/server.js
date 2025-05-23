const express = require("express");
const app = express();
const db = require("./config/db");
const port = 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors());