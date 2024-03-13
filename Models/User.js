const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,
        },
        image:String,
        shop:String,
        status:String,
        cart:[],
        address:[],
        order:[],
    }
)

module.exports = mongoose.model("User", userSchema);