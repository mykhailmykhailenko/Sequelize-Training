const {Group, User} = require('../models/index');

module.exports.createGroup = async (req, res, next) => {
    try {
        const {body: {name, imagePath, description}} = req;
        const group = await Group.create({name, imagePath, description});
        res.status(201).send(group);
    } catch (error) {
        next(error);
    }
}

module.exports.addUserToGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, body: {userId}} = req;
        const user = await User.findByPk(userId);
        const group = await Group.findByPk(groupId);
        const [result] = await group.addUser(user);
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

// module.exports.getGroupWithUsers = async (req, res, next) => {
//     try {
//         const {params: {groupId}} = req;
//         const group = await Group.findByPk(groupId);
//         const allUsersInGroup = await group.getUsers();
//         res.status(200).send({group, users: allUsersInGroup});
//     } catch (error) {
//         next(error);
//     }
// }

module.exports.getGroupWithUsers = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const group = await Group.findByPk(groupId, {
            include: [{
                model: User,
                attributes: {
                    exclude: 'password'
                }
            }]
        });
        res.status(200).send(group);
    } catch (error) {
        next(error);
    }
}

module.exports.updateGroup = async (req, res, next) => {
    try {
        const {params: {groupId}, body} = req;
        const result = await Group.update(body, {
            where: {
                id: groupId
            },
            returning: true
        })
        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.deleteGroup = async (req, res, next) => {
    try {
        const {params: {groupId}} = req;
        const result = await Group.destroy({
            where: {
                id: groupId
            }
        });
        res.status(200).send({data: result});
    } catch (error) {
        next(error);
    }
}

module.exports.deleteUserFromGroup = async (req, res, next) => {
    try {
        const {params: {groupId, userId}} = req;
        const group = await Group.findByPk(groupId);
        const user = await User.findByPk(userId);
        const result= await group.removeUser(user);
        res.status(200).send({data: result});
    } catch (error) {
        next(error);
    }
}