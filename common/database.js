/*
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './storage/data.db'
});
module.exports = sequelize;
*/
const SequelConfig = require('../sequelizeconfig.js')

const Sequelize = require('sequelize')

const sequelize = new Sequelize(SequelConfig.DB, SequelConfig.USER, SequelConfig.PASSWORD, {
    host: SequelConfig.HOST,
    dialect: SequelConfig.dialect
})

const db = {};

db.Sequelize = Sequelize;

db.sequelize = sequelize;

db.user = require('/models/')