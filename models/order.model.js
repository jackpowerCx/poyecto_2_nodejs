const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Orders = db.define('orde', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    },

});

module.exports = { Orders };