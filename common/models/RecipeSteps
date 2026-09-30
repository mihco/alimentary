const { DataTypes } = require('sequelize');

const RecipeModel = {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    recipeName: { type: DataTypes.STRING, allowNull: false, unique: true }, 
    authorName: { type: DataTypes.STRING, allowNull: false}
};

module.exports = (sequelize) => sequelize.define('recipe', RecipeModel);