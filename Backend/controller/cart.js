const express = require('express');
const cartRouter = express.Router();
const mongoose = require('mongoose');
const productModel = require('../Model/productModel');
const userModel = require('../Model/userModel');
// const auth = require('../MiddleWare/auth');

cartRouter.get('/get-cart', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            return res.status(404).json({ message: 'Please provide all the details' });
        }
        const findProfile = await userModel.findOne({ email });
        if (!findProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ cart: findProfile.cart });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

cartRouter.post('/add-to-cart', async (req, res) => {
    const { email, id, quantity, price, images } = req.body;
    try {
        if (!email || !id || quantity === undefined || !price) {
            return res.status(404).json({ message: 'Please provide all the details' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const findProfile = await userModel.findOne({ email });
        const findProduct = await productModel.findById(id);
        if (!findProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        if (!findProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const cartProduct = findProfile.cart.findIndex((product) => product.productid === id);
        if (cartProduct !== -1) {
            findProfile.cart[cartProduct].quantity += quantity;
            await findProfile.save();
            res.status(200).json({ message: 'Product added to cart' });
        } else {
            findProfile.cart.push({ productid: id, productname: findProduct.name, quantity });
            await findProfile.save();
            res.status(200).json({ message: 'Product added to cart' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

cartRouter.put('/edit-cart', async (req, res) => {
    const { email, id, quantity } = req.body;
    try {
        if (!email || !id || quantity === undefined) {
            return res.status(404).json({ message: 'Please provide all the details' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const findProfile = await userModel.findOne({ email });
        if (!findProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const cartProduct = findProfile.cart.findIndex((product) => product.productid === id);
        if (cartProduct === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        findProfile.cart[cartProduct].quantity = quantity;
        await findProfile.save();
        res.status(200).json({ message: 'Product quantity updated' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

cartRouter.delete('/delete-cart', async (req, res) => {
    const { email, id } = req.body;
    try {
        if (!email || !id) {
            return res.status(404).json({ message: 'Please provide all the details' });
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const findProfile = await userModel.findOne({ email });
        if (!findProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        const cartProduct = findProfile.cart.findIndex((product) => product.productid === id);
        if (cartProduct === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        findProfile.cart.splice(cartProduct, 1);
        await findProfile.save();
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = cartRouter;
