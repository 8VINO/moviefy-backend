import express from 'express';
const router = express.Router();

import db from '../models/index.js';
const { User } = db;

router.get('/', async (req,res)=>{
    const users = await User.findAll()
    res.json(users)
});

router.post('/register', async(req , res)=>{
    const {name,email,password} = req.body;

    const user = await User.create({ name, email, password });

    res.status(201).json({id: user.id, name:user.name, email:user.email});
});

router.post('/favorites/:userId/:movieId', async (req, res) => {
  const { userId, movieId } = req.params;

  const user  = await db.User.findByPk(userId);
  const movie = await db.Movie.findByPk(movieId);

  if (!user || !movie) return res.status(404).send('User or Movie not found');

  await user.addMovie(movie);

  res.send('Movie associate with the user!');
});
export default router;
