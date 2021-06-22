// functionality

const { Pizza } = require('../models');

const pizzaController = {
    // create a method to get all pizzas, serves as a callback function for the GET /api/pizzas route
    getAllPizza(req, res) {
        // mongoose method .find()
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a method to get one pizza by id, don't need to acces the entire req, so destructure params out b/c that's the only data we need for this request to be fulfilled
    getPizzaById({ params }, res) {
        // mongoose method .findOne()
        Pizza.findOne({ _id: params.id })
            .then(dbPizzaData => {
                // if no pizza is found, send 404
                if (!dbPizzaData) {
                    res.status(400).json({ message: 'No pizza found with this id! '});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a method for handling POST /api/pizzas to add a pizza to the db, destructure body out of req
    createPizza({ body }, res) {
        // mongoose method .create()
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    // create a method for updating a pizza by id when making a request to PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
        // mongoose method .findOneAndUpdate()
        // if we don't set third paramter { new: true } then it will return the original document and not the updated one
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    // create a method to delete a pizza from database when we make a request to DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        // mongoose method .findOneAndDelete()
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                    res.status(404).json({ message: 'No pizza found with this id!' });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;