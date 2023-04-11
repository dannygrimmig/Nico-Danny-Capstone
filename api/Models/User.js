const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        recipes:{
            type: Array,
            default: []
        },
        starred: {
            type: Array,
            default: []
        },
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;