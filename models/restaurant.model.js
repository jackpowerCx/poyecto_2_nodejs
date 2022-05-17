const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Restaurant = db.define('restaurants', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    anddress: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },
});

module.exports = { Restaurant };