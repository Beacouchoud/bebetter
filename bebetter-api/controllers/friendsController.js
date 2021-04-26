const friends = require('../models/friends');

//añadir nuevo amigo (aceptando solicitud de amistad)
exports.addFriend = async(req, res) => {
    try {
        await friends.updateOne({ "$addToSet": { "friends":  req.body.friendUsername} });
        res.json({msg: 'Nuevo amigo añadido'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//eliminar amigo
exports.deleteFriend = async(req, res) => {
    try {
        await friends.updateOne({ "$pull": { "friends":  req.params.friendUsername} });
        res.json({msg: 'Amigo eliminado'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//enviar solicitud de amistad
exports.sendFriendshipRequest = async(req, res) => {
    try {
        await friends.updateOne({ "$addToSet": { "friendshipRequest":  req.params.username} });
        res.json({msg: 'Solicitud enviada'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//rechazar solicitud amistad
exports.discardFriendshipRequest = async(req, res) => {
    try {
        await friends.updateOne({ "$pull": { "friendshipRequest":  req.params.username} });
        res.json({msg: 'Amigo eliminado'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//devuelve todos los amigos
exports.listFriends = async(req, res) => {
    try {
        const allFriends = await friends.find({"owner": req.params.owner}, {"friends": 1});
        res.json(allFriends);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//devuelve todas las solicitudes de amistad
exports.listFriendshipRequest = async(req, res) => {
    try {
        const allFriendshipRequest = await friends.find({"owner": req.params.owner}, {"friendshipRequest": 1});
        res.json(allFriendshipRequest);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};
