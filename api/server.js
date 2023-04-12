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
const Recipe = require("./Models/Recipe");

// View Users
app.get("/users", async (req,res) => {
    const users = await User.find();
    res.json(users);
});

// Create User
app.post("/users/new", async (req,res) => {
    const newUser = new User(
        {
            username: req.body.username,
            password: req.body.password
        }
    );
    newUser.save();
    res.json(newUser);
});

// Get User
app.get("/users/:userID", async (req,res) => {
    const user = await User.findById(req.params.userID);
    res.json(user);
});


// View User Recipes
app.get("/users/:userID/recipes", async (req,res) => {
    const user = await User.findById(req.params.userID);
    const userRecipes = user.recipes;
    res.json(userRecipes);
});

// Add New Recipe to User
app.post("/users/:userID/recipes/new", async (req,res) => {
    const user = await User.findById(req.params.userID);
    const userRecipes = user.recipes;
    const newRecipe = new Recipe(
        {
            chef: user.username,
            dishName: req.body.dishName,
            servingSize: req.body.servingSize,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
            imageURL: req.body.imageURL
        }
    );
    newRecipe.save(); 
    userRecipes.push(newRecipe);
    user.save();
    res.json(newRecipe);
});

app.listen("3001", console.log("Server Starting on Port 3001"));