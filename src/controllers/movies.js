import axios from 'axios';
import { Movie } from '../DB/models/movie.js';

const IMG_NOT_FOUND_URL = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';

const MoviesController = {
    getPaginated: async (req, res) => {
        const moviesPerPage = 10;
        const requestedPage = req.params.page;

        try {
            const { count, rows } = await Movie.findAndCountAll({
                limit: moviesPerPage,
                offset: (requestedPage - 1) * moviesPerPage
            });
            const moviesTotalPages = Math.ceil(count / moviesPerPage);

            res.status(200).send({
                success: true,
                data: rows,
                totalPages: moviesTotalPages
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                error: 'Não foi possível obter dados dos filmes'
            });
        }

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

            const allMovies = await Movie.findAll();
            if (allMovies.length > 0) {

                const datetimeNowStr = new Date()
                    .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
                    .replace(/\//gm, '-');

                for (let i = 0; i < allMovies.length; i++) {
                    filteredResults[i].updatedAt = datetimeNowStr;
                    await Movie.update(filteredResults[i], {
                        where: { movie_id: filteredResults[i].movie_id }
                    });
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
                error: 'Erro ao atualizar a lista de filmes'
            });
        }
    }
};


export { MoviesController };