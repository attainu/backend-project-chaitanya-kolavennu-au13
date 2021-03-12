var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var logSchema = new Schema(
    {
        userId: {
        unique: true,
        type: String,
        required: true,
        trim: true
      },
      bookId: {
        type: String,
        required: true,
        trim: true
      },
        returnStatus:{
          type:Boolean,
          required:true
      },
      date:{
        type:Date,
        default:Date.now
      }
    }
     );


/* var logSchema = new Schema(
      {
          user: {
          type:Schema.Types.ObjectId,
          required: true,
            },
        book: {
          type: Schema.Types.ObjectId,
          required: true,
             },
        returnStatus:{
            type:Boolean,
            required:true
            },
        date:{
          type:Date,
          default:Date.now
        }
      }
       );*/
  
  
const Log = mongoose.model("log", logSchema);
module.exports = Log;

