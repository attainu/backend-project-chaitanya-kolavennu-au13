const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');
const jwt = require("jsonwebtoken");

const adminApiController = {};


//ADMIN REGISTRATION
adminApiController.adminRegister = async (req, res) => {
    try {
        const registeredAdmin= await new Admin(req.body).save();
        res.status(200).json(registeredAdmin);
    }
    catch (err) {
        res.status(400).send(err);
    }
};

//GET BACK ALL ADMINS WHICH HELPS TO LOGIN
adminApiController.allAdmins = async (req, res) => {

    try {
        const admins = await Admin.find({});
        res.json(admins);
    }
    catch (err) {
        res.json({ message: err });
    }
};

//UPDATE ADMIN USING PATCH 
adminApiController.adminUpdate = async (req, res) => {
    console.log(req.params.adminId);
    console.log(req.body.name);
    try {
        const updatedAdmin = await Admin.updateOne(
            { _id: req.params.adminId },
            { $set: { adminName: req.body.name, adminAddress: req.body.address } });
        res.json(updatedAdmin);
    }
    catch (err) {
        res.json({ message: err });
    }
};

// DELETE THE SPECIFIC ADMIN 
adminApiController.deleteAdmin = async (req, res) => {
    console.log(req.params.adminId);
    try {
        const removedAdmin = await Admin.remove({ _id: req.params.adminId });
        res.json(removedAdmin);
    }
    catch (err) {
        res.json({ message: err });
    }
};



//GET BACK SPECIFIC ADMIN
adminApiController.specificAdmin = async (req, res) => {
    console.log(req.params.adminId);

    try {

        const admin = await Admin.findById(req.params.adminId);
        console.log(admin);
        res.json(admin);
    }
    catch (err) {
        res.json({ message: err });
    }
};

//  ADMIN LOGIN ROUTE
adminApiController.adminLogin = async (req, res) => {
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    try {
        //CHECK IF EMAIL OR PASSWORD IS EMPTY 
        if (!email || !password) return res.status(400).send("Message:email or password cannot be null");
        const admin = await Admin.findOne({ adminEmailId: email })
        console.log(admin);
        console.log(admin.adminPassword);
        const isMatched = await bcrypt.compare(password, admin.adminPassword);
        console.log(isMatched);
        if (!isMatched) return res.status(404).send("Message:invalid credentials");
        const token = await jwt.sign({ id: admin.id }, process.env.SECRET_KEY, { expiresIn: 1000 * 60 * 60 });
        console.log(token);
        admin.jwt = token;
        console.log(admin);
        const savedadmin = await admin.save();
        console.log(savedadmin);
        return res.json({ "jwttoken": token, "status": "successful login", "code": "202" });
    }

    catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
};

adminApiController.adminLogout = async (req, res) => {
    try {
        await Admin.findOneAndUpdate({ _id: req.admin.id }, { jwt: null })
        return res.json({ "status": "successful logout", "code": "200" });
    }
    catch{

    }
};

module.exports = adminApiController;
