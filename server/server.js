const express = require('express');
const mongoose = require('mongoose').default;
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const { MONGODB_CONNECTION_STRING, PORT } = process.env;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log('Connected to database!');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

const setupMiddlewares = (app) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use('/static', express.static(path.join(__dirname, './static')));

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PUT, PATCH, DELETE'
        );
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        );
        next();
    });

    app.use((error, req, res, next) => {
        console.error(error);
        res.status(error.statusCode || 500).json({ error: error.message });
    });
};

const startServer = async () => {
    const app = express();

    setupMiddlewares(app);

    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};

startServer();
