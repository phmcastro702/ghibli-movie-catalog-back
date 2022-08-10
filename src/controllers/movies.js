import axios from 'axios';
import { Movie } from '../DB/models/movie.js';

const IMG_NOT_FOUND_URL = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';

const MoviesController = {
    getPaginated: (req, res) => {

        // Fetch 10 instances/rows
        Project.findAll({ limit: 10 });

        // Skip 8 instances/rows
        Project.findAll({ offset: 8 });

        // Skip 5 instances and fetch the 5 after that
        Project.findAll({ offset: 5, limit: 5 });

    },
    refreshMovieList: async (_, res) => {
        const requestURL = 'https://ghibliapi.herokuapp.com/films?fields=id,title,image,description,director,producer&limit=50';

        try {
            const apiResponse = await axios.get(requestURL);
            const movieData = apiResponse.data;


            const filteredResults = [];
            for (let i = 0; i < movieData.length; i++) {
                filteredResults.push({
                    movie_id: movieData[i].id,
                    banner: movieData[i].image ?? IMG_NOT_FOUND_URL,
                    title: movieData[i].title,
                    description: movieData[i].description,
                    director: movieData[i].director,
                    producer: movieData[i].producer
                });
            }

            // TODO: corrigir sistema de update de filmes (quando atribui o novo objeto perde o metodo .save())
            const allMovies = await Movie.findAll();
            if (allMovies.length > 0) {
                for (let i = 0; i < allMovies.length; i++) {
                    // allMovies[i] = filteredResults[i];
                    
                    await allMovies[i].save();
                }
            } else {
                await Movie.bulkCreate(filteredResults, { validate: true });
            }


            res.status(200).send({
                success: true,
                data: filteredResults
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                error: err.message
            });
        }
    }
};


export { MoviesController };