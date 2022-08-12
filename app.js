import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Importando rotas de Movies 
import movieRoutes from './src/routes/movies.js';

dotenv.config();

const app = express();

app.use(express.json());
// Como teremos só um app cliente podemos limitar o CORs para aceitar requests somente do domínio do app frontend
app.use(cors({
    origin: process.env.APP_FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200
}));

app.use(movieRoutes);

// Rota para checar status de backend pelo frontend
app.get('/isOnline', (_, res) => {
    res.status(200).send({
        success: true,
        app_status: 'online'
    });
});


export { app };