import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Configurando banco de dados MySQL com o ORM Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    }
);

// Realizando a conexão em si com o servidor MySQL
sequelize.sync()
    .then(() => console.log('DB Connected!'))
    .catch((err) => console.log('Failed DB connection ' + err));


// Exportando conexão para ser utilizada nos models
export { sequelize as DB_Connection }