import axios from 'axios';
// Importando model para realizar operações no banco de dados
import { Movie } from '../DB/models/movie.js';

// URL caso o registro de filme não contenha uma imagem pro banner do filme
const IMG_NOT_FOUND_URL = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png';


// Objeto exportado contendo as funções controller para cada rota
const MoviesController = {
    /* 
        Recebe como parâmetro na URL o número da página requisitada
        Retorna no objeto de resposta os dados dos filmes e também o 
        número total de páginas para o recurso buscado.
    */
    getPaginated: async (req, res) => {

        // Como requisitado a paginação será de 10 em 10 itens por página
        // Mas poderia ser implementado posteriormente um sistema para o
        // app no frontend requisitar o número de itens por página
        const moviesPerPage = 10;

        const requestedPage = req.params.page;

        try {
            // Método do sequelize que retorna o resultado da query mais o count
            const { count, rows } = await Movie.findAndCountAll({
                limit: moviesPerPage,
                // Para consulta paginada no banco de dados
                offset: (requestedPage - 1) * moviesPerPage
            });

            // Enviado para o frontend ter melhor controle da paginação sabendo o limite de páginas
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

    /* 
        Consulta filmes em API e atualiza as informações deles em
        nosso banco de dados.

        Retorna se operação de atualizar filmes foi bem sucedida
    */
    refreshMovieList: async (_, res) => {

        // URL de request para API limitando os campos requisitados
        const requestURL = 'https://ghibliapi.herokuapp.com/films?fields=id,title,image,description,director,producer&limit=50';

        try {
            // Chamada axios para consultar API
            const apiResponse = await axios.get(requestURL);
            // Extraindo dados recebidos para objeto
            const movieData = apiResponse.data;


            const filteredResults = [];
            // Para inserir no banco de dados precisamos normalizar o objeto para
            // satisfazer nosso modelo de dados. Especialmente nosso campo 'banner'
            // que originalmente é chamado de 'image' pela API.
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

            // Consultando lista de filmes em nosso banco de dados
            const allMovies = await Movie.findAll();
            // Se já estiver preenchida apenas atualizamos os dados
            // e explicitamente atualizamos a coluna 'updatedAt'.
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
                // Caso nossa tabela esteja vazia, inserimos os filmes lá
                await Movie.bulkCreate(filteredResults, { validate: true });
            }


            res.status(200).send({
                success: true
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