const express = require("express");
const connectDB = require("./db");
require ("dotenv").config();
const { PORT } = process.env;

// Connect to DB
connectDB();

// Initialize Express
const app = express()

// Initialize Express Middleware
app.use(express.json({ extended : false }));

// Create a basic express route
app.get("/", (req, res) => {
    return res.json({ message: "Welcome to tutoring App." });
});

const port = process.env.PORT || PORT;

// Listen to connection
app.listen(port, () => {
    console.log("App is up and running.")
})