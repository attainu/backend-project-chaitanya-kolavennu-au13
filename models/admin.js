var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

//CREATE ADMIN SCHEMA
var adminSchema = new Schema(
    {
        adminName: {
        type: String,
        required: true,
        trim: true
      },
      adminEmailId: {
        unique: true,
        type: String,
        required: true,
        trim: true
      },
      adminPassword: {
        type: String,
        required: true,
        trim: true
      },
      adminAddress:{
          type:String,
          required:true
      },
      adminPhoneNo:{
          type:Number,
          required:true
      },
      date:{
        type:Date,
        default:Date.now
      },
      jwt:{
        type:String,
        required:false,
        default:null
      }
    }
     );


//DEFINE PRE METHOD TO HASH PASSWORD 
adminSchema.pre('save', function (next) {
    var admin = this;
    if(admin.isModified('adminPassword')){
      bcrypt.hash(admin.adminPassword, 10)
    .then(function (hashedPassword) {
      console.log(hashedPassword);  
        admin.adminPassword = hashedPassword;
        next();

    })
    .catch((err)=>{
      next(err)
    })
    }
    else{
      next();
    }
    
  });
  /*
  userSchema.pre("save", function(next) {
    var user = this;
    // Check whether password field is modified
    if (user.isModified("password")) {
      bcrypt
        .hash(user.password, 10)
        .then(function(hashedPassword) {
          user.password = hashedPassword;
          next();
        })
        .catch(function(err) {
          next(err);
        });
    }
  });*/
  

var Admin = mongoose.model("admin", adminSchema);
module.exports = Admin;

