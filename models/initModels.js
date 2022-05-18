//Models
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { Reviwes } = require('../models/reviwes.modal');
const { User } = require('../models/user.model');
const { Orders } = require('../models/order.model');

// Establish your models relations inside this function
const initModels = () => {

    User.hasMany(Reviwes);
    Reviwes.belongsTo(User);
    
    User.hasOne(Orders);
    Orders.belongsTo(User);

    Restaurant.hasMany(Reviwes);
    Reviwes.belongsTo(Restaurant);

    Restaurant.hasMany(Meal);
    Meal.belongsTo(Restaurant);

    Meal.hasOne(Orders);
    Orders.belongsTo(Meal);

};

module.exports = { initModels };
