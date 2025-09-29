import express from 'express';
import db from '../models/index.js';
import authenticate from '../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import jwtConfig from '../config/jwt.js'

const router = express.Router();

const { User, Series, Movie } = db;

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();

    if (users.length === 0) {
      return res.status(404).json({ error: 'Users not found' });
    }

    res.json(users);

    console.log('Users found!');

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error when searching for users' });
  }

});
router.get('/:id', authenticate, async (req, res) => {
  const {id} = req.params
  try {
    const user = await User.findByPk(id);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);

    console.log('User found!');

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error when searching for user' });
  }

});
router.put('/edit/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  const dataToUpdate = {};

  if (name) dataToUpdate.name = name;
  if (email) dataToUpdate.email = email;
  if (password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    dataToUpdate.password = encryptedPassword;
  }

  try {
    let registeredUser = null;
    if (email) {
      registeredUser = await User.findOne({ where: { email: email } });
      if (registeredUser) {
        return res.status(409).json({ error: 'Email already registered' })
      };
    }
    const [updated] = await User.update(
      dataToUpdate,
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error updating user' });
  }
});
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const registeredUser = await User.findOne({ where: { email } });

    if (registeredUser) {
      return res.status(409).json({ error: 'Email already registered' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error when registering' })
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });

    res.json({ token });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Error when logging in' })
  }

});

router.post('/favorites/movie/:userId/:movieId', authenticate, async (req, res) => {
  const { userId, movieId } = req.params;

  let movie = await Movie.findByPk(movieId)

  if (!movie) {
    movie = await Movie.create({ id: movieId });
  }

  const user = await User.findByPk(userId);

  await user.addMovie(movie);

  res.status(201).send('Movie associate with the user!');
});

router.post('/favorites/series/:userId/:seriesId', authenticate, async (req, res) => {
  const { userId, seriesId } = req.params;

  let series = await Series.findByPk(seriesId)

  if (!series) {
    series = await Series.create({ id: seriesId });
  }

  const user = await User.findByPk(userId);

  await user.addSeries(series);

  res.status(201).send('Series associate with the user!');
});

router.get('/favorites/movie/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId)

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const movies = await user.getMovie();

  res.status(200).json(movies)

});

router.get('/favorites/series/:userId', authenticate, async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByPk(userId)

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const movies = await user.getSeries();

  res.status(200).json(movies)

});

export default router;
