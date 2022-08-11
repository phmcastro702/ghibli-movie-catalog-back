import { Sequelize } from 'sequelize';


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'local_dev.db',
    logging: false,
});

sequelize.sync()
    .then(() => console.log('DB Connected!'))
    .catch(() => console.log('Failed DB connection'));

export { sequelize as DB_Connection }