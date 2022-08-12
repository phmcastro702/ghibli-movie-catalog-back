import express from 'express';
import { MoviesController } from '../controllers/movies.js';

const router = express.Router();


// Definição de rotas Movies para serem tratadas pelo controller de Movies

// Endpoint que consulta filmes na API e atualiza nosso banco de dados
router.get('/movies', MoviesController.refreshMovieList);

// Endpoint para consumo paginado de filmes pelo app frontend
router.get('/movies/paginate/:page', MoviesController.getPaginated);



export default router;