const express = require('express');
const profileRouter = express.Router();
const profileModel = require('../Model/profileModel');
// const auth = require('../Middleware/auth');

profileRouter.post('/create-profile', async (req, res) => {
    try {
        const { name, emailID, phoneNumber, password, age } = req.body;
        const findProfile = await profileModel.findOne({ emailID });
        if (findProfile) {
            return res.status(400).json({ message: 'This profile already exists' });
        }
        const newProfile = new profileModel({
            name,
            emailID,
            phoneNumber,
            password,
            age,
        });
        await newProfile.save();
        res.status(200).json({ message: 'Profile is successfully created' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = profileRouter;
