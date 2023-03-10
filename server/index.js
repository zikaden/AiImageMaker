//import external packages
import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

//import mongodb from mongodb folder
import connectDB from "./mongodb/connect.js";

//import routes
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

//set up of dotenv that allows for the pulling of variables from the .env file
dotenv.config()

//initialise app
const app = express()

//adding middlewares - part of the systems that is enabled to handle data
app.use(cors())
app.use(express.json({ limit: '5mb' }));

//api routes
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//routes
app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!',
    });
});

//function that runs the server
const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log('Server is running on port http://localhost:8080'))
    } catch (error) {
        console.log(error)
    }
}
startServer()
