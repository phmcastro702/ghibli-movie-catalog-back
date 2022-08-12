import { Model, DataTypes } from 'sequelize';
import { DB_Connection } from '../connection.js';


class Movie extends Model { };

// Modelando nossos dados para a tabela de filmes
Movie.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    /*
        Posteriormente se precisarmos de uma página 
        para mostrar todos os detalhes de cada filme
        podemos usar esse ID único para acessar o filme
        diretamente na API.
    */
    movie_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING
    },
    banner: {
        type: DataTypes.STRING,
        // Validação do sequelize para formato de URL
        validate: {
            isUrl: true
        }
    },
    description: {
        type: DataTypes.TEXT
    },
    director: {
        type: DataTypes.STRING
    },
    producer: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.STRING,
        // Formatando data para formato SQL com hora local.
        defaultValue: new Date()
            .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            .replace(/\//gm, '-')
    },
    updatedAt: {
        type: DataTypes.STRING,
        // Formatando data para formato SQL com hora local. 
        defaultValue: new Date()
            .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
            .replace(/\//gm, '-')
    }
}, {
    sequelize: DB_Connection,
    modelName: 'Movie',
    timestamps: false,
});


export { Movie };