const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');
const itemsController = require('../controllers/itemsController');
const friendsController = require('../controllers/friendsController');


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



    //crear nuevo item
    router.post('/item', itemsController.addItem);

    //devuelve todos los items privados de un usuario
    router.get('/itemsPrivados/:owner', itemsController.listPrivateItems);

    //devuelve todos los items publicos de un usuario
    router.get('/itemsPublicos/:owner', itemsController.listPublicItems);

    //obtener un item
    router.get('/item/:id', itemsController.getItem);

    //actualizar datos de un item
    router.put('/item/:id', itemsController.updateItem);

    //elimina un item
    router.delete('/item/:id', itemsController.deleteItem);


    
    //añadir nuevo amigo (aceptando solicitud de amistad)
    router.post('/friend', friendsController.addFriend);

    //eliminar amigo
    router.put('/friend/:friendUsername', friendsController.deleteFriend);

    //enviar solicitud de amistad
    router.put('/sendFriendshipRequest/:username', friendsController.sendFriendshipRequest);

    //rechazar solicitud amistad
    router.put('/deleteFriendshipRequest/:username', friendsController.discardFriendshipRequest);

    //devuelve todos los amigos
    router.get('/friends/:owner', friendsController.listFriends);

    //devuelve todas las solicitudes de amistad
    router.get('/frienshipRequests/:owner', friendsController.listFriendshipRequest);



    return router;
}