const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');

module.exports = function() {
    //devuelve todos los usuarios
    router.get('/users', usersController.listUsers);

    //crea un nuevo usuario
    router.post('/users', usersController.addUser);

    //devuelve un usuario
    router.get('/users/:id', usersController.getUser);

    //actualiza datos de un usuario
    router.put('/users/:id', usersController.updateUser);

    //elimina todos los datos de un usuario
    router.delete('/users/:id', usersController.deleteUser);

    return router;
}