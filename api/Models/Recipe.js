const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
    {
        chef: {
            type: String,
            required: true
        },
        dishName: {
            type: String,
            required: true
        },
        servingSize: {
            type: Number,
            required: true
        },
        ingredients: {
            type: Array,
            default: []
        },
        directions: {
            type: Array,
            default: []
        },
        imageURL: {
            type: String,
            required: true
        }
    }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;