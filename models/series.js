
const series = (sequelize, DataTypes)=>{

    const Series = sequelize.define('Series',{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false 
        }
        
    }, {tableName:'series'});

      Series.associate = (models) => {
        Series.belongsToMany(models.User, 
            {   
                through: 'UserSeries', 
                foreignKey: 'seriesId'
             });
  };

    return Series;


};

export default series;