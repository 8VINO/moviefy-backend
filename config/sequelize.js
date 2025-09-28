import Sequelize from 'sequelize';
import configDataBase from './database.js';

const sequelize = new Sequelize({
  ...configDataBase,     
  define: {
    timestamps: false    
  }
});

export default sequelize;
