const mongoose = require("mongoose");
const doctorsSchema = new mongoose.Schema({
   department:String,
   name:Array,
  
});
module.exports = mongoose.model("doctors", doctorsSchema);
 