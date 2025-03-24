const express = require('express');
const userModel = require('../Model/userModel');
// const auth = require('../Middleware/auth');
const addressRouter = express.Router();

addressRouter.post('/address', auth, async (req, res) => {
    const { address, city, state, zip, country } = req.body;
    try {
        if (!address || !city || !state || !zip || !country) {
            return res.status(400).json({ message: "Fill all fields" });
        }
        const addressDetails = new userModel({ address, city, state, zip, country });
        await addressDetails.save();
        res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = addressRouter;
