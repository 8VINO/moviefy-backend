
const user = (sequelize, DataTypes)=>{

    const User = sequelize.define('User',{
        name:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        }


    }, {tableName:'user'});

    User.associate = (models) => {
        User.belongsToMany(models.Movie, 
            { 
                through: 'UserMovie', 
                foreignKey: 'userId',
                as: 'Movie' 
            });
        User.belongsToMany(models.Series, 
            { 
                through: 'UserSeries',
                foreignKey: 'userId',
                as: 'Series' 
            });
  }

    return User;


};

export default user;