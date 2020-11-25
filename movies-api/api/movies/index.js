import express from 'express';
import {moviesObject} from './movies';

const router = express.Router(); // eslint-disable-line

router.get('/', (req, res) => {
  res.status(200).send(moviesObject);
});
//get a movie
router.get('/:id', (req, res) => {
    const key =  parseInt(req.params.id);
    const index = moviesObject.movies.map((movie)=>{
  return movie.id;
  }).indexOf(key);
   if (index > -1) {
       res.status(200).send(moviesObject.movies[index]);
   } else {
     res.status(404).send({message: `Unable to find movie with id: ${key}.`, status: 404});
     }
  });

export default router;