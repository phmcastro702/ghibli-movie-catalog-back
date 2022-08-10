import express from 'express';
import { MoviesController } from '../controllers/movies.js';

const router = express.Router();


router.get('/movies', MoviesController.refreshMovieList);
router.get('/movies/paginate/:page', MoviesController.getPaginated);



export default router;