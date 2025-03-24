const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email!"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [4, "Password should be greater than 4 characters"],
    },
    cart: [
        {
            productid: {
                type: String,
                unique: true,
                required: true
            },
            productname: {
                type: String,
                unique: true,
                required: true
            },
            quantity: {
                type: Number,
                min: 1,
                required: true
            }
        }
    ]
});

const userModel = model('User', userSchema);

module.exports = userModel;