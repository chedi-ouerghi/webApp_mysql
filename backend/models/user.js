// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const User = sequelize.define('User', {
  IdUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  NomUser: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  PrenomUser: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  Photo: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  Role: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 999,
  },
});

module.exports = User;
