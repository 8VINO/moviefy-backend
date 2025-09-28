
const movie = (sequelize, DataTypes)=>{

    const Movie = sequelize.define('Movie',{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false 
        }
        
    }, {tableName:'movie'});

    Movie.associate = (models) => {
        Movie.belongsToMany(models.User, 
            { 
                through: 'UserMovie', 
                foreignKey: 'movieId' 
            });
  };

    return Movie;


};

export default movie;