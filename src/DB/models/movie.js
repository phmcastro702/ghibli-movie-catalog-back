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
    }
}, {
    sequelize: DB_Connection,
    modelName: 'Movie'
});



export { Movie };