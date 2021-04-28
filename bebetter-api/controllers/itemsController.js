const items = require('../models/items');

//crear nuevo item
exports.addItem = async(req, res) => {
    const item = new items(req.body);
    try {
        await item.save();
        res.json({msg: 'Nuevo item creado'});
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}

//devuelve todos los items privados de un usuario
exports.listPrivateItems = async(req, res) => {
    try {
        const allItems = await items.find({"owner": req.params.owner, "private": true});
        res.json(allItems);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//devuelve todos los items publicos de un usuario
exports.listPublicItems = async(req, res) => {
    try {
        const allItems = await items.find({"owner": req.params.owner, "private": false});
        res.json(allItems);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//obtener un item
exports.getItem = async(req, res, next) => {
    try {
        const item = await items.findOne({"_id":req.params.id});
        if (!item.title) {
            res.status(400).json({
                msg: 'El item no existe'
            });
        }
        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
        next();
    }
}

//actualizar datos de un item
exports.updateItem = async(req, res, next) => {
    try {
        const item = await items.findOneAndUpdate(
            {"_id":req.params.id}, req.body, {new: true}
        );
        if (!item.title) {
            res.status(400).json({
                msg: 'El item no existe'
            });
        }
        res.json( {msg: 'Item actualizado'});
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
        next();
    }
}

//elimina un item
exports.deleteItem = async(req, res, next) => {
    try {
        let deletedItem = await items.findOneAndDelete({"_id": req.params.id});
        if (!deletedItem) {
            res.json({msg: 'Item no encontrado'});
        }
        res.json({msg: 'El item ha sido eliminado'});
    } catch (error) {
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
    }
}