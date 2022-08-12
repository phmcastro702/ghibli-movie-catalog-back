// PONTO DE ENTRADA do app em NODE, iniciado com o comando 'npm start'

// O app é configurado no arquivo app.js e inicializado aqui
import { app } from './app.js';
import dotenv from 'dotenv';

dotenv.config();

// Posteriormente no deploy no Heroku ela oferece uma porta nesta variável de ambiente
const PORT = process.env.PORT || 3335;


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));