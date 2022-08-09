import express from 'express';
import axios from 'axios';

const router = express.Router();


router.get('/movies', async (req, res) => {
    const requestURL = 'https://ghibliapi.herokuapp.com/films?fields=title,image,description,director,producer&limit=50';


    try {
        const apiResponse = await axios.get(requestURL);
        const results = apiResponse.data;
        //
        res.status(200).send({
            success: true,
            data: results
        });
    } catch (err) {
        res.status(500).send({
            success: false,
            error: 'Failed to retrieve movies from API.'
        });
    }
});



export default router;