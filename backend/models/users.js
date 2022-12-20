/**
 * import mongoose
 */
const mongoose = require("mongoose"); 

/**
 * User schema
 */
const UsersSchema = new mongoose.Schema({
  name : {type:String, required:true},
  comments : String,
  level : Number,
});

/**
 * Conversion to the model
 */
const UsersModels = mongoose.model('users',UsersSchema);

module.exports = UsersModels;