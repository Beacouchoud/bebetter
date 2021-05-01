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

//inicia sesion
exports.login = (req, res, next) => {
    // db.query(
    //   "SELECT * FROM usuario WHERE email = ?",
    //   [req.body.email],
    //   (error, result) => {
    //     if (error) {
    //       req.session.authenticated = false;
    //       res.status(500).json({ code: error.code, message: error.sqlMessage });
    //     } else if (result.length === 0) {
    //       res.status(404).json({ message: "Usuario no encontrado" });
    //     } else {
    //       let data = JSON.parse(JSON.stringify(result));
  
    //       if (bcrypt.compareSync(req.body.password, data[0].password.toString())) {
    //         sess = req.session;
    //         sess.email = data[0].email;
    //         sess.userId = data[0].id_usuario;
    //         sess.nivel = data[0].nivel;
    //         sess.authenticated = true;
    //         sess.id = req.sessionID;
    //         delete data[0].password;
    //         data[0].sessionId = req.sessionID;
    //         res.status(200).json(data[0]);
    //       } else {
    //         res.status(404).json({ message: "Contraseña incorrecta" });
    //       }
    //     }
    //   }
    // );
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



exports.activeUser = (req, res, next) => {
    // console.log("[Active User] token", req.body);
    // console.log("[Active Session] ", sess);
    // if (sess && sess.id == req.body.token) {
    //   console.log(
    //     "[Active User] user logged token y session:",
    //     req.body.token,
    //     sess.id
    //   );
    //   db.query(
    //     "SELECT * FROM usuario WHERE id_usuario = ?",
    //     [sess.userId],
    //     (error, result) => {
    //       console.log("ERROR: ", error, "RESULT: ", result);
    //       if (error) {
    //         console.error(error);
    //         res.status(500).json({ code: error.code, message: error.sqlMessage });
    //       } else {
    //         let data = JSON.parse(JSON.stringify(result));
    //         delete data[0].password;
    //         res.status(200).json(data[0]);
    //       }
    //     }
    //   );
    // } else {
    //   console.log("[Active User] user not logged");
    //   res.status(200).json(null);
    // }
};



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