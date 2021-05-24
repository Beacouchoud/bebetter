const items = require('../models/items');

//crear nuevo item
exports.addItem = async(req, res) => {
    const owner = req.body.owner;
    delete req.body.owner;
    const item = req.body;
    console.log(item);
    try {
        const itemSaved = await items.findOneAndUpdate(
            { "owner" : owner }, 
            { $push: { "userItems": item } },
            { returnOriginal: false }
    );
    console.log("item devuelto de bbdd", itemSaved)
        res.send(itemSaved)
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
}


exports.createFullItem = async(req, res) => {
    console.log(req.body);
    const item = new items(
        {'owner': req.body.owner, 
        'userItems': new Array()}
    );
    try {
        await item.save();
        res.json({msg: 'Item inicial creado'}); 
    } catch(error) {
        console.log(error);
        res.send(error);
        next();
    }
};


//devuelve todos los items privados de un usuario
exports.getFullItem = async(req, res) => {
    try {
        const allItems = await items.findOne({"owner": req.params.owner});
        console.log(allItems);
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
    console.log("updateItem: \n"+req.body)
    try {
        const itemUpdated = await items.findOneAndUpdate(
            {"_id":req.body._id}, {"userItems": req.body.userItems}, {new: true}
        );
        if (!itemUpdated._id) {
            res.status(400).json({
                msg: 'El item no existe'
            });
        } else {
            res.json(itemUpdated);
        }
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

exports.addNewRecord = async(req, res, next) => {
    console.log(req.body)
    try {
        let updateItem = await items.findOneAndUpdate(
            { 'owner': req.body.owner, 'userItems._id': req.body.itemDetailsId},
            { $push: {'userItems.$.records': {'value': req.body.record.value, 'date': req.body.record.date}}},
            {new: true}
        );
        console.log(updateItem.records);
    } catch(error) {
        res.status(400).json({
            msg: 'Error al procesar la petición'
        });
    }
}