const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const IdeaSchema = new Schema({
     fullname :{
          type: String,
          required: true
     },
     email :{
          type:String,
          required : true
     },
     message: {
          type: String,
          required: true
     }
});

mongoose.model('ideas', IdeaSchema);