var User = require('../models/user');
var bcrypt = require('bcrypt');
const getAllUsers = async(req, res) => {
    // get all users
    const users = await User.find().populate('book').exec();
    res.json(users);
}
const getUser = async (req,res) =>{
    try {
        // get one user by id 
       
        const user = await User.find({_id:req.params.id},{__v:0}).populate('book').exec();
        res.json(user);
    } catch (error) {
        res.status(400).json(error);
    }
}
const createUser = async(req, res) => {
    //create a new user
    try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    console.log(req.body)
    var user = await new User(req.body).save();
    res.json({ "message": "user created",user });
    } catch (error) {
        console.log(error)
        res.status(400).json(error);
    }
    
}

const updateUser = async(req, res) => {
    //update user by id
    try {
        let condition = {};
        if(req.body._id){
            condition._id = req.body._id;
        }else if(req.body.email){
            condition.email = req.body.email
        }
        console.log(condition);
        const result =await User.updateOne(condition,{...req.body});
        res.json({ "message": "update user",result });
    } catch (error) {
     console.log(error);
     res.status(400).json(error);   
    }
}

const deleteUser =async (req, res) => {
    //delete user by id
    try {
        console.log(req.params.id);
    const result =  await User.deleteOne({_id:req.params.id});
    res.json({ "message": "delete user",result });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}