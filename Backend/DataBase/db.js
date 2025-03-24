const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connected');
    } catch (error) {
        console.log('Error connecting to database:', error);
    }
};

module.exports = connectDB;
