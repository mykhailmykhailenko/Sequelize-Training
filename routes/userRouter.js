const {Router} = require('express');
const UserController = require('../controllers/user.controller');
const {pagination} = require('../middlewares/pagination');

const userRouter = Router();

userRouter.post('/', UserController.createUser);
userRouter.get('/',pagination, UserController.getAllUsers);
userRouter.get('/:userId',  UserController.getUserWithAllGroups);
userRouter.delete('/:userId', UserController.deleteUser);
userRouter.put('/:userId', UserController.updateUser);

module.exports = userRouter;