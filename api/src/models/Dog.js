const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define("Dog", {

        id: {
            type: DataTypes.UUID, 
            defaultValue : DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        height: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        life_span: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        image : {
            type: DataTypes.STRING, 
            // defaultValue: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
        },
        createdInDb : {
            type: DataTypes.BOOLEAN, 
            allowNull: false,
            defaultValue: true
        }
    });
};