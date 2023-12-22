const {Router} = require('express');
const GroupController = require('../controllers/group.controller');

const groupRouter = Router();

groupRouter.post('/', GroupController.createGroup);
groupRouter.post('/:groupId', GroupController.addUserToGroup);
groupRouter.get('/:groupId', GroupController.getGroupWithUsers);
groupRouter.put('/:groupId',GroupController.updateGroup);
groupRouter.delete('/:groupId', GroupController.deleteGroup);
groupRouter.delete('/:groupId/:userId', GroupController.deleteUserFromGroup);

module.exports = groupRouter;