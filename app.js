import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Importing routes
import movieRoutes from './src/routes/movies.js';


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    // origin: process.env.APP_FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
}));


app.use(movieRoutes);


app.get('/isOnline', (_, res) => {
    res.status(200).send({
        success: true,
        app_status: 'online'
    });
});


export { app };