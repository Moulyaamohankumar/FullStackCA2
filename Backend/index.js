const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const profileRouter = require('./controller/profile');
const cartRouter = require('./controller/cart');
const addressRouter = require('./controller/address');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.use('/api/profile', profileRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

