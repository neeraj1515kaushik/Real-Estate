const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
     fullname :{
          type: String,
          required: true
     },
     email :{
          type:String,
          required : true
     },
     password :{
          type:String,
          required : true
     },
     message: {
          type: String,
          required: true
     }
});

mongoose.model('users', UserSchema);