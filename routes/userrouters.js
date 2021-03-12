const express = require('express');
const router = express.Router();
const path = require('path');
const {authenticate}=require('../middlewares/authenticate');
const UserController = require(path.join(__dirname,'../','controllers/userController'));

/* GET users listing. */
router.get('/',authenticate, UserController.getAllUsers);
//get user detail by id.
router.get('/:id',authenticate, UserController.getUser);
//create a new user.
router.post('/',authenticate, UserController.createUser);
//update user by id.
router.put('/',authenticate, UserController.updateUser);
//delete user by id.
router.delete('/:id',authenticate, UserController.deleteUser);

module.exports = router;
