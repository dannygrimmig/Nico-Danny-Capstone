// Constant Variables
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// Set Up App
const app = express();
app.use(express.json());
app.use(cors());

// Establish DataBase Connection
const dbURL = "mongodb+srv://dannyg:dbpass@cluster0.pawnxue.mongodb.net/capstone";


mongoose.connect(dbURL,{
    useNewURLParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);


// USER SCHEMA
const User = require("./Models/User");

app.get("/users", async (req,res) => {
    const users = await User.find();
    res.json(users);
})

app.listen("3001", console.log("Server Starting on Port 3001"));