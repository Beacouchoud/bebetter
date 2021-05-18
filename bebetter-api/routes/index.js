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
    router.put('/usersPwd/:id', usersController.updateUserPwd);

    //elimina todos los datos de un usuario
    router.delete('/users/:id', usersController.deleteUser);

    //cierra la sesión de un usuario
    /* router.get('/logout', usersController.logout);   */ 

    //crear nuevo item
    router.post('/item', itemsController.addItem);

    //devuelve todos los items de un usuario
    router.get('/getFullItem/:owner', itemsController.getFullItem);

    //devuelve todos los items publicos de un usuario
    // router.get('/publicItems/:owner', itemsController.listPublicItems);

    //obtener un item
    // router.get('/item/:id', itemsController.getItem);

    //actualizar datos de un item
    router.put('/item', itemsController.updateItem);

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