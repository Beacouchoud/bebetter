const express = require('express')
const router = express.Router();
const usersController = require('../controllers/usersController');
const itemsController = require('../controllers/itemsController');
const friendsController = require('../controllers/friendsController');
const verifySignUp  = require("../middlewares/verifySignUp");

//return router
module.exports = function() {
    //crea un nuevo usuario
    router.post('/signup', verifySignUp.checkDuplicateUsernameOrEmail, usersController.signup);

    //inicia sesión
    router.post('/login', usersController.signin);

    //devuelve todos los usuarios
    router.get('/users', usersController.listUsers);

    //devuelve un usuario
    router.get('/users/:id', usersController.getUser);

    //devuelve el usuario que tiene la sesión iniciada,
    //router.post('/user', usersController.activeUser);

    //actualiza datos de un usuario
    router.put('/users/:id', usersController.updateUser);

    //actualiza contraseña de un usuario
    router.post('/updatePwd', usersController.updateUserPwd);

    //elimina todos los datos de un usuario
    router.delete('/users/:id', usersController.deleteUser);


    //crear  full item
    router.post('/fullItem', itemsController.createFullItem);

    //crear nuevo item
    router.post('/item', itemsController.addItem);

    //devuelve todos los items de un usuario
    router.get('/getFullItem/:owner', itemsController.getFullItem);

    //actualizar datos de un item
    router.put('/item', itemsController.updateItem);

    //elimina un item
    router.delete('/item/:id', itemsController.deleteItem);

    //añade un record
    router.post('/addNewRecord', itemsController.addNewRecord);


    
    //añadir nuevo amigo (aceptando solicitud de amistad)
    router.post('/addFriend', friendsController.addFriend);

    //eliminar amigo
    router.post('/deleteFriend', friendsController.deleteFriend);

    //enviar solicitud de amistad
    router.post('/sendFriensdhipRequest', friendsController.sendFriendshipRequest);

    //rechazar solicitud amistad
    router.post('/deleteFriendshipRequest', friendsController.discardFriendshipRequest);

    //devuelve todos los amigos
    router.get('/friends/:owner', friendsController.listFriends);

    //devuelve todas las solicitudes de amistad
    router.get('/frienshipRequests/:owner', friendsController.listFriendshipRequest);

    //devuelve todas la informacion relacionada con los amigos del usuario 
    router.get('/friendsInfo/:username', friendsController.getFriendsInfo)

    router.post('/friendsInfo', friendsController.createFriendsInfo)

    return router;
}