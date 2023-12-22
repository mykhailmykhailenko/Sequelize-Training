const {User} = require('../models');

module.exports.createUser = async (req, res, next) => {
    try {
        const {body} = req;
        const result = await User.create(body);
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneUser = async (req, res, next) => {
    try {
        const {userInstance} = req;
        res.status(200).send(userInstance);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const result = await User.findAll();
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const {params: {userId}, body} = req;
        const [rowCount, [result]] = await User.update(body, {
            where : {
                id: userId
            },
            returning: true
        });
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const result = await User.destroy({
            where: {
                id: userId
            }
        });
        if (result) {
            res.status(200).send({data: result});
        } else {
            res.status(404)
        }
    } catch (error) {
        next(error);
    }
}

module.exports.deleteInstance = async(req, res, next) => {
    try {
        const {userInstance} = req;
        const result = await userInstance.destroy();
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}