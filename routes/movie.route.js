import express from 'express';
const router = express.Router();

import db from '../models/index.js';
const { Movie } = db;

router.get('/', async (req,res)=>{
    const movies = await Movie.findAll()
    res.json(movies)
});

router.post('/register', async(req , res)=>{
    const {id} = req.body;

    const movie = await Movie.create({id});

    res.status(201).json({idMovie: movie.id});
});

export default router;
