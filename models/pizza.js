// could import whole mongoose library but we only need Schema constructor and model function
const { Schema, model } = require('mongoose');

// create the schema using Schema constructor for pizza data, define the fields with specific data types
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    // empty brackets indicate an array for the data type, could also specify Array in place of brackets
    toppings: []
});

// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;