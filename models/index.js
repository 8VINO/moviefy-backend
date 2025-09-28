import sequelize from '../config/sequelize.js';
import Sequelize from 'sequelize';
import User from './user.js';
import Movie from './movie.js';
import Series from './series.js';

const UserModel = User(sequelize, Sequelize.DataTypes);
const MovieModel = Movie(sequelize,Sequelize.DataTypes);
const SeriesModel = Series(sequelize,Sequelize.DataTypes);
const db = { 
    User: UserModel,
    Movie: MovieModel,
    Series: SeriesModel,
    sequelize
};

if (UserModel.associate) UserModel.associate(db);
if (MovieModel.associate) MovieModel.associate(db);
if (SeriesModel.associate) SeriesModel.associate(db)

export default db;
