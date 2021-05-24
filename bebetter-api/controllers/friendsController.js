const friends = require('../models/friends');

//añadir nuevo amigo (aceptando solicitud de amistad)
exports.addFriend = async(req, res) => {
    try {
        await friends.findOneAndUpdate({"owner": req.body.userUsername},{ "$addToSet": { "friends":  req.body.friendUsername} });
        res.json({msg: 'Nuevo amigo añadido'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//eliminar amigo
exports.deleteFriend = async(req, res) => {
    console.log("api");
    console.log(req.body);
    try {
        await friends.findOneAndUpdate({"owner": req.body.owner},{ "$pull": { "friends":  req.body.friend} });
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
        await friends.findOneAndUpdate({"owner": req.body.friendUsername},{ "$addToSet": { "friendshipRequests":  req.body.userUsername} });
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
        await friends.findOneAndUpdate({"owner": req.body.userUsername},{ "$pull": { "friendshipRequests":  req.body.friendUsername} });
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
        const allFriendshipRequest = await friends.find({"owner": req.params.owner}, {"friendshipRequests": 1});
        res.json(allFriendshipRequest);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

exports.getFriendsInfo = async(req, res) => {
    try {
        const allFriendsInfo = await friends.findOne({"owner": req.params.username});
        console.log(allFriendsInfo);
        res.json(allFriendsInfo);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}

exports.createFriendsInfo = async(req, res) => {
    console.log(req.body);
    const friendsInfo = new friends({
        'owner': req.body.owner, 
        'friends': new Array(),
        'friendshipRequests': new Array()
    });
    try {
        await friendsInfo.save();
        res.json({msg: 'Item inicial creado'}); 
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
}