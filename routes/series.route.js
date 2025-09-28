import express from 'express';
const router = express.Router();

import db from '../models/index.js';
const { Series } = db;

router.get('/', async (req,res)=>{
    const series = await Series.findAll()
    res.json(series)
});

router.post('/register', async(req , res)=>{
    const {id} = req.body;

    const series = await Series.create({id});

    res.status(201).json({idSeries: series.id});
});

router.post('/favorites/:userId/:seriesId', async (req, res) => {
  const { userId, seriesId } = req.params;

  const user  = await db.User.findByPk(userId);
  const series = await db.Series.findByPk(seriesId);

  if (!user || !series) return res.status(404).send('User or Series not found');

  await user.addSeries(series); 
  res.send('Series associate with the user!');
});

export default router;
