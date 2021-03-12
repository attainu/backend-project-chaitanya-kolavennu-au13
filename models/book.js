var mongoose = require('mongoose');
//schema for book
var Schema = mongoose.Schema
var BookSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    price: Number,
    stock :{
        type:Number,
        required: true
    } ,
    auther:String,
    title : String,
    publisher:String,
    img:String,
    time : { type: Number, default: (new Date()).getTime() },
   
},
{ timestamps: true }
);
var Book = mongoose.model('Book', BookSchema);

module.exports = Book;