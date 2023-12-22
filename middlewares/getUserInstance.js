const {User} = require('../models/index');

module.exports.getUserInstance = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findByPk(user.id);
        if (user) {
            req.userInstance = user;
            next();
        } else {
            res.status(404).send({error: 'User not found'});
        }
    } catch (error) {
        next(error);
    }
}