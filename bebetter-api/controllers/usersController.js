const users = require('../models/users');

//crear nuevo usuario
exports.addUser = async(req, res) => {
    const user = new users(req.body);
    try {
        await user.save();
        res.json({msg: 'Nuevo usuario creado'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//devuelve todos los usuarios
exports.listUsers = async(req, res) => {
    try {
        const allUsers = await users.find({});
        res.json(allUsers);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//obtener un usuario mediante username
exports.getUser = async(req, res, next) => {
    try {
        const user = await users.findOne({"username":req.params.id});
        if (!user.username) {
            res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
        next();
    }
}

//actualizar datos de un usuario
exports.updateUser = async(req, res, next) => {
    try {
        const user = await users.findOneAndUpdate(
            {"username":req.params.id}, req.body, {new: true}
        );
        if (!user.username) {
            res.status(400).json({
                msg: 'El usuario no existe'
            });
        }
        res.json( {msg: 'Usuario actualizado'});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
        next();
    }
}

exports.deleteUser = async(req, res, next) => {
    try {
        let deletedUser = await users.findOneAndDelete({"username": req.params.id});
        if (!deletedUser) {
            res.json({msg: 'Usuario no encontrado'});
        }
        res.json({msg: 'El usuario ha sido eliminado'});
    } catch (error) {
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
    }
}