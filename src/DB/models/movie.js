import { Model, DataTypes } from 'sequelize';
import { DB_Connection } from '../connection.js';


class Movie extends Model { };

Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    banner: {
        type: DataTypes.STRING,
        validate: {
            isUrl: true
        }
    },
    description: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    producer: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.STRING,
        defaultValue: new Date()
            .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            .replace(/\//gm, '-')
    },
    updatedAt: {
        type: DataTypes.STRING,
        defaultValue: new Date()
            .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            .replace(/\//gm, '-')
    }
}, {
    sequelize: DB_Connection,
    modelName: 'Movie',
    timestamps: false,
});

// 10-08/2022 20:49:53

export { Movie };