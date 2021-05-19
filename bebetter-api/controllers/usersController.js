const users = require('../models/users');
const express = require("express");
const bcrypt = require("bcrypt");
const expressSanitizer = require('express-sanitizer');
var sess;
var jwt = require("jsonwebtoken");
var secret = 'Shh, its a secret!';



exports.signup = async(req, res) => {
    const user = new users({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    }); 
    try {
    await user.save();
    res.json({msg: 'Nuevo usuario creado'}); 
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//inicia sesion
exports.signin = (req, res) => {
    users.findOne({
      email: req.body.email
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        var token = jwt.sign({ id: user._id }, secret, {
          expiresIn: 86400 // 24 hours
        });
  
        res.status(200).send({
          user: user,
          accessToken: token
        });
      });
  };

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
        console.log(user);
        if (null || !user.username) {
            console.log('El usuario no existe');
            res.status(400).json({
                msg: 'El usuario no existe'
            });
        } else {
            res.json(user);
        }
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



//actualizar contraseña de un usuario
exports.updateUserPwd = async(req, res, next) => {
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



//elimina un usuario
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

exports. logout = (req, res, next) => {
    sess = undefined;
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200);
      }
      res.end();
    });
  };